import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { finalizeExam } from "@/lib/exam/finalizeExam";

export async function POST(
  req: NextRequest
) {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
// LOAD USER PROFILE

const {
  data: profileData,
  error: profileError,
} = await supabase

  .from("users")

  .select(`
    institute_id
  `)

  .eq("id", user.id)

  .single();
if (profileError || !profileData) {
  return NextResponse.json(
    {
      error: "User profile not found.",
    },
    {
      status: 404,
    }
  );
}
if (!profileData?.institute_id) {

  return NextResponse.json(
    {
      error:
        "No institute assigned",
    },
    {
      status: 403,
    }
  );
}
    const body =
      await req.json();

    const {
      examId,
      sessionToken,
    } = body;
const {
  data: exam,
  error: examError,
} = await supabase

  .from("exams")

  .select(`
  id,
  duration,
  published,
  start_time,
  end_time,
  institute_id,
  exam_scope,
  entry_fee
`)

  .eq("id", examId)

  .single();
if (examError || !exam) {
  return NextResponse.json(
    {
      error: examError?.message || "Exam not found.",
    },
    {
      status: 404,
    }
  );
}
  // PUBLIC exams are open to all authenticated users.
// Institute exams require the student to belong
// to the same institute.

if (exam.exam_scope !== "PUBLIC") {

  if (
    exam.institute_id !==
    profileData.institute_id
  ) {

    return NextResponse.json(
      {
        error:
          "Unauthorized institute access",
      },
      {
        status: 403,
      }
    );

  }

}
const now = new Date();

if (now < new Date(exam.start_time)) {

  return NextResponse.json(
    {
      error: "Exam has not started yet.",
    },
    {
      status: 403,
    }
  );

}

if (now > new Date(exam.end_time)) {

  return NextResponse.json(
    {
      error: "Exam has already ended.",
    },
    {
      status: 403,
    }
  );

}
    if (
      !examId ||
      !sessionToken
    ) {
      return NextResponse.json(
        {
          error:
            "Missing examId or sessionToken",
        },
        {
          status: 400,
        }
      );
    }

    // Validate session

   const {
  data: session,
  error: sessionError,
} = await supabase
  .from("exam_sessions")
  .select("*")
  .eq("exam_id", examId)
  .eq("user_id", user.id)
  .eq("session_token", sessionToken)
  .maybeSingle();
console.log("SESSION:", {
  id: session?.id,
  status: session?.status,
  expires_at: session?.expires_at,
  now: new Date().toISOString(),
});
if (sessionError || !session) {
  return NextResponse.json(
    {
      error: "Invalid session.",
    },
    {
      status: 403,
    }
  );
}
// Session expiry

// Session expiry
if (
  session.expires_at &&
  new Date(session.expires_at) < new Date()
) {
  console.log("Session expired because time is over. Continuing automatic submission.");

  // Mark it expired for audit purposes, but DO NOT stop submission.
  await supabase
    .from("exam_sessions")
    .update({
      status: "expired",
    })
    .eq("id", session.id);
}
    // Prevent double submit

    if (
      session.status !==
      "active"
    ) {
      return NextResponse.json(
        {
          error:
            "Exam already submitted",
        },
        {
          status: 400,
        }
      );
    }
// Lock the session immediately to prevent race conditions
   
const result = await finalizeExam({
  supabase,
  userId: user.id,
  userEmail: user.email,
  examId,
  session,
});

return NextResponse.json(result);


  } catch (error) {
   console.error(
  "SUBMIT ERROR FULL:",
  JSON.stringify(error, null, 2)
);

console.error(
  "SUBMIT ERROR RAW:",
  error
);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
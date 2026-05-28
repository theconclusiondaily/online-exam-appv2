import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
// LOAD USER PROFILE

const {
  data: profileData,
} = await supabase

  .from("users")

  .select(`
    institute_id
  `)

  .eq(
    "id",
    user.id
  )

  .single();

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
    const body = await req.json();

    const {
      examId,
      questionId,
      selectedOption,
      sessionToken,
    } = body;
const {
  data: exam,
} = await supabase

  .from("exams")

  .select(`
    id,
    institute_id
  `)

  .eq(
    "id",
    examId
  )

  .single();

  if (
  exam?.institute_id !==
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
    console.log("SAVE ANSWER REQUEST:", {
      examId,
      questionId,
      selectedOption,
      sessionToken,
      userId: user.id,
    });

    if (!examId) {
      return NextResponse.json(
        { error: "Missing examId" },
        { status: 400 }
      );
    }

    if (!questionId) {
      return NextResponse.json(
        { error: "Missing questionId" },
        { status: 400 }
      );
    }

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Missing session token" },
        { status: 400 }
      );
    }

    // Session validation
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

    console.log(
      "SESSION QUERY RESULT:",
      session
    );

    console.log(
      "SESSION QUERY ERROR:",
      sessionError
    );

    if (sessionError) {
      return NextResponse.json(
        {
          error: sessionError.message,
          details: sessionError,
        },
        {
          status: 500,
        }
      );
    }

    if (!session) {
      return NextResponse.json(
        {
          error: "Invalid session",
          examId,
          sessionToken,
        },
        {
          status: 403,
        }
      );
    }

    if (session.status !== "active") {
      return NextResponse.json(
        {
          error: "Exam already submitted",
          status: session.status,
        },
        {
          status: 403,
        }
      );
    }

    if (
      session.expires_at &&
      new Date(session.expires_at) <
        new Date()
    ) {
      await supabase
        .from("exam_sessions")
        .update({
          status: "expired",
        })
        .eq("id", session.id);

      return NextResponse.json(
        {
          error: "Session expired",
        },
        {
          status: 403,
        }
      );
    }

    const payload = {
      exam_id: examId,
      user_id: user.id,
      question_id: questionId,
      selected_option:
        selectedOption,
      updated_at:
        new Date().toISOString(),
    };

    console.log(
      "SAVE PAYLOAD:",
      payload
    );

    const {
      data,
      error,
    } = await supabase
      .from("exam_answers")
      .upsert(payload, {
        onConflict:
          "exam_id,user_id,question_id",
      })
      .select();

    console.log(
      "UPSERT DATA:",
      data
    );

    console.log(
      "UPSERT ERROR:",
      error
    );

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      answer: data,
    });

  } catch (error: any) {

    console.error(
      "SAVE ANSWER CATCH:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
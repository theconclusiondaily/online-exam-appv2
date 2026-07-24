import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // AUTH CHECK
    const {
      data: { user },
      error: authError,
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
  

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { examId } = body;

    if (!examId) {
      return NextResponse.json(
        { error: "Exam ID required" },
        { status: 400 }
      );
    }
const {
  data: submittedSession,
} = await supabase
  .from("exam_sessions")
  .select("*")
  .eq("exam_id", examId)
  .eq("user_id", user.id)
  .not("submitted_at", "is", null)
  .maybeSingle();

if (submittedSession) {

  return NextResponse.json(
    {
      error:
        "You have already submitted this exam",
    },
    {
      status: 403,
    }
  );
}
    // CHECK EXISTING ACTIVE SESSION
    const { data: existingSession } = await supabase
      .from("exam_sessions")
      .select("*")
      .eq("exam_id", examId)
      .eq("user_id", user.id)
      .eq("status", "active")
      .maybeSingle();

    if (existingSession) {
      return NextResponse.json({
        success: true,
        session: existingSession,
      });
    }

    // LOAD EXAM
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
      .maybeSingle();

   

    if (examError || !exam) {
      return NextResponse.json(
        { error: "Exam not found" },
        { status: 404 }
      );
    }
// Allow all PUBLIC exams

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

    if (!exam.published) {
      return NextResponse.json(
        { error: "Exam not published" },
        { status: 403 }
      );
    }

    if (
      exam.start_time &&
      new Date(exam.start_time) > now
    ) {
      return NextResponse.json(
        { error: "Exam has not started yet" },
        { status: 403 }
      );
    }

    if (
      exam.end_time &&
      new Date(exam.end_time) < now
    ) {
      return NextResponse.json(
        { error: "Exam has expired" },
        { status: 403 }
      );
    }
    
// ======================================
// ENTRY FEE PAYMENT VERIFICATION
// ======================================

if (exam.entry_fee > 0) {

  const entryFeeReference =
    `ENTRY-FEE-${exam.id}-${user.id}`;

  const {
    data: entryFeePayment,
    error: entryFeePaymentError,
  } = await supabase
    .from("tcd_transactions")
    .select(`
      id,
      amount,
      transaction_status
    `)
    .eq(
      "reference_number",
      entryFeeReference
    )
    .eq(
      "transaction_type",
      "ENTRY_FEE"
    )
    .eq(
      "transaction_status",
      "SUCCESS"
    )
    .maybeSingle();

  if (entryFeePaymentError) {

    console.error(
      "ENTRY FEE VERIFICATION ERROR:",
      entryFeePaymentError
    );

    return NextResponse.json(
      {
        error:
          "Unable to verify entry fee payment",
      },
      {
        status: 500,
      }
    );
  }

  if (!entryFeePayment) {

    return NextResponse.json(
      {
        error:
          "Entry fee payment required",
        paymentRequired: true,
      },
      {
        status: 402,
      }
    );
  }

  // Defensive check:
  // payment must match the current
  // exam entry fee.
  if (
    Number(
      entryFeePayment.amount
    ) !==
    Number(
      exam.entry_fee
    )
  ) {

    return NextResponse.json(
      {
        error:
          "Entry fee payment amount mismatch",
        paymentRequired: true,
      },
      {
        status: 402,
      }
    );
  }
}
    // CREATE SESSION TOKEN
    const sessionToken = crypto.randomUUID();

    const expiresAt = new Date(
      Date.now() +
        exam.duration * 60 * 1000
    ).toISOString();
  
    // CREATE SESSION
    const {
      data: session,
      error: sessionError,
    } = await supabase
      .from("exam_sessions")
      .insert({
        exam_id: examId,
        user_id: user.id,
        session_token: sessionToken,
        started_at: new Date().toISOString(),
        expires_at: expiresAt,
        status: "active",
      })
      .select()
      .single();

  

    if (sessionError) {
      return NextResponse.json(
        { error: sessionError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
  success: true,
  session,
});
  
  } catch (error) {
    console.error("START EXAM ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

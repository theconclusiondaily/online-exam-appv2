import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // --------------------------------------------------
    // 1. AUTHENTICATION
    // --------------------------------------------------

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 2. REQUEST DATA
    // --------------------------------------------------

    const body = await req.json();

    const {
      examId,
      questionId,
      selectedOption,
      sessionToken,
    } = body;

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

    // --------------------------------------------------
    // 3. SESSION VALIDATION
    //
    // The session already binds:
    // user + exam + session token.
    //
    // We therefore do NOT perform the previous
    // users → profile → exams lookup here.
    // --------------------------------------------------

    const {
      data: session,
      error: sessionError,
    } = await supabase
      .from("exam_sessions")
      .select(
        "id, exam_id, user_id, status, expires_at"
      )
      .eq("exam_id", examId)
      .eq("user_id", user.id)
      .eq("session_token", sessionToken)
      .maybeSingle();

    if (sessionError) {
      console.error(
        "SAVE ANSWER SESSION ERROR:",
        sessionError
      );

      return NextResponse.json(
        {
          error: sessionError.message,
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
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------------------------
    // 4. SESSION STATUS
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 5. TIMER EXPIRY
    //
    // Saving after expiry is intentionally skipped.
    // Final submission remains responsible for
    // completing the exam.
    // --------------------------------------------------

    if (
      session.expires_at &&
      new Date(session.expires_at) <
        new Date()
    ) {
      console.log(
        "Save request received after timer expired. Skipping save but allowing final submission."
      );

      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "Session expired",
      });
    }

    // --------------------------------------------------
    // 6. SAVE ANSWER
    // --------------------------------------------------

    const payload = {
      exam_id: examId,
      user_id: user.id,
      question_id: questionId,
      selected_option: selectedOption,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("exam_answers")
      .upsert(payload, {
        onConflict:
          "exam_id,user_id,question_id",
      });

    if (error) {
      console.error(
        "SAVE ANSWER DATABASE ERROR:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------
    // 7. MINIMAL RESPONSE
    //
    // The client does not need the complete database
    // row after every answer.
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
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
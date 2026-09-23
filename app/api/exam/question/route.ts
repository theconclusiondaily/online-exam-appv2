import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 1. AUTHENTICATION
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. REQUEST DATA
    const {
      examId,
      questionIndex,
      sessionToken,
    } = await req.json();

    if (
      !examId ||
      typeof questionIndex !== "number" ||
      !sessionToken ||
      questionIndex < 0
    ) {
      return NextResponse.json(
        { error: "Invalid question request" },
        { status: 400 }
      );
    }

    // 3. VALIDATE STUDENT SESSION
    const {
      data: session,
      error: sessionError,
    } = await supabase
      .from("exam_sessions")
      .select("id, exam_id, user_id, status")
      .eq("exam_id", examId)
      .eq("user_id", user.id)
      .eq("session_token", sessionToken)
      .in(
        "status",
        ["active", "completed", "expired"]
      )
      .maybeSingle();

    if (
      sessionError ||
      !session
    ) {
      console.error(
        "QUESTION SESSION VALIDATION ERROR:",
        sessionError
      );

      return NextResponse.json(
        { error: "Invalid session" },
        { status: 403 }
      );
    }

    // 4. GET QUESTION MAPPING
    const {
      data: mappings,
      error: mappingError,
    } = await supabase
      .from("exam_questions")
      .select("question_id")
      .eq("exam_id", examId);

    if (
      mappingError ||
      !mappings ||
      mappings.length === 0
    ) {
      console.error(
        "QUESTION MAPPING ERROR:",
        mappingError
      );

      return NextResponse.json(
        {
          error:
            "No questions mapped to exam",
        },
        { status: 404 }
      );
    }

    // 5. CHECK INDEX
    if (
      questionIndex >= mappings.length
    ) {
      return NextResponse.json(
        {
          error:
            "Question index out of range",
        },
        { status: 400 }
      );
    }

    const currentQuestionId =
      mappings[questionIndex]?.question_id;

    if (!currentQuestionId) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // 6. LOAD QUESTION
    const {
      data: currentQuestion,
      error: questionError,
    } = await supabase
      .from("questions")
      .select(`
        id,
        question,
        question_text_hi,
        option_a,
        option_b,
        option_c,
        option_d,
        option_a_hi,
        option_b_hi,
        option_c_hi,
        option_d_hi
      `)
      .eq(
        "id",
        currentQuestionId
      )
      .single();

    if (
      questionError ||
      !currentQuestion
    ) {
      console.error(
        "QUESTION LOAD ERROR:",
        questionError
      );

      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // 7. RETURN QUESTION
    return NextResponse.json({
      data: currentQuestion,
      totalQuestions:
        mappings.length,
    });

  } catch (error) {
    console.error(
      "QUESTION API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient }
from "@/lib/supabase/server";

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

    const {
      examId,
      questionIndex,
      sessionToken,
    } = await req.json();

    const {
      data: session,
    } = await supabase
      .from("exam_sessions")
      .select("*")
      .eq("exam_id", examId)
      .eq("user_id", user.id)
      .eq("session_token", sessionToken)
      .eq("status", "active")
      .maybeSingle();

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
      return NextResponse.json(
        {
          error:
            "No questions mapped to exam",
        },
        {
          status: 404,
        }
      );
    }

    const questionIds =
      mappings.map(
        (m: any) =>
          m.question_id
      );
if (
  questionIndex < 0 ||
  questionIndex >= questionIds.length
) {
  return NextResponse.json(
    {
      error:
        "Question index out of range",
    },
    {
      status: 400,
    }
  );
}
    const currentQuestionId =
      questionIds[
        questionIndex
      ];

    const {
      data: current,
      error: questionError,
    } = await supabase
      .from("questions")
      .select(`
        id,
        question,
        option_a,
        option_b,
        option_c,
        option_d
      `)
      .eq(
        "id",
        currentQuestionId
      )
      .single();

    if (
      questionError ||
      !current
    ) {
      return NextResponse.json(
        {
          error:
            "Question not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      data: current,
      totalQuestions:
        questionIds.length,
    });

  } catch (error) {

    console.error(
      "QUESTION API ERROR:",
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
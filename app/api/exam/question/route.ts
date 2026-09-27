import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest
) {
  try {
    const supabase =
      await createClient();

    /*
     * ==========================================
     * 1. AUTHENTICATION
     * ==========================================
     */
    const {
      data: { user },
      error: authError,
    } =
      await supabase.auth.getUser();

    if (
      authError ||
      !user
    ) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * ==========================================
     * 2. REQUEST DATA
     * ==========================================
     */
    const body =
      await req.json();

    const {
      examId,
      questionIndex,
      sessionToken,
    } = body;

    if (
      !examId ||
      typeof questionIndex !==
        "number" ||
      !Number.isInteger(
        questionIndex
      ) ||
      questionIndex < 0 ||
      !sessionToken
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid question request",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ==========================================
     * 3. VALIDATE ACTIVE EXAM SESSION
     * ==========================================
     *
     * The composite database index:
     *
     * exam_id
     * user_id
     * session_token
     *
     * makes this lookup fast even with
     * high concurrent traffic.
     */
    const {
      data: session,
      error: sessionError,
    } =
      await supabase
        .from("exam_sessions")
        .select(
          "id, exam_id, user_id, status, expires_at"
        )
        .eq(
          "exam_id",
          examId
        )
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "session_token",
          sessionToken
        )
        .in(
          "status",
          [
            "active",
            "completed",
            "expired",
          ]
        )
        .maybeSingle();

    if (
      sessionError
    ) {
      console.error(
        "EXAM SESSION VALIDATION ERROR:",
        sessionError
      );

      return NextResponse.json(
        {
          error:
            "Unable to validate exam session",
        },
        {
          status: 500,
        }
      );
    }

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Invalid session",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * ==========================================
     * 4. SESSION EXPIRY CHECK
     * ==========================================
     */
    if (
      session.expires_at
    ) {
      const expiresAt =
        new Date(
          session.expires_at
        ).getTime();

      if (
        Number.isFinite(
          expiresAt
        ) &&
        expiresAt <=
          Date.now()
      ) {
        return NextResponse.json(
          {
            error:
              "Exam session expired",
          },
          {
            status: 403,
          }
        );
      }
    }

    /*
     * ==========================================
     * 5. GET QUESTION MAPPING
     * ==========================================
     *
     * question_order is ZERO based:
     *
     * Question 1 -> 0
     * Question 2 -> 1
     * Question 3 -> 2
     * ...
     *
     * We query exactly ONE mapping.
     *
     * IMPORTANT:
     *
     * Do NOT use .range() here.
     *
     * PostgreSQL does not guarantee physical
     * row order.
     *
     * The question_order column provides the
     * permanent deterministic ordering.
     */
    const {
      data: mapping,
      error: mappingError,
    } =
      await supabase
        .from("exam_questions")
        .select(
          "question_id"
        )
        .eq(
          "exam_id",
          examId
        )
        .eq(
          "question_order",
          questionIndex
        )
        .maybeSingle();

    if (
      mappingError
    ) {
      console.error(
        "QUESTION MAPPING ERROR:",
        mappingError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load question mapping",
        },
        {
          status: 500,
        }
      );
    }

    if (
      !mapping?.question_id
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

    const questionId =
      mapping.question_id;

    /*
     * ==========================================
     * 6. LOAD QUESTION
     * ==========================================
     */
    const {
      data: question,
      error: questionError,
    } =
      await supabase
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
          questionId
        )
        .maybeSingle();

    if (
      questionError
    ) {
      console.error(
        "QUESTION LOAD ERROR:",
        questionError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load question",
        },
        {
          status: 500,
        }
      );
    }

    if (!question) {
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

    /*
     * ==========================================
     * 7. GET TOTAL QUESTION COUNT
     * ==========================================
     *
     * COUNT ONLY.
     *
     * No question rows are transferred.
     */
    const {
      count,
      error: countError,
    } =
      await supabase
        .from("exam_questions")
        .select(
          "id",
          {
            count:
              "exact",
            head: true,
          }
        )
        .eq(
          "exam_id",
          examId
        );

    if (
      countError
    ) {
      console.error(
        "QUESTION COUNT ERROR:",
        countError
      );

      return NextResponse.json(
        {
          error:
            "Unable to determine exam question count",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ==========================================
     * 8. RETURN QUESTION
     * ==========================================
     */
    return NextResponse.json({
      data: question,
      totalQuestions:
        count ?? 0,
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
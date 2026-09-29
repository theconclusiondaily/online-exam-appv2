import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "@/lib/supabase/server";

import crypto from "crypto";

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
    } = body;

    if (!examId) {
      return NextResponse.json(
        {
          error:
            "Exam ID required",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ==========================================
     * 3. LOAD USER PROFILE
     * ==========================================
     */
    const {
      data: profileData,
      error: profileError,
    } =
      await supabase
        .from("users")
        .select(
          "institute_id"
        )
        .eq(
          "id",
          user.id
        )
        .maybeSingle();

    if (profileError) {
      console.error(
        "USER PROFILE LOAD ERROR:",
        profileError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load user profile",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ==========================================
     * 4. LOAD EXAM
     * ==========================================
     */
    const {
      data: exam,
      error: examError,
    } =
      await supabase
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
        .eq(
          "id",
          examId
        )
        .maybeSingle();

    if (
      examError
    ) {
      console.error(
        "EXAM LOAD ERROR:",
        examError
      );

      return NextResponse.json(
        {
          error:
            "Unable to load exam",
        },
        {
          status: 500,
        }
      );
    }

    if (!exam) {
      return NextResponse.json(
        {
          error:
            "Exam not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ==========================================
     * 5. EXAM ACCESS CONTROL
     * ==========================================
     *
     * PUBLIC exams do not require the
     * student's institute to match.
     *
     * Institute exams require the same
     * institute.
     */
    if (
      exam.exam_scope !==
      "PUBLIC"
    ) {
      if (
        !profileData?.institute_id
      ) {
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

    /*
     * ==========================================
     * 6. EXAM AVAILABILITY
     * ==========================================
     */
    const now =
      new Date();

    if (
      !exam.published
    ) {
      return NextResponse.json(
        {
          error:
            "Exam not published",
        },
        {
          status: 403,
        }
      );
    }

    if (
      exam.start_time &&
      new Date(
        exam.start_time
      ) > now
    ) {
      return NextResponse.json(
        {
          error:
            "Exam has not started yet",
        },
        {
          status: 403,
        }
      );
    }

    if (
      exam.end_time &&
      new Date(
        exam.end_time
      ) < now
    ) {
      return NextResponse.json(
        {
          error:
            "Exam has expired",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * ==========================================
     * 7. CHECK PREVIOUS SUBMISSION
     * ==========================================
     *
     * Do not use maybeSingle() without an
     * explicit limit/order here because a
     * student may have historical records.
     */
    const {
      data: submittedSession,
      error:
        submittedSessionError,
    } =
      await supabase
        .from("exam_sessions")
        .select(
          "id, submitted_at"
        )
        .eq(
          "exam_id",
          examId
        )
        .eq(
          "user_id",
          user.id
        )
        .not(
          "submitted_at",
          "is",
          null
        )
        .order(
          "submitted_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle();

    if (
      submittedSessionError
    ) {
      console.error(
        "SUBMITTED SESSION CHECK ERROR:",
        submittedSessionError
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify exam status",
        },
        {
          status: 500,
        }
      );
    }

    if (
      submittedSession
    ) {
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

    /*
     * ==========================================
     * 8. ENTRY FEE VERIFICATION
     * ==========================================
     */
    if (
      Number(exam.entry_fee) >
      0
    ) {
      const entryFeeReference =
        `ENTRY-FEE-${exam.id}-${user.id}`;

      const {
        data:
          entryFeePayment,
        error:
          entryFeePaymentError,
      } =
        await supabase
          .from(
            "tcd_transactions"
          )
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

      if (
        entryFeePaymentError
      ) {
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

      if (
        !entryFeePayment
      ) {
        return NextResponse.json(
          {
            error:
              "Entry fee payment required",
            paymentRequired:
              true,
          },
          {
            status: 402,
          }
        );
      }

      /*
       * Defensive payment amount check.
       */
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
            paymentRequired:
              true,
          },
          {
            status: 402,
          }
        );
      }
    }

    /*
     * ==========================================
     * 9. CHECK EXISTING ACTIVE SESSION
     * ==========================================
     *
     * This handles the normal case where the
     * student refreshes/reopens the exam.
     */
    const {
      data:
        existingSession,
      error:
        existingSessionError,
    } =
      await supabase
        .from(
          "exam_sessions"
        )
        .select("*")
        .eq(
          "exam_id",
          examId
        )
        .eq(
          "user_id",
          user.id
        )
        .in(
          "status",
          [
            "active",
            "submitting",
          ]
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle();

    if (
      existingSessionError
    ) {
      console.error(
        "ACTIVE SESSION LOOKUP ERROR:",
        existingSessionError
      );

      return NextResponse.json(
        {
          error:
            "Unable to initialize exam session",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ==========================================
     * 10. REUSE EXISTING ACTIVE SESSION
     * ==========================================
     */
    if (
      existingSession
    ) {
      /*
       * A submission is currently being
       * finalized. Do not restart it.
       */
      if (
        existingSession.status ===
        "submitting"
      ) {
        return NextResponse.json(
          {
            error:
              "Exam submission is already in progress.",
          },
          {
            status: 409,
          }
        );
      }

      /*
       * Make sure this session still has
       * a valid token.
       */
      if (
        !existingSession.session_token
      ) {
        console.error(
          "EXISTING SESSION HAS NO SESSION TOKEN:",
          existingSession.id
        );

        return NextResponse.json(
          {
            error:
              "Exam session is invalid",
          },
          {
            status: 500,
          }
        );
      }

      /*
       * Find/create the corresponding
       * active attempt.
       */
      let attemptId:
        | string
        | null = null;

      const {
        data:
          existingAttempt,
        error:
          existingAttemptError,
      } =
        await supabase
          .from(
            "exam_attempts"
          )
          .select(
            "id, status"
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
            "status",
            "active"
          )
          .limit(1)
          .maybeSingle();

      if (
        existingAttemptError
      ) {
        console.error(
          "EXISTING ATTEMPT LOOKUP ERROR:",
          existingAttemptError
        );

        return NextResponse.json(
          {
            error:
              "Unable to initialize exam attempt",
          },
          {
            status: 500,
          }
        );
      }

      if (
        existingAttempt
      ) {
        attemptId =
          existingAttempt.id;
      } else {
        const {
          data:
            newAttempt,
          error:
            newAttemptError,
        } =
          await supabase
            .from(
              "exam_attempts"
            )
            .insert({
              exam_id:
                examId,
              user_id:
                user.id,
              status:
                "active",
            })
            .select(
              "id"
            )
            .single();

        if (
          newAttemptError ||
          !newAttempt
        ) {
          console.error(
            "EXISTING SESSION ATTEMPT CREATION ERROR:",
            newAttemptError
          );

          /*
           * A simultaneous request may have
           * created the attempt first.
           *
           * Re-read it before failing.
           */
          const {
            data:
              concurrentAttempt,
          } =
            await supabase
              .from(
                "exam_attempts"
              )
              .select(
                "id"
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
                "status",
                "active"
              )
              .limit(1)
              .maybeSingle();

          if (
            concurrentAttempt
          ) {
            attemptId =
              concurrentAttempt.id;
          } else {
            return NextResponse.json(
              {
                error:
                  "Unable to initialize exam attempt",
              },
              {
                status: 500,
              }
            );
          }
        } else {
          attemptId =
            newAttempt.id;
        }

        
      }

      return NextResponse.json({
        success: true,
        session:
          existingSession,
        attempt_id:
          attemptId,
      });
    }

    /*
     * ==========================================
     * 11. CREATE NEW SESSION
     * ==========================================
     */
    const sessionToken =
      crypto.randomUUID();

    const expiresAt =
      new Date(
        Date.now() +
          Number(
            exam.duration
          ) *
            60 *
            1000
      ).toISOString();

    const {
      data:
        newSession,
      error:
        sessionError,
    } =
      await supabase
        .from(
          "exam_sessions"
        )
        .insert({
          exam_id:
            examId,
          user_id:
            user.id,
          session_token:
            sessionToken,
          started_at:
            new Date().toISOString(),
          expires_at:
            expiresAt,
          status:
            "active",
        })
        .select()
        .single();

    /*
     * ==========================================
     * 12. HANDLE SESSION CREATION RACE
     * ==========================================
     *
     * If another request created the session
     * between our lookup and insert, the
     * unique index rejects this insert.
     *
     * We then retrieve and reuse that session.
     */
    if (
      sessionError ||
      !newSession
    ) {
      console.warn(
        "EXAM SESSION INSERT RESULT:",
        sessionError
      );

      const {
        data:
          concurrentSession,
        error:
          concurrentSessionError,
      } =
        await supabase
          .from(
            "exam_sessions"
          )
          .select("*")
          .eq(
            "exam_id",
            examId
          )
          .eq(
            "user_id",
            user.id
          )
          .in(
            "status",
            [
              "active",
              "submitting",
            ]
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          )
          .limit(1)
          .maybeSingle();

      if (
        concurrentSessionError ||
        !concurrentSession
      ) {
        console.error(
          "CONCURRENT SESSION RECOVERY ERROR:",
          concurrentSessionError
        );

        return NextResponse.json(
          {
            error:
              "Unable to initialize exam session",
          },
          {
            status: 500,
          }
        );
      }

      if (
        concurrentSession.status ===
        "submitting"
      ) {
        return NextResponse.json(
          {
            error:
              "Exam submission is already in progress.",
          },
          {
            status: 409,
          }
        );
      }

      /*
       * Recover/create the attempt.
       */
      const {
        data:
          concurrentAttempt,
        error:
          concurrentAttemptError,
      } =
        await supabase
          .from(
            "exam_attempts"
          )
          .select(
            "id"
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
            "status",
            "active"
          )
          .limit(1)
          .maybeSingle();

      if (
        concurrentAttemptError
      ) {
        console.error(
          "CONCURRENT ATTEMPT LOOKUP ERROR:",
          concurrentAttemptError
        );

        return NextResponse.json(
          {
            error:
              "Unable to initialize exam attempt",
          },
          {
            status: 500,
          }
        );
      }

      if (
        concurrentAttempt
      ) {
        return NextResponse.json({
          success: true,
          session:
            concurrentSession,
          attempt_id:
            concurrentAttempt.id,
        });
      }

      const {
        data:
          recoveredAttempt,
        error:
          recoveredAttemptError,
      } =
        await supabase
          .from(
            "exam_attempts"
          )
          .insert({
            exam_id:
              examId,
            user_id:
              user.id,
            status:
              "active",
          })
          .select(
            "id"
          )
          .single();

      if (
        recoveredAttemptError ||
        !recoveredAttempt
      ) {
        /*
         * Another request may have created
         * it at exactly the same time.
         */
        const {
          data:
            retryAttempt,
        } =
          await supabase
            .from(
              "exam_attempts"
            )
            .select(
              "id"
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
              "status",
              "active"
            )
            .limit(1)
            .maybeSingle();

        if (
          !retryAttempt
        ) {
          console.error(
            "ATTEMPT RECOVERY FAILED:",
            recoveredAttemptError
          );

          return NextResponse.json(
            {
              error:
                "Unable to create exam attempt",
            },
            {
              status: 500,
            }
          );
        }

        return NextResponse.json({
          success: true,
          session:
            concurrentSession,
          attempt_id:
            retryAttempt.id,
        });
      }

      return NextResponse.json({
        success: true,
        session:
          concurrentSession,
        attempt_id:
          recoveredAttempt.id,
      });
    }

    /*
     * ==========================================
     * 13. CREATE ATTEMPT
     * ==========================================
     */
    const {
      data:
        newAttempt,
      error:
        newAttemptError,
    } =
      await supabase
        .from(
          "exam_attempts"
        )
        .insert({
          exam_id:
            examId,
          user_id:
            user.id,
          status:
            "active",
        })
        .select(
          "id"
        )
        .single();

    /*
     * ==========================================
     * 14. HANDLE ATTEMPT CREATION RACE
     * ==========================================
     */
    if (
      newAttemptError ||
      !newAttempt
    ) {
      console.warn(
        "EXAM ATTEMPT INSERT RESULT:",
        newAttemptError
      );

      const {
        data:
          concurrentAttempt,
      } =
        await supabase
          .from(
            "exam_attempts"
          )
          .select(
            "id"
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
            "status",
            "active"
          )
          .limit(1)
          .maybeSingle();

      if (
        !concurrentAttempt
      ) {
        console.error(
          "EXAM ATTEMPT RECOVERY FAILED:",
          newAttemptError
        );

        return NextResponse.json(
          {
            error:
              "Unable to create exam attempt",
          },
          {
            status: 500,
          }
        );
      }

      return NextResponse.json({
        success: true,
        session:
          newSession,
        attempt_id:
          concurrentAttempt.id,
      });
    }

    /*
     * ==========================================
     * 15. FINAL RESPONSE
     * ==========================================
     *
     * The client receives BOTH:
     *
     * session_token
     * attempt_id
     *
     * This is important because proctoring
     * snapshots and exam submission use
     * attempt_id.
     */
    return NextResponse.json({
      success: true,
      session:
        newSession,
      attempt_id:
        newAttempt.id,
    });

  } catch (error) {
    console.error(
      "START EXAM ERROR:",
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
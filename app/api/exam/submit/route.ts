import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SCORING }
from "@/lib/exam";
import {
  updateWeeklyChallenges
}
from "@/lib/challenges/updateWeeklyChallenges";

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

    if (
      session.expires_at &&
      new Date(
        session.expires_at
      ) < new Date()
    ) {
      await supabase
        .from("exam_sessions")
        .update({
          status:
            "expired",
        })
        .eq(
          "id",
          session.id
        );

      return NextResponse.json(
        {
          error:
            "Session expired",
        },
        {
          status: 403,
        }
      );
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

const {
  data: completedSession,
  error: sessionUpdateError,
} = await supabase

  .from("exam_sessions")

  .update({

    status: "completed",

    submitted_at: new Date().toISOString(),

  })

  .eq("id", session.id)

  .eq("status", "active")

  .select();

if (
  sessionUpdateError ||
  !completedSession ||
  completedSession.length === 0
) {

  return NextResponse.json(
    {
      error: "Exam already submitted.",
    },
    {
      status: 409,
    }
  );

}
    

    // Fetch answers

    const {
      data: answers,
      error: answersError,
    } = await supabase
      .from("exam_answers")
      .select("*")
      .eq(
        "exam_id",
        examId
      )
      .eq(
        "user_id",
        user.id
      );

    if (answersError) {
      return NextResponse.json(
        {
          error:
            answersError.message,
        },
        {
          status: 500,
        }
      );
    }

    const questionIds =
      answers?.map(
        (a: any) =>
          a.question_id
      ) || [];

    // No answers submitted

    if (
      questionIds.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No answers found",
        },
        {
          status: 400,
        }
      );
    }

// Fetch ALL questions of this exam

const {
  data: allQuestions,
  error: allQuestionsError,
} = await supabase
  .from("questions")
  .select(`
    id,
    correct_answer
  `)
  .in(
    "id",
    questionIds
  );

if (allQuestionsError) {
  return NextResponse.json(
    {
      error:
        allQuestionsError.message,
    },
    {
      status: 500,
    }
  );
}
console.log(
  "ALL QUESTIONS COUNT:",
  allQuestions?.length
);

console.log(
  "ALL QUESTIONS:",
  allQuestions
);

const {
  data: mappings,
  error: mappingsError,
} = await supabase
  .from("exam_questions")
  .select("question_id")
  .eq(
    "exam_id",
    examId
  );

if (
  mappingsError ||
  !mappings
) {
  return NextResponse.json(
    {
      error:
        "Failed to load exam questions",
    },
    {
      status: 500,
    }
  );
}

const totalQuestionsCount =
  mappings.length;
const maxMarks =
  totalQuestionsCount *
  SCORING.CORRECT;

let totalScore = 0;

let correctCount = 0;

let wrongCount = 0;

for (
  const answer of
  answers || []
) {

  const question =
    allQuestions?.find(
      (q: any) =>
        q.id ===
        answer.question_id
    );

  if (!question)
    continue;

  if (
    answer.selected_option ===
    question.correct_answer
  ) {

    totalScore +=
      SCORING.CORRECT;

    correctCount++;

  } else if (
    answer.selected_option
  ) {

    totalScore +=
      SCORING.WRONG;

    wrongCount++;
  }
}
console.log(
  "ANSWERS COUNT:",
  answers?.length
);

console.log(
  "ANSWERS:",
  answers
);
const percentage =
  maxMarks > 0
    ? Number(
        (
          (totalScore /
            maxMarks) *
          100
        ).toFixed(2)
      )
    : 0;

const accuracy =
  answers &&
  answers.length > 0
    ? Number(
        (
          (correctCount /
            answers.length) *
          100
        ).toFixed(2)
      )
    : 0;

console.log(
  "TOTAL SCORE:",
  totalScore
);

console.log(
  "MAX MARKS:",
  maxMarks
);

console.log(
  "PERCENTAGE:",
  percentage
);


    // Final session check

     console.log({
  totalScore,
  correctCount,
  wrongCount,
  percentage,
  maxMarks,
  totalQuestions:
  totalQuestionsCount,
});
const submittedAt =
  new Date();

const timeTaken =
  session.started_at
    ? Math.floor(
        (
          submittedAt.getTime()
          -
          new Date(
            session.started_at
          ).getTime()
        ) / 1000
      )
    : 0;
    // Prevent duplicate exam attempts

const {
  data: existingAttempt,
  error: existingAttemptError,
} = await supabase
  .from("exam_attempts")
  .select("id")
  .eq("user_id", user.id)
  .eq("exam_id", examId)
  .maybeSingle();

if (existingAttemptError) {

  return NextResponse.json(
    {
      error: existingAttemptError.message,
    },
    {
      status: 500,
    }
  );

}

if (existingAttempt) {

  return NextResponse.json(
    {
      success: true,
      attemptId: existingAttempt.id,
      alreadySubmitted: true,
    },
    {
      status: 200,
    }
  );

}
    // Insert attempt

    const {
      data: attemptData,
      error: attemptError,
    } =  await supabase
      .from("exam_attempts")

      
      .insert({
        exam_id:
          examId,

        user_id:
          user.id,

        score:
          totalScore,

        percentage,

        status:
          "submitted",

       submitted_at:
  submittedAt.toISOString(),

        started_at:
          session.started_at,

        violations:
          session.tab_switch_violations ||
          0,

        correct_count:
          correctCount,

        wrong_count:
          wrongCount,

        accuracy,

        time_taken: timeTaken,

       total_questions:
  totalQuestionsCount
      })
      .select();

    console.log(
      "ATTEMPT DATA:",
      attemptData
    );

    console.log(
      "ATTEMPT ERROR:",
      attemptError
    );
const { error: leaderboardError } = await supabase
  .from("leaderboard")
  .upsert(
    {
      user_id: user.id,
      exam_id: examId,
      score: totalScore,
      correct_answers: correctCount,
      wrong_answers: wrongCount,
      percentile: percentage, // We'll improve this later
      time_taken: timeTaken,
    },
    {
      onConflict: "exam_id,user_id",
    }
  );

if (leaderboardError) {
  console.error("LEADERBOARD ERROR:", leaderboardError);

  return NextResponse.json(
    {
      error: leaderboardError.message,
    },
    {
      status: 500,
    }
  );
}
    if (attemptError) {
  return NextResponse.json(
    {
      error:
        attemptError.message,
      details:
        attemptError,
    },
    {
      status: 500,
    }
  );
}
await updateWeeklyChallenges(
  user.id,
  totalScore,
  percentage
);
const certificateNumber =
  `TCD-${Date.now()}`;
const {
  data: existingCertificate,
} = await supabase

  .from("certificates")

  .select("id")

  .eq("user_id", user.id)

  .eq("exam_id", examId)

  .maybeSingle();

if (!existingCertificate) {

  await supabase

    .from("certificates")

    .insert({

      user_id: user.id,

      exam_id: examId,

      certificate_type: "PARTICIPATION",

      certificate_number: certificateNumber,

      issued_at: new Date().toISOString(),

    });

}

const xpEarned =
  10 +
  Math.floor(
    percentage / 2
  );

// Award XP only for a newly created attempt

if (attemptData?.length) {

  const { error: xpError } =
    await supabase.rpc(
      "add_user_xp",
      {
        p_user_id: user.id,
        p_xp: xpEarned,
      }
    );

  if (xpError) {

    console.error(
      "XP ERROR:",
      xpError
    );

  }

}
await supabase

  .from("exam_sessions")

  .update({

    final_score: totalScore,

  })

  .eq("id", session.id);

// Check whether participation reward already exists

const {
  data: existingReward,
} = await supabase

  .from("tcd_transactions")

  .select("id")

  .eq("user_id", user.id)

  .eq("exam_id", examId)

  .maybeSingle();

let rewardError = null;

if (!existingReward) {

  const rewardResult =
    await supabase.rpc(
      "award_participation_tcd",
      {
        p_user_id: user.id,
        p_exam_id: examId,
      }
    );

  rewardError =
    rewardResult.error;

}

const {
  data: achievementData,
  error: achievementError
} 
= 
await supabase.rpc(
  "update_study_streak",
  {
    p_user_id: user.id,
  }
);

await supabase.rpc(
  "award_exam_achievements",
  {
    p_user_id: user.id,
  }
);

const {
  data: newAchievements,
} = await supabase

  .from("user_achievements")

  .select(`
  id,
  achievements (
    id,
    title,
    reward_tcd,
    rarity
  )
`)

  .eq(
    "user_id",
    user.id
  )

  .eq(
    "seen",
    false
  );
const achievementCount =
  newAchievements?.length || 0;

const achievementReward =
  newAchievements?.reduce(
    (sum: number, item: any) =>
      sum +
      (
        (item.achievements as any)
          ?.reward_tcd || 0
      ),
    0
  ) || 0;

console.log(
  "EXAM ACHIEVEMENTS:",
  achievementCount,
  achievementReward
);
if (newAchievements?.length) {

  for (
    const achievementRecord
    of newAchievements
  ) {

    const achievement =
      achievementRecord
        .achievements as any;

    await supabase

      .from("activity_feed")

      .insert({

        user_id:
          user.id,

        activity_type:
          "achievement",

        title:
          `${user.email?.split("@")[0]} unlocked an achievement`,

        description:
          achievement?.title,

       metadata: {
  achievement_id: achievement?.id,
  reward_tcd: achievement?.reward_tcd,
  rarity: achievement?.rarity,
},

      });
  }
}
if (rewardError) {
  console.error(
    "TCD REWARD ERROR:",
    rewardError
  );
}

    // Complete session

  
    const {
  data: unlockedAchievements,
} = await supabase

  .from("user_achievements")

  .select(`
    id,
    achievement_id,
    achievements (
      title,
      reward_tcd
    )
  `)

  .eq(
    "user_id",
    user.id
  )

  .eq(
    "seen",
    false
  );
console.log(
  "RETURNING ATTEMPT:",
  attemptData?.[0]?.id
);
 return NextResponse.json({
  success: true,

  attemptId:
    attemptData?.[0]?.id,

  score: totalScore,

  maxMarks,

  percentage,

  accuracy,

  correctCount,

  wrongCount,

  submitted: true,

  unlockedAchievements,

   achievementCount,

  achievementReward,
});

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
    import { SCORING } from "@/lib/exam";
import { updateWeeklyChallenges } from "@/lib/challenges/updateWeeklyChallenges";

export async function finalizeExam({
  supabase,
  userId,
  userEmail,
  examId,
  session,
}: {
  supabase: any;
  userId: string;
  userEmail?: string;
  examId: string;
  session: any;
}) {

  // PASTE THE ENTIRE BLOCK HERE


    
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
        userId
      );
    
if (answersError) {
  throw new Error(
    answersError.message
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
      throw new Error(
            "No answers found")
        };

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
  throw new Error
        (allQuestionsError.message,);
};


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
 throw new Error
        ("Failed to load exam questions",)
    
};

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




    // Final session check

   
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
  .eq("user_id", userId)
  .eq("exam_id", examId)
  .maybeSingle();

if (existingAttemptError) {

 throw new Error (existingAttemptError.message,);
   

};



if (existingAttempt) {

  return {
    success: true,

    attemptId:
      existingAttempt.id,

    alreadySubmitted: true,
  };

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
          userId,

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
  session.total_violations || 0,

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

   

const { error: leaderboardError } = await supabase
  .from("leaderboard")
  .upsert(
    {
      user_id: userId,
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

 throw new Error (leaderboardError.message,);
    };
    if (attemptError) {
  throw new Error(
        attemptError.message,);
      
};
await updateWeeklyChallenges(
  userId,
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

  .eq("user_id", userId)

  .eq("exam_id", examId)

  .maybeSingle();

if (!existingCertificate) {

  await supabase

    .from("certificates")

    .insert({

      user_id: userId,

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
        p_user_id: userId,
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
const {
  error: completeSessionError,
} = await supabase
  .from("exam_sessions")
  .update({
    status: "completed",
    submitted_at: submittedAt.toISOString(),
    final_score: totalScore,
  })
  .eq("id", session.id)
  .eq("status", "active");

if (completeSessionError) {
  console.error(
    "SESSION COMPLETION ERROR:",
    completeSessionError
  );
}

// Check whether participation reward already exists

const {
  data: existingReward,
  error: existingRewardError,
} = await supabase
  .from("tcd_transactions")
  .select("id")
  .eq("user_id", userId)
  .eq("exam_id", examId)
  .eq(
    "transaction_type",
    "BONUS"
  )
  .eq(
    "metadata->>reward_type",
    "PARTICIPATION"
  )
  .maybeSingle();

if (existingRewardError) {
  console.error(
    "PARTICIPATION REWARD CHECK ERROR:",
    existingRewardError
  );
}

let rewardError = null;

if (
  !existingReward &&
  !existingRewardError
) {

  const rewardResult =
    await supabase.rpc(
      "award_participation_tcd",
      {
        p_user_id: userId,
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
    p_user_id: userId,
  }
);

const {
  data: achievementAwardData,
  error: achievementAwardError,
} = await supabase.rpc(
  "award_exam_achievements",
  {
    p_user_id: userId,
  }
);

if (achievementAwardError) {
  console.error(
    "AWARD EXAM ACHIEVEMENTS ERROR:",
    achievementAwardError
  );
}

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
    userId
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
          userId,

        activity_type:
          "achievement",

        title:
          `${(userEmail || "Student").split("@")[0]} unlocked an achievement`,

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
    userId
  )

  .eq(
    "seen",
    false
  );

 return {
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
};

}
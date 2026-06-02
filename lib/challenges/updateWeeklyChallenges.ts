import { createClient }
from "@/lib/supabase/server";

export async function
updateWeeklyChallenges(
  userId: string,
  score: number,
  percentage: number
) {

  const supabase =
    await createClient();

  const {
    data: challenges,
  } = await supabase

    .from(
      "user_weekly_challenges"
    )

    .select(`
      *,
      weekly_challenges (
        id,
        title,
        challenge_type,
        target_value,
        reward_tcd
      )
    `)

    .eq(
      "user_id",
      userId
    )

    .eq(
      "completed",
      false
    );

  if (!challenges) return;

  for (const challenge of challenges) {

    let progress =
      challenge.progress || 0;

    const challengeData =
      challenge.weekly_challenges;

    switch (
      challengeData
        ?.challenge_type
    ) {

      case "EXAM_COUNT":

        progress += 1;

        break;

      case "HIGH_SCORE":

        if (
          percentage >= 90
        ) {

          progress += 1;

        }

        break;

      case "TOTAL_MARKS":

        progress += score;

        break;
    }

    const completed =
      progress >=
      challengeData
        ?.target_value;

    await supabase

      .from(
        "user_weekly_challenges"
      )

      .update({

        progress,

        completed,

        completed_at:
          completed
            ? new Date()
                .toISOString()
            : null,

      })

      .eq(
        "id",
        challenge.id
      );
  }
}
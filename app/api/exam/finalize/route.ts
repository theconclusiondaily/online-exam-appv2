import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
export async function POST(req: NextRequest) {

  try {

    const supabase = await createClient();

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
  data: profile,
  error: profileError,
} = await supabase
  .from("users")
  .select("role")
  .eq("id", user.id)
  .single();

if (profileError || !profile) {
  return NextResponse.json(
    { error: "User not found" },
    { status: 404 }
  );
}

if (profile.role !== "admin") {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}
    const {
      examId,
    } = await req.json();

    if (!examId) {

      return NextResponse.json(
        {
          error: "Exam ID is required.",
        },
        {
          status: 400,
        }
      );

    }

    // ==========================================
    // Load Exam
    // ==========================================

    const {
      data: exam,
      error: examError,
    } = await supabase

      .from("exams")

      .select(`
  id,
  end_time,
  results_finalized,
  cancelled,
  status
`)

      .eq("id", examId)

      .single();

    if (examError || !exam) {

      return NextResponse.json(
        {
          error: "Exam not found.",
        },
        {
          status: 404,
        }
      );

    }
    if (exam.cancelled) {

  return NextResponse.json(
    {
      error: "Cancelled exams cannot be finalized.",
    },
    {
      status: 400,
    }
  );

}

if (exam.status !== "completed") {

  return NextResponse.json(
    {
      error: "Only completed exams can be finalized.",
    },
    {
      status: 400,
    }
  );

}

    // ==========================================
    // Exam still running?
    // ==========================================

    if (
      new Date(exam.end_time) > new Date()
    ) {

      return NextResponse.json(
        {
          error: "Exam has not ended yet.",
        },
        {
          status: 403,
        }
      );

    }

    // ==========================================
    // Already finalized?
    // ==========================================

    if (exam.results_finalized) {

      return NextResponse.json(
        {
          error:
            "Results already finalized.",
        },
        {
          status: 409,
        }
      );

    }

  const { data: winners, error: winnersError } =
  await supabase
    .from("leaderboard")
    .select(`
      user_id,
      score,
      time_taken
    `)
    .eq("exam_id", examId)
    .order("score", {
      ascending: false,
    })
    .order("time_taken", {
      ascending: true,
    })
    .limit(3);

if (winnersError) {

  return NextResponse.json(
    {
      error: winnersError.message,
    },
    {
      status: 500,
    }
  );

}
if (!winners || winners.length === 0) {

  return NextResponse.json(
    {
      error: "No leaderboard found.",
    },
    {
      status: 400,
    }
  );

}
const {
  data: prizeData,
  error: prizeError,
} = await supabase

  .from("exams")

  .select(`
    rank_1_amount,
    rank_2_amount,
    rank_3_amount
  `)

  .eq("id", examId)

  .single();

if (prizeError || !prizeData) {

  return NextResponse.json(
    {
      error:
        "Prize structure not found.",
    },
    {
      status: 500,
    }
  );

}

const prizes = [

  prizeData.rank_1_amount,

  prizeData.rank_2_amount,

  prizeData.rank_3_amount,

];

for (
  let i = 0;
  i < winners.length;
  i++
) {

  const winner =
    winners[i];

  const amount =
    prizes[i];

  if (
    !amount ||
    Number(amount) <= 0
  ) {

    continue;

  }
const {
  data: existingPrize,
  error: existingPrizeError,
} = await supabase
  .from("tcd_transactions")
  .select("id")
  .eq("user_id", winner.user_id)
  .eq("exam_id", examId)
  .eq("transaction_type", "PRIZE")
  .maybeSingle();

if (existingPrizeError) {

  return NextResponse.json(
    {
      error: existingPrizeError.message,
    },
    {
      status: 500,
    }
  );

}

if (existingPrize) {

  continue;

}
  const {
    error: prizeError,
  } = await supabase.rpc(
    "distribute_prize",
    {
      p_user_id:
        winner.user_id,

      p_exam_id:
        examId,

      p_amount:
        Number(amount),

      p_reference_number:
        `PRIZE-${examId}-RANK-${i + 1}`,
    }
  );

  if (prizeError) {

    return NextResponse.json(
      {
        error:
          prizeError.message,
      },
      {
        status: 500,
      }
    );

  }

}
const {
  data: attempts,
  error: attemptsError,
} = await supabase
  .from("exam_attempts")
  .select(`
    user_id,
    score,
    percentage
  `)
  .eq("exam_id", examId);

if (attemptsError) {

  return NextResponse.json(
    {
      error: attemptsError.message,
    },
    {
      status: 500,
    }
  );

}
if (!attempts || attempts.length === 0) {

  return NextResponse.json(
    {
      error: "No exam attempts found.",
    },
    {
      status: 400,
    }
  );

}
for (const attempt of attempts) {

  const {
    data: existingCertificate,
    error: existingCertificateError,
  } = await supabase
    .from("certificates")
    .select("id")
    .eq("user_id", attempt.user_id)
    .eq("exam_id", examId)
    .maybeSingle();

  if (existingCertificateError) {

    return NextResponse.json(
      {
        error: existingCertificateError.message,
      },
      {
        status: 500,
      }
    );

  }

  if (existingCertificate) {

    continue;

  }

  const certificateNumber =
    `TCD-${Date.now()}-${attempt.user_id.slice(0, 8)}`;

  const verificationCode =
    crypto.randomUUID().replace(/-/g, "").toUpperCase();

  const { error: certificateError } = await supabase
  .from("certificates")
  .insert({
    user_id: attempt.user_id,
    exam_id: examId,
    certificate_type: "PARTICIPATION",
    certificate_number: certificateNumber,
    verification_code: verificationCode,
    score: attempt.score,
    percentage: attempt.percentage,
    issued_at: new Date().toISOString(),
  });

if (certificateError) {
  return NextResponse.json(
    {
      error: certificateError.message,
    },
    {
      status: 500,
    }
  );
}

}


for (const attempt of attempts) {

  const { error } = await supabase.rpc(
    "award_participation_tcd",
    {
      p_user_id: attempt.user_id,
      p_exam_id: examId,
    }
  );

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

}

    const {
      error: updateError,
    } = await supabase

      .from("exams")

      .update({

        results_finalized: true,

      })

      .eq(
        "id",
        examId
      );

    if (updateError) {

      return NextResponse.json(
        {
          error:
            updateError.message,
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json({

  success: true,

  examId,

  winnersPaid: winners.length,

  certificatesGenerated: attempts.length,

  participationRewards: attempts.length,

  resultsFinalized: true,

});

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}

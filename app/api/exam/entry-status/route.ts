import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createClient,
} from "@/lib/supabase/server";

export async function POST(
  req: NextRequest
) {
  try {
    const supabase =
      await createClient();

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
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { examId } =
      await req.json();

    if (!examId) {
      return NextResponse.json(
        {
          error:
            "Exam ID required",
        },
        { status: 400 }
      );
    }

    const {
      data: exam,
      error: examError,
    } = await supabase
      .from("exams")
      .select(`
        id,
        title,
        entry_fee,
        published,
        cancelled
      `)
      .eq("id", examId)
      .maybeSingle();

    if (
      examError ||
      !exam
    ) {
      return NextResponse.json(
        {
          error:
            "Exam not found",
        },
        { status: 404 }
      );
    }

    if (exam.cancelled) {
      return NextResponse.json(
        {
          error:
            "This exam has been cancelled",
        },
        { status: 400 }
      );
    }

    if (!exam.published) {
      return NextResponse.json(
        {
          error:
            "This exam is not available",
        },
        { status: 400 }
      );
    }

    const {
      data: wallet,
      error: walletError,
    } = await supabase
      .from("tcd_wallets")
      .select(`
        available_balance,
        bonus_balance
      `)
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();

    if (
      Number(
        exam.entry_fee ?? 0
      ) <= 0
    ) {
      return NextResponse.json({
        success: true,
        exam,
        paymentRequired: false,
        alreadyPaid: false,
        wallet: wallet ?? null,
      });
    }

    const referenceNumber =
      `ENTRY-FEE-${exam.id}-${user.id}`;

    const {
      data: payment,
      error: paymentError,
    } = await supabase
      .from("tcd_transactions")
      .select(`
        id,
        amount,
        transaction_status
      `)
      .eq(
        "reference_number",
        referenceNumber
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

    if (paymentError) {
      console.error(
        "ENTRY STATUS PAYMENT ERROR:",
        paymentError
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify entry payment",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,

      exam,

      alreadyPaid:
        Boolean(payment),

      paymentRequired:
        !payment,

      wallet:
        walletError
          ? null
          : wallet,
    });

  } catch (error) {
    console.error(
      "ENTRY STATUS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}
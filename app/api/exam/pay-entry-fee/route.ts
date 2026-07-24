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
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

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

    // Secure RPC uses auth.uid()
    // internally.
    const {
      data: transaction,
      error: paymentError,
    } =
      await supabase.rpc(
        "pay_exam_entry_fee",
        {
          p_exam_id:
            examId,
        }
      );

    if (paymentError) {
      console.error(
        "ENTRY FEE PAYMENT ERROR:",
        paymentError
      );

      const message =
        paymentError.message || "";

      if (
        message.includes(
          "INSUFFICIENT_FUNDS"
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Insufficient wallet balance",
          },
          {
            status: 400,
          }
        );
      }

      if (
        message.includes(
          "EXAM_CANCELLED"
        )
      ) {
        return NextResponse.json(
          {
            error:
              "This exam has been cancelled",
          },
          {
            status: 400,
          }
        );
      }

      if (
        message.includes(
          "EXAM_NOT_PUBLISHED"
        )
      ) {
        return NextResponse.json(
          {
            error:
              "This exam is not available",
          },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json(
        {
          error:
            "Unable to process entry fee",
          details:
            paymentError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!transaction) {
      return NextResponse.json(
        {
          error:
            "Payment transaction not found",
        },
        {
          status: 500,
        }
      );
    }

    // Calculate the exact payment
    // composition from the ledger.
    const amount =
      Number(
        transaction.amount ?? 0
      );

    const bonusBefore =
      Number(
        transaction
          .bonus_balance_before ??
          0
      );

    const bonusAfter =
      Number(
        transaction
          .bonus_balance_after ??
          0
      );

    const bonusUsed =
      Math.max(
        bonusBefore -
          bonusAfter,
        0
      );

    const cashUsed =
      Math.max(
        amount -
          bonusUsed,
        0
      );

    return NextResponse.json({
      success: true,

      payment: {
        transactionId:
          transaction.id,

        amount,

        bonusUsed,

        cashUsed,

        balanceBefore:
          Number(
            transaction
              .balance_before ??
              0
          ),

        balanceAfter:
          Number(
            transaction
              .balance_after ??
              0
          ),

        referenceNumber:
          transaction
            .reference_number,
      },
    });

  } catch (error) {
    console.error(
      "PAY ENTRY FEE API ERROR:",
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
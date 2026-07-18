import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { razorpay } from "@/lib/razorpay/server";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest
) {
  try {
    const supabase =
      await createClient();

    // ==========================================
    // Authenticate user
    // ==========================================

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

    // ==========================================
    // Read request
    // ==========================================

    const body =
      await request.json();

    const amount =
      Number(body.amount);

    // amount is received in PAISE
    if (
      !Number.isSafeInteger(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment amount.",
        },
        {
          status: 400,
        }
      );
    }

    // Minimum add money: ₹1
    if (amount < 100) {
      return NextResponse.json(
        {
          error:
            "Minimum amount is ₹1.",
        },
        {
          status: 400,
        }
      );
    }

    // Temporary safety ceiling: ₹1,00,000
    if (amount > 10_000_000) {
      return NextResponse.json(
        {
          error:
            "Maximum amount is ₹1,00,000.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Create internal TCD payment order first
    // ==========================================

    const receipt =
      `TCD-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

    const {
  data: paymentOrder,
  error: paymentOrderError,
} = await supabaseAdmin
  .from("payment_orders")
      .insert({
        user_id: user.id,

        gateway:
          "RAZORPAY",

        amount,

        currency:
          "INR",

        receipt,

        status:
          "CREATED",

        notes: {
          source:
            "TCD_ADD_MONEY",
        },
      })
      .select(
        `
          id,
          amount,
          currency,
          receipt
        `
      )
      .single();

    if (
      paymentOrderError ||
      !paymentOrder
    ) {
      console.error(
        "PAYMENT ORDER DB ERROR:",
        paymentOrderError
      );

      return NextResponse.json(
        {
          error:
            "Unable to create payment order.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // Create real Razorpay order
    // ==========================================

    let razorpayOrder;

    try {
      razorpayOrder =
        await razorpay.orders.create({
          amount:
            paymentOrder.amount,

          currency:
            paymentOrder.currency,

          receipt:
            paymentOrder.receipt,

          notes: {
            payment_order_id:
              paymentOrder.id,

            user_id:
              user.id,
          },
        });
    } catch (razorpayError) {
      console.error(
        "RAZORPAY ORDER ERROR:",
        razorpayError
      );

      await supabaseAdmin
  .from("payment_orders")
        .update({
          status:
            "FAILED",

          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          paymentOrder.id
        );

      return NextResponse.json(
        {
          error:
            "Unable to create Razorpay order.",
        },
        {
          status: 502,
        }
      );
    }

    // ==========================================
    // Save Razorpay order ID
    // ==========================================

    const {
  error: updateError,
} = await supabaseAdmin
  .from("payment_orders")
      .update({
        gateway_order_id:
          razorpayOrder.id,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        paymentOrder.id
      );

    if (updateError) {
      console.error(
        "RAZORPAY ORDER SAVE ERROR:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Payment order synchronization failed.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // Return safe checkout data
    // ==========================================

    return NextResponse.json({
      success: true,

      paymentOrderId:
        paymentOrder.id,

      razorpayOrderId:
        razorpayOrder.id,

      amount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      keyId:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(
      "CREATE PAYMENT ORDER ERROR:",
      error
    );

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
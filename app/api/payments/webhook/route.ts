import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest
) {
  try {
    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error(
        "RAZORPAY_WEBHOOK_SECRET is missing"
      );

      return NextResponse.json(
        { error: "Webhook configuration error" },
        { status: 500 }
      );
    }

    // IMPORTANT:
    // Verify against the exact raw request body.
    const rawBody =
      await request.text();

    const receivedSignature =
      request.headers.get(
        "x-razorpay-signature"
      );

    if (!receivedSignature) {
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 400 }
      );
    }

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          webhookSecret
        )
        .update(rawBody)
        .digest("hex");

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        receivedSignature,
        "utf8"
      );

    const signatureValid =
      expectedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!signatureValid) {
      console.error(
        "INVALID RAZORPAY WEBHOOK SIGNATURE"
      );

      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event =
      JSON.parse(rawBody);

    // We only need successful captured payments
    // for wallet recovery.
    if (
      event.event !==
      "payment.captured"
    ) {
      return NextResponse.json({
        received: true,
      });
    }

    const payment =
      event.payload?.payment?.entity;

    if (
      !payment?.id ||
      !payment?.order_id
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment payload",
        },
        {
          status: 400,
        }
      );
    }

    // Find the TCD payment order using
    // Razorpay's order ID.
    const {
      data: paymentOrder,
      error: orderError,
    } =
      await supabaseAdmin
        .from("payment_orders")
        .select(`
          id,
          user_id,
          gateway_order_id,
          amount,
          currency,
          status
        `)
        .eq(
          "gateway_order_id",
          payment.order_id
        )
        .maybeSingle();

    if (
      orderError ||
      !paymentOrder
    ) {
      console.error(
        "WEBHOOK PAYMENT ORDER NOT FOUND:",
        payment.order_id,
        orderError
      );

      // Return 500 so Razorpay can retry.
      return NextResponse.json(
        {
          error:
            "Payment order not found",
        },
        {
          status: 500,
        }
      );
    }

    // Validate payment details before crediting.
    if (
      Number(payment.amount) !==
      Number(paymentOrder.amount)
    ) {
      console.error(
        "WEBHOOK AMOUNT MISMATCH"
      );

      return NextResponse.json(
        {
          error:
            "Payment amount mismatch",
        },
        {
          status: 400,
        }
      );
    }

    if (
      payment.currency !==
      paymentOrder.currency
    ) {
      console.error(
        "WEBHOOK CURRENCY MISMATCH"
      );

      return NextResponse.json(
        {
          error:
            "Payment currency mismatch",
        },
        {
          status: 400,
        }
      );
    }

    // Atomic and idempotent database finalization.
    const {
      error: finalizeError,
    } =
      await supabaseAdmin.rpc(
        "finalize_razorpay_payment",
        {
          p_payment_order_id:
            paymentOrder.id,

          p_gateway_payment_id:
            payment.id,
        }
      );

    if (finalizeError) {
      console.error(
        "WEBHOOK FINALIZATION ERROR:",
        finalizeError
      );

      return NextResponse.json(
        {
          error:
            "Payment finalization failed",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "RAZORPAY WEBHOOK ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}
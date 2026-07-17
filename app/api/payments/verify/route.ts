import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { razorpay } from "@/lib/razorpay/server";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest
) {
  try {
    // ==========================================
    // Authenticate logged-in TCD user
    // ==========================================

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

    // ==========================================
    // Read Razorpay checkout response
    // ==========================================

    const body =
      await request.json();

    const paymentOrderId =
      String(
        body.paymentOrderId ?? ""
      );

    const razorpayOrderId =
      String(
        body.razorpayOrderId ?? ""
      );

    const razorpayPaymentId =
      String(
        body.razorpayPaymentId ?? ""
      );

    const razorpaySignature =
      String(
        body.razorpaySignature ?? ""
      );

    if (
      !paymentOrderId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        {
          error:
            "Missing payment verification data.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Load internal payment order
    // ==========================================

    const {
      data: paymentOrder,
      error: paymentOrderError,
    } =
      await supabaseAdmin
        .from("payment_orders")
        .select(`
          id,
          user_id,
          gateway_order_id,
          gateway_payment_id,
          amount,
          currency,
          status
        `)
        .eq(
          "id",
          paymentOrderId
        )
        .maybeSingle();

    if (
      paymentOrderError ||
      !paymentOrder
    ) {
      return NextResponse.json(
        {
          error:
            "Payment order not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================================
    // Ownership check
    // ==========================================

    if (
      paymentOrder.user_id !==
      user.id
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    // ==========================================
    // Razorpay order ID must match our DB
    // ==========================================

    if (
      paymentOrder.gateway_order_id !==
      razorpayOrderId
    ) {
      return NextResponse.json(
        {
          error:
            "Payment order mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Verify Razorpay HMAC signature
    // ==========================================

    const secret =
      process.env
        .RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error(
        "RAZORPAY_KEY_SECRET is missing"
      );

      return NextResponse.json(
        {
          error:
            "Payment verification configuration error.",
        },
        {
          status: 500,
        }
      );
    }

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(
          `${razorpayOrderId}|${razorpayPaymentId}`
        )
        .digest("hex");

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    const receivedBuffer =
      Buffer.from(
        razorpaySignature,
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
        "INVALID RAZORPAY SIGNATURE",
        {
          paymentOrderId,
          razorpayOrderId,
          razorpayPaymentId,
        }
      );

      return NextResponse.json(
        {
          error:
            "Invalid payment signature.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Fetch payment directly from Razorpay
    // ==========================================

    const razorpayPayment =
      await razorpay.payments.fetch(
        razorpayPaymentId
      );

    // ==========================================
    // Verify Razorpay payment belongs to order
    // ==========================================

    if (
      razorpayPayment.order_id !==
      razorpayOrderId
    ) {
      return NextResponse.json(
        {
          error:
            "Razorpay payment order mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Verify amount and currency
    // ==========================================

    if (
      Number(
        razorpayPayment.amount
      ) !==
      Number(
        paymentOrder.amount
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Payment amount mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      razorpayPayment.currency !==
      paymentOrder.currency
    ) {
      return NextResponse.json(
        {
          error:
            "Payment currency mismatch.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // Accept only captured payments
    // ==========================================

    if (
      razorpayPayment.status !==
      "captured"
    ) {
      return NextResponse.json(
        {
          error:
            "Payment has not been captured.",
        },
        {
          status: 409,
        }
      );
    }

    // ==========================================
    // Atomically finalize and credit wallet
    // ==========================================

    const {
      data: transaction,
      error: finalizeError,
    } =
      await supabaseAdmin.rpc(
        "finalize_razorpay_payment",
        {
          p_payment_order_id:
            paymentOrderId,

          p_gateway_payment_id:
            razorpayPaymentId,
        }
      );

    if (finalizeError) {
      console.error(
        "PAYMENT FINALIZATION ERROR:",
        finalizeError
      );

      return NextResponse.json(
        {
          error:
            "Payment was verified but wallet credit could not be completed.",
        },
        {
          status: 500,
        }
      );
    }

    // ==========================================
    // Success
    // ==========================================

    return NextResponse.json({
      success: true,

      paymentOrderId,

      razorpayPaymentId,

      amount:
        paymentOrder.amount,

      transaction,
    });
  } catch (error) {
    console.error(
      "PAYMENT VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to verify payment.",
      },
      {
        status: 500,
      }
    );
  }
}
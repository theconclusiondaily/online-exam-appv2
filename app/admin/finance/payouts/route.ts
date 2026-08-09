import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error:
        "RazorpayX Payouts is not enabled for this TCD account. Live Razorpay payouts are currently unavailable.",
    },
    {
      status: 503,
    }
  );
}
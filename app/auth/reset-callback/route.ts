import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } =
    new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?reset=invalid`
    );
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(
      code
    );

  if (error) {
    console.error(
      "PASSWORD RESET CODE EXCHANGE FAILED:",
      error
    );

    return NextResponse.redirect(
      `${origin}/login?reset=invalid`
    );
  }

  return NextResponse.redirect(
    `${origin}/reset-password`
  );
}
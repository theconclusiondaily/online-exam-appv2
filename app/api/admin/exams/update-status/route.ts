import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const {
    data: profile,
  } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const now = new Date().toISOString();

  // Scheduled -> Live

  await supabase
    .from("exams")
    .update({
      status: "live",
    })
    .eq("published", true)
    .eq("cancelled", false)
    .eq("status", "scheduled")
    .lte("start_time", now)
    .gte("end_time", now);

  // Live -> Completed

  await supabase
    .from("exams")
    .update({
      status: "completed",
    })
    .eq("published", true)
    .eq("cancelled", false)
    .eq("status", "live")
    .lt("end_time", now);

  return NextResponse.json({
    success: true,
  });
}
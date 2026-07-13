import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
// LOAD USER PROFILE

const {
  data: profileData,
} = await supabase

  .from("users")

  .select(`
    institute_id
  `)

  .eq(
    "id",
    user.id
  )

  .single();

if (!profileData?.institute_id) {

  return NextResponse.json(
    {
      error:
        "No institute assigned",
    },
    {
      status: 403,
    }
  );
}
    const body = await req.json();

    const {
      examId,
      sessionToken,

      fullscreenViolations,
      tabSwitchViolations,

      cameraEnabled,
      internetStatus,
    } = body;
const {
  data: exam,
  error: examError,
} = await supabase

  .from("exams")

  .select(`
  id,
  duration,
  published,
  start_time,
  end_time,
  institute_id,
  exam_scope,
  entry_fee
`)

  .eq(
    "id",
    examId
  )

  .single();
if (examError || !exam) {

  return NextResponse.json(
    {
      error: "Exam not found",
    },
    {
      status: 404,
    }
  );

}

if (exam.exam_scope !== "PUBLIC") {

  if (
    exam.institute_id !==
    profileData.institute_id
  ) {

    return NextResponse.json(
      {
        error: "Unauthorized institute access",
      },
      {
        status: 403,
      }
    );

  }

}
    // Validate session
    const { data: session } = await supabase
      .from("exam_sessions")
      .select("*")
      .eq("exam_id", examId)
      .eq("user_id", user.id)
      .eq("session_token", sessionToken)
      .eq("status", "active")
      .maybeSingle();

    if (!session) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 403 }
      );
    }

    // Expiry check
   if (
  new Date(session.expires_at) < new Date()
) {

  // Mark session expired
  await supabase
    .from("exam_sessions")
    .update({
      status: "expired",
    })
    .eq("id", session.id);

  return NextResponse.json(
    { error: "Session expired" },
    { status: 403 }
  );
}

    // Update heartbeat
    const { error } = await supabase
      .from("exam_sessions")
      .update({
        last_heartbeat:
          new Date().toISOString(),

        fullscreen_violations:
          fullscreenViolations,

        tab_switch_violations:
          tabSwitchViolations,

        camera_enabled:
          cameraEnabled,

        internet_status:
          internetStatus,
      })
      .eq("id", session.id);
await supabase

  .from("exam_live_status")

  .upsert(
    {

      exam_id:
        examId,

      user_id:
        user.id,

      student_name:
        user.email,

      current_question:
        0,

      violations:
        (
          fullscreenViolations || 0
        ) +
        (
          tabSwitchViolations || 0
        ),

      fullscreen:
        fullscreenViolations > 0,

      camera_enabled:
        cameraEnabled,

      mic_enabled:
        true,

      submitted:
        false,

      updated_at:
        new Date()
          .toISOString(),

    },

    {
      onConflict:
        "exam_id,user_id",
    }
  );
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
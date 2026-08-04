import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { finalizeExam } from "@/lib/exam/finalizeExam";

export async function GET() {

  try {

    const supabase =
      await createClient();

    const now =
      new Date().toISOString();

    // Find expired active sessions
    const {
      data: sessions,
      error,
    } = await supabase

      .from("exam_sessions")

      .select("*")

      .eq("status", "active")

      .lt("expires_at", now);

    if (error) {

      throw error;

    }

    if (!sessions?.length) {

      return NextResponse.json({
        success: true,
        recovered: 0,
      });

    }

    let recovered = 0;

    for (const session of sessions) {

      try {

        await finalizeExam({
  supabase,
  userId: session.user_id,
  examId: session.exam_id,
  session,
});

recovered++;

      } catch (err) {

        console.error(
          "Recovery failed:",
          session.id,
          err
        );

      }

    }

    return NextResponse.json({

      success: true,

      recovered,

    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error:
          "Recovery failed",
      },
      {
        status: 500,
      }
    );

  }

}


import { supabase }
from "@/lib/supabase/client";

export async function
updateLiveStatus({

  exam_id,

  user_id,

  student_name,

  current_question,

  violations,

  fullscreen,

  camera_enabled,

  mic_enabled,

  submitted,

}: any) {

  return await supabase

    .from(
      "exam_live_status"
    )

    .upsert({

      exam_id,

      user_id,

      student_name,

      current_question,

      violations,

      fullscreen,

      camera_enabled,

      mic_enabled,

      submitted,

      updated_at:
        new Date(),

    }, {
      onConflict:
        "exam_id,user_id"
    });
}

export async function
sendStudentWarning({

  exam_id,

  user_id,

  message,

}: any) {

  return await supabase

    .from(
      "exam_live_status"
    )

    .update({

      warning_message:
        message,

    })

    .eq(
      "exam_id",
      exam_id
    )

    .eq(
      "user_id",
      user_id
    );
}

export async function
forceSubmitStudent({

  exam_id,

  user_id,

}: any) {

  return await supabase

    .from(
      "exam_live_status"
    )

    .update({

      force_submit:
        true,

    })

    .eq(
      "exam_id",
      exam_id
    )

    .eq(
      "user_id",
      user_id
    );
}

export async function
removeStudent({

  exam_id,

  user_id,

}: any) {

  return await supabase

    .from(
      "exam_live_status"
    )

    .update({

      removed: true,

    })

    .eq(
      "exam_id",
      exam_id
    )

    .eq(
      "user_id",
      user_id
    );
}

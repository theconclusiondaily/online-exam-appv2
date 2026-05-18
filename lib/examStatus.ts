import { supabase }
from "@/lib/supabase/client";

export async function
updateExamStatuses() {

  const now =
    new Date()
      .toISOString();

  // LIVE EXAMS

  await supabase

    .from("exams")

    .update({
      status: "live",
    })

    .eq(
      "published",
      true
    )

    .lte(
      "start_time",
      now
    )

    .gte(
      "end_time",
      now
    );

  // COMPLETED EXAMS

  await supabase

    .from("exams")

    .update({
      status:
        "completed",
    })

    .lt(
      "end_time",
      now
    );
}

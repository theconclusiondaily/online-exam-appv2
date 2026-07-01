import { supabase } from "@/lib/supabase/client";
import { EXAM_STATUS } from "./examStatus";

export async function unpublishExam(id: string) {

  const { error } = await supabase
    .from("exams")
    .update({
      published: false,
      status: EXAM_STATUS.DRAFT,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
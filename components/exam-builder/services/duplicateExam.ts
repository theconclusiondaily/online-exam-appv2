import { supabase } from "@/lib/supabase/client";
import { getExam } from "./getExam";
import { EXAM_STATUS } from "@/components/exam-builder/services/examStatus";
export async function duplicateExam(id: string) {

  const exam = await getExam(id);

  delete (exam as any).id;
  delete (exam as any).created_at;
  delete (exam as any).updated_at;

  exam.title = `${exam.title} (Copy)`;
  exam.published = false;
  exam.status = EXAM_STATUS.DRAFT;

  const { data, error } = await supabase
    .from("exams")
    .insert(exam)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
import { supabase } from "@/lib/supabase/client";

export async function deleteQuestions(ids: string[]) {
  const { error } = await supabase
    .from("questions")
    .delete()
    .in("id", ids);

  if (error) throw error;
}
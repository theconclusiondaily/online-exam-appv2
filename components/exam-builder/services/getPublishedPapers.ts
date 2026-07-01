import { supabase } from "@/lib/supabase/client";

export async function getPublishedPapers() {

  const { data, error } = await supabase
    .from("question_papers")
    .select("*")
    .eq("status", "Published")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}
import { supabase } from "@/lib/supabase/client";

export async function bulkDelete(ids: string[]) {
  const { error } = await supabase
    .from("questions")
    .delete()
    .in("id", ids);

  if (error) throw error;
}

export async function bulkPublish(ids: string[]) {
  const { error } = await supabase
    .from("questions")
    .update({
      status: "Published",
    })
    .in("id", ids);

  if (error) throw error;
}

export async function bulkArchive(ids: string[]) {
  const { error } = await supabase
    .from("questions")
    .update({
      status: "Archived",
    })
    .in("id", ids);

  if (error) throw error;
}
import { supabase } from "@/lib/supabase/client";
import { EXAM_STATUS } from "../services/examStatus";

export const examRepository = {

  async getAll() {
    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(exam: any) {
    const { data, error } = await supabase
      .from("exams")
      .insert(exam)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, exam: any) {
    const { data, error } = await supabase
      .from("exams")
      .update(exam)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

 async publish(id: string) {

  const { data, error } = await supabase
    .from("exams")
    .update({
      published: true,
      cancelled: false,
      status: "Published",
    })
    .eq("id", id)
    .select();

  console.log("Publish Result:", data);
  console.log("Publish Error:", error);

  if (error) throw error;

  return data;
},

  async cancel(id: string) {
    const { error } = await supabase
      .from("exams")
      .update({
        cancelled: true,
        status: EXAM_STATUS.CANCELLED,
      })
      .eq("id", id);

    if (error) throw error;
  },

  async archive(id: string) {
    const { error } = await supabase
      .from("exams")
      .update({
        status: EXAM_STATUS.ARCHIVED,
      })
      .eq("id", id);

    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
async getPublished() {

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("published", true)
    .order("start_time", {
      ascending: true,
    });

  if (error) throw error;

  return data ?? [];

},
async getDrafts() {

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("published", false)
    .eq("cancelled", false)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];

},
async getCancelled() {

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("cancelled", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];

},
async getByPaper(paperId: string) {

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("paper_id", paperId);

  if (error) throw error;

  return data ?? [];

},
async exists(id: string) {

  const { count, error } = await supabase
    .from("exams")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("id", id);

  if (error) throw error;

  return (count ?? 0) > 0;

},
async setStatus(
  id: string,
  status: string
) {

  const { error } = await supabase
    .from("exams")
    .update({
      status,
    })
    .eq("id", id);

  if (error) throw error;

},

};

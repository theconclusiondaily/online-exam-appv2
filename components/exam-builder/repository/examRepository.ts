import { supabase } from "@/lib/supabase/client";
import { EXAM_STATUS } from "../services/examStatus";
import { getExamStatus } from "@/lib/examLifecycle";
import {
  canPublish,
  canCancel,
  canDelete,
  canCancelPaidExam,
} from "@/lib/examRules";
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

  const payload = {

    ...exam,

    start_time: exam.start_time
      ? new Date(exam.start_time).toISOString()
      : null,

    end_time: exam.end_time
      ? new Date(exam.end_time).toISOString()
      : null,

  };

  const { data, error } = await supabase
    .from("exams")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;

},

  async update(
  id: string,
  exam: any
) {

  const payload = {

    ...exam,

    start_time: exam.start_time
      ? new Date(exam.start_time).toISOString()
      : null,

    end_time: exam.end_time
      ? new Date(exam.end_time).toISOString()
      : null,

  };

  const { data, error } = await supabase
    .from("exams")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;

},

async publish(id: string) {

  // Keep your existing validation

  const {
    data: exam,
    error: loadError,
  } = await supabase
    .from("exams")
    .select(`
      start_time,
      end_time,
      cancelled,
      results_finalized
    `)
    .eq("id", id)
    .single();

  if (loadError) {
    throw loadError;
  }

  const check = canPublish(exam);

  if (!check.allowed) {
    throw new Error(check.message);
  }

  // Publish using PostgreSQL function

  const { error } = await supabase.rpc(
    "publish_exam",
    {
      p_exam_id: id,
    }
  );

  if (error) {
    throw error;
  }

  // Return updated exam

  const {
    data,
    error: fetchError,
  } = await supabase
    .from("exams")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  return data;

},

  async cancel(id: string) {
const {
  data: exam,
  error: loadError,
} = await supabase
  .from("exams")
  .select(`
results_finalized,
cancelled,
entry_fee
`)
  .eq("id", id)
  .single();

if (loadError) {
  throw loadError;
}
const check = canCancel(exam);

if (!check.allowed) {
  throw new Error(check.message);
}
const {
  count,
  error: attemptError,
} = await supabase
  .from("exam_attempts")
  .select("*", {
    head: true,
    count: "exact",
  })
  .eq("exam_id", id);

if (attemptError) {
  throw attemptError;
}
const financeCheck = canCancelPaidExam(
  exam.entry_fee ?? 0,
  count ?? 0
);

if (!financeCheck.allowed) {
  throw new Error(financeCheck.message);
}
  const { data, error } = await supabase
    .from("exams")
    
    .update({
      published: false,
      cancelled: true,
      status: EXAM_STATUS.CANCELLED,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;

},

  

  async delete(id: string) {

  // -----------------------------------
  // Prevent deleting exams with attempts
  // -----------------------------------

  const {
    count: attemptCount,
    error: attemptError,
  } = await supabase
    .from("exam_attempts")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("exam_id", id);

  if (attemptError) {
    throw attemptError;
  }
const check = canDelete(
  attemptCount ?? 0
);

if (!check.allowed) {
  throw new Error(check.message);
}

  // -----------------------------------
  // Delete Exam
  // -----------------------------------

  const { error } = await supabase
    .from("exams")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

},
async getPublished() {

  const { data, error } =
    await supabase
      .from("exams")
      .select("*")
      .eq("published", true)
      .eq("cancelled", false)
      .in("status", [
        EXAM_STATUS.SCHEDULED,
        EXAM_STATUS.LIVE,
      ])
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

import { supabase } from "@/lib/supabase/client";

export async function importQuestions(
  rows: any[]
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    throw new Error("User not found.");

  // Get current user's profile
  const { data: profile, error: profileError } =
    await supabase
      .from("users")
      .select("id,institute_id")
      .eq("email", user.email)
      .single();

  if (profileError || !profile) {
    throw new Error("Profile not found.");
  }

  // Batch ID
  const uploadBatch =
    `IMPORT_${Date.now()}`;

  const questions = rows.map((row) => ({
    // ----------------------------
    // Metadata
    // ----------------------------

    created_by: profile.id,

    institute_id:
      profile.institute_id,

    upload_batch:
      uploadBatch,

    created_at:
      new Date().toISOString(),

    updated_at:
      new Date().toISOString(),

    // ----------------------------
    // Academic
    // ----------------------------

    subject:
      row["Subject"],

    chapter:
      row["Chapter"],

    topic:
      row["Topic"],

    difficulty:
      row["Difficulty"],

    language:
      row["Language"],

    question_type:
      row["Question Type"],

    source:
      row["Source"],

    year:
      row["Year"]
        ? Number(row["Year"])
        : null,

    exam_name:
      row["Exam Name"],

    status:
      row["Status"] || "Draft",

    // ----------------------------
    // Marks
    // ----------------------------

    marks:
      Number(
        row["Marks"] || 4
      ),

    negative_marks:
      Number(
        row["Negative Marks"] || 1
      ),

    // ----------------------------
    // Question
    // ----------------------------

    question:
      row["Question (English)"],

    question_text_hi:
      row["Question (Hindi)"],

    option_a:
      row["Option A"],

    option_a_hi:
      row["Option A Hindi"],

    option_b:
      row["Option B"],

    option_b_hi:
      row["Option B Hindi"],

    option_c:
      row["Option C"],

    option_c_hi:
      row["Option C Hindi"],

    option_d:
      row["Option D"],

    option_d_hi:
      row["Option D Hindi"],

    correct_answer:
      row["Correct Answer"],

    explanation:
      row["Explanation"],

    explanation_hi:
      row["Explanation Hindi"],

    // ----------------------------
    // Arrays
    // ----------------------------

    tags:
      row["Tags"]
        ? String(row["Tags"])
            .split(",")
            .map((tag: string) =>
              tag.trim()
            )
        : [],

    images: [],
  }));

  const { error } =
    await supabase
      .from("questions")
      .insert(questions);

  if (error) throw error;

  return questions.length;
}
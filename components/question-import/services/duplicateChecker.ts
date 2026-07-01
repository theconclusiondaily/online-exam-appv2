import { supabase } from "@/lib/supabase/client";

export interface DuplicateResult {
  row: number;
  duplicateInExcel: boolean;
  duplicateInDatabase: boolean;
}

export async function checkDuplicates(rows: any[]) {
  const results: DuplicateResult[] = [];

  const seen = new Set<string>();

  const questions = rows.map(
    (r) =>
      String(
        r["Question (English)"] || ""
      )
        .trim()
        .toLowerCase()
  );

  // Check duplicates inside Excel

  rows.forEach((row, index) => {
    const question = String(
      row["Question (English)"] || ""
    )
      .trim()
      .toLowerCase();

    const duplicateInExcel =
      seen.has(question);

    seen.add(question);

    results.push({
      row: index + 2,
      duplicateInExcel,
      duplicateInDatabase: false,
    });
  });

  // Check duplicates in database

  const { data } = await supabase
    .from("questions")
    .select("question");

  const dbQuestions = new Set(
    (data || []).map((q) =>
      String(q.question)
        .trim()
        .toLowerCase()
    )
  );

  results.forEach((item, index) => {
    item.duplicateInDatabase =
      dbQuestions.has(
        questions[index]
      );
  });

  return results;
}
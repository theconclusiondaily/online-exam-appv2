export interface RowValidationResult {
  row: number;
  valid: boolean;
  errors: string[];
  data: any;
}

const DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
];

const LANGUAGES = [
  "English",
  "Hindi",
  "Bilingual",
];

const QUESTION_TYPES = [
  "MCQ",
  "MSQ",
  "NUMERICAL",
];

const STATUS = [
  "Draft",
  "Published",
];

export function validateRows(
  rows: any[]
): RowValidationResult[] {

  return rows.map((row, index) => {

    const errors: string[] = [];

    // Required Fields

    if (!row["Question (English)"])
      errors.push("Question missing");

    if (!row["Option A"])
      errors.push("Option A missing");

    if (!row["Option B"])
      errors.push("Option B missing");

    if (!row["Option C"])
      errors.push("Option C missing");

    if (!row["Option D"])
      errors.push("Option D missing");

    if (!row["Correct Answer"])
      errors.push("Correct Answer missing");

    // Correct Answer

    const answer = String(
      row["Correct Answer"]
    ).toUpperCase();

    if (
      !["A","B","C","D"].includes(answer)
    ) {
      errors.push(
        "Correct Answer must be A/B/C/D"
      );
    }

    // Difficulty

    if (
      row["Difficulty"] &&
      !DIFFICULTIES.includes(
        row["Difficulty"]
      )
    ) {
      errors.push("Invalid Difficulty");
    }

    // Language

    if (
      row["Language"] &&
      !LANGUAGES.includes(
        row["Language"]
      )
    ) {
      errors.push("Invalid Language");
    }

    // Question Type

    if (
      row["Question Type"] &&
      !QUESTION_TYPES.includes(
        row["Question Type"]
      )
    ) {
      errors.push("Invalid Question Type");
    }

    // Status

    if (
      row["Status"] &&
      !STATUS.includes(
        row["Status"]
      )
    ) {
      errors.push("Invalid Status");
    }

    // Marks

    if (
      row["Marks"] &&
      isNaN(Number(row["Marks"]))
    ) {
      errors.push("Marks must be numeric");
    }

    if (
      row["Negative Marks"] &&
      isNaN(Number(row["Negative Marks"]))
    ) {
      errors.push(
        "Negative Marks must be numeric"
      );
    }

    return {

      row: index + 2,

      valid: errors.length === 0,

      errors,

      data: row,

    };

  });

}
export const REQUIRED_COLUMNS = [

  "Subject",

  "Chapter",

  "Topic",

  "Difficulty",

  "Language",

  "Question Type",

  "Source",

  "Year",

  "Exam Name",

  "Marks",

  "Negative Marks",

  "Tags",

  "Question (English)",

  "Question (Hindi)",

  "Option A",

  "Option A Hindi",

  "Option B",

  "Option B Hindi",

  "Option C",

  "Option C Hindi",

  "Option D",

  "Option D Hindi",

  "Correct Answer",

  "Explanation",

  "Explanation Hindi",

];

export interface SchemaValidationResult {

  valid: boolean;

  missing: string[];

  extra: string[];

}

export function validateSchema(

  uploadedColumns: string[]

): SchemaValidationResult {

  const missing = REQUIRED_COLUMNS.filter(

    column => !uploadedColumns.includes(column)

  );

  const extra = uploadedColumns.filter(

    column => !REQUIRED_COLUMNS.includes(column)

  );

  return {

    valid:

      missing.length === 0,

    missing,

    extra,

  };

}
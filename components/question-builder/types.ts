export type Difficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export type QuestionType =
  | "Single Correct"
  | "Multiple Correct"
  | "Integer"
  | "Numerical";

export interface QuestionMetadata {
  subject: string;
  chapter: string;
  topic: string;
  difficulty: Difficulty;
  marks: number;
  negativeMarks: number;
  language: "English" | "Bilingual";
  questionType: QuestionType;
}

export interface QuestionState {
  metadata: QuestionMetadata;

  questionEn: string;
  questionHi: string;

  optionsEn: string[];
  optionsHi: string[];

  correctAnswer: string;

  explanationEn: string;
  explanationHi: string;

  images: string[];
}
export interface Question {
  id: string;
  question: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
  marks: number;
  language: string;
  question_type: string;
  created_at: string;
  status?: string;
  option_a?: string;
option_b?: string;
option_c?: string;
option_d?: string;

correct_answer?: string;

explanation?: string;
}
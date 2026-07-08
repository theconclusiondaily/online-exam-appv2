export interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  class: string;
  total_questions: number;
}

export interface ExamForm {
  id?: string;

  title: string;

  description: string;

  paper_id: string;

  start_time: string;

  end_time: string;

  duration: number;

  entry_fee: number;

  reward_pool: number;

  scholarship_enabled: boolean;

  scholarship_pool: number;

  rank_1_amount: number;

  rank_2_amount: number;

  rank_3_amount: number;

  tcd_enabled: boolean;

  tcd_reward_pool: number;

  review_delay_minutes: number;

  exam_scope: string;

  challenge_type: string;

  published: boolean;

}
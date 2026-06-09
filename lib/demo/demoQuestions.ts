export const demoQuestions = [
  {
    id: "demo-q1",
    question: "What is 12 × 8?",
    option_a: "96",
    option_b: "88",
    option_c: "108",
    option_d: "92",
    correct_answer: "96",
  },

  {
    id: "demo-q2",
    question: "Which planet is known as the Red Planet?",
    option_a: "Earth",
    option_b: "Venus",
    option_c: "Mars",
    option_d: "Jupiter",
    correct_answer: "Mars",
  },

  {
    id: "demo-q3",
    question: "What is the square root of 144?",
    option_a: "10",
    option_b: "11",
    option_c: "12",
    option_d: "13",
    correct_answer: "12",
  },

  {
    id: "demo-q4",
    question: "Who wrote the Indian National Anthem?",
    option_a: "Mahatma Gandhi",
    option_b: "Rabindranath Tagore",
    option_c: "Subhas Chandra Bose",
    option_d: "Jawaharlal Nehru",
    correct_answer: "Rabindranath Tagore",
  },

  {
    id: "demo-q5",
    question: "What is the capital city of Telangana?",
    option_a: "Warangal",
    option_b: "Hyderabad",
    option_c: "Karimnagar",
    option_d: "Nizamabad",
    correct_answer: "Hyderabad",
  },

  {
    id: "demo-q6",
    question: "Which data structure follows FIFO?",
    option_a: "Stack",
    option_b: "Tree",
    option_c: "Queue",
    option_d: "Graph",
    correct_answer: "Queue",
  },

  {
    id: "demo-q7",
    question: "How many continents are there on Earth?",
    option_a: "5",
    option_b: "6",
    option_c: "7",
    option_d: "8",
    correct_answer: "7",
  },

  {
    id: "demo-q8",
    question: "What is the chemical symbol for Gold?",
    option_a: "Ag",
    option_b: "Gd",
    option_c: "Au",
    option_d: "Go",
    correct_answer: "Au",
  },

  {
    id: "demo-q9",
    question: "Which language is primarily used with React?",
    option_a: "Java",
    option_b: "JavaScript",
    option_c: "Python",
    option_d: "C++",
    correct_answer: "JavaScript",
  },

  {
    id: "demo-q10",
    question: "What is 25% of 200?",
    option_a: "25",
    option_b: "40",
    option_c: "50",
    option_d: "75",
    correct_answer: "50",
  },
];

export const DEMO_EXAM_CONFIG = {
  id: "demo-exam",
  title: "TCD Demo Practice Test",
  description:
    "Experience the complete TCD examination platform before creating your account.",
  duration: 10,
  total_questions: demoQuestions.length,
  reward_pool: 500,
  challenge_type: "DAILY",
  exam_scope: "PUBLIC",
};
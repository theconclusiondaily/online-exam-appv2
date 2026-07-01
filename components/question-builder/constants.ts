import { QuestionState } from "./types";

export const DEFAULT_QUESTION: QuestionState = {

  metadata:{

    subject:"Physics",

    chapter:"",

    topic:"",

    difficulty:"Medium",

    marks:4,

    negativeMarks:1,

    language:"Bilingual",

    questionType:"Single Correct",

  },

  questionEn:"",

  questionHi:"",

  optionsEn:["","","",""],

  optionsHi:["","","",""],

  correctAnswer:"",

  explanationEn:"",

  explanationHi:"",

  images:[],
};
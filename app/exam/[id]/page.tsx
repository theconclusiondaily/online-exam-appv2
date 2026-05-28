"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import dynamic from "next/dynamic";

import { toast } from "sonner";

import { supabase } from "@/lib/supabase/client";

import ExamTopStats from "@/components/exam/ExamTopStats";

import useExamAutosave from "@/hooks/useExamAutosave";
import useAntiCheat from "@/hooks/useAntiCheat";
import useLiveStudents from "@/hooks/useLiveStudents";
import StudentCameraStream
from "@/components/exam/StudentCameraStream";

import {
  fetchExam,
} from "@/services/exam.service";

import XPRewardPopup
from "@/components/dashboard/XPRewardPopup";
import {
  updateLiveStatus
} from "@/services/liveStatus.service";

const LiveEventFeed = dynamic(
  () =>
    import(
      "@/components/exam/LiveEventFeed"
    ),
  {
    ssr: false,
  }
);

const QuestionPalette = dynamic(
  () =>
    import(
      "@/components/exam/QuestionPalette"
    ),
  {
    ssr: false,
  }
);

export default function ExamPage() {

  const params = useParams();

  const router = useRouter();

  const examId = Array.isArray(
    params.id
  )
    ? params.id[0]
    : params.id;

  const examContainerRef =
    useRef<HTMLDivElement>(
      null
    );

  const streamRef =
    useRef<MediaStream | null>(
      null
    );
const [cameraStream,
  setCameraStream] =
  useState<MediaStream | null>(
    null
  );

  const lastViolationRef =
    useRef(0);

  const [
  currentQuestionData,
  setCurrentQuestionData
] = useState<any>(null);
const [
  prefetchedQuestion,
  setPrefetchedQuestion
] = useState<any>(null);
  const [answers,
    setAnswers] =
    useState<any>({});

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

    
useEffect(() => {

 
  const activeButton =
    document.getElementById(
      `question-${currentQuestion}`
    );

  if (activeButton) {

    activeButton.scrollIntoView({

      behavior: "smooth",

      inline: "center",

      block: "nearest",
    });
  }

}, [currentQuestion]);

const [
  answeredQuestions,
  setAnsweredQuestions,
] = useState<number[]>([]);
const [visitedQuestions,
  setVisitedQuestions] =
  useState<number[]>([0]); 
  useEffect(() => {

  setVisitedQuestions(
    (prev) =>

      prev.includes(
        currentQuestion
      )

        ? prev

        : [
            ...prev,
            currentQuestion,
          ]
  );

}, [currentQuestion]); 
const [loading,
    setLoading] =
    useState(true);

  const [userId,
    setUserId] =
    useState("");
const [
  sessionToken,
  setSessionToken
] = useState("");
  const [examInfo,
    setExamInfo] =
    useState<any>(null);
const [questions,
  setQuestions] =
  useState<any[]>([]);
  const [
  totalQuestions,
  setTotalQuestions
] = useState(1);
  const [score,
    setScore] =
    useState<number | null>(
      null
    );

  const [mounted,
    setMounted] =
    useState(false);

  const [submitted,
    setSubmitted] =
    useState(false);

  const [alreadyAttempted,
    setAlreadyAttempted] =
    useState(false);

  const [examStarted,
    setExamStarted] =
    useState(false);
const [resumeAvailable,
  setResumeAvailable] =
  useState(false);
  const [violations,
    setViolations] =
    useState(0);

  const [cameraAllowed,
    setCameraAllowed] =
    useState(false);

  const [micAllowed,
    setMicAllowed] =
    useState(false);

  const [submitting,
    setSubmitting] =
    useState(false);
const [showXP,
  setShowXP] =
  useState(false);

const [levelUp,
  setLevelUp] =
  useState(false);
  const liveStudents =
    useLiveStudents(
      examId
    );
    const [studentName,
  setStudentName] =
  useState("");

  useEffect(() => {

    setMounted(true);

  }, []);
useEffect(() => {

  return () => {

    if (
      streamRef.current
    ) {

      streamRef.current
        .getTracks()
        .forEach(
          (track) =>
            track.stop()
        );
    }
  };

}, []);
  useEffect(() => {

    async function initializeExam() {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      setUserId(user.id);
      const {
  data: profileData,
} = await supabase

  .from("users")

  .select(`
    institute_id,
    role
  `)

  .eq(
    "id",
    user.id
  )

  .single();
  if (!profileData?.institute_id) {

  toast.error(
    "No institute assigned"
  );

  router.push(
    "/dashboard"
  );

  return;
}
const {
  data: savedAnswersData,
} = await supabase

  .from("exam_answers")

  .select(`
    question_id,
    selected_option
  `)

  .eq(
    "exam_id",
    examId
  )

  .eq(
    "user_id",
    user.id
  );

if (savedAnswersData) {

  const formattedAnswers =
    savedAnswersData.reduce(
      (
        acc: any,
        item: any
      ) => {

        acc[
          item.question_id
        ] =
          item.selected_option;

        return acc;

      },
      {}
    );

  setAnswers(
    formattedAnswers
  );
}
      setStudentName(

  user.user_metadata
    ?.name ||

  user.email ||

  "Student"
);
      const {
  data: existingAttempt,
} = await supabase

  .from(
    "exam_attempts"
  )

  .select("*")

  .eq(
    "exam_id",
    examId
  )

  .eq(
    "user_id",
    user.id
  )

  .maybeSingle();

if (existingAttempt) {

  setAlreadyAttempted(
    true
  );

  setScore(
    existingAttempt.score
  );

  setLoading(false);

  return;
}
      const {
        data: examData,
      } = await fetchExam(
        examId
      );
if (
  examData?.institute_id !==
  profileData.institute_id
) {

  toast.error(
    "Unauthorized exam access"
  );

  router.push(
    "/dashboard"
  );

  return;
}
      setExamInfo(
        examData
      );

     

           setLoading(false);
    }

    if (examId) {

      initializeExam();
    }

  }, [
  examId,
  router,
]);

  useEffect(() => {

    if (!mounted) {

      return;
    }
const savedScore =
  localStorage.getItem(
    `exam-score-${examId}-${userId}`
  );

if (savedScore) {

  setScore(
    Number(savedScore)
  );
}
    const savedQuestion =
      localStorage.getItem(
        `exam-current-question-${examId}-${userId}`
      );

    if (savedQuestion) {

      setCurrentQuestion(
        Number(savedQuestion)
      );
    }

    const savedAnswers =
      localStorage.getItem(
        `exam-answers-${examId}-${userId}`
      );
const savedStarted =
  localStorage.getItem(
    `exam-started-${examId}-${userId}`
  );
const savedSession =
  localStorage.getItem(
    `exam-session-${examId}-${userId}`
  );

if (savedSession) {

  setSessionToken(
    savedSession
  );
}
if (
  savedStarted === "true"
) {

  setResumeAvailable(
    true
  );
}
    if (savedAnswers) {

      setAnswers(
        JSON.parse(
          savedAnswers
        )
      );
    }

  }, [mounted, examId]);

  useEffect(() => {

    localStorage.setItem(
      `exam-current-question-${examId}-${userId}`,
      currentQuestion.toString()
    );

  }, [currentQuestion, examId]);
useEffect(() => {

  if (
    !userId ||
    !examStarted
  ) {
    return;
  }

  const interval =
    setInterval(async () => {

      await updateLiveStatus({

        exam_id: examId,

        user_id: userId,

        student_name:
  studentName,

        current_question:
          currentQuestion + 1,

        violations,

        fullscreen:
          !!document
            .fullscreenElement,

        camera_enabled:
          cameraAllowed,

        mic_enabled:
          micAllowed,

        submitted,
      });

    }, 15000);

    return () =>
      clearInterval(
        interval
      );

}, [

  examStarted,

  currentQuestion,

  violations,

  submitted,

  cameraAllowed,

  micAllowed,

  userId,

  examId,
]);
useEffect(() => {

  if (!userId) {
    return;
  }

  const channel =
    supabase

      .channel(
        `student-actions-${userId}`
      )

      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table:
            "exam_live_status",
          filter:
            `user_id=eq.${userId}`,
        },
        async (payload) => {

          const data =
            payload.new as any;

          if (
            data.warning_message
          ) {

            alert(
              `Teacher Warning: ${data.warning_message}`
            );
          }

          if (
            data.force_submit
          ) {

            alert(
              "Teacher force submitted your exam"
            );

            await submitExam();
          }

          if (
            data.removed
          ) {

            alert(
              "You have been removed from the exam"
            );

            router.push(
              "/dashboard"
            );
          }

          if (
            data.freeze_exam
          ) {

            alert(
              "Exam temporarily frozen by teacher"
            );
          }

        }
      )

      .subscribe();

  return () => {

    supabase.removeChannel(
      channel
    );
  };

}, [userId]);
useEffect(() => {

  const handleBeforeUnload =
    (e: BeforeUnloadEvent) => {

      if (
        examStarted &&
        !submitted
      ) {

        e.preventDefault();

        e.returnValue =
          "";
      }
    };

  window.addEventListener(
    "beforeunload",
    handleBeforeUnload
  );

  return () => {

    window.removeEventListener(
      "beforeunload",
      handleBeforeUnload
    );
  };

}, [

  examStarted,

  submitted,
]);
  useExamAutosave({

    answers,

    examStarted,

    userId,

    examId,

    questionsLength:
  examInfo?.total_questions || 30,

  });

  useAntiCheat({

    antiCheatEnabled:
      examStarted,

    violations,

    setViolations,

    submitExam,

  });

  function handleViolation(
    reason: string
  ) {

    const now =
      Date.now();

    if (
      now -
        lastViolationRef.current <
      5000
    ) {

      return;
    }

    lastViolationRef.current =
      now;

    setViolations(
      (prev) => {

        const updated =
          prev + 1;

        alert(
          `${reason}. Violations: ${updated}/2`
        );

        if (updated >= 2) {

  setTimeout(() => {

    submitExam();

  }, 100);
}

        return updated;
      }
    );
  }

  async function requestPermissions() {

    try {

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          });

      streamRef.current =
        stream;
          setCameraStream(stream);
      setCameraAllowed(
        true
      );

      setMicAllowed(
        true
      );

      toast.success(
        "Camera and microphone enabled"
      );

    } catch (error) {

      toast.error(
        "Camera and microphone permission required"
      );
    }
  }
function resumeExam() {

  setExamStarted(
    true
  );

  toast.success(
    "Recovered previous exam session"
  );
}
useEffect(() => {

  const fullscreenHandler =
    () => {

      if (

        examStarted &&

        !submitted &&

        !document.fullscreenElement
      ) {

        handleViolation(
          "Fullscreen exited"
        );
      }
    };

  document.addEventListener(

    "fullscreenchange",

    fullscreenHandler
  );

  return () => {

    document.removeEventListener(

      "fullscreenchange",

      fullscreenHandler
    );
  };

}, [

  examStarted,

  submitted,
]);
async function fetchQuestionByIndex(
  index: number
) {
  if (!sessionToken) {

  console.error(
    "Missing session token"
  );

  return;
}
console.log(
  "FETCH QUESTION TOKEN:",
  sessionToken
);
  const response = await fetch(
    "/api/exam/question",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        examId,
        questionIndex: index,
        sessionToken,
      }),
    }
  );
console.log(
  "QUESTION REQUEST:",
  {
    examId,
    questionIndex: index,
    sessionToken,
  }
);
  const result =
    await response.json();
    console.log(result);

  if (
  response.ok &&
  result.data
) {
console.log(
  "TOTAL QUESTIONS:",
  result.totalQuestions
);

setTotalQuestions(
  result.totalQuestions || 1
);
console.log(
  "FETCH TOTAL QUESTIONS:",
  result.totalQuestions
);
    const question =
      result.data;

    const shuffledQuestion = {

      ...question,

      shuffledOptions: [
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
      ].sort(
        () =>
          Math.random() - 0.5
      ),
    };

    setCurrentQuestionData(
  shuffledQuestion
);

console.log(
  "CURRENT QUESTION:",
  shuffledQuestion
);
    setCurrentQuestion(
      index
    );
    if (
  index + 1 <
  totalQuestions
) {
  prefetchQuestion(
    index + 1
  );
}
  }
}
async function prefetchQuestion(
  index: number
) {

  try {

    const response =
      await fetch(
        "/api/exam/question",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            examId,
            questionIndex:
              index,
            sessionToken,
          }),
        }
      );

    const result =
      await response.json();

    if (
      response.ok &&
      result.data
    ) {

      const question =
        result.data;

      const shuffledQuestion = {

        ...question,

        shuffledOptions: [
          question.option_a,
          question.option_b,
          question.option_c,
          question.option_d,
        ].sort(
          () =>
            Math.random() - 0.5
        ),
      };

      setPrefetchedQuestion(
        shuffledQuestion
      );
    }

  } catch (error) {

    console.error(
      "PREFETCH ERROR:",
      error
    );
  }
}
  async function startExam() {

    if (
      !cameraAllowed ||
      !micAllowed
    ) {

      alert(
        "Allow camera and microphone first"
      );

      return;
    }

    try {

      if (
        document.documentElement
      ) {

        await document.documentElement
  .requestFullscreen();
      }

     

    } catch (error) {

      console.error(
  "FULLSCREEN ERROR:",
  error
);
    }
const response = await fetch(
  "/api/exam/start",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      examId,
    }),
  }
);

const result =
  await response.json();
console.log(
  "START RESULT FULL:",
  JSON.stringify(
    result,
    null,
    2
  )
);

console.log(
  "SESSION TOKEN FROM API:",
  result.session?.session_token
);
if (!response.ok) {

  if (
    result.error ===
    "You have already submitted this exam"
  ) {

    
    router.push(
      `/exam-result/${examId}`
    );

    return;
  }

  toast.error(
    result.error ||
    "Failed to start exam"
  );

  return;
}

const token =
  result.session.session_token;

setSessionToken(token);

localStorage.setItem(
  `exam-session-${examId}-${userId}`,
  token
);

const questionResponse =
  await fetch(
    "/api/exam/question",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        examId,
        questionIndex: 0,
        sessionToken: token,
      }),
    }
  );

const questionResult =
  await questionResponse.json();
console.log(
  "TOTAL QUESTIONS:",
  questionResult.totalQuestions
);

setTotalQuestions(
  questionResult.totalQuestions || 1
);
console.log(
  "TOTAL QUESTIONS:",
  questionResult.totalQuestions
);
console.log(
  "QUESTION RESULT:",
  questionResult
);

if (
  questionResponse.ok &&
  questionResult.data
) {

  const question =
    questionResult.data;

  const shuffledQuestion = {
    ...question,

    shuffledOptions: [
      question.option_a,
      question.option_b,
      question.option_c,
      question.option_d,
    ].sort(
      () =>
        Math.random() - 0.5
    ),
  };

  setCurrentQuestionData(
    shuffledQuestion
  );

  setCurrentQuestion(0);
}

setExamStarted(true);

localStorage.setItem(
  `exam-started-${examId}-${userId}`,
  "true"
);

localStorage.setItem(
  `exam-start-time-${examId}-${userId}`,
  Date.now().toString()
);
}
    
  async function selectAnswer(
  questionId: string,
  answer: string
) {
  if (!sessionToken) {

  toast.error(
    "Session not initialized"
  );

  return;
}
  if (
    alreadyAttempted ||
    submitted
  ) {
    return;
  }

  console.log(
    "SELECT ANSWER",
    {
      questionId,
      answer,
      sessionToken,
      examId,
    }
  );

 setAnswers(
  (prev: any) => ({
    ...prev,

    [questionId]: answer,

   
  })
);
setAnsweredQuestions(
  (prev) =>
    prev.includes(
      currentQuestion
    )
      ? prev
      : [
          ...prev,
          currentQuestion,
        ]
);
  try {
    const response =
      await fetch(
        "/api/exam/save-answer",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            examId,
            questionId,
            selectedOption:
              answer,
            sessionToken,
          }),
        }
      );

    const result =
      await response.json();

    console.log(
      "SAVE ANSWER RESULT:",
      result
    );

    if (!response.ok) {
      console.error(
        "SAVE ANSWER FAILED:",
        result
      );

      toast.error(
        result.error ||
        "Failed to save answer"
      );

      return;
    }

  } catch (error) {
    console.error(
      "SAVE ANSWER ERROR:",
      error
    );
  }


  return;
}
  

  async function submitExam() {

   if (submitting) {

  return;
}
if (submitted) {

  return;
}
    setSubmitting(true);


    const response = await fetch(
  "/api/exam/submit",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      examId,
      sessionToken,
    }),
  }
);

const result =
  await response.json();
  console.log(
  "SUBMIT RESULT:",
  result
);

if (!response.ok) {

  toast.error(
    result.error ||
    "Submission failed"
  );

  setSubmitting(false);

  return;
}

setScore(result.score);

localStorage.setItem(
  `exam-score-${examId}-${userId}`,
  result.score.toString()
);
    const {
  data: beforeLevel
} = await supabase

  .from("user_levels")

  .select("level")

  .eq(
    "user_id",
    userId
  )

  .single();
const {
  data: beforeRanks
} = await supabase

  .from("leaderboard_view")

  .select("user_id")

  .order(
    "xp",
    {
      ascending: false,
    }
  );

const previousRankIndex =
  beforeRanks?.findIndex(
    (
      r: any
    ) =>
      r.user_id ===
      userId
  );

const previousRank =

  previousRankIndex !==
    undefined &&

  previousRankIndex >= 0

    ? previousRankIndex + 1

    : null;
await supabase.rpc(
  "add_user_xp",
  {
    p_user_id: userId,
    p_xp: 50,
  }
);
const {
  data: afterRanks
} = await supabase

  .from("leaderboard_view")

  .select("user_id")

  .order(
    "xp",
    {
      ascending: false,
    }
  );

const newRankIndex =
  afterRanks?.findIndex(
    (
      r: any
    ) =>
      r.user_id ===
      userId
  );

const newRank =

  newRankIndex !==
    undefined &&

  newRankIndex >= 0

    ? newRankIndex + 1

    : null;

if (

  previousRank &&

  newRank &&

  newRank < previousRank

) {

  await supabase

    .from("activity_feed")

    .insert({

      user_id: userId,

      activity_type:
        "rank",

      title:
        `${studentName} climbed the leaderboard`,

      description:
        `Moved from #${previousRank} to #${newRank}`,

      metadata: {

        old_rank:
          previousRank,

        new_rank:
          newRank,

      },

    });
}
const {
  data: afterLevel
} = await supabase

  .from("user_levels")

  .select("level")

  .eq(
    "user_id",
    userId
  )

  .single();

if (
  afterLevel?.level >
  beforeLevel?.level
) {

  setLevelUp(true);
}

setShowXP(true);
await supabase

  .from("activity_feed")

  .insert({

    user_id: userId,

    activity_type: "exam",

    title:
      `${studentName} completed an exam`,

    description:
      `Scored ${result.score}% in ${examInfo?.title}`,

    metadata: {

      score: result.score,

      exam_id: examId,

      xp_earned: 50,

    },

  });
    await supabase

  .from(
    "exam_live_status"
  )

  .update({

    submitted: true,

    fullscreen: false,

  })

  .eq(
    "exam_id",
    examId
  )

  .eq(
    "user_id",
    userId
  );
console.log(
  "RESULT SAVED"
);
    localStorage.setItem(
      `exam-submitted-${examId}-${userId}`,
      "true"
    );

    localStorage.removeItem(
      `exam-current-question-${examId}-${userId}`
    );

    localStorage.removeItem(
      `exam-answers-${examId}-${userId}`
    );

    localStorage.removeItem(
      `exam-order-${examId}`
    );

    localStorage.removeItem(
      `exam-started-${examId}-${userId}`
    );
    
    setSubmitted(true);
    setAlreadyAttempted(
      true
    );
if (
  streamRef.current
) {

  streamRef.current
    .getTracks()
    .forEach(
      (track) =>
        track.stop()
    );
}
if (
  document.fullscreenElement
) {

  await document.exitFullscreen();
}
localStorage.removeItem(
  `exam-session-${examId}-${userId}`
);
    setTimeout(() => {

  setShowXP(false);

  router.push(
    `/exam-result/${examId}`
  );

}, 3000);
  }

  if (!mounted) {

    return null;
  }

  if (loading) {
console.log(
  "DEBUG STATE:",
  {
    currentQuestion,
    totalQuestions,
  }
);
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

 if (
  alreadyAttempted
) {

  return (

    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      <h1 className="text-3xl font-bold mb-3 text-center">

        Exam Already Attempted

      </h1>

      <p className="text-3xl font-semibold mb-10">

        Your Score:
        {" "}
        {score ?? 0}

      </p>

      <button
        onClick={() =>
          router.push(
            "/dashboard"
          )
        }

        className="bg-black text-white px-8 py-3 rounded-2xl font-bold text-lg"
      >

        Go To Dashboard

      </button>

    </main>
  );
}

  if (
    !examStarted &&
    examInfo
  ) {

    return (
      <main className="min-h-screen p-6 flex items-center justify-center bg-gray-50">

        <div className="max-w-2xl w-full bg-white border rounded-3xl p-6 shadow-sm">

          <h1 className="text-4xl font-bold mb-4">
            {examInfo.title}
          </h1>

          <p className="mb-4 text-gray-600">
            {examInfo.description}
          </p>

          <div className="space-y-4 mb-4">

            <p>
              Duration: 30 Minutes
            </p>

            <p>
              Questions: {examInfo?.total_questions || 30}
            </p>

          </div>

          <button
            onClick={requestPermissions}
            className="bg-tcd-blue hover:bg-tcd-blue-light text-white px-6 py-3 rounded-2xl w-full mb-4 font-bold"
          >
            Allow Camera & Microphone
          </button>
{resumeAvailable && (

  <button

    onClick={resumeExam}

    className="bg-green-600 text-white px-6 py-3 rounded-2xl w-full mb-4 font-bold"
  >

    Resume Previous Session

  </button>

)}
          <button
            onClick={startExam}
            className="bg-black text-white px-6 py-3 rounded-2xl w-full font-bold"
          >
            Start Exam
          </button>

        </div>

      </main>
    );
  }

  return (

    <div
      ref={examContainerRef}
      className="min-h-screen bg-gray-50 p-5"
    >

      <div className="sticky top-0 z-30 bg-gray-50 pb-2 mb-4">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">

          <h1 className="text-3xl font-bold">
            Exam
          </h1>

          <ExamTopStats
            liveStudents={liveStudents}
            violations={violations}
            onTimeUp={submitExam}
          />

        </div>

      </div>
<div
  className="
    fixed

    top-[220px]
    right-4

    w-32
    lg:w-40

    overflow-hidden

    rounded-2xl
    border border-white
    shadow-xl

    z-10

    opacity-90
  "
>

  <StudentCameraStream
    stream={cameraStream}
  />

</div>

      <div className="mt-2 mb-4 overflow-x-auto scrollbar-hide">

        <QuestionPalette
  questions={Array.from(
    {
      length:
        Math.max(
          totalQuestions,
          1
        ),
    },
    (_, i) => ({
      id: i,
    })
  )}
  answers={answers}
  currentQuestion={currentQuestion}
  setCurrentQuestion={
    fetchQuestionByIndex
  }
  visitedQuestions={
    visitedQuestions
  }
  answeredQuestions={
    answeredQuestions
  }
/>

      </div>

      <div className="max-w-5xl mx-auto">

        <div className="bg-white p-6 rounded-2xl border shadow-sm">

          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1}
          </h2>

          <p className="text-xl leading-relaxed mb-10">
            {
              currentQuestionData
  ?.question
            }
          </p>

          <div className="space-y-4">

            {currentQuestionData
  ?.shuffledOptions
              ?.map(
                (
                  option: string,
                  index: number
                ) => (

                  <button
                    key={`${option}-${index}`}

                    onClick={() =>
                      selectAnswer(
                        currentQuestionData?.id,
                        option
                      )
                    }

                    className={`w-full text-left p-3 rounded-xl border text-lg font-medium transition-colors

                      ${
                        answers[
  currentQuestionData?.id
] === option

                          ? "bg-tcd-blue text-white border-tcd-blue border-blue-600"

                          : "bg-white hover:border-blue-400"
                      }
                    `}
                  >

                    {option}

                  </button>
                )
              )}

          </div>

        </div>

      </div>

      <div className="flex justify-between items-center mt-5">

        <button
          onClick={() =>
  fetchQuestionByIndex(
    Math.max(
      currentQuestion - 1,
      0
    )
  )
}
          disabled={
            currentQuestion === 0
          }

          className="
  px-8
  py-3

  rounded-2xl

  border
  border-gray-300

  bg-white

  hover:bg-gray-100

  font-bold

  shadow-sm

  transition

  disabled:opacity-50
"
        >
          Previous
        </button>

        <div className="flex gap-2">

  {currentQuestion <
  Math.max(
    totalQuestions - 1,
    0
  ) && (

    <button
      onClick={
  async () => {

  const nextIndex =
    currentQuestion + 1;
if (
  nextIndex >=
  totalQuestions
) {
  return;
}
  if (
    prefetchedQuestion
  ) {

    setCurrentQuestionData(
      prefetchedQuestion
    );

    setCurrentQuestion(
      nextIndex
    );

    prefetchQuestion(
      nextIndex + 1
    );

  } else {

    await fetchQuestionByIndex(
      nextIndex
    );
  }
}
}

      className="
        px-8
        py-3

        rounded-2xl

        bg-tcd-blue
hover:bg-tcd-blue-light

        text-white
        font-bold

        transition
      "
    >

      Next

    </button>
  )}

  {currentQuestion ===
  Math.max(
    totalQuestions - 1,
    0
  ) && (

    <button
      onClick={submitExam}

      className="
        px-8
        py-3

        rounded-2xl

        bg-green-600
        hover:bg-green-700

        text-white
        font-bold

        transition
      "
    >

      Submit Exam

    </button>
  )}

</div>

      </div>

  <div
  className="
    hidden

    2xl:flex

    fixed

    top-1/3
    left-2

    -translate-y-1/2

    w-[170px]

    z-10

    scale-75

    origin-right
  "
>

  <LiveEventFeed />

</div>
<XPRewardPopup
  show={showXP}
  xp={50}
  levelUp={levelUp}
/>
    </div>
  );
}

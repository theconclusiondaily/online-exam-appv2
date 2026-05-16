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

import { supabase }
from "@/lib/supabase/client";
import useExamAutosave from "@/hooks/useExamAutosave";
import useLiveRank from "@/hooks/useLiveRank";
import useLiveStudents from "@/hooks/useLiveStudents";
import { toast } from "sonner";
import ExamTopStats
from "@/components/exam/ExamTopStats";
import { retryAsync }
from "@/lib/retry";
import QuestionCard
from "@/components/exam/QuestionCard";
import ExamLoader
from "@/components/exam/ExamLoader";
import useDebouncedLocalStorage
from "@/hooks/useDebouncedLocalStorage";
import useAntiCheat
from "@/hooks/useAntiCheat";
import {
  fetchExam,
  fetchQuestions,
} from "@/services/exam.service";
import dynamic from "next/dynamic";
export default function ExamPage() {

  const LiveEventFeed =
  dynamic(
    () =>
      import(
        "@/components/exam/LiveEventFeed"
      ),
    {
      ssr: false,
    }
  );

const QuestionPalette =
  dynamic(
    () =>
      import(
        "@/components/exam/QuestionPalette"
      ),
    {
      ssr: false,
    }
  );
  const params = useParams();

  const router = useRouter();

  const examContainerRef =
    useRef<HTMLDivElement>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const streamRef =
    useRef<MediaStream | null>(
      null
    );

  const lastViolationRef =
    useRef(0);

  const examId = Array.isArray(
    params.id
  )
    ? params.id[0]
    : params.id;

  const [questions,
    setQuestions] =
    useState<any[]>([]);

  const [answers,
    setAnswers] =
    useState<any>({});
const [currentQuestion,
  setCurrentQuestion] =
  useState(0);
  const [score,
    setScore] =
    useState<number | null>(
      null
    );
const [loading,
  setLoading] =
  useState(true);
  const [timeLeft,
    setTimeLeft] =
    useState(0);

  const [userId,
    setUserId] =
    useState("");

  const [alreadyAttempted,
    setAlreadyAttempted] =
    useState(false);

  const [examStarted,
    setExamStarted] =
    useState(false);

  const [examInfo,
    setExamInfo] =
    useState<any>(null);

  const [cameraAllowed,
    setCameraAllowed] =
    useState(false);

  const [micAllowed,
    setMicAllowed] =
    useState(false);

  const [wakeLock,
    setWakeLock] =
    useState<any>(null);

  const [violations,
    setViolations] =
    useState(0);

  const [isSubmitting,
    setIsSubmitting] =
    useState(false);
const [submitted,
  setSubmitted] =
  useState(false);
  const [antiCheatEnabled,
    setAntiCheatEnabled] =
    useState(false);
const [liveScore,
  setLiveScore] =
  useState(0);
const {
  liveRank,
  previousRank,
  topScore,
} = useLiveRank({
  examId,
  userId,
});
const [
  fullscreenEnabled,
  setFullscreenEnabled
] = useState(false);

const [
  cameraEnabled,
  setCameraEnabled
] = useState(false);

const [
  antiCheatReady,
  setAntiCheatReady
] = useState(false);
const liveStudents =
  useLiveStudents(
    examId
  );
  useDebouncedLocalStorage({

  keyName:
    `exam-answers-${examId}`,

  value: answers,

});
useAntiCheat({

 antiCheatEnabled:
  antiCheatReady,

  violations,

  setViolations,

  submitExam,
});

  // HANDLE VIOLATIONS

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

        if (
          updated === 1
        ) {

          alert(
            `${reason}. One more violation will submit the exam.`
          );

          return updated;
        }

        console.log(
  "Auto submitting exam"
);

        return updated;
      }
    );
  }

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

    await supabase
      .from("exam_attempts")
      .upsert(
        {

          user_id:
            user.id,

          exam_id:
            examId,

          answers: {},

          score: 0,

          percentage: 0,

          status:
            "in_progress",

          remaining_time:
            1800,

          last_saved_at:
            new Date(),

        },

        {

          onConflict:
            "user_id,exam_id",
        }
      );

    // FETCH EXAM

    const {
      data: examData,
    } = await fetchExam(
      examId
    );

    if (examData) {

      setExamInfo(
        examData
      );

      if (
        examData?.duration
      ) {

        setTimeLeft(
          examData.duration * 60
        );
      }
    }

    // FETCH QUESTIONS

    const {
      data,
    } = await fetchQuestions(
      examId
    );

    if (data) {

      setQuestions(data);

      const savedAnswers =
        localStorage.getItem(
          `exam-answers-${examId}`
        );

      if (savedAnswers) {

        setAnswers(
          JSON.parse(
            savedAnswers
          )
        );
      }

    } else {

      setQuestions([]);
    }

    setLoading(false);
  }

  if (examId) {

    initializeExam();
  }

}, [
  examId,
  router,
]);

    // MULTIPLE TAB PROTECTION

  useEffect(() => {

  if (!examId) {

    return;
  }

  const tabId =
    sessionStorage.getItem(
      "exam-tab-id"
    ) ||

    crypto.randomUUID();

  sessionStorage.setItem(
    "exam-tab-id",
    tabId
  );

  const existingTab =
    localStorage.getItem(
      `exam-active-${examId}`
    );

  if (

    existingTab &&

    existingTab !==
      tabId &&

    !alreadyAttempted

  ) {

    alert(
      "Exam already active in another tab"
    );

    router.push(
      "/dashboard"
    );

    return;
  }

  localStorage.setItem(
    `exam-active-${examId}`,
    tabId
  );

 const cleanup = () => {

  const currentActive =
    localStorage.getItem(
      `exam-active-${examId}`
    );

  if (
    currentActive ===
    tabId
  ) {

    localStorage.removeItem(
      `exam-active-${examId}`
    );
  }
};

window.addEventListener(
  "beforeunload",
  cleanup
);

return () => {

  window.removeEventListener(
    "beforeunload",
    cleanup
  );

  cleanup();
};

}, [
  examId,
  alreadyAttempted,
  router,
]);

  // TIMER

  useEffect(() => {

    if (
      !examStarted
    )
      return;

    if (
      alreadyAttempted
    )
      return;

    if (timeLeft <= 0) {

      submitExam();

      return;
    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) =>
            prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(
        timer
      );

  }, [
    timeLeft,
    examStarted,
    alreadyAttempted,
  ]);
  
// AUTOSAVE

useExamAutosave({

  answers,

  timeLeft,

  examStarted,

  userId,

  examId,

  liveScore,

  questionsLength:
    questions.length,

});

  // VIDEO STREAM

  useEffect(() => {

    if (
      videoRef.current &&
      streamRef.current
    ) {

      videoRef.current.srcObject =
        streamRef.current;
    }

  }, [examStarted]);

  // SELECT ANSWER

  function selectAnswer(
    questionId: string,
    answer: string
  ) {

    const updatedAnswers = {

  ...answers,

  [questionId]:
    answer,
};

setAnswers(
  updatedAnswers
);

calculateLiveScore(
  updatedAnswers
);

  }
function calculateLiveScore(
  updatedAnswers: any
) {

  let correct = 0;

  questions.forEach((q) => {

    if (
      updatedAnswers[q.id] ===
      q.correct_answer
    ) {

      correct++;
    }
  });

  setLiveScore(correct);

  return correct;
}

  // SUBMIT EXAM

  async function submitExam() {

  if (
    isSubmitting ||
    alreadyAttempted
  ) {

    return;
  }

  setSubmitted(
  true
);

setAntiCheatEnabled(
  false
);

setIsSubmitting(
  true
);

  if (
    Object.keys(
      answers
    ).length === 0
  ) {

    toast.error(
  "Attempt at least one question"
);

    setIsSubmitting(
      false
    );

    return;
  }

  const confirmSubmit =
    confirm(
      "Are you sure you want to submit the exam?"
    );

  if (!confirmSubmit) {

    setIsSubmitting(
      false
    );

    return;
  }

  let correct = 0;

  questions.forEach(
    (q) => {

      if (
        answers[q.id] ===
        q.correct_answer
      ) {

        correct++;
      }
    }
  );

  setScore(correct);
// XP CALCULATION

const earnedXP =
  correct * 10;

  const {
  data: currentUser,
} = await supabase
  .from("users")
  .select(`
  xp,
  level,
  badges,
  streak,
  last_exam_date
`)
  .eq(
    "id",
    userId
  )
  .single();

if (currentUser) {
// STREAK SYSTEM

const today =
  new Date()
    .toISOString()
    .split("T")[0];

let streak =
  currentUser.streak || 0;

const lastDate =
  currentUser.last_exam_date;

if (lastDate !== today) {

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const yesterdayString =
    yesterday
      .toISOString()
      .split("T")[0];

  if (
    lastDate ===
    yesterdayString
  ) {

    streak += 1;

  } else {

    streak = 1;
  }
}
  const newXP =
    (currentUser.xp || 0) +
    earnedXP;

  const newLevel =
    Math.floor(
      newXP / 500
    ) + 1;

  const badges =
    currentUser.badges || [];

  // PERFECT SCORE BADGE

  if (
    correct ===
    questions.length &&
    !badges.includes(
      "Perfect Score"
    )
  ) {

    badges.push(
      "Perfect Score"
    );
  }

  await supabase
    .from("users")
    .update({

  xp: newXP,

  level: newLevel,

  badges,

  streak,

  last_exam_date:
    today,

})
    .eq(
      "id",
      userId
    );
}
try {
const result =
  await retryAsync(
    async () => {

      const response =
        await fetch(
          "/api/submit-exam",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                examId,

                userId,

                answers,

              }),
          }
        );

      const data =
  await response.json();

if (!response.ok) {

  throw new Error(
    data.error ||
    "Submission failed"
  );
}

return data;
    }
  );

setScore(
  result.score
);

   setSubmitted(
    true
  );

  localStorage.removeItem(
    `exam-answers-${examId}`
  );

  localStorage.removeItem(
    `exam-start-${examId}`
  );

  localStorage.removeItem(
    `exam-active-${examId}`
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
  if (wakeLock) {

    await wakeLock.release();
  }

  if (
    document.fullscreenElement
  ) {

    await document
      .exitFullscreen();
  }

  setAlreadyAttempted(
    true
  );
  toast.success(
  "Exam submitted successfully"
);

  router.push(
    `/leaderboard/${examId}`
  );
}
  catch (error: any) {

  toast.error(
    error.message ||
    "Submission failed"
  );

  setIsSubmitting(
    false
  );

  return;
}
  // CAMERA + MIC

  async function requestPermissions() {

    try {

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({
            video: {
              facingMode:
                "user",
            },

            audio: true,
          });

      streamRef.current =
        stream;

      if (
        videoRef.current
      ) {

        videoRef.current.srcObject =
          stream;
      }

      setCameraAllowed(
        true
      );

      setMicAllowed(
        true
      );

    } catch (error) {

      toast.error(
        "Camera and microphone access required"
      );

      console.log(error);
    }
  }

  // START EXAM

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

    // FULLSCREEN FIRST

    const isMobile =
      window.innerWidth < 768;

    if (

      !isMobile &&

      examContainerRef.current
        ?.requestFullscreen

    ) {

      await examContainerRef
        .current
        .requestFullscreen();

      setFullscreenEnabled(
        true
      );
    }

  } catch (error) {

    console.error(
      "Fullscreen failed",
      error
    );
  }

  try {

    // WAKE LOCK

    if (
      "wakeLock" in navigator
    ) {

      const lock =
        await (
          navigator as any
        )
          .wakeLock
          .request("screen");

      setWakeLock(lock);
    }

  } catch (error) {

    console.error(
      "WakeLock failed",
      error
    );
  }

  // START EXAM LAST

  setExamStarted(true);

  localStorage.setItem(
    `exam-start-${examId}`,
    Date.now().toString()
  );

  // ENABLE ANTI CHEAT SAFELY

  setTimeout(() => {

    setAntiCheatEnabled(
      true
    );

    setAntiCheatReady(
      true
    );

  }, 2000);
}

  // TIMER FORMAT

  function formatTime(
    seconds: number
  ) {

    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(
        2,
        "0"
      )}`;
  }

  // EXAM TIME

  const now =
    new Date();

  const examStart =
    examInfo?.start_time
      ? new Date(
          examInfo.start_time
        )
      : null;

  const examEnd =
    examInfo?.end_time
      ? new Date(
          examInfo.end_time
        )
      : null;

  // EXAM NOT STARTED

  if (
    examStart &&
    now < examStart
  ) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

        <div className="bg-white border rounded-3xl p-10 max-w-xl w-full text-center shadow-sm">

          <h1 className="text-4xl font-bold mb-4">
            Exam Not Started
          </h1>

          <p className="text-gray-600 mb-6">
            This exam has not started yet.
          </p>

          <p className="text-xl font-bold text-blue-600">

            Starts At:
            {" "}

            {examStart.toLocaleString(
              "en-IN",
              {
                timeZone:
                  "Asia/Kolkata",
              }
            )}

          </p>

        </div>

      </main>
    );
  }

  // EXAM CLOSED

  if (
    examEnd &&
    now > examEnd
  ) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

        <div className="bg-white border rounded-3xl p-10 max-w-xl w-full text-center shadow-sm">

          <h1 className="text-4xl font-bold mb-4 text-red-600">
            Exam Closed
          </h1>

          <p className="text-gray-600">
            The exam submission window has ended.
          </p>

        </div>

      </main>
    );
  }

  // INSTRUCTION PAGE

  if (
    !examStarted &&
    examInfo
  ) {

    return (

      <main className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-gray-50">

        <div className="max-w-2xl w-full bg-white border rounded-3xl p-6 md:p-10 shadow-sm">

          <h1 className="text-4xl font-bold mb-4">
            {examInfo.title}
          </h1>

          <p className="mb-6 text-gray-600">
            {examInfo.description}
          </p>

          <p className="text-green-600 font-bold text-xl mb-6">

            Reward Pool:
            {" "}
            ₹
            {examInfo.reward_pool ||
              0}

          </p>

          <div className="space-y-2 mb-8">

            <p>
              Duration:
              {" "}
              30 Minutes
            </p>

            <p>
              Total Questions:
              {" "}
              {
                questions.length
              }
            </p>

          </div>

          <div className="border rounded-2xl p-5 mb-8 bg-gray-50">

            <h2 className="font-bold mb-4 text-lg">
              Instructions
            </h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-700">

              <li>
                No tab switching allowed
              </li>

              <li>
                Keyboard usage monitored
              </li>

              <li>
                Camera required
              </li>

              <li>
                Fullscreen required
              </li>

              <li>
                Two violations will auto-submit exam
              </li>

            </ul>

          </div>

          <button
            onClick={
              requestPermissions
            }
            className="bg-blue-600 text-white px-6 py-4 rounded-2xl w-full mb-4 font-bold"
          >
            Allow Camera &
            Microphone
          </button>

          <button
            onClick={
              startExam
            }
            className="bg-black text-white px-6 py-4 rounded-2xl w-full font-bold"
          >
            Start Exam
          </button>

        </div>

      </main>
    );
  }

  // ALREADY ATTEMPTED

  if (
    alreadyAttempted
  ) {

    return (

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

        <h1 className="text-4xl font-bold">
          Exam Already Attempted
        </h1>

        <p className="mt-4 text-2xl">
          Your Score:
          {" "}
          {score}
        </p>

      </main>
    );
  }

  // MAIN EXAM
if (
  loading ||
  !examInfo ||
  questions.length === 0
) {

  return <ExamLoader />;
}
  return (

    <div
      ref={
        examContainerRef
      }
      className="min-h-screen overflow-y-auto p-4 md:p-8 bg-gray-50 select-none touch-pan-y"
    >

      {/* CAMERA */}

      {cameraAllowed && (

        <div className="fixed bottom-24 right-4 w-24 h-32 md:w-48 md:h-60 bg-black rounded-2xl overflow-hidden shadow-2xl z-30 border-4 border-white">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

        </div>

      )}

{/* TOP BAR */}

<div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

  <h1 className="text-3xl font-bold">
    Exam
  </h1>

  <ExamTopStats
    timeLeft={timeLeft}
    formatTime={formatTime}
    liveScore={liveScore}
    liveRank={liveRank}
    previousRank={previousRank}
    topScore={topScore}
    liveStudents={liveStudents}
    violations={violations}
  />

</div>

{/* QUESTIONS */}

<div className="space-y-8 pb-44">

  {questions[currentQuestion] && (

    <div className="bg-white p-10 rounded-3xl border">

      <h1 className="text-3xl font-bold mb-6">

        Exam Working

      </h1>

      <p className="text-xl">

        {
          questions[currentQuestion]
            ?.question
        }

      </p>

    </div>

  )}

</div>

{/* LIVE EVENT FEED */}

<div className="fixed left-4 top-1/2 -translate-y-1/2 w-72 z-40 hidden 2xl:block">

  <LiveEventFeed />

</div>

{/* QUESTION NAVIGATION */}

<QuestionPalette
  questions={questions}
  answers={answers}
  currentQuestion={
    currentQuestion
  }
  setCurrentQuestion={
    setCurrentQuestion
  }
/>

{/* SUBMIT */}

<button
  onClick={
    submitExam
  }
  className="fixed bottom-4 left-4 right-4 md:static bg-green-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg z-50"
>

  Submit Exam

</button>

</div>
  );
}
}
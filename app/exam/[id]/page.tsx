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
  fetchQuestions,
} from "@/services/exam.service";

import {
  saveExamResult,
} from "@/lib/exam";
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

  const [questions,
    setQuestions] =
    useState<any[]>([]);

  const [answers,
    setAnswers] =
    useState<any>({});

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

  const [loading,
    setLoading] =
    useState(true);

  const [userId,
    setUserId] =
    useState("");

  const [examInfo,
    setExamInfo] =
    useState<any>(null);

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

      setExamInfo(
        examData
      );

      const {
        data,
      } = await fetchQuestions(
        examId
      );

      if (data) {

        const shuffled =
          [...data]
            .sort(
              () =>
                Math.random() -
                0.5
            )
            .map(
              (q: any) => ({
                ...q,

                shuffledOptions:
                  [
                    q.option_a,
                    q.option_b,
                    q.option_c,
                    q.option_d,
                  ].sort(
                    () =>
                      Math.random() -
                      0.5
                  ),
              })
            );

        setQuestions(
          shuffled
        );
      }

           setLoading(false);
    }

    if (examId) {

      initializeExam();
    }

  }, [examId, router]);

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

    }, 3000);

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
      questions.length,

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

    } catch (error) {

      console.error(
  "FULLSCREEN ERROR:",
  error
);
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

  function selectAnswer(
    questionId: string,
    answer: string
  ) {

    if (
      alreadyAttempted ||
      submitted
    ) {

      return;
    }

    setAnswers(
      (prev: any) => ({

        ...prev,

        [questionId]:
          answer,
      })
    );
  }

  async function submitExam() {

   if (submitting) {

  return;
}
if (submitted) {

  return;
}
    setSubmitting(true);


    let finalScore = 0;

    questions.forEach((q) => {

      if (
        answers[q.id] ===
        q.correct_answer
      ) {

        finalScore++;
      }

    });

    setScore(
      finalScore
    );
localStorage.setItem(
 `exam-score-${examId}-${userId}`,
  finalScore.toString()
);
    await saveExamResult({

      exam_id: examId,

      user_id: userId,

      score: finalScore,

      answers,

      total_questions:
        questions.length,
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
    router.push(
      "/dashboard"
    );
  }

  if (!mounted) {

    return null;
  }

  if (loading) {

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

      <h1 className="text-5xl font-bold mb-6 text-center">

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

        className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg"
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

        <div className="max-w-2xl w-full bg-white border rounded-3xl p-10 shadow-sm">

          <h1 className="text-4xl font-bold mb-4">
            {examInfo.title}
          </h1>

          <p className="mb-8 text-gray-600">
            {examInfo.description}
          </p>

          <div className="space-y-4 mb-8">

            <p>
              Duration: 30 Minutes
            </p>

            <p>
              Questions: {questions.length}
            </p>

          </div>

          <button
            onClick={requestPermissions}
            className="bg-blue-600 text-white px-6 py-4 rounded-2xl w-full mb-4 font-bold"
          >
            Allow Camera & Microphone
          </button>
{resumeAvailable && (

  <button

    onClick={resumeExam}

    className="bg-green-600 text-white px-6 py-4 rounded-2xl w-full mb-4 font-bold"
  >

    Resume Previous Session

  </button>

)}
          <button
            onClick={startExam}
            className="bg-black text-white px-6 py-4 rounded-2xl w-full font-bold"
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
      className="min-h-screen bg-gray-50 p-8"
    >

      <div className="sticky top-0 z-40 bg-gray-50 pb-4 mb-8">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

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

top-2
right-2

w-20
sm:w-24
md:w-40
lg:w-56

z-40

rounded-2xl
overflow-hidden
shadow-2xl

opacity-90
border-2 border-white
"
>

  <StudentCameraStream
    stream={cameraStream}
  />

</div>

      <div className="mt-6 mb-8 overflow-x-auto scrollbar-hide">

        <QuestionPalette
          questions={questions}
          answers={answers}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />

      </div>

      <div className="max-w-5xl mx-auto">

        <div className="bg-white p-10 rounded-3xl border shadow-sm">

          <h2 className="text-2xl font-bold mb-8">
            Question {currentQuestion + 1}
          </h2>

          <p className="text-xl leading-relaxed mb-10">
            {
              questions[currentQuestion]
                ?.question
            }
          </p>

          <div className="space-y-4">

            {questions[currentQuestion]
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
                        questions[
                          currentQuestion
                        ]?.id,
                        option
                      )
                    }

                    className={`w-full text-left p-5 rounded-2xl border text-lg font-medium transition-colors

                      ${
                        answers[
                          questions[
                            currentQuestion
                          ]?.id
                        ] === option

                          ? "bg-blue-600 text-white border-blue-600"

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

      <div className="flex justify-between items-center mt-10">

        <button
          onClick={() =>
            setCurrentQuestion(
              (prev) =>
                Math.max(
                  prev - 1,
                  0
                )
            )
          }

          disabled={
            currentQuestion === 0
          }

          className="px-6 py-3 rounded-2xl bg-gray-200 font-bold disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex gap-4">

          {currentQuestion <
            questions.length - 1 && (

            <button
              onClick={() =>
                setCurrentQuestion(
                  (prev) =>
                    prev + 1
                )
              }

              className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold"
            >
              Next
            </button>
          )}

          {currentQuestion ===
            questions.length - 1 && (

            <button
              onClick={submitExam}
              className="px-8 py-3 rounded-2xl bg-green-600 text-white font-bold"
            >
              Submit Exam
            </button>
          )}

        </div>

      </div>

      <div className="fixed bottom-24 right-4 w-80 z-20 hidden 2xl:block">

        <LiveEventFeed />

      </div>

    </div>
  );
}

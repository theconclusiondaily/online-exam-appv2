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

import { supabase } from "@/lib/supabase";

export default function ExamPage() {

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

  const [score,
    setScore] =
    useState<number | null>(
      null
    );

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

  // INITIALIZE

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

      // CHECK ATTEMPT

      const {
        data: existingAttempt,
      } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "exam_id",
          examId
        )
        .maybeSingle();

      if (existingAttempt) {

        setAlreadyAttempted(
          true
        );

        setScore(
          existingAttempt.score
        );

        return;
      }

      // FETCH EXAM

      const {
        data: examData,
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "id",
          examId
        )
        .single();

      if (examData) {

        setExamInfo(
          examData
        );
      }
        if (examData?.duration) {

  setTimeLeft(
    examData.duration * 60
  );
}
      // FETCH QUESTIONS

      const {
        data,
        error,
      } = await supabase
        .from("questions")
        .select("*")
        .eq(
          "exam_id",
          examId
        );

      console.log(data);
      console.log(error);

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
      }
    }

    if (examId) {

      initializeExam();
    }

  }, [
    examId,
    router,
  ]);

  // TIMER RESTORE

  useEffect(() => {

    if (!examId) return;

    const savedStart =
      localStorage.getItem(
        `exam-start-${examId}`
      );

    if (savedStart) {

      const elapsedSeconds =
        Math.floor(
          (
            Date.now() -
            Number(savedStart)
          ) / 1000
        );

      const remaining =
        1800 -
        elapsedSeconds;

      if (remaining > 0) {

        setTimeLeft(
          remaining
        );

        setExamStarted(
          true
        );
      }
    }

  }, [examId]);

  // MULTIPLE TAB PROTECTION

  useEffect(() => {

    if (!examId) return;

    const existingTab =
      localStorage.getItem(
        `exam-active-${examId}`
      );

    if (
      existingTab &&
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
      "true"
    );

    return () => {

      localStorage.removeItem(
        `exam-active-${examId}`
      );
    };

  }, [
    examId,
    alreadyAttempted,
    router,
  ]);

  // ANTI CHEAT EVENTS

  useEffect(() => {

    const handleContextMenu =
      (e: MouseEvent) => {

        e.preventDefault();
      };

    const handleKeyDown =
      (e: KeyboardEvent) => {

        if (
          !examStarted ||
          !antiCheatEnabled
        ) {
          return;
        }

        const allowedKeys = [

          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
        ];

        if (
          allowedKeys.includes(
            e.key
          )
        ) {

          return;
        }

        handleViolation(
          "Keyboard usage detected"
        );
      };

    const handleVisibility =
  () => {

    if (
      submitted ||
      isSubmitting
    ) {
      return;
    }

    if (
      examStarted &&
      antiCheatEnabled &&
      document.hidden
    ) {

      handleViolation(
        "Tab switching detected"
      );
    }
  };

   const handleBlur =
  () => {

    if (
      submitted ||
      isSubmitting
    ) {
      return;
    }

    if (
      examStarted &&
      antiCheatEnabled
    ) {

      handleViolation(
        "Window focus lost"
      );
    }
  };

    const handleFullscreen =
      () => {

        if (
          examStarted &&
          antiCheatEnabled &&
          !document.fullscreenElement
        ) {

          handleViolation(
            "Fullscreen exited"
          );
        }
      };

    document.addEventListener(
      "contextmenu",
      handleContextMenu
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    window.addEventListener(
      "blur",
      handleBlur
    );

    document.addEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    return () => {

      document.removeEventListener(
        "contextmenu",
        handleContextMenu
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      window.removeEventListener(
        "blur",
        handleBlur
      );

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );
    };

  }, [
    examStarted,
    antiCheatEnabled,
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

localStorage.setItem(
  `exam-answers-${examId}`,
  JSON.stringify(
    updatedAnswers
  )
);
  }

  // SUBMIT EXAM

  async function submitExam() {

  if (
    isSubmitting ||
    alreadyAttempted
  ) {

    return;
  }

  setIsSubmitting(
    true
  );

  if (
    Object.keys(
      answers
    ).length === 0
  ) {

    alert(
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

  const { error } =
    await supabase
      .from(
        "exam_attempts"
      )
      .insert([
        {
          user_id:
            userId,

          exam_id:
            examId,

          score:
            correct,

          percentage:
            Number(
              (
                (
                  correct /
                  questions.length
                ) * 100
              ).toFixed(2)
            ),
        },
      ]);

  console.log(error);

  if (error) {

    alert(
     error.message
    );

    setIsSubmitting(
      false
    );

    return;
  }

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

  router.push(
    `/leaderboard/${examId}`
  );
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

      alert(
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

    setExamStarted(
      true
    );

    localStorage.setItem(
      `exam-start-${examId}`,
      Date.now().toString()
    );

    setTimeout(async () => {

      try {

        if (
          examContainerRef.current
            ?.requestFullscreen
        ) {

          await examContainerRef
            .current
            .requestFullscreen();
        }

      } catch (err) {

        console.log(
          "Fullscreen failed",
          err
        );
      }

      if (
        "wakeLock" in
        navigator
      ) {

        try {

          const lock =
            await (
              navigator as any
            )
              .wakeLock
              .request(
                "screen"
              );

          setWakeLock(
            lock
          );

        } catch (err) {

          console.log(
            err
          );
        }
      }

      setTimeout(() => {

        setAntiCheatEnabled(
          true
        );

      }, 5000);

    }, 300);
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

  return (

    <div
      ref={
        examContainerRef
      }
      className="min-h-screen overflow-y-auto p-4 md:p-8 bg-gray-50 select-none touch-pan-y"
    >

      {/* CAMERA */}

      {cameraAllowed && (

        <div className="fixed bottom-24 right-4 w-32 h-40 md:w-48 md:h-60 bg-black rounded-2xl overflow-hidden shadow-2xl z-50 border-4 border-white">

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

        <div className="flex gap-4 flex-wrap">

          <div className="text-2xl font-bold text-red-600 bg-white border px-4 py-2 rounded-2xl shadow-sm">

            {formatTime(
              timeLeft
            )}

          </div>

          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-2xl font-bold">

            Violations:
            {" "}
            {violations}/2

          </div>

        </div>

      </div>

      {/* QUESTIONS */}

      <div className="space-y-8 pb-44">

        {questions.map(
          (
            q,
            index
          ) => (

            <div
              key={q.id}
              className="border p-5 rounded-2xl bg-white shadow-sm"
            >

              <h2 className="font-bold mb-5 text-lg leading-relaxed">

                Q
                {index + 1}.
                {" "}
                {q.question}

              </h2>

              <div className="space-y-3">

                {[
                  q.option_a,
                  q.option_b,
                  q.option_c,
                  q.option_d,
                ].map(
                  (
                    option
                  ) => (

                    <button
                      key={
                        option
                      }
                      onClick={() =>
                        selectAnswer(
                          q.id,
                          option
                        )
                      }
                      className={`block w-full text-left border p-4 rounded-2xl transition-all ${
                        answers[
                          q.id
                        ] ===
                        option

                          ? "bg-blue-500 text-white border-blue-500"

                          : "bg-white"
                      }`}
                    >

                      {option}

                    </button>

                  )
                )}

              </div>

            </div>

          )
        )}

      </div>

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
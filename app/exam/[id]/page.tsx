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
import ExamQuestionPanel from "@/components/exam/ExamQuestionPanel";
import { supabase } from "@/lib/supabase/client";
import TCDLoader from "@/components/common/TCDLoader";
import ExamTopStats from "@/components/exam/ExamTopStats";
import useExamAutosave from "@/hooks/useExamAutosave";
import useLiveStudents from "@/hooks/useLiveStudents";
import StudentCameraStream
from "@/components/exam/StudentCameraStream";
import {
  fetchExam,
} from "@/services/exam.service";
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

function SummaryRow({
  icon,
  label,
  value,
  valueClass = "text-[#243B6B]",
}: {
  icon: string;
  label: string;
  value: number;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">

      <div className="flex items-center gap-3">

        <img
          src={icon}
          alt=""
          className="w-6 h-6"
        />

        <span className="font-semibold text-[#243B6B]">
          {label}
        </span>

      </div>

      <span className={`font-bold ${valueClass}`}>
        {value}
      </span>

    </div>
  );
}

export default function ExamPage() {

  const params = useParams();

  const router = useRouter();
  const [
  questionCache,
  setQuestionCache
] = useState<
  Record<number, any>
>({});
const [pendingSaves, setPendingSaves] =
  useState<
    {
      questionId: string;
      selectedOption: string | null;
    }[]
  >([]);
  const [savingAnswers, setSavingAnswers] = useState(false);
  const savingAnswersRef = useRef(false);
  const examId = Array.isArray(
    params.id
  )
    ? params.id[0]
    : params.id;


  const examContainerRef =
    useRef<HTMLDivElement>(
      null
    );
const [timerInitialized, setTimerInitialized] = useState(false);
const [
  examStartTime,
  setExamStartTime
] = useState<number | null>(null);
  const streamRef =
    useRef<MediaStream | null>(
      null
    );
   const audioContextRef =
  useRef<AudioContext | null>(null);

const audioAnalyserRef =
  useRef<AnalyserNode | null>(null);

const audioIntervalRef =
  useRef<ReturnType<typeof setInterval> | null>(null);

const audioVoiceStartRef =
  useRef<number | null>(null);

const audioViolationRef =
  useRef(false);
const [cameraStream,
  setCameraStream] =
  useState<MediaStream | null>(
    null
  );
  const [
  noFaceSince,
  setNoFaceSince
] = useState<number | null>(
  null
);
const [
  multipleFaceSince,
  setMultipleFaceSince
] = useState<number | null>(
  null
);
const videoRef =
  useRef<HTMLVideoElement | null>(null);
  const faceDetectionWorkerRef =
  useRef<Worker | null>(null);
  const faceDetectionBusyRef =
  useRef(false);
  const pendingSnapshotCanvasRef =
  useRef<HTMLCanvasElement | null>(
    null
  );
  useEffect(() => {

  if (
    typeof window === "undefined"
  ) {
    return;
  }

  const worker =
    new Worker(
      new URL(
        "@/workers/faceDetection.worker.ts",
        import.meta.url
      )
    );

  faceDetectionWorkerRef.current =
    worker;

return () => {

  worker.terminate();

  faceDetectionWorkerRef.current =
    null;

  faceDetectionBusyRef.current =
    false;

  pendingSnapshotCanvasRef.current =
    null;

};

}, []);
useEffect(() => {
  
  const worker =
    faceDetectionWorkerRef.current;

  if (!worker) {
    return;
  }
  if (
  faceDetectionBusyRef.current
) {
  return;
}

faceDetectionBusyRef.current =
  true;
  const handleMessage = (
    event: MessageEvent
  ) => {

    const {
      type,
      faceCount,
    } = event.data;

    if (type === "error") {

  console.error(
    "Face detection failed:",
    event.data.error
  );

  faceDetectionBusyRef.current =
    false;

  pendingSnapshotCanvasRef.current =
    null;

  return;
}

if (type !== "result") {
  return;
}

    handleFaceDetectionResult(
  faceCount
);

const canvas =
  pendingSnapshotCanvasRef.current;

pendingSnapshotCanvasRef.current =
  null;

if (canvas) {

  void uploadProctoringSnapshot(
    canvas,
    faceCount
  );
}
faceDetectionBusyRef.current =
  false;
  }

  worker.addEventListener(
    "message",
    handleMessage
  );
const handleError = (
  error: ErrorEvent
) => {

  console.error(
    "Face detection worker error:",
    error.message
  );

  faceDetectionBusyRef.current =
    false;

  pendingSnapshotCanvasRef.current =
    null;
};

worker.addEventListener(
  "error",
  handleError
);
  return () => {

  worker.removeEventListener(
    "message",
    handleMessage
  );

  worker.removeEventListener(
    "error",
    handleError
  );

};

}, []);

  const lastViolationRef =
    useRef(0);
    const lastViolationReasonRef =
  useRef<string | null>(
    null
  );
    const multipleFaceStartRef =
  useRef<number | null>(null);
    const timerSubmittedRef = useRef(false);
const snapshotIntervalRef =
  useRef<NodeJS.Timeout | null>(
    null
  );
  const [
  adminWarning,
  setAdminWarning
] = useState<string | null>(null);
const [
  isFullscreenBlurred,
  setIsFullscreenBlurred
] = useState(false);
const [
  language,
  setLanguage
] = useState<"en" | "hi">("en");
  const [answers,
    setAnswers] =
    useState<any>({});
const questionCacheRef =
  useRef<Record<number, any>>({});
  const prefetchingRef =
  useRef<Set<number>>(new Set());
  const questionNavigationLockRef =
  useRef(false);
  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);
    
    const [attemptId, setAttemptId] =
  useState<string | null>(null);
const [
  currentQuestionData,
  setCurrentQuestionData
] = useState<any>(null);
    
useEffect(() => {
  const activeButton =
    document.getElementById(
      `question-${currentQuestion}`
    );

  if (!activeButton) {
    return;
  }

  requestAnimationFrame(() => {
    activeButton.scrollIntoView({
      behavior: "auto",
      inline: "center",
      block: "nearest",
    });
  });
}, [currentQuestion]);

const [
  answeredQuestions,
  setAnsweredQuestions,
] = useState<number[]>([]);
const [
  markedQuestions,
  setMarkedQuestions
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
  cameraCorner,
  setCameraCorner
] = useState<
  "top-right" |
  "top-left" |
  "bottom-right" |
  "bottom-left"
>(() => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return "top-right";
  }
  return "bottom-right";
});
const savingRef = useRef(false);
const lastCameraMoveRef = useRef(0);
useEffect(() => {

  const saved =
    localStorage.getItem(
      "tcd-camera-corner"
    );

  if (saved) {

    setCameraCorner(
      saved as any
    );

  }

}, []);

useEffect(() => {

  localStorage.setItem(
    "tcd-camera-corner",
    cameraCorner
  );

}, [cameraCorner]);
function moveCameraAway(
  mouseX: number,
  mouseY: number
) {
  const corners = [
    {
      name: "top-left",
      x: 0,
      y: 0,
    },
    {
      name: "top-right",
      x: window.innerWidth,
      y: 0,
    },
    {
      name: "bottom-left",
      x: 0,
      y: window.innerHeight,
    },
    {
      name: "bottom-right",
      x: window.innerWidth,
      y: window.innerHeight,
    },
  ];

  let bestCorner = corners[0];
  let maxDistance = -1;

  for (const corner of corners) {

    const dx = corner.x - mouseX;
    const dy = corner.y - mouseY;

    const distance =
      dx * dx + dy * dy;

    if (distance > maxDistance) {

      maxDistance = distance;
      bestCorner = corner;

    }

  }

  setCameraCorner(bestCorner.name as any);
}
const [
  sessionToken,
  setSessionToken
] = useState("");

const sessionTokenRef = useRef("");

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
const [finalizingExam, setFinalizingExam] =
  useState(false);
  const [cameraAllowed,
    setCameraAllowed] =
    useState(false);

  const [micAllowed,
    setMicAllowed] =
    useState(false);

  const [submitting,
    setSubmitting] =
    useState(false);
    const [showSubmitSummary, setShowSubmitSummary] =
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
const cameraPositionClass = {

  "top-right":
    "top-4 right-4",

  "top-left":
    "top-4 left-4",

  "bottom-right":
    "bottom-4 right-4",

  "bottom-left":
    "bottom-4 left-4",

}[cameraCorner];

function moveCameraAwayFrom(element: HTMLElement | null) {
  if (!element) return;
  if (window.innerWidth >= 768) return;

  const camera = document.getElementById("student-camera");
  if (!camera) return;

  const cameraRect = camera.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const overlaps =
    cameraRect.left < elementRect.right &&
    cameraRect.right > elementRect.left &&
    cameraRect.top < elementRect.bottom &&
    cameraRect.bottom > elementRect.top;

  if (!overlaps) return;

  const positions: Array<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  > = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ];

  const current = positions.indexOf(cameraCorner);

  setCameraCorner(
    positions[(current + 1) % positions.length]
  );
}
  useEffect(() => {

    setMounted(true);

  }, []);
  useEffect(() => {
  if (
    !examStarted ||
    timerInitialized ||
    !currentQuestionData ||
    !examId ||
    !userId
  ) {
    return;
  }

  /*
   * IMPORTANT:
   * Never overwrite an existing exam start time.
   *
   * This is what makes the timer survive
   * a browser refresh.
   */
  const storageKey =
    `exam-start-time-${examId}-${userId}`;

  const existingStartTime =
    localStorage.getItem(
      storageKey
    );
const startTime =
  existingStartTime
    ? Number(existingStartTime)
    : Date.now();
 if (!existingStartTime) {
  localStorage.setItem(
    storageKey,
    startTime.toString()
  );
}

setExamStartTime(
  startTime
);

setTimerInitialized(true);

}, [
  examStarted,
  timerInitialized,
  currentQuestionData,
  examId,
  userId,
]);
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
const isDemo =
  localStorage.getItem(
    "tcd_demo"
  ) === "true";
      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user && !isDemo) {

  router.push(
    "/login"
  );

  return;
}
const currentUser = isDemo
  ? {
      id: "demo-user",
      email: "demo@tcd.local",
      user_metadata: {
        name: "Guest Student",
      },
    }
  : user!;
if (isDemo) {

  setUserId("demo-user");

  setStudentName(
    "Guest Student"
  );

  setExamInfo({
    id: "demo-exam",

    title:
      "TCD Demo Practice Test",

    description:
      "Experience the complete TCD exam platform.",

    duration: 30,

    totalQuestions: 10,
  });

  setLoading(false);

  return;
}

      setUserId(currentUser.id);
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
    currentUser.id
  )

  .single();
  const {
  data: memberships,
} = await supabase
  .from("user_institutes")
  .select("institute_id")
  .eq("user_id", currentUser.id);

const instituteIds =
  memberships?.map(
    (m) => m.institute_id
  ) || [];
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
    currentUser.id
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

  currentUser.user_metadata
    ?.name ||

  currentUser.email ||

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
    currentUser.id
  )

  .maybeSingle();

if (existingAttempt) {

  if (
    existingAttempt.status ===
    "submitted"
  ) {

    setAlreadyAttempted(
      true
    );

    setScore(
      existingAttempt.score
    );

    setLoading(false);

    return;
  }

  if (
    existingAttempt.status ===
    "active"
  ) {

    setResumeAvailable(
      true
    );
  }
}
      const {
  data: examData,
} = await fetchExam(
  examId
);
const { count } = await supabase
  .from("exam_questions")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("exam_id", examId);
if (
  examData?.exam_scope !== "PUBLIC" &&
  !instituteIds.includes(
    examData?.institute_id
  )
) {

  toast.error(
    "Unauthorized exam access"
  );

  router.push(
    "/dashboard"
  );

  return;
}
      setExamInfo({
  ...examData,
  totalQuestions: count || 0,
});

     

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
  try {
    const restoredAnswers =
      JSON.parse(
        savedAnswers
      );

    if (
      restoredAnswers &&
      typeof restoredAnswers ===
        "object"
    ) {
      setAnswers(
        restoredAnswers
      );

      /*
       * Rebuild the pending save queue
       * after a browser refresh.
       *
       * This ensures answers that were saved
       * locally but not yet synchronized with
       * Supabase are sent to the server again.
       */
      const restoredPendingSaves =
        Object.entries(
          restoredAnswers
        ).map(
          ([
            questionId,
            selectedOption,
          ]) => ({
            questionId,
            selectedOption:
              selectedOption as
                string | null,
          })
        );

      setPendingSaves(
        restoredPendingSaves
      );
    }
  } catch (error) {
    console.warn(
      "Unable to restore saved answers:",
      error
    );
  }
}

  }, [mounted, examId]);

 useEffect(() => {
  if (
    !examId ||
    !userId ||
    submitted
  ) {
    return;
  }

  localStorage.setItem(
    `exam-current-question-${examId}-${userId}`,
    currentQuestion.toString()
  );

}, [
  currentQuestion,
  examId,
  userId,
  submitted,
]);
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

  violations,

  submitted,

  cameraAllowed,

  micAllowed,

  userId,

  examId,
]);

useEffect(() => {

  function disableRightClick(
    e: MouseEvent
  ) {

    e.preventDefault();

    handleViolation(
      "Right click detected"
    );
  }

  document.addEventListener(
    "contextmenu",
    disableRightClick
  );

  return () => {

    document.removeEventListener(
      "contextmenu",
      disableRightClick
    );
  };

}, []);
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
    data.warning_message
  );

  setAdminWarning(
    data.warning_message
  );

}

  if (
  data.force_submit === true
) {

  alert(
    "Teacher force submitted your exam"
  );

  await submitExam();

  return;

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
  examInfo?.totalQuestions || 0,

  });

  
 function handleViolation(
  reason: string
) {
  const now = Date.now();

  /*
   * Prevent the SAME violation from firing repeatedly
   * within a short period.
   *
   * Different violations are still allowed through.
   */
  const normalizedReason =
    reason.trim().toLowerCase();

  const lastReason =
    lastViolationReasonRef.current;

  const lastTime =
    lastViolationRef.current;

  if (
    normalizedReason === lastReason &&
    now - lastTime < 5000
  ) {
    return;
  }

  lastViolationRef.current =
    now;

  lastViolationReasonRef.current =
    normalizedReason;

  /*
   * Update local violation count FIRST.
   *
   * The exam must never depend on the network
   * to record a violation.
   */
  setViolations((prev) => {
    const updated =
      prev + 1;

    /*
     * Inform the student immediately.
     */
    toast.error(
      `${reason}. Violations: ${updated}/10`
    );

    /*
     * Auto-submit at the configured threshold.
     *
     * Use a separate timeout so submitExam()
     * is NOT called from inside the state updater.
     */
    if (
      updated >= 10
    ) {
      setTimeout(() => {
        void submitExam();
      }, 500);
    }

    return updated;
  });

  /*
   * --------------------------------------------------
   * SERVER SYNCHRONIZATION
   * --------------------------------------------------
   *
   * These requests are deliberately non-blocking.
   *
   * If the network is unavailable, the exam must
   * continue normally.
   */
  if (
    userId &&
    examId &&
    navigator.onLine
  ) {
    void supabase
      .from("exam_sessions")
      .update({
        /*
         * This is only a server-side mirror.
         * The local React state is authoritative during
         * temporary network loss.
         */
        total_violations:
          violations + 1,
      })
      .eq(
        "exam_id",
        examId
      )
      .eq(
        "user_id",
        userId
      )
      .eq(
        "status",
        "active"
      );

    void supabase
      .from(
        "proctoring_events"
      )
      .insert({
        attempt_id:
          examId,

        student_id:
          userId,

        event_type:
          "violation",

        violation_reason:
          reason,

        created_at:
          new Date().toISOString(),
      });
  }
}
async function enterExamFullscreen() {
  try {
    const element =
      examContainerRef.current;

    if (!element) {
      return;
    }

    await element.requestFullscreen();

    setIsFullscreenBlurred(false);
  } catch (error) {
    console.error(
      "Unable to enter fullscreen:",
      error
    );

    toast.error(
      "Unable to enter fullscreen. Please try again."
    );
  }
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
  function startAudioMonitoring() {
  const stream =
    streamRef.current;

  if (!stream) {
    return;
  }

  const audioTracks =
    stream.getAudioTracks();

  if (
    audioTracks.length === 0
  ) {
    console.warn(
      "No microphone track available"
    );

    return;
  }

  /*
   * Prevent multiple audio monitors.
   */
  if (
    audioContextRef.current
  ) {
    return;
  }

  try {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      console.warn(
        "Web Audio API is not supported"
      );

      return;
    }

    const audioContext =
      new AudioContextClass();

    const analyser =
      audioContext.createAnalyser();

    analyser.fftSize = 2048;

    analyser.smoothingTimeConstant =
      0.8;

    const source =
      audioContext.createMediaStreamSource(
        stream
      );

    source.connect(
      analyser
    );

    audioContextRef.current =
      audioContext;

    audioAnalyserRef.current =
      analyser;

    const dataArray =
      new Uint8Array(
        analyser.fftSize
      );

    const checkAudio =
      () => {
        /*
         * Stop if the exam is no longer active.
         */
        if (
          submitted ||
          !examStarted
        ) {
          return;
        }

        analyser.getByteTimeDomainData(
          dataArray
        );

        let sum = 0;

        for (
          let i = 0;
          i < dataArray.length;
          i++
        ) {
          const normalized =
            (dataArray[i] - 128) /
            128;

          sum +=
            normalized *
            normalized;
        }

        const rms =
          Math.sqrt(
            sum /
              dataArray.length
          );

        /*
         * Conservative threshold.
         *
         * Normal background noise should generally
         * remain below this level.
         */
        const VOICE_THRESHOLD =
          0.08;

        const now =
          Date.now();

        if (
          rms >=
          VOICE_THRESHOLD
        ) {
          /*
           * Start sustained-audio timer.
           */
          if (
            audioVoiceStartRef.current ===
            null
          ) {
            audioVoiceStartRef.current =
              now;
          }

          const duration =
            now -
            audioVoiceStartRef.current;

          /*
           * Require sustained audio activity
           * before generating a violation.
           */
          if (
            duration >= 5000 &&
            !audioViolationRef.current
          ) {
            audioViolationRef.current =
              true;

            handleViolation(
              "Sustained audio activity detected"
            );
          }
        } else {
          /*
           * Audio has stopped.
           *
           * Reset the current audio incident.
           */
          audioVoiceStartRef.current =
            null;

          audioViolationRef.current =
            false;
        }

        if (
  !audioIntervalRef.current
) {
  audioIntervalRef.current =
    setInterval(
      checkAudio,
      100
    );
}
      };

    void audioContext.resume();

    checkAudio();

  } catch (error) {
    console.error(
      "AUDIO MONITORING ERROR:",
      error
    );
  }
}
function stopAudioMonitoring() {
  if (
  audioIntervalRef.current !==
  null
) {
  clearInterval(
    audioIntervalRef.current
  );

  audioIntervalRef.current =
    null;
}

  audioVoiceStartRef.current =
    null;

  audioViolationRef.current =
    false;

  if (
    audioContextRef.current
  ) {
    void audioContextRef.current.close();

    audioContextRef.current =
      null;
  }

  audioAnalyserRef.current =
    null;
}


async function uploadProctoringSnapshot(
  canvas: HTMLCanvasElement,
  faceCount: number
) {
  try {

    const blob =
      await new Promise<Blob | null>(
        (resolve) =>
          canvas.toBlob(
            resolve,
            "image/jpeg",
            0.7
          )
      );

    if (!blob) {
      return;
    }

    const fileName =
      `${userId}/${examId}/${Date.now()}.jpg`;

    const {
      data: uploadData,
      error,
    } =
      await supabase.storage
        .from("proctoring")
        .upload(
          fileName,
          blob,
          {
            upsert: false,
          }
        );

    if (error) {

      console.error(
        "Snapshot Upload Error:",
        error
      );

      return;
    }

    const {
      data: publicUrlData,
    } =
      supabase.storage
        .from("proctoring")
        .getPublicUrl(
          uploadData.path
        );

    const imageUrl =
      publicUrlData.publicUrl;

    const {
      error:
        snapshotInsertError,
    } =
      await supabase
        .from(
          "proctoring_snapshots"
        )
        .insert({
          attempt_id: null,
          student_id: userId,
          image_url: imageUrl,
          face_count: faceCount,
        });

    if (
      snapshotInsertError
    ) {

      console.error(
        "Snapshot DB Error:",
        snapshotInsertError
      );

    }

  } catch (error) {

    console.error(
      "Background snapshot error:",
      error
    );

  }
}

function handleFaceDetectionResult(
  faceCount: number
) {

  /*
   * Save the face scan in the background.
   * It must never block question navigation.
   */
  void supabase
    .from("proctoring_events")
    .insert({
      attempt_id: examId,
      student_id: userId,
      event_type: "face_scan",
      face_count: faceCount,
    });

  /*
   * No face detection
   */
  if (faceCount === 0) {

    if (!noFaceSince) {

      setNoFaceSince(
        Date.now()
      );

    } else {

      const duration =
        Date.now() -
        noFaceSince;

      if (duration >= 30000) {

        handleViolation(
          "Face not visible for 30 seconds"
        );

        setNoFaceSince(
          Date.now()
        );
      }
    }

  } else {

    setNoFaceSince(null);
  }

  /*
   * Multiple faces
   */
  if (faceCount > 1) {

    if (
      multipleFaceStartRef.current ===
      null
    ) {

      multipleFaceStartRef.current =
        Date.now();

    } else {

      const duration =
        Date.now() -
        multipleFaceStartRef.current;

      if (duration >= 5000) {

        handleViolation(
          "Multiple faces detected"
        );

        multipleFaceStartRef.current =
          -1;
      }
    }

  } else {

    multipleFaceStartRef.current =
      null;
  }
}
  async function uploadSnapshot() {

  const video =
    videoRef.current;

  if (
    !video ||
    video.readyState < 2 ||
    video.videoWidth === 0 ||
    video.videoHeight === 0
  ) {
    return;
  }

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width = 320;
  canvas.height = 240;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.drawImage(
    video,
    0,
    0,
    320,
    240
  );

  const worker =
    faceDetectionWorkerRef.current;

  if (!worker) {
    return;
  }

  try {

    /*
     * Keep this canvas for the
     * background snapshot upload.
     */
    pendingSnapshotCanvasRef.current =
      canvas;

    const imageBitmap =
      await createImageBitmap(
        canvas
      );

    worker.postMessage(
      {
        imageBitmap,
      },
      [imageBitmap]
    );

 } catch (error) {

  console.error(
    "Unable to send frame to face detection worker:",
    error
  );

  faceDetectionBusyRef.current =
    false;

  pendingSnapshotCanvasRef.current =
    null;
}
}
async function resumeExam() {
  if (!sessionToken) {
    toast.error(
      "Session missing"
    );

    return;
  }

  /*
   * Restore the last question position saved
   * before the browser was refreshed.
   */
  let restoredQuestion =
    currentQuestion;

  try {
    const savedQuestion =
      localStorage.getItem(
        `exam-current-question-${examId}-${userId}`
      );

    if (
      savedQuestion !== null
    ) {
      const parsedQuestion =
        Number.parseInt(
          savedQuestion,
          10
        );

      if (
        Number.isInteger(
          parsedQuestion
        ) &&
        parsedQuestion >= 0
      ) {
        restoredQuestion =
          parsedQuestion;
      }
    }
  } catch (error) {
    console.warn(
      "Unable to restore question position:",
      error
    );
  }

  /*
   * Restore the question position BEFORE
   * loading the question.
   */
  setCurrentQuestion(
    restoredQuestion
  );

  await fetchQuestionByIndex(
    restoredQuestion
  );

  /*
   * Continue building the rolling buffer
   * from the restored position.
   */
  void prefetchQuestionsAhead(
    restoredQuestion + 1
  );

  setExamStarted(
    true
  );

  toast.success(
    "Exam session restored"
  );
}
useEffect(() => {
  if (!examStarted || submitted) {
    return;
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      setIsFullscreenBlurred(true);

      handleViolation(
        "Fullscreen exited"
      );

      return;
    }

    setIsFullscreenBlurred(false);
  };

  document.addEventListener(
    "fullscreenchange",
    handleFullscreen
  );

  if (!document.fullscreenElement) {
    setIsFullscreenBlurred(true);
  }

  return () => {
    document.removeEventListener(
      "fullscreenchange",
      handleFullscreen
    );
  };
}, [
  examStarted,
  submitted,
]);

useEffect(() => {

  if (!examStarted || submitted) return;

  const handleVisibility = () => {

    if (document.hidden) {

      handleViolation(
        "Tab switched"
      );

    }

  };

  document.addEventListener(
    "visibilitychange",
    handleVisibility
  );

  return () => {

    document.removeEventListener(
      "visibilitychange",
      handleVisibility
    );

  };

}, [examStarted, submitted]);
async function fetchQuestionByIndex(
  index: number
) {
  if (!sessionToken) {
    console.error(
      "Missing session token"
    );

    return;
  }

  /*
   * 1. MEMORY CACHE
   *
   * Fastest path.
   */
  const cachedQuestion =
    questionCacheRef.current[index];

  if (cachedQuestion) {
    setCurrentQuestionData(
      cachedQuestion
    );

    setCurrentQuestion(index);

    return;
  }

  /*
   * 2. PERSISTENT CACHE
   *
   * Recover questions that were already
   * loaded earlier in this exam.
   */
  try {
    const storageKey =
      `exam-question-cache-${examId}`;

    const stored =
      sessionStorage.getItem(
        storageKey
      );

    if (stored) {
      const parsed =
        JSON.parse(stored);

      const storedQuestion =
        parsed?.[index];

      if (storedQuestion) {
        questionCacheRef.current[index] =
          storedQuestion;

        setQuestionCache(
          parsed
        );

        setCurrentQuestionData(
          storedQuestion
        );

        setCurrentQuestion(index);

        return;
      }
    }
  } catch (error) {
    console.warn(
      "Unable to read cached exam question:",
      error
    );
  }

  /*
   * 3. NETWORK
   *
   * Only fetch from the server if the
   * question is not available locally.
   */
  if (!navigator.onLine) {
    console.warn(
      "Question is not cached and device is offline:",
      index
    );

    return;
  }

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
            questionIndex: index,
            sessionToken,
          }),
        }
      );

    const result =
      await response.json();

    if (
      !response.ok ||
      !result.data
    ) {
      console.warn(
        "Question fetch failed:",
        response.status,
        result
      );

      return;
    }

    const total =
      result.totalQuestions || 1;

    setTotalQuestions(total);

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
        () => Math.random() - 0.5
      ),
    };

    /*
     * 4. MEMORY CACHE
     */
    questionCacheRef.current[index] =
      shuffledQuestion;

    /*
     * 5. REACT CACHE
     */
    setQuestionCache((prev) => {
      const updated = {
        ...prev,
        [index]:
          shuffledQuestion,
      };

      /*
       * 6. PERSISTENT CACHE
       */
      try {
        const storageKey =
          `exam-question-cache-${examId}`;

        sessionStorage.setItem(
          storageKey,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.warn(
          "Unable to persist exam question cache:",
          error
        );
      }

      return updated;
    });

    setCurrentQuestionData(
      shuffledQuestion
    );

    setCurrentQuestion(index);

    /*
     * 7. PREFETCH NEXT QUESTION
     *
     * Do this only after the current
     * question has been displayed.
     */
    if (index + 1 < total) {
      prefetchQuestion(
        index + 1
      );
    }
  } catch (error) {
    console.warn(
      "Unable to load exam question:",
      error
    );
  }
}
async function prefetchQuestion(
  index: number
) {
  // Never prefetch outside the exam.
  if (
    index < 0 ||
    (
      totalQuestions > 0 &&
      index >= totalQuestions
    )
  ) {
    return;
  }

  // Already cached in memory.
  if (
    questionCacheRef.current[index]
  ) {
    return;
  }

  // Already being fetched.
  if (
    prefetchingRef.current.has(index)
  ) {
    return;
  }

  // Do not create network requests while offline.
  if (!navigator.onLine) {
    return;
  }

  prefetchingRef.current.add(index);

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
            questionIndex: index,
            sessionToken,
          }),
        }
      );

    if (!response.ok) {
      console.warn(
        "Question prefetch failed:",
        response.status,
        index
      );

      return;
    }

    const result =
      await response.json();

    if (
      !result.data
    ) {
      return;
    }

    /*
     * Keep totalQuestions updated from
     * the server response.
     */
    const serverTotal =
      result.totalQuestions;

    if (
      typeof serverTotal ===
      "number" &&
      serverTotal > 0
    ) {
      setTotalQuestions(
        serverTotal
      );
    }

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
        () => Math.random() - 0.5
      ),
    };

    /*
     * 1. MEMORY CACHE
     */
    questionCacheRef.current[index] =
      shuffledQuestion;

    /*
     * 2. REACT + SESSION CACHE
     */
  
  } catch (error) {
    /*
     * Prefetch failure must never
     * interrupt the exam.
     */
    console.warn(
      "PREFETCH ERROR:",
      error
    );
  } finally {
    prefetchingRef.current.delete(
      index
    );
  }
}
async function prefetchQuestionsAhead(
  startIndex: number
) {
  if (!navigator.onLine) {
    return;
  }

  const BUFFER_SIZE = 5;

  const knownTotal =
    totalQuestions > 0
      ? totalQuestions
      : Number.MAX_SAFE_INTEGER;

  const endIndex =
    Math.min(
      startIndex + BUFFER_SIZE,
      knownTotal
    );

  const indexesToPrefetch: number[] = [];

  for (
    let index = startIndex;
    index < endIndex;
    index++
  ) {
    if (
      questionCacheRef.current[index]
    ) {
      continue;
    }

    if (
      prefetchingRef.current.has(index)
    ) {
      continue;
    }

    indexesToPrefetch.push(index);
  }

  if (
    indexesToPrefetch.length === 0
  ) {
    return;
  }

  /*
   * Prefetch concurrently.
   *
   * This changes:
   *
   * Q11 → Q12 → Q13 → Q14
   *
   * into:
   *
   * Q11 ┐
   * Q12 ├── fetched together
   * Q13 │
   * Q14 ┘
   */
 for (
  const index of indexesToPrefetch
) {
  void prefetchQuestion(index);
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
  setAttemptId(
  result.session?.attempt_id ||
  null
);



if (!response.ok) {


 // Paid exam accessed without
  // a valid entry-fee payment.
  if (
    response.status === 402 &&
    result.paymentRequired
  ) {
    router.replace(
      `/exam/${examId}/entry`
    );

    return;
  }
  if (
    result.error ===
    "You have already submitted this exam"
  ) {

    
    router.replace(
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
sessionTokenRef.current = token;


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
 

if (!questionResponse.ok) {

  alert(
    JSON.stringify(
      questionResult,
      null,
      2
    )
  );

  return;
}


setTotalQuestions(
  questionResult.totalQuestions || 1
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
    () => Math.random() - 0.5
  ),
};


questionCacheRef.current[0] =
  shuffledQuestion;

setQuestionCache({
  0: shuffledQuestion,
});

setCurrentQuestionData(
  shuffledQuestion
);

setCurrentQuestion(0);
}
if (
  questionResult.totalQuestions > 1
) {
  prefetchQuestion(1);
}
if (window.innerWidth < 768) {
  setCameraCorner("top-right");
}
setExamStarted(true);

localStorage.setItem(
  `exam-started-${examId}-${userId}`,
  "true"
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

  

 const newValue =
  answers[questionId] === answer
    ? null
    : answer;



setAnswers(
  (prev: any) => ({
    ...prev,

    [questionId]: newValue,
  })
);
const updatedAnswers = {
  ...answers,
  [questionId]: newValue,
};

try {
  localStorage.setItem(
    `exam-answers-${examId}-${userId}`,
    JSON.stringify(updatedAnswers)
  );
} catch (error) {
  console.warn(
    "Unable to persist answer locally:",
    error
  );
}
setPendingSaves(prev => {

  const filtered = prev.filter(
    item => item.questionId !== questionId
  );

  return [
    ...filtered,
    {
      questionId,
      selectedOption: newValue,
    },
  ];

});

if (!newValue) {

  setAnsweredQuestions(
    prev =>
      prev.filter(
        q =>
          q !== currentQuestion
      )
  );

} else {

  setAnsweredQuestions(
    prev =>
      prev.includes(
        currentQuestion
      )
        ? prev
        : [
            ...prev,
            currentQuestion,
          ]
  );
}
  
  return;
}
useEffect(() => {
  if (
    !examStarted ||
    submitted
  ) {
    return;
  }

  if (
    !streamRef.current
  ) {
    return;
  }

  startAudioMonitoring();

  return () => {
    stopAudioMonitoring();
  };
}, [
  examStarted,
  submitted,
]);
useEffect(() => {
  if (!sessionToken || pendingSaves.length === 0) {
    return;
  }

  const saveAll = async () => {
    if (savingRef.current) {
      return;
    }

    if (!navigator.onLine) {
      return;
    }

    const queue = [...pendingSaves];

    if (queue.length === 0) {
      return;
    }

    savingRef.current = true;
    savingAnswersRef.current = true;
    setSavingAnswers(true);

    try {
      for (const item of queue) {
        try {
          const response = await fetch(
            "/api/exam/save-answer",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                examId,
                questionId:
                  item.questionId,
                selectedOption:
                  item.selectedOption,
                sessionToken,
              }),
            }
          );

          if (!response.ok) {
            const result =
              await response
                .json()
                .catch(() => null);

            throw new Error(
              result?.error ||
                "Failed to save answer"
            );
          }

          /*
           * Remove ONLY the answer that was
           * successfully saved.
           *
           * If the student changed the answer
           * while this request was running,
           * the newer answer will remain queued.
           */
          setPendingSaves((current) =>
            current.filter(
              (currentItem) =>
                !(
                  currentItem.questionId ===
                    item.questionId &&
                  currentItem.selectedOption ===
                    item.selectedOption
                )
            )
          );
        } catch (error) {
          /*
           * IMPORTANT:
           * Do NOT remove the failed answer.
           * It stays in pendingSaves and will
           * be retried when the connection returns.
           */
          console.warn(
            "Answer save failed. Keeping answer in queue.",
            error
          );

          break;
        }
      }
    } finally {
      savingAnswersRef.current = false;
      savingRef.current = false;
      setSavingAnswers(false);
    }
  };

  void saveAll();

  const handleOnline = () => {
    void saveAll();
  };

  window.addEventListener(
    "online",
    handleOnline
  );

  const retryInterval =
    window.setInterval(() => {
      void saveAll();
    }, 5000);

  return () => {
    window.removeEventListener(
      "online",
      handleOnline
    );

    window.clearInterval(
      retryInterval
    );
  };
}, [
  pendingSaves,
  sessionToken,
  examId,
]);


useEffect(() => {

  if (
    !examStarted ||
    !cameraStream
  ) {
    return;
  }

 snapshotIntervalRef.current =
  setInterval(() => {

    if (
      faceDetectionBusyRef.current
    ) {
      return;
    }

    void uploadSnapshot();

  }, 15000);

  return () => {

    if (
      snapshotIntervalRef.current
    ) {

      clearInterval(
        snapshotIntervalRef.current
      );

    }

  };

}, [
  examStarted,
  cameraStream
]);
useEffect(() => {
  if (!examStarted) {
    return;
  }

  const checkCameraPosition = () => {
    const nextButton =
      document.getElementById(
        "next-button"
      );

    const previousButton =
      document.getElementById(
        "previous-button"
      );

    const submitButton =
      document.getElementById(
        "submit-button"
      );

    const markReviewButton =
      document.getElementById(
        "mark-review-button"
      );

    moveCameraAwayFrom(nextButton);
    moveCameraAwayFrom(previousButton);
    moveCameraAwayFrom(submitButton);
    moveCameraAwayFrom(
      markReviewButton
    );
  };

  /*
   * Check once after the question changes.
   */
  requestAnimationFrame(() => {
    checkCameraPosition();
  });

  /*
   * Do NOT run camera calculations on
   * every scroll event.
   *
   * This is important for smooth question
   * scrolling on slower devices.
   */
  const handleResize = () => {
    requestAnimationFrame(() => {
      checkCameraPosition();
    });
  };

  window.addEventListener(
    "resize",
    handleResize
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}, [
  examStarted,
  currentQuestion,
]);

useEffect(() => {

  if (submitted) return;

  // Push a history state so the Back button stays on this page
  window.history.pushState(
    null,
    "",
    window.location.href
  );

  const handleBackButton = () => {

    // Keep the user on the exam page
    window.history.pushState(
      null,
      "",
      window.location.href
    );

    toast.error(
      "Back navigation is disabled during the exam."
    );

    // Optional: Count as a violation
    // incrementViolation("BACK_BUTTON");

  };

  window.addEventListener(
    "popstate",
    handleBackButton
  );

  return () => {

    window.removeEventListener(
      "popstate",
      handleBackButton
    );

  };

}, [submitted]);

useEffect(() => {

  if (submitted) return;

  const handleKeyDown = (e: KeyboardEvent) => {

    // Allow normal typing inside inputs
    const target = e.target as HTMLElement;

    if (
      target?.tagName === "INPUT" ||
      target?.tagName === "TEXTAREA"
    ) {
      return;
    }

    const suspicious =

      e.key === "F12" ||

      (e.ctrlKey && e.key.toLowerCase() === "c") ||

      (e.ctrlKey && e.key.toLowerCase() === "v") ||

      (e.ctrlKey && e.key.toLowerCase() === "x") ||

      (e.ctrlKey && e.key.toLowerCase() === "u") ||

      (e.ctrlKey && e.key.toLowerCase() === "p") ||

      (e.ctrlKey && e.key.toLowerCase() === "s") ||

      (e.ctrlKey && e.key.toLowerCase() === "f") ||

      (e.ctrlKey &&
        e.shiftKey &&
        ["i", "j", "c"].includes(
          e.key.toLowerCase()
        ));

    if (!suspicious) return;

    e.preventDefault();

    
   handleViolation("Restricted keyboard shortcut");

  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {

    window.removeEventListener(
      "keydown",
      handleKeyDown
    );

  };

}, [submitted]);
  async function flushPendingAnswers() {
  const token =
  sessionToken || sessionTokenRef.current;

if (!token) {
  throw new Error("Session not initialized");
}

  // Wait for an autosave already in progress
  const startTime = Date.now();

  while (savingAnswersRef.current) {
    if (Date.now() - startTime > 15000) {
      throw new Error(
        "Answer saving timed out. Please check your connection."
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 100)
    );
  }

  // Save anything still waiting in the queue
  const queue = [...pendingSaves];

  if (queue.length === 0) {
    return;
  }

  savingAnswersRef.current = true;
  setSavingAnswers(true);

  try {
    for (const item of queue) {
      const response = await fetch(
        "/api/exam/save-answer",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            examId,
            questionId: item.questionId,
            selectedOption: item.selectedOption,
           sessionToken: token,
          }),
        }
      );

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to save latest answer."
        );
      }
    }

    // Remove only answers that were successfully flushed
    setPendingSaves((current) =>
      current.filter(
        (currentItem) =>
          !queue.some(
            (savedItem) =>
              savedItem.questionId ===
                currentItem.questionId &&
              savedItem.selectedOption ===
                currentItem.selectedOption
          )
      )
    );
  } finally {
    savingAnswersRef.current = false;
    setSavingAnswers(false);
  }
}
async function submitExam() {
  console.log(
    "========== AUTO SUBMIT START =========="
  );

  if (
    submitting ||
    submitted ||
    timerSubmittedRef.current
  ) {
    console.log("Submit blocked");
    return;
  }

  timerSubmittedRef.current = true;

  setSubmitting(true);
  setFinalizingExam(true);

  /*
   * --------------------------------------------------
   * 1. SAVE ALL PENDING ANSWERS FIRST
   * --------------------------------------------------
   *
   * If the device is offline, flushPendingAnswers()
   * will not be able to save them. That's okay.
   *
   * We keep the exam state locally and wait for the
   * connection before final submission.
   */
  try {
    await flushPendingAnswers();
  } catch (error) {
    console.warn(
      "Final answer save failed. Waiting for connection.",
      error
    );
  }

  /*
   * --------------------------------------------------
   * 2. WAIT FOR NETWORK BEFORE FINAL SUBMISSION
   * --------------------------------------------------
   */
  if (!navigator.onLine) {
    toast.info(
      "Your answers are safe. Waiting for internet connection..."
    );

    await new Promise<void>((resolve) => {
      const handleOnline = () => {
        window.removeEventListener(
          "online",
          handleOnline
        );

        resolve();
      };

      window.addEventListener(
        "online",
        handleOnline
      );
    });

    toast.success(
      "Internet connection restored. Submitting your exam..."
    );

    /*
     * Give the browser a moment to stabilize
     * the connection before making the request.
     */
    await new Promise<void>((resolve) => {
      window.setTimeout(
        resolve,
        500
      );
    });
  }

  /*
   * --------------------------------------------------
   * 3. GET SESSION TOKEN
   * --------------------------------------------------
   */
  const token =
    sessionToken ||
    sessionTokenRef.current;

  if (!token) {
    console.error(
      "Missing session token during submission."
    );

    toast.error(
      "Your exam session could not be verified."
    );

    setSubmitting(false);
    setFinalizingExam(false);
    timerSubmittedRef.current = false;

    return;
  }

  /*
   * --------------------------------------------------
   * 4. SUBMIT EXAM
   * --------------------------------------------------
   *
   * Network errors are handled separately from
   * server errors.
   */
  let response: Response | null =
    null;

  let result: any = null;

  try {
    response = await fetch(
      "/api/exam/submit",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          examId,
          sessionToken: token,
        }),
      }
    );

    console.log(
      "SUBMIT STATUS:",
      response.status
    );

    result =
      await response
        .json()
        .catch(() => null);

    console.log(
      "SUBMIT RESPONSE:",
      result
    );
  } catch (error) {
    /*
     * ------------------------------------------------
     * NETWORK FAILURE
     * ------------------------------------------------
     *
     * The exam is NOT considered submitted.
     * Keep the exam state alive and wait for the
     * connection to return.
     */
    console.warn(
      "Exam submission network error:",
      error
    );

    toast.info(
      "Connection interrupted. Your exam is safe. Waiting for internet..."
    );

    /*
     * Wait for connection to return.
     */
    await new Promise<void>((resolve) => {
      const handleOnline = () => {
        window.removeEventListener(
          "online",
          handleOnline
        );

        resolve();
      };

      window.addEventListener(
        "online",
        handleOnline
      );
    });

    toast.success(
      "Connection restored. Retrying submission..."
    );

    /*
     * Retry submission once connection
     * has returned.
     */
    try {
      response = await fetch(
        "/api/exam/submit",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            examId,
            sessionToken: token,
          }),
        }
      );

      console.log(
        "RETRY SUBMIT STATUS:",
        response.status
      );

      result =
        await response
          .json()
          .catch(() => null);

      console.log(
        "RETRY SUBMIT RESPONSE:",
        result
      );
    } catch (retryError) {
      console.error(
        "Retry submission failed:",
        retryError
      );

      toast.error(
        "Connection is still unstable. Please keep this exam open and try again."
      );

      setSubmitting(false);
      setFinalizingExam(false);

      /*
       * Allow the student to attempt submission
       * again without refreshing the exam.
       */
      timerSubmittedRef.current =
        false;

      return;
    }
  }

  /*
   * --------------------------------------------------
   * 5. SERVER ERROR
   * --------------------------------------------------
   */
  if (
    !response ||
    !response.ok
  ) {
    toast.error(
      result?.error ||
        "Submission failed. Please try again."
    );

    setSubmitting(false);
    setFinalizingExam(false);

    timerSubmittedRef.current =
      false;

    return;
  }

  /*
   * --------------------------------------------------
   * 6. SERVER CONFIRMED SUBMISSION
   * --------------------------------------------------
   *
   * From this point onward the attempt is safely
   * submitted. Everything below is post-submission
   * processing.
   */
  setScore(result.score);

  localStorage.setItem(
    `exam-score-${examId}-${userId}`,
    result.score.toString()
  );

  /*
   * --------------------------------------------------
   * 7. LEVEL / RANK INFORMATION
   * --------------------------------------------------
   */
  const {
    data: beforeLevel,
  } = await supabase
    .from("user_levels")
    .select("level")
    .eq("user_id", userId)
    .single();

  const {
    data: beforeRanks,
  } = await supabase
    .from("leaderboard_view")
    .select("user_id")
    .order("xp", {
      ascending: false,
    });

  const previousRankIndex =
    beforeRanks?.findIndex(
      (r: any) =>
        r.user_id === userId
    );

  const previousRank =
    previousRankIndex !==
      undefined &&
    previousRankIndex >= 0
      ? previousRankIndex + 1
      : null;

  const {
    data: afterRanks,
  } = await supabase
    .from("leaderboard_view")
    .select("user_id")
    .order("xp", {
      ascending: false,
    });

  const newRankIndex =
    afterRanks?.findIndex(
      (r: any) =>
        r.user_id === userId
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
          "Leaderboard Updated",

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
    data: afterLevel,
  } = await supabase
    .from("user_levels")
    .select("level")
    .eq("user_id", userId)
    .single();

  if (
    afterLevel?.level >
    beforeLevel?.level
  ) {
    setLevelUp(true);
  }

  setShowXP(true);

  /*
   * --------------------------------------------------
   * 8. ACTIVITY FEED
   * --------------------------------------------------
   */
  await supabase
    .from("activity_feed")
    .insert({
      user_id: userId,

      activity_type:
        "exam",

      title:
        "Exam Completed",

      description:
        `Scored ${result.percentage}% in ${examInfo?.title}`,

      metadata: {
        score: result.score,

        percentage:
          result.percentage,

        exam_id: examId,

        xp_earned:
          10 +
          Math.floor(
            result.percentage / 2
          ),
      },
    });

  /*
   * --------------------------------------------------
   * 9. UPDATE LIVE STATUS
   * --------------------------------------------------
   */
  await supabase
    .from("exam_live_status")
    .update({
      submitted: true,
      fullscreen: false,
    })
    .eq("exam_id", examId)
    .eq("user_id", userId);

  /*
   * --------------------------------------------------
   * 10. CLEAR EXAM STATE
   * --------------------------------------------------
   *
   * ONLY clear local exam state AFTER the server
   * has confirmed successful submission.
   */
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

  /*
   * Stop camera.
   */
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

  /*
   * Exit fullscreen.
   */
  if (
    document.fullscreenElement
  ) {
    await document.exitFullscreen();
  }

  /*
   * Clear session.
   */
  localStorage.removeItem(
    `exam-session-${examId}-${userId}`
  );

  sessionTokenRef.current =
    "";

  /*
   * --------------------------------------------------
   * 11. REDIRECT TO RESULT
   * --------------------------------------------------
   */
  setTimeout(() => {
    setShowXP(false);

    sessionStorage.setItem(
      `achievement-count-${result.attemptId}`,
      String(
        result.achievementCount ||
          0
      )
    );

    sessionStorage.setItem(
      `achievement-reward-${result.attemptId}`,
      String(
        result.achievementReward ||
          0
      )
    );

    console.log(
      "Redirecting to result page..."
    );

    router.replace(
      `/exam-result/${result.attemptId}`
    );
  }, 5000);
}
const answeredCount = Object.keys(answers).length;

const markedCount = markedQuestions.length;

const unansweredCount =
  totalQuestions - answeredCount;

const completionPercentage =
  totalQuestions > 0
    ? Math.round(
        (answeredCount / totalQuestions) * 100
      )
    : 0;
  if (!mounted) {

    return null;
  }

  if (loading) {
  return (
    <TCDLoader text="Preparing Your Exam" />
  );
}

 if (
  alreadyAttempted &&
  !submitted
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
if (submitted || finalizingExam) {

  return (

    <TCDLoader
      text="Finalizing Your Performance..."
    />

  );

}

    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br

from-[#F7F9FC]

to-[#EEF3FB]">

      <div className="text-center">

        <h1 className="text-3xl font-black text-tcd-blue mb-4">

          Exam Submitted Successfully

        </h1>

        <TCDLoader
  text="Calculating Your Score..."
/>

      </div>

    </main>

  

  if (
    !examStarted &&
    examInfo
  ) {

    return (
  <main className="min-h-screen bg-gradient-to-br from-[#F7F9FC] to-[#EEF3FB] flex items-center justify-center p-6">

    <div className="w-full max-w-3xl bg-white rounded-[36px] border border-[#243B6B]/10 shadow-[0_20px_60px_rgba(36,59,107,0.12)] overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-[#243B6B] to-[#36558F] px-8 py-8 text-center">

        <img
          src="/icons/tcd-shield.svg"
          alt="TCD"
          className="w-20 h-20 mx-auto mb-4"
        />

        <h1 className="text-4xl font-black text-white">
          {examInfo.title}
        </h1>

        <p className="text-[#F2D27A] mt-2 text-lg">
          Excellence • Integrity • Performance
        </p>

      </div>

      <div className="p-8">

        {/* Description */}

        <p className="text-center text-brand text-lg mb-8">
          {examInfo.description}
        </p>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="rounded-2xl bg-[#F8FAFD] border border-[#243B6B]/10 p-5">

            <p className="text-sm text-brand-light">
              Duration
            </p>

            <p className="text-3xl font-black text-[#243B6B]">
              {examInfo?.duration ?? 0}
            </p>

            <p className="text-sm text-brand-light">
              Minutes
            </p>

          </div>

          <div className="rounded-2xl bg-[#F8FAFD] border border-[#243B6B]/10 p-5">

            <p className="text-sm text-brand-light">
              Questions
            </p>

            <p className="text-3xl font-black text-[#243B6B]">
              {examInfo?.totalQuestions || 0}
            </p>

            <p className="text-sm text-brand-light">
              Total
            </p>

          </div>

        </div>

        {/* Instructions */}

        <div className="rounded-[28px] border border-[#D4AF37]/30 bg-[#FFF9E8] p-6 mb-8">

          <div className="flex items-center gap-3 mb-5">

            <img
              src="/icons/tcd-shield.svg"
              alt=""
              className="w-8 h-8"
            />

            <h3 className="text-2xl font-black text-[#243B6B]">
              Exam Guidelines
            </h3>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <img src="/icons/security.svg" className="w-5 h-5" alt="" />
              <span>Fullscreen mode is mandatory.</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/security.svg" className="w-5 h-5" alt="" />
              <span>Camera permission is mandatory.</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/security.svg" className="w-5 h-5" alt="" />
              <span>Microphone permission is mandatory.</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/answered.svg" className="w-5 h-5" alt="" />
              <span>Your answers are automatically saved.</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/bookmark.svg" className="w-5 h-5" alt="" />
              <span>You can resume if the browser closes unexpectedly.</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/security.svg" className="w-5 h-5" alt="" />
              <span>Ten violations will automatically submit the exam.</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/security.svg" className="w-5 h-5" alt="" />
              <span>Do not switch tabs during the examination.</span>
            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="space-y-4">

          <button
            onClick={requestPermissions}
            className="
              w-full

              py-4

              rounded-2xl

              bg-gradient-to-r

              from-[#243B6B]

              to-[#36558F]

              text-white

              font-bold

              text-lg

              hover:scale-[1.01]

              transition-all
            "
          >
            Allow Camera & Microphone
          </button>

          {resumeAvailable && (

            <button
              onClick={resumeExam}
              className="
                w-full

                py-4

                rounded-2xl

                border-2

                border-[#D4AF37]

                bg-[#FFF9E8]

                text-[#243B6B]

                font-bold

                text-lg

                hover:bg-[#FFF3C4]

                transition
              "
            >
              Resume Previous Session
            </button>

          )}

          <button
            onClick={startExam}
            className="
              w-full

              py-4

              rounded-2xl

              bg-[#D4AF37]

              hover:bg-[#C89A1F]

              text-white

              font-black

              text-xl

              transition
            "
          >
            Start Examination
          </button>

        </div>

      </div>

    </div>

  </main>
);
  }

  return (

 <div
  ref={examContainerRef}
  className="min-h-screen bg-gradient-to-br
    from-[#F7F9FC]
    to-[#EEF3FB]
    p-5"
>
<div
  className={`transition-all duration-200 ${
    isFullscreenBlurred
      ? "blur-md pointer-events-none select-none"
      : ""
  }`}
>

      <div className="sticky top-0 z-30 bg-gray-50 pb-2 mb-4">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">

          <h1
  className="
    text-3xl

    font-black

    text-[#243B6B]

    flex

    items-center

    gap-3
  "
>

  <img
  src="/logo.png"
  className="w-12 h-12 object-contain"
  alt="The Conclusion Daily"
/>

<div className="flex flex-col">
  <span className="text-xl md:text-2xl font-black leading-tight">
    TCD Exam
  </span>

  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
    Hope & Faith
  </span>
</div>

</h1>

          <ExamTopStats
  durationMinutes={
    examInfo?.duration || 30
  }
  examStartTime={
    examStartTime
  }
  liveStudents={
    liveStudents
  }
  violations={
    violations
  }
  onTimeUp={
    submitExam
  }
/>

        </div>

      </div>

<div
  id="student-camera"

 onMouseEnter={(e) => {

  if (window.innerWidth < 768)
    return;

  const now = Date.now();

  if (
    now -
      lastCameraMoveRef.current <
    600
  ) {
    return;
  }

  lastCameraMoveRef.current =
    now;

  moveCameraAway(
    e.clientX,
    e.clientY
  );

}}

  className={`
    fixed
    ${cameraPositionClass}

    transition-all
    duration-500
    ease-in-out

    z-[9999]

    w-16
    h-16

    md:w-24
    md:h-24

    lg:w-40
    lg:h-40

    overflow-hidden
    rounded-2xl
    border
    border-[#D4AF37]
    shadow-[0_0_25px_rgba(212,175,55,0.25)]
    bg-black
  `}
>

  <StudentCameraStream
    stream={cameraStream}
    videoRef={videoRef}
  />

</div>

<button
onClick={() => {

  const positions = [

    "bottom-right",

    "bottom-left",

    "top-left",

    "top-right",

  ];

  const current =
    positions.indexOf(
      cameraCorner
    );

  setCameraCorner(
    positions[
      (current + 1) %
      positions.length
    ] as any
  );

}}
className="
hidden md:flex

fixed

bottom-28
right-4

z-[10000]

items-center
justify-center

w-12
h-12

rounded-full

bg-[#243B6B]

text-white

font-black
"
>
↔
</button>

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
  async (index: number) => {

    await fetchQuestionByIndex(
      index
    );

  }
}
  visitedQuestions={
    visitedQuestions
  }
  answeredQuestions={
    answeredQuestions
  }
  markedQuestions={
  markedQuestions
}
/>

      </div>

      <div className="max-w-5xl mx-auto">

        <div
  className="
    bg-white

    p-8

    rounded-[32px]

    border

    border-[#243B6B]/10

    shadow-[0_10px_40px_rgba(36,59,107,0.08)]

    text-[#243B6B]
  "
>

          <div className="flex items-center gap-3 mb-5">

  <img
    src="/icons/tcd-shield.svg"
    alt=""
    className="w-6 h-6"
  />

  <h2
    className="
      text-2xl

      font-black

      text-[#243B6B]
    "
  >
    Question {currentQuestion + 1}
  </h2>
<div className="flex gap-2 mt-3">

  <button
    onClick={() => setLanguage("en")}
    className={`
      px-4
      py-2
      rounded-xl
      font-bold
      ${
        language === "en"
          ? "bg-[#243B6B] text-white"
          : "bg-gray-100 text-brand"
      }
    `}
  >
    English
  </button>

  <button
    onClick={() => setLanguage("hi")}
    className={`
      px-4
      py-2
      rounded-xl
      font-bold
      ${
        language === "hi"
          ? "bg-[#D4AF37] text-white"
          : "bg-gray-100 text-brand"
      }
    `}
  >
    हिन्दी
  </button>

</div>
</div>

         
<ExamQuestionPanel
  question={currentQuestionData}
  language={language}
  selectedAnswer={
    currentQuestionData
      ? answers[currentQuestionData.id] ?? null
      : null
  }
  onSelectAnswer={selectAnswer}
/>

        </div>

      </div>

      <div className="flex justify-between items-center mt-5">

        <button
  id="previous-button"
  onClick={async () => {
    if (
  questionNavigationLockRef.current
) {
  return;
}

questionNavigationLockRef.current =
  true;
  const prevIndex =
    Math.max(
      currentQuestion - 1,
      0
    );

  if (
    prevIndex === currentQuestion
  ) {
    return;
  }

  /*
   * If the previous question is already
   * cached, display it immediately.
   */
  const cachedQuestion =
    questionCacheRef.current[
      prevIndex
    ];

  if (cachedQuestion) {

  setCurrentQuestionData(
    cachedQuestion
  );

  setCurrentQuestion(
    prevIndex
  );

  requestAnimationFrame(() => {

    moveCameraAwayFrom(
      document.getElementById(
        "previous-button"
      )
    );

    questionNavigationLockRef.current =
      false;

  });

  return;
}

  /*
   * Fallback if the previous question
   * was not cached.
   */
 try {

  await fetchQuestionByIndex(
    prevIndex
  );

} finally {

  questionNavigationLockRef.current =
    false;

}

  requestAnimationFrame(() => {
    moveCameraAwayFrom(
      document.getElementById(
        "previous-button"
      )
    );
  });
}}

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

text-[#243B6B]

border-[#243B6B]/20

hover:bg-[#243B6B]/5

    font-bold

    shadow-sm

    transition

    disabled:opacity-50
  "
>
  Previous
</button>
  <button
  id="mark-review-button"
  onClick={() => {

    setMarkedQuestions(
      prev =>
        prev.includes(
          currentQuestion
        )
          ? prev
          : [
              ...prev,
              currentQuestion
            ]
    );

    toast.success(
      "Marked for review"
    );
  }}

  className="
    px-8
    py-3

    rounded-2xl

    bg-[#D4AF37]

hover:bg-[#C89A1F]

    text-white
    font-bold
  "
>

  Mark For Review

</button>
        <div className="flex gap-2">

  {currentQuestion <
  Math.max(
    totalQuestions - 1,
    0
  ) && (

  <button
  id="next-button"
  onClick={async() => {
    
  const nextIndex =
    currentQuestion + 1;

  if (
    nextIndex >= totalQuestions
  ) {
    return;
  }
if (
  questionNavigationLockRef.current
) {
  return;
}

questionNavigationLockRef.current =
  true;
  // If already prefetched, switch instantly
  const cachedQuestion =
  questionCacheRef.current[nextIndex];

if (cachedQuestion) {

  setCurrentQuestionData(
    cachedQuestion
  );

  setCurrentQuestion(
    nextIndex
  );

  requestAnimationFrame(() => {

       questionNavigationLockRef.current =
      false;

  });
  if (
      nextIndex + 1 <
      totalQuestions
    ) {
      void prefetchQuestion(
        nextIndex + 1
      );
    }
  
  return;
}

  // Fallback if prefetch has not completed
 try {

  await fetchQuestionByIndex(
    nextIndex
  );

} finally {

  questionNavigationLockRef.current =
    false;

}

}}

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
  id="submit-button"
  onClick={() => setShowSubmitSummary(true)}

      className="
        px-8
        py-3

        rounded-2xl

        bg-gradient-to-r

from-[#243B6B]

to-[#36558F]

hover:scale-[1.02]

transition-all
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

    {showSubmitSummary &&
 currentQuestion === Math.max(totalQuestions - 1, 0) && (

  <div
    className="
      fixed
      inset-0
      z-[9999]
      bg-black/70
      backdrop-blur-md
      flex
      items-center
      justify-center
      p-6
    "
  >

    <div
      className="
        bg-white
        rounded-[32px]
        p-8
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
      "
    >
     <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="flex justify-center mb-8">

  <div className="relative w-44 h-44">

    <svg
      className="w-44 h-44 -rotate-90"
      viewBox="0 0 160 160"
    >

      {/* Background Circle */}

      <circle
        cx="80"
        cy="80"
        r="68"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="10"
      />

      {/* Progress Circle */}

      <circle
        cx="80"
        cy="80"
        r="68"
        fill="none"
        stroke="url(#tcdGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 68}
        strokeDashoffset={
          2 * Math.PI * 68 *
          (1 - completionPercentage / 100)
        }
        className="
transition-all
duration-1000
animate-[tcdPop_.25s_ease-out]
"

      />

      <defs>

        <linearGradient
          id="tcdGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >

          <stop
            offset="0%"
            stopColor="#D4AF37"
          />

          <stop
            offset="100%"
            stopColor="#243B6B"
          />

        </linearGradient>

      </defs>

    </svg>

    {/* Center Content */}

    <div
      className="
        absolute

        inset-0

        flex

        flex-col

        items-center

        justify-center
      "
    >

      <img
        src="/icons/tcd-shield.svg"
        alt=""
        className="w-10 h-10 mb-2"
      />

      <span
        className="
          text-4xl

          font-black

          text-[#243B6B]
        "
      >
        {completionPercentage}%
      </span>

      <span
        className="
          text-sm

          text-brand-light

          tracking-wide
        "
      >
        COMPLETED
      </span>

    </div>

  </div>

</div>
<div className="text-center mb-8">

  <p className="text-[#243B6B] font-semibold text-lg">

    {answeredCount === totalQuestions
      ? "Outstanding! Every question has been attempted."
      : `You have completed ${answeredCount} out of ${totalQuestions} questions.`}

  </p>

</div>

  {/* Total */}

  <div className="rounded-2xl border border-[#243B6B]/10 p-4 bg-[#F8FAFD]">

    <div className="flex items-center gap-2">

      <img
        src="/icons/questions.svg"
        className="w-6 h-6"
        alt=""
      />

      <span className="text-sm text-brand-light">
        Total
      </span>

    </div>

    <p className="text-3xl font-black text-[#243B6B] mt-2">

      {totalQuestions}

    </p>

  </div>

  {/* Answered */}

  <div className="rounded-2xl border border-green-200 p-4 bg-green-50">

    <div className="flex items-center gap-2">

      <img
        src="/icons/answered.svg"
        className="w-6 h-6"
        alt=""
      />

      <span className="text-sm text-green-700">

        Answered

      </span>

    </div>

    <p className="text-3xl font-black text-green-600 mt-2">

      {answeredCount}

    </p>

  </div>

  {/* Marked */}

  <div className="rounded-2xl border border-[#D4AF37]/30 p-4 bg-[#FFF9E8]">

    <div className="flex items-center gap-2">

      <img
        src="/icons/bookmark.svg"
        className="w-6 h-6"
        alt=""
      />

      <span className="text-sm text-[#9A7315]">

        Marked

      </span>

    </div>

    <p className="text-3xl font-black text-[#D4AF37] mt-2">

      {markedCount}

    </p>

  </div>

  {/* Unanswered */}

  <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">

    <div className="flex items-center gap-2">

      <img
        src="/icons/unanswered.svg"
        className="w-6 h-6"
        alt=""
      />

      <span className="text-sm text-brand-light">

        Unanswered

      </span>

    </div>

    <p className="text-3xl font-black text-brand mt-2">

      {unansweredCount}

    </p>

  </div>

</div>
<div className="mt-4 rounded-2xl border border-[#243B6B]/10 p-4 bg-[#F8FAFD]">

  <div className="flex justify-between items-center">

    <div className="flex items-center gap-3">

      <img
        src="/icons/security.svg"
        className="w-6 h-6"
        alt=""
      />

      <span className="font-semibold text-[#243B6B]">

        Security Violations

      </span>

    </div>

    <span
      className={`text-2xl font-black ${
        violations > 0
          ? "text-red-600"
          : "text-green-600"
      }`}
    >
      {violations}
    </span>

  </div>

</div>
{unansweredCount > 0 ? (

  <div className="mt-6 rounded-2xl bg-[#FFF9E8] border border-[#D4AF37]/40 p-4">

    <p className="text-[#9A7315] font-semibold">

      You still have <strong>{unansweredCount}</strong> unanswered question{unansweredCount > 1 ? "s" : ""}.
      Review them before submitting if needed.

    </p>

  </div>

) : (

  <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-4">

    <p className="text-green-700 font-semibold">

      Excellent! You have attempted every question.

    </p>

  </div>

)}
<div className="mt-8 flex gap-4">

  <button
    onClick={() => setShowSubmitSummary(false)}
    className="
      flex-1
      py-4
      rounded-2xl
      border
      border-[#243B6B]
      text-[#243B6B]
      font-bold
      hover:bg-[#243B6B]/5
      transition
    "
  >
    Continue Exam
  </button>

  <button
    onClick={async () => {

      setShowSubmitSummary(false);

      await submitExam();

    }}
    className="
      flex-1
      py-4
      rounded-2xl
      bg-gradient-to-r
      from-[#243B6B]
      to-[#36558F]
      text-white
      font-bold
      hover:scale-[1.02]
      transition-all
    "
  >
    Final Submit
  </button>

</div>

  </div>

</div>
 )}
 {adminWarning && (

  <div
    className="
      fixed
      inset-0
      z-[99999]
      bg-black/70
      backdrop-blur-md
      flex
      items-center
      justify-center
      p-4
    "
  >

    <div
      className="
        bg-white
        rounded-[32px]
        p-8
        max-w-md
        w-full
        text-center
        border
        border-[#D4AF37]/30
      "
    >

      <img
        src="/icons/security.svg"
        alt=""
        className="
          w-16
          h-16
          mx-auto
          mb-4
        "
      />

      <h2
        className="
          text-2xl
          font-black
          text-[#243B6B]
        "
      >
        Admin Warning
      </h2>

      <p
        className="
          mt-4
          text-brand
        "
      >
        {adminWarning}
      </p>

      <button

  onClick={async () => {

    setAdminWarning(
      null
    );

    await supabase

      .from(
        "exam_live_status"
      )

      .update({

        warning_message:
          null,

        warning_sent_at:
          null,

      })

      .eq(
        "user_id",
        userId
      );

  }}

>
  Understood
</button>

    </div>

  </div>

)}
</div>
{isFullscreenBlurred && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
    <div className="mx-6 w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <span className="text-3xl">
          🔒
        </span>
      </div>

      <h2 className="text-2xl font-bold text-slate-900">
        Fullscreen Required
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Your examination has been paused because
        fullscreen mode was exited.
      </p>

      <p className="mt-2 text-sm font-medium text-slate-700">
        Return to fullscreen to continue your examination.
      </p>

      <button
        type="button"
        onClick={enterExamFullscreen}
        className="mt-7 w-full rounded-2xl bg-[#0F3D91] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#0C3278] active:scale-[0.98]"
      >
        ENTER FULLSCREEN
      </button>

    </div>
  </div>
)}
 </div>
);
}

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
async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 8000
): Promise<Response> {
  const controller = new AbortController();

  const timeout = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
}
function isIOSDevice() {
  if (typeof navigator === "undefined") return false;

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1)
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

    const [networkStatus, setNetworkStatus] =
  useState<"online" | "offline" | "degraded">(
    "online"
  );

const networkCheckRef =
  useRef<ReturnType<typeof setTimeout> | null>(
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

const faceDetectionRequestIdRef =
  useRef(0);
const faceDetectionTimeoutRef =
  useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const lastForceSubmitAtRef =
  useRef<string | null>(null);

const pendingSnapshotRef =
  useRef<
    Map<
      number,
      HTMLCanvasElement
    >
  >(new Map());

  const pendingSnapshotUploadRef =
  useRef<
    Map<number, Promise<string | null>>
  >(new Map());

  const faceScanQueueRef =
  useRef<number[]>([]);

const faceScanProcessingRef =
  useRef(false);

  const snapshotRecordQueueRef =
  useRef<string[]>([]);

const snapshotRecordProcessingRef =
  useRef(false);

const violationQueueRef =
  useRef<
    Array<{
      reason: string;
      violationCount: number;
    }>
  >([]);

const violationProcessingRef =
  useRef(false);


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

  pendingSnapshotRef.current.clear();

};

}, []);
useEffect(() => {
  const worker =
    faceDetectionWorkerRef.current;

  if (!worker) {
    return;
  }

  const handleMessage = (
    event: MessageEvent
  ) => {
    const {
      type,
      faceCount,
      requestId,
    } = event.data;

    if (type === "error") {
      console.error(
        "Face detection failed:",
        event.data.error
      );
 if (
    faceDetectionTimeoutRef.current
  ) {
    clearTimeout(
      faceDetectionTimeoutRef.current
    );

    faceDetectionTimeoutRef.current =
      null;
  }

      faceDetectionBusyRef.current =
        false;

      if (requestId !== undefined) {
        pendingSnapshotRef.current.delete(
          requestId
        );
      }

      return;
    }

    if (type !== "result") {
      return;
    }
if (
  faceDetectionTimeoutRef.current
) {
  clearTimeout(
    faceDetectionTimeoutRef.current
  );

  faceDetectionTimeoutRef.current =
    null;
}
    /*
     * Process the detection result.
     */
    handleFaceDetectionResult(
      faceCount
    );

  /*
 * Recover and release the canvas reference.
 *
 * The snapshot upload was already started
 * inside uploadSnapshot().
 *
 * DO NOT upload it again here.
 */
pendingSnapshotRef.current.delete(
  requestId
);

    /*
     * Worker is ready for another frame.
     */
    faceDetectionBusyRef.current =
      false;
  };

  const handleError = (
  error: ErrorEvent
) => {
  console.error(
    "Face detection worker error:",
    error.message
  );

  if (
    faceDetectionTimeoutRef.current
  ) {
    clearTimeout(
      faceDetectionTimeoutRef.current
    );

    faceDetectionTimeoutRef.current =
      null;
  }

  faceDetectionBusyRef.current =
    false;

  pendingSnapshotRef.current.clear();
};

  /*
   * ALWAYS register the listeners.
   * The busy flag belongs to frame submission,
   * not Worker initialization.
   */
  worker.addEventListener(
    "message",
    handleMessage
  );

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
    if (
  faceDetectionTimeoutRef.current
) {
  clearTimeout(
    faceDetectionTimeoutRef.current
  );

  faceDetectionTimeoutRef.current =
    null;
}
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
  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);
  const prefetchingRef =
  useRef<
    Map<number, Promise<any>>
  >(new Map());
  const questionNavigationLockRef =
  useRef(false);
  const pendingNavigationRef =
  useRef(0);
   const submittingRef =
  useRef(false);
    
    const [attemptId, setAttemptId] =
  useState<string | null>(null);
  const attemptIdRef =
  useRef<string | null>(null);
const sessionIdRef =
  useRef<string | null>(null);
useEffect(() => {
  attemptIdRef.current =
    attemptId;
}, [attemptId]);
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

  handleQuestionVisited(
    currentQuestion
  );

  /*
   * Keep the next few questions ready
   * in the background.
   *
   * This never blocks the current question.
   */
  void prefetchQuestionsAhead(
    currentQuestion
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
  const handleOffline = () => {
    setNetworkStatus("offline");
  };

  const handleOnline = () => {
    /*
     * Browser connection has returned.
     *
     * Don't immediately assume the API is healthy.
     * Give the browser a moment to restore connectivity.
     */
    setNetworkStatus("degraded");

    if (networkCheckRef.current) {
      clearTimeout(
        networkCheckRef.current
      );
    }

    networkCheckRef.current =
      setTimeout(() => {
        if (navigator.onLine) {
          setNetworkStatus("online");
        } else {
          setNetworkStatus("offline");
        }
      }, 1000);
  };

  if (!navigator.onLine) {
    setNetworkStatus("offline");
  }

  window.addEventListener(
    "offline",
    handleOffline
  );

  window.addEventListener(
    "online",
    handleOnline
  );

  return () => {
    window.removeEventListener(
      "offline",
      handleOffline
    );

    window.removeEventListener(
      "online",
      handleOnline
    );

    if (networkCheckRef.current) {
      clearTimeout(
        networkCheckRef.current
      );
    }
  };
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
    const violationsRef = useRef(0);

    const localAnswerChangeRef =
  useRef(false);

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

/*
 * Restore violation count for an existing active exam session.
 *
 * IMPORTANT:
 * This runs in the background.
 *
 * The exam UI must NEVER wait for Supabase
 * just to restore the violation count.
 */
void supabase
  .from("exam_sessions")
  .select("total_violations")
  .eq(
    "user_id",
    currentUser.id
  )
  .eq(
    "exam_id",
    examId
  )
  .eq(
    "status",
    "active"
  )
  .maybeSingle()
  .then(
    ({
      data: savedViolationSession,
      error: savedViolationError,
    }) => {

      if (savedViolationError) {
        console.warn(
          "Unable to restore violation count:",
          savedViolationError
        );

        return;
      }

      if (!savedViolationSession) {
        return;
      }

      const savedViolations =
        savedViolationSession.total_violations ??
        0;

      /*
       * Never allow a delayed server response
       * to reduce the locally known violation count.
       */
      if (
        savedViolations >
        violationsRef.current
      ) {
        violationsRef.current =
          savedViolations;

        setViolations(
          savedViolations
        );
      }
    }
  );
     const {
  data: profileData,
  error: profileError,
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

if (profileError) {
  console.error(
    "PROFILE LOAD ERROR:",
    profileError
  );

  toast.error(
    "Unable to verify your exam access. Please check your connection and try again."
  );

  setLoading(false);

  return;
}
const {
  data: memberships,
  error: membershipError,
} = await supabase
  .from("user_institutes")
  .select("institute_id")
  .eq(
    "user_id",
    currentUser.id
  );

if (membershipError) {
  console.error(
    "INSTITUTE MEMBERSHIP LOAD ERROR:",
    membershipError
  );

  toast.error(
    "Unable to verify your institute access. Please check your connection and try again."
  );

  setLoading(false);

  return;
}

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
/*
 * Restore saved answers in the background.
 *
 * IMPORTANT:
 *
 * Exam startup must NOT wait for this query.
 * The student can start seeing the exam immediately.
 *
 * If the request succeeds, the answers are restored
 * into the local state.
 *
 * If it fails, the exam continues normally.
 */
void supabase
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
  )
  .then(
    ({
      data: savedAnswersData,
      error: savedAnswersError,
    }) => {

      if (savedAnswersError) {

        console.warn(
          "Unable to restore saved answers:",
          savedAnswersError
        );

        return;
      }

      if (!savedAnswersData) {
        return;
      }

      const formattedAnswers =
        savedAnswersData.reduce(
          (
            acc: Record<
              string,
              string | null
            >,
            item: {
              question_id: string;
              selected_option:
                | string
                | null;
            }
          ) => {

            acc[
              item.question_id
            ] =
              item.selected_option;

            return acc;

          },
          {}
        );
/*
 * Do not overwrite an answer that the
 * student has already changed locally.
 */
if (
  localAnswerChangeRef.current
) {
  return;
}
      /*
       * Restore answer state.
       */
      setAnswers(
        formattedAnswers
      );

      /*
       * Restore answered question
       * palette state.
       *
       * Only questions with an actual
       * selected option are considered
       * answered.
       */
      setAnsweredQuestions(
        Object.entries(
          formattedAnswers
        )
          .filter(
            ([, answer]) =>
              answer !== null &&
              answer !== ""
          )
          .map(
            ([questionId]) =>
              Number(questionId)
          )
      );

    }
  );
      setStudentName(

  currentUser.user_metadata
    ?.name ||

  currentUser.email ||

  "Student"
);
/*
 * Check whether the student already has an attempt.
 *
 * IMPORTANT:
 * This request is allowed to fail/timeout without
 * freezing the exam UI.
 */
let existingAttempt = null;

try {
  const result = await Promise.race([
    supabase
      .from("exam_attempts")
      .select("*")
      .eq(
        "exam_id",
        examId
      )
      .eq(
        "user_id",
        currentUser.id
      )
      .maybeSingle(),

    new Promise<{
      data: null;
      error: Error;
    }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: null,
            error: new Error(
              "Existing attempt request timed out"
            ),
          }),
        5000
      )
    ),
  ]);

  /*
   * A real database error or timeout means
   * we cannot safely determine whether this
   * student already submitted the exam.
   *
   * Therefore, DO NOT allow a new attempt.
   */
  if (result.error) {
    console.error(
      "EXISTING ATTEMPT LOAD ERROR:",
      result.error
    );

    toast.error(
      "Connection is taking too long. Please check your network and try again."
    );

    setLoading(false);

    return;
  }

  existingAttempt =
    result.data;

} catch (error) {

  console.error(
    "EXISTING ATTEMPT CHECK FAILED:",
    error
  );

  toast.error(
    "Unable to verify your exam attempt. Please check your connection and try again."
  );

  setLoading(false);

  return;
}

/*
 * Existing submitted attempt.
 */
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

  /*
   * Existing active attempt.
   *
   * Allow the student to resume.
   */
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

/*
 * Question count is useful for the UI,
 * but it must NOT block exam startup.
 *
 * The actual questions are loaded through
 * prefetchQuestion() / fetchQuestionByIndex().
 */
void supabase
  .from("exam_questions")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq(
    "exam_id",
    examId
  )
  .then(
    ({
      count,
      error: questionCountError,
    }) => {

      if (questionCountError) {
        console.warn(
          "Unable to load question count:",
          questionCountError
        );

        return;
      }

      if (
        typeof count === "number" &&
        count > 0
      ) {

        setTotalQuestions(
          count
        );

        setExamInfo(
          (previous: any) =>
            previous
              ? {
                  ...previous,
                  totalQuestions:
                    count,
                }
              : previous
        );
      }
    }
  );

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
  totalQuestions: 0,
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

  sessionTokenRef.current =
    savedSession;
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

  if (!examStarted) {
    return;
  }

  if (!sessionToken) {
    return;
  }

  /*
   * Start loading questions ahead of the
   * student's current position.
   *
   * This runs in the background and does
   * NOT block the current question.
   */
void prefetchQuestionsAhead(
  currentQuestion
);

}, [
  currentQuestion,
  examStarted,
  sessionToken,
  totalQuestions,
]);
useEffect(() => {
  if (
    !examStarted ||
    !sessionToken
  ) {
    return;
  }

  const handleOnline = () => {
  void prefetchQuestionsAhead(
    currentQuestion
  );
};

  window.addEventListener(
    "online",
    handleOnline
  );

  return () => {
    window.removeEventListener(
      "online",
      handleOnline
    );
  };
}, [
  examStarted,
  sessionToken,
  totalQuestions,
]);
useEffect(() => {

  if (
    !userId ||
    !examStarted
  ) {
    return;
  }

 const interval = setInterval(() => {
  if (!navigator.onLine) {
    return;
  }

  void updateLiveStatus({
    exam_id: examId,
    user_id: userId,
    student_name: studentName,
    current_question: currentQuestion + 1,
    violations,
    fullscreen: !!document.fullscreenElement,
    camera_enabled: cameraAllowed,
    mic_enabled: micAllowed,
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
if (!navigator.onLine) {
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

}else {
  setAdminWarning(null);
}

 if (
  data.force_submit === true &&
  data.force_submit_at &&
  data.force_submit_at !==
    lastForceSubmitAtRef.current
) {
  lastForceSubmitAtRef.current =
    data.force_submit_at;

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

      .subscribe((status) => {
  if (status === "CHANNEL_ERROR") {
    console.warn(
      "Realtime proctoring connection failed. Exam will continue."
    );
  }

  if (status === "TIMED_OUT") {
    console.warn(
      "Realtime proctoring connection timed out. Exam will continue."
    );
  }

  if (status === "CLOSED") {
    console.warn(
      "Realtime proctoring connection closed. Exam will continue."
    );
  }
});

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

async function syncViolationCount(
  violationCount: number
) {
  if (
    !userId ||
    !examId ||
    !sessionIdRef.current ||
    !navigator.onLine
  ) {
    return;
  }

  const sessionId =
    sessionIdRef.current;

  try {
    const {
      error,
    } = await supabase
      .from("exam_sessions")
      .update({
        total_violations:
          violationCount,
      })
      .eq(
        "id",
        sessionId
      );

    if (error) {
      console.error(
        "VIOLATION SESSION UPDATE ERROR:",
        error
      );

      return;
    }

  } catch (error) {

    console.error(
      "VIOLATION SESSION HANDLER ERROR:",
      error
    );
  }
}

async function saveViolationEvent(
  reason: string
) {
  if (
    !userId ||
    !attemptIdRef.current ||
    !navigator.onLine
  ) {
    return;
  }

  /*
   * Capture immutable values for this
   * specific violation event.
   *
   * The exam may continue while this
   * request is running.
   */
  const studentId =
    userId;

  const attemptId =
    attemptIdRef.current;

  const violationReason =
    reason;

  const createdAt =
    new Date().toISOString();

  try {

    const {
      error,
    } = await supabase
      .from(
        "proctoring_events"
      )
      .insert({
        attempt_id:
          attemptId,

        student_id:
          studentId,

        event_type:
          "violation",

        violation_reason:
          violationReason,

        created_at:
          createdAt,
      });

    if (error) {
      console.error(
        "PROCTORING VIOLATION INSERT ERROR:",
        error
      );

      return;
    }

  } catch (error) {

    console.error(
      "VIOLATION EVENT HANDLER ERROR:",
      error
    );
  }
}
async function handleViolation(
  reason: string
) {
 const now = Date.now();

/*
 * Prevent multiple browser/proctoring events
 * from being counted as separate violations
 * during a short transition.
 */
const GLOBAL_VIOLATION_COOLDOWN = 5000;

const normalizedReason =
  reason.trim().toLowerCase();

const lastTime =
  lastViolationRef.current;

if (
  now - lastTime <
  GLOBAL_VIOLATION_COOLDOWN
) {
  return;
}

  lastViolationRef.current =
    now;

  lastViolationReasonRef.current =
    normalizedReason;

  /*
   * Calculate the next violation count immediately.
   *
   * React state updates are asynchronous, so we must NOT
   * use the old `violations` value for the database update.
   */
  const updated =
  violationsRef.current + 1;

violationsRef.current =
  updated;

  /*
   * Update local violation count FIRST.
   *
   * The exam must never depend on the network
   * to record a violation.
   */
  setViolations(updated);

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

  /*
   * --------------------------------------------------
   * SERVER SYNCHRONIZATION
   * --------------------------------------------------
   *
   * These requests remain non-blocking.
   * A network/database problem must NEVER stop the exam.
   */

/*
 * Server synchronization is completely
 * independent from the exam UI.
 */
void syncViolationCount(
  updated
);

void saveViolationEvent(
  reason
);
}
async function enterExamFullscreen() {
  if (isIOSDevice()) {
  setIsFullscreenBlurred(false);
  return;
}
  try {
    const element =
      examContainerRef.current;

    if (!element) {
      console.error(
        "Fullscreen target element not found"
      );

      return;
    }

    await element.requestFullscreen();

    /*
     * Fullscreen request succeeded.
     *
     * Remove the blocking overlay only after
     * the browser confirms fullscreen.
     */
    if (document.fullscreenElement) {
      setIsFullscreenBlurred(false);

      /*
       * The student has successfully returned
       * to the examination environment.
       */
      return;
    }

    console.warn(
      "Fullscreen request completed but fullscreenElement is still null"
    );
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
  canvas: HTMLCanvasElement
): Promise<string | null> {

  try {
    /*
     * ==========================================
     * 1. NETWORK CHECK
     * ==========================================
     */
    if (!navigator.onLine) {
      return null;
    }

    /*
     * ==========================================
     * 2. CREATE IMAGE
     * ==========================================
     */
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
      console.error(
        "Proctoring snapshot: unable to create image blob"
      );

      return null;
    }

    /*
     * ==========================================
     * 3. STORAGE UPLOAD
     * ==========================================
     */
    const fileName =
      `${userId}/${examId}/${Date.now()}.jpg`;

    const uploadResult =
      await Promise.race([
        supabase.storage
          .from("proctoring")
          .upload(
            fileName,
            blob,
            {
              upsert: false,
              contentType: "image/jpeg",
            }
          ),

        new Promise<{
          data: null;
          error: Error;
        }>((resolve) =>
          setTimeout(() => {
            resolve({
              data: null,
              error: new Error(
                "Proctoring snapshot upload timed out"
              ),
            });
          }, 8000)
        ),
      ]);

    const {
      data: uploadData,
      error: uploadError,
    } = uploadResult;

    if (
      uploadError ||
      !uploadData?.path
    ) {
      console.error(
        "Proctoring snapshot upload failed:",
        uploadError
      );

      return null;
    }

    /*
     * ==========================================
     * 4. GET IMAGE URL
     * ==========================================
     */
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

    /*
     * ==========================================
     * 5. DATABASE REGISTRATION
     * ==========================================
     *
     * IMPORTANT:
     *
     * This is deliberately NON-BLOCKING.
     *
     * The exam must never wait for the
     * proctoring database insert.
     */
    void saveProctoringSnapshotRecord(
      imageUrl
    );

    /*
     * Return immediately after the
     * Storage upload succeeds.
     */
    return imageUrl;

  } catch (error) {

    console.error(
      "Background proctoring snapshot error:",
      error
    );

    return null;
  }
}

function saveProctoringSnapshotRecord(
  imageUrl: string
) {
  /*
   * ==========================================
   * SNAPSHOT RECORD QUEUE
   * ==========================================
   *
   * Storage upload has already succeeded.
   * We only queue the database registration.
   */
  if (
    !navigator.onLine ||
    !userId ||
    !attemptIdRef.current
  ) {
    return;
  }

  snapshotRecordQueueRef.current.push(
    imageUrl
  );

  /*
   * Do not start another processor if
   * one is already running.
   */
  if (
    snapshotRecordProcessingRef.current
  ) {
    return;
  }

  void processSnapshotRecordQueue();
}


async function processSnapshotRecordQueue() {
  /*
   * Only ONE snapshot DB processor
   * can run at a time.
   */
  if (
    snapshotRecordProcessingRef.current
  ) {
    return;
  }

  snapshotRecordProcessingRef.current =
    true;

  try {

    while (
      snapshotRecordQueueRef.current.length >
      0
    ) {

      if (
        !navigator.onLine ||
        !userId ||
        !attemptIdRef.current
      ) {
        break;
      }

      const imageUrl =
        snapshotRecordQueueRef.current.shift();

      if (!imageUrl) {
        continue;
      }

      try {

        const {
          error,
        } = await supabase
          .from(
            "proctoring_snapshots"
          )
          .insert({
            attempt_id:
              attemptIdRef.current,

            student_id:
              userId,

            image_url:
              imageUrl,

            face_count:
              null,
          });

        if (error) {

          console.error(
            "PROCTORING SNAPSHOT DB INSERT ERROR:",
            error
          );

          /*
           * Preserve the failed record
           * for a later retry.
           */
          snapshotRecordQueueRef.current.unshift(
            imageUrl
          );

          break;
        }

        console.log(
          "PROCTORING SNAPSHOT DB RECORD SAVED"
        );

      } catch (error) {

        console.error(
          "PROCTORING SNAPSHOT DB HANDLER ERROR:",
          error
        );

        snapshotRecordQueueRef.current.unshift(
          imageUrl
        );

        break;
      }
    }

  } finally {

    snapshotRecordProcessingRef.current =
      false;

    /*
     * If another snapshot arrived while
     * processing was finishing, continue
     * with exactly one processor.
     */
    if (
      snapshotRecordQueueRef.current.length >
        0 &&
      navigator.onLine &&
      userId &&
      attemptIdRef.current
    ) {
      void processSnapshotRecordQueue();
    }
  }
}


function saveFaceScanEvent(
  faceCount: number
) {
  /*
   * ==========================================
   * FACE SCAN QUEUE
   * ==========================================
   *
   * Do NOT write to Supabase directly from
   * the face-detection result handler.
   *
   * Add the latest detection to the local queue.
   */
  if (
    !navigator.onLine ||
    !userId ||
    !attemptIdRef.current
  ) {
    return;
  }

  /*
   * Add the face-count result to the queue.
   */
  faceScanQueueRef.current.push(
    faceCount
  );

  /*
   * A processor is already running.
   *
   * Do not start another Supabase worker.
   */
  if (
    faceScanProcessingRef.current
  ) {
    return;
  }

  /*
   * Start exactly ONE background processor.
   */
  void processFaceScanQueue();
}
async function processFaceScanQueue() {
  /*
   * Prevent multiple processors from
   * running at the same time.
   */
  if (
    faceScanProcessingRef.current
  ) {
    return;
  }

  faceScanProcessingRef.current =
    true;

  try {

    while (
      faceScanQueueRef.current.length >
      0
    ) {

      /*
       * If the network disappears,
       * leave the remaining events queued.
       */
      if (
        !navigator.onLine ||
        !userId ||
        !attemptIdRef.current
      ) {
        break;
      }

      /*
       * Take ONE event from the queue.
       */
      const faceCount =
        faceScanQueueRef.current.shift();

      if (
        faceCount === undefined
      ) {
        continue;
      }

      try {

        const {
          error,
        } = await supabase
          .from(
            "proctoring_events"
          )
          .insert({
            attempt_id:
              attemptIdRef.current,

            student_id:
              userId,

            event_type:
              "face_scan",

            face_count:
              faceCount,
          });

        if (error) {

          console.error(
            "FACE SCAN EVENT INSERT ERROR:",
            error
          );

          /*
           * Put the event back into the
           * queue so it can be retried.
           */
          faceScanQueueRef.current.unshift(
            faceCount
          );

          break;
        }

        console.log(
          "FACE SCAN EVENT SAVED:",
          faceCount
        );

      } catch (error) {

        console.error(
          "FACE SCAN EVENT HANDLER ERROR:",
          error
        );

        /*
         * Preserve the event for retry.
         */
        faceScanQueueRef.current.unshift(
          faceCount
        );

        break;
      }
    }

  } finally {

    faceScanProcessingRef.current =
      false;

    /*
     * If another event arrived while
     * the processor was finishing,
     * restart exactly one processor.
     */
    if (
      faceScanQueueRef.current.length >
        0 &&
      navigator.onLine &&
      userId &&
      attemptIdRef.current
    ) {
      void processFaceScanQueue();
    }
  }
}
async function handleFaceDetectionResult(
  faceCount: number
) {

  /*
   * Save the face scan in the background.
   * It must never block question navigation.
   */
void saveFaceScanEvent(
  faceCount
);

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

  /*
   * Never send another frame while the
   * previous detection is still running.
   */
  if (
    faceDetectionBusyRef.current
  ) {
    return;
  }

  const worker =
    faceDetectionWorkerRef.current;

  if (!worker) {
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

  const requestId =
  ++faceDetectionRequestIdRef.current;

  try {
    /*
     * Lock detection BEFORE creating
     * the Worker request.
     */
    faceDetectionBusyRef.current =
      true;

    /*
     * Give this detection request
     * a unique ID.
     */
        /*
     * Associate this exact canvas with
     * this exact Worker request.
     */
   pendingSnapshotRef.current.set(
  requestId,
  canvas
);

/*
 * Upload the snapshot immediately.
 *
 * This is independent of face detection.
 * Even if the Worker fails, the image
 * can still be saved to Supabase.
 */
const uploadPromise =
  uploadProctoringSnapshot(
    canvas
  );

if (requestId !== null) {
  pendingSnapshotUploadRef.current.set(
    requestId,
    uploadPromise
  );
}

void uploadPromise.finally(() => {
  pendingSnapshotUploadRef.current.delete(
    requestId
  );
});

/*
 * Face detection runs independently.
 */
const imageBitmap =
  await createImageBitmap(
    canvas
  );

worker.postMessage(
  {
    imageBitmap,
    requestId,
  },
  [imageBitmap]
);
faceDetectionTimeoutRef.current =
  setTimeout(() => {

    console.warn(
      "[PROCTORING] Face detection timeout"
    );

    faceDetectionBusyRef.current =
      false;

    if (requestId !== null) {
      pendingSnapshotRef.current.delete(
        requestId
      );
    }

    faceDetectionTimeoutRef.current =
      null;

  }, 10000);
  } catch (error) {
    console.error(
      "Unable to send frame to face detection worker:",
      error
    );

    faceDetectionBusyRef.current =
      false;

    if (requestId !== null) {
      pendingSnapshotRef.current.delete(
        requestId
      );
    }
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
  restoredQuestion
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
    /*
     * Do nothing once the exam has been submitted.
     */
    if (
      timerSubmittedRef.current ||
      submitted
    ) {
      setIsFullscreenBlurred(false);
      return;
    }
if (isIOSDevice()) {
  setIsFullscreenBlurred(false);
  return;
}

    /*
     * Student has exited fullscreen.
     *
     * The exam remains active, but the question area
     * is blocked until fullscreen is restored.
     */
    if (!document.fullscreenElement) {
      setIsFullscreenBlurred(true);

      handleViolation(
        "Fullscreen exited"
      );

      return;
    }

    /*
     * Student successfully returned to fullscreen.
     *
     * Remove the blocking layer.
     */
    setIsFullscreenBlurred(false);
  };

  document.addEventListener(
    "fullscreenchange",
    handleFullscreen
  );

  /*
   * Restore the correct UI state when this effect
   * is initially attached.
   */
  if (
  !isIOSDevice() &&
  !document.fullscreenElement &&
  !timerSubmittedRef.current &&
  !submitted
) {
    setIsFullscreenBlurred(true);
  } else {
    setIsFullscreenBlurred(false);
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
   * ==========================================
   * 1. MEMORY CACHE
   * ==========================================
   */
  const cachedQuestion =
    questionCacheRef.current[index];

  if (cachedQuestion) {
    setCurrentQuestionData(
      cachedQuestion
    );

    setCurrentQuestion(
      index
    );

    return;
  }

  /*
   * ==========================================
   * 2. PERSISTENT SESSION CACHE
   * ==========================================
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

        setCurrentQuestion(
          index
        );

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
   * ==========================================
   * 3. OFFLINE
   * ==========================================
   */
  if (!navigator.onLine) {
    console.warn(
      "Question is not cached and device is offline:",
      index
    );

    return;
  }

  /*
   * ==========================================
   * 4. SHARED QUESTION LOADER
   * ==========================================
   *
   * prefetchQuestion() is the ONLY function
   * responsible for the network request.
   *
   * It also owns:
   *
   * - in-flight request deduplication
   * - timeout
   * - server request
   * - option shuffle
   * - memory cache
   * - React cache
   * - sessionStorage
   */
  try {
    const question =
      await prefetchQuestion(index);

    if (!question) {
      console.warn(
        "Unable to load question:",
        index
      );

      return;
    }

    /*
     * The question is now available.
     *
     * This function only controls
     * what is displayed.
     */
    setCurrentQuestionData(
      question
    );

    setCurrentQuestion(
      index
    );

  } catch (error) {
    /*
     * Network failure must never
     * terminate the exam.
     */
    console.warn(
      "Unable to load exam question:",
      error
    );
  }
}
async function prefetchQuestion(
  index: number
) {
  /*
 * Never allow an invalid question
 * to reach the API.
 */
if (
  !sessionTokenRef.current
) {
  return null;
}
  // Never prefetch outside the exam.
  if (
    index < 0 ||
    (
      totalQuestions > 0 &&
      index >= totalQuestions
    )
  ) {
    return null;
  }

  // Already cached in memory.
  const cachedQuestion =
    questionCacheRef.current[index];

  if (cachedQuestion) {
    return cachedQuestion;
  }

  // Already being fetched.
  // Reuse the SAME network request.
  const existingRequest =
    prefetchingRef.current.get(index);

  if (existingRequest) {
    return existingRequest;
  }

  // Do not create network requests while offline.
  if (!navigator.onLine) {
    return null;
  }

  const requestPromise =
    (async () => {
console.log("TCD QUESTION NETWORK REQUEST", {
  index,
  time: new Date().toISOString(),
});
      try {

        const response =
          await fetchWithTimeout("/api/exam/question",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
  examId,
  questionIndex: index,
  sessionToken: sessionTokenRef.current,
}),
            }
          );

       if (!response.ok) {

  const errorResult =
    await response
      .json()
      .catch(() => null);

  console.error(
    "QUESTION API FAILED:",
    response.status,
    errorResult
  );


  return null;
}

        const result =
          await response.json();

        if (!result.data) {
          return null;
        }

        /*
         * Keep totalQuestions updated
         * from the server response.
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

        /*
         * Shuffle ONCE.
         *
         * The same question object stays
         * in the cache, so navigating back
         * will never reshuffle it.
         */
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
         *
         * This is the fastest path used
         * by Next/Previous.
         */
        questionCacheRef.current[index] =
          shuffledQuestion;

        /*
         * 2. REACT + SESSION CACHE
         */
        setQuestionCache((prev) => {

          const updated = {
            ...prev,
            [index]:
              shuffledQuestion,
          };

          try {

            const storageKey =
              `exam-question-cache-${examId}`;

            sessionStorage.setItem(
              storageKey,
              JSON.stringify(updated)
            );

          } catch (error) {

            console.warn(
              "Unable to persist question cache:",
              error
            );

          }

          return updated;
        });

        return shuffledQuestion;

      } catch (error) {

  console.error(
    "PREFETCH NETWORK ERROR:",
    error
  );

  console.warn(
  "PREFETCH NETWORK ERROR:",
  error
);

  return null;
} finally {

        /*
         * The request has finished.
         *
         * Remove it so a future request
         * can be created if necessary.
         */
        prefetchingRef.current.delete(
          index
        );
      }

    })();

  /*
   * IMPORTANT:
   *
   * Store the Promise BEFORE returning.
   *
   * Any other caller asking for this
   * question now receives this exact
   * same Promise instead of creating
   * another network request.
   */
  prefetchingRef.current.set(
    index,
    requestPromise
  );

  return requestPromise;
}
async function prefetchQuestionsAhead(
  startIndex: number
) {
  /*
   * Never create background network traffic
   * while the device is offline.
   */
  if (!navigator.onLine) {
    return;
  }

  /*
   * Keep a small rolling buffer.
   *
   * Current Q1 → Q2, Q3, Q4
   */
  const PREFETCH_AHEAD = 3;

  /*
   * Only TWO requests are allowed to run
   * simultaneously.
   */
  const BATCH_SIZE = 2;

  const knownTotal =
    totalQuestions > 0
      ? totalQuestions
      : 0;

  if (knownTotal <= 0) {
    return;
  }

  /*
   * Find questions that are:
   *
   * 1. Ahead of the student
   * 2. Not already cached
   * 3. Not already being downloaded
   */
  const missingIndexes: number[] = [];

  for (
    let offset = 1;
    offset <= PREFETCH_AHEAD;
    offset++
  ) {
    const index =
      startIndex + offset;

    if (index >= knownTotal) {
      break;
    }

    if (
      questionCacheRef.current[index] ||
      prefetchingRef.current.has(index)
    ) {
      continue;
    }

    missingIndexes.push(index);
  }

  if (
    missingIndexes.length === 0
  ) {
    return;
  }

  /*
   * Load in small batches.
   *
   * One failed request must never cancel
   * the remaining prefetches.
   */
  for (
    let i = 0;
    i < missingIndexes.length;
    i += BATCH_SIZE
  ) {
    if (!navigator.onLine) {
      return;
    }

    const batch =
      missingIndexes.slice(
        i,
        i + BATCH_SIZE
      );

    await Promise.allSettled(
      batch.map(
        (index) =>
          prefetchQuestion(index)
      )
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
if (!isIOSDevice()) {
  try {
    if (document.documentElement) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.warn(
      "Fullscreen unavailable. Continuing exam:",
      error
    );
  }
}
/*
 * ==========================================
 * START EXAM SESSION
 * ==========================================
 */

let response: Response;
let result: any;

try {
  response = await fetchWithTimeout(
    "/api/exam/start",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        examId,
      }),
    }
  );

  result = await response.json();

} catch (error) {

  console.error(
    "EXAM START NETWORK ERROR:",
    error
  );

  toast.error(
    "Network connection lost. Please check your internet connection and try again."
  );

  return;
}

if (!response.ok) {

  if (
    response.status === 402 &&
    result?.paymentRequired
  ) {
    router.replace(
      `/exam/${examId}/entry`
    );

    return;
  }

  if (
    result?.error ===
    "You have already submitted this exam"
  ) {
    router.replace(
      `/exam-result/${examId}`
    );

    return;
  }

  toast.error(
    result?.error ||
    "Failed to start exam"
  );

  return;
}

const token =
  result?.session?.session_token;

if (!token) {

  console.error(
    "EXAM START RESPONSE HAS NO SESSION TOKEN:",
    result
  );

  toast.error(
    "Unable to initialize your exam session."
  );

  return;
}

setSessionToken(token);

sessionTokenRef.current =
  token;

localStorage.setItem(
  `exam-session-${examId}-${userId}`,
  token
);
console.log(
  "FIRST QUESTION SESSION CHECK:",
  {
    examId,
    sessionToken,
    sessionTokenRef:
      sessionTokenRef.current,
  }
);
/*
 * ==========================================
 * LOAD FIRST QUESTION
 * ==========================================
 */

try {

/*
 * Load Question 1 through the shared question loader.
 *
 * IMPORTANT:
 * There must be only ONE network-loading path
 * for exam questions.
 *
 * prefetchQuestion():
 * - reuses existing requests
 * - caches the question
 * - persists it in sessionStorage
 * - prevents duplicate requests
 */
const firstQuestion =
  await prefetchQuestion(0);

if (!firstQuestion) {

  toast.error(
    "Unable to load the first question. Please check your connection and try again."
  );

  return;
}

/*
 * Display Question 1 immediately.
 *
 * prefetchQuestion() has already placed it
 * into the memory/session cache.
 */
setCurrentQuestionData(
  firstQuestion
);

setCurrentQuestion(0);

/*
 * Start loading the next question in the
 * background.
 *
 * This does NOT block the exam UI.
 */

} catch (error) {

  console.error(
    "FIRST QUESTION LOAD ERROR:",
    error
  );

  toast.error(
    "Unable to load the first question. Please check your connection and try again."
  );

  return;
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

  /*
   * Calculate the new value from the current
   * in-memory answer state.
   *
   * Clicking the same option again deselects it.
   */
  const newValue =
    answers[questionId] === answer
      ? null
      : answer;

localAnswerChangeRef.current =
  true;
  /*
   * IMPORTANT:
   *
   * Update the UI immediately.
   *
   * The exam must NEVER wait for Supabase
   * before showing the student's selection.
   */
  setAnswers((prev: any) => {
    const updated = {
      ...prev,
      [questionId]: newValue,
    };

    /*
     * Persist the complete local answer state
     * immediately.
     *
     * This protects the answer if the browser
     * refreshes or the network disappears.
     */
    try {
      localStorage.setItem(
        `exam-answers-${examId}-${userId}`,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.warn(
        "Unable to persist answer locally:",
        error
      );
    }

    return updated;
  });

  /*
   * Add/update the answer in the pending
   * synchronization queue.
   *
   * If the same question was changed multiple
   * times while offline/slow, only the latest
   * value needs to be synchronized.
   */
  setPendingSaves((prev) => {
    const filtered =
      prev.filter(
        (item) =>
          item.questionId !== questionId
      );

    return [
      ...filtered,
      {
        questionId,
        selectedOption: newValue,
      },
    ];
  });

  /*
   * Update the question palette immediately.
   */
  if (!newValue) {
    setAnsweredQuestions(
      (prev) =>
        prev.filter(
          (q) =>
            q !== currentQuestion
        )
    );
  } else {
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
  }

  /*
   * DO NOT call Supabase here.
   *
   * The background answer-sync system should
   * consume pendingSaves.
   */
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
  if (
    !sessionToken ||
    pendingSaves.length === 0
  ) {
    return;
  }

  let cancelled = false;

  const saveAll = async () => {
    if (cancelled) {
      return;
    }

    /*
     * Only one synchronization worker may run
     * at a time.
     */
    if (savingRef.current) {
      return;
    }

    /*
     * Never attempt network synchronization
     * while offline.
     */
    if (!navigator.onLine) {
      return;
    }

    const queue =
      [...pendingSaves];

    if (queue.length === 0) {
      return;
    }

    savingRef.current = true;
    savingAnswersRef.current = true;
    setSavingAnswers(true);

    try {
      async function syncAnswer(
  item: {
    questionId: string;
    selectedOption: string | null;
  }
) {
  try {
    const response =
      await fetchWithTimeout(
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
            sessionToken:
  sessionTokenRef.current,
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
     * Remove ONLY the exact version
     * that was successfully synchronized.
     *
     * If the student changed the answer
     * while this request was running,
     * the newer value remains queued.
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

    return true;

  } catch (error) {

    /*
     * Keep failed answers queued.
     * They will be retried later.
     */
    console.warn(
      "Answer save failed. Keeping answer in queue:",
      item.questionId,
      error
    );

    return false;
  }
}
  /*
   * Save queued answers independently.
   *
   * IMPORTANT:
   * One slow/failed request must NEVER block
   * the other answers in the queue.
   */
await Promise.all(
  queue.map((item) =>
    syncAnswer(item)
  )
);

}  finally {
      savingAnswersRef.current =
        false;

      savingRef.current =
        false;

      if (!cancelled) {
        setSavingAnswers(false);
      }
    }
  };

  /*
   * Attempt synchronization immediately
   * when there are pending answers.
   */
  void saveAll();

  /*
   * Network came back.
   *
   * Resume synchronization immediately.
   */
 const handleOnline = () => {
  if (
    !savingRef.current &&
    navigator.onLine
  ) {
    void saveAll();
  }
};

  window.addEventListener(
    "online",
    handleOnline
  );

  /*
   * Retry periodically, but less aggressively.
   *
   * 10 seconds is enough because answers are
   * already stored locally.
   *
   * The exam UI NEVER waits for this.
   */
  const retryInterval =
  window.setInterval(() => {
    if (
      !savingRef.current &&
      navigator.onLine
    ) {
      void saveAll();
    }
  }, 10000);

  return () => {
    cancelled = true;

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

  /*
   * Clear any previous interval before
   * creating a new one.
   */
  if (
    snapshotIntervalRef.current
  ) {
    clearInterval(
      snapshotIntervalRef.current
    );

    snapshotIntervalRef.current =
      null;
  }

  /*
   * Take one proctoring snapshot every
   * 15 seconds.
   *
   * uploadSnapshot() itself also checks
   * faceDetectionBusyRef, so overlapping
   * detections are prevented there.
   */
  void uploadSnapshot(); 
  snapshotIntervalRef.current =
    setInterval(() => {
      void uploadSnapshot();
    }, 15000);

  return () => {
    if (
      snapshotIntervalRef.current
    ) {
      clearInterval(
        snapshotIntervalRef.current
      );

      snapshotIntervalRef.current =
        null;
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
 /*
 * Build a snapshot containing only the latest
 * answer for each question.
 *
 * If a student changes:
 *
 * Q1 → A
 * Q1 → B
 * Q1 → C
 *
 * we only need to send C.
 */
const latestAnswers = new Map<
  string,
  string | null
>();

for (const item of pendingSaves) {
  latestAnswers.set(
    item.questionId,
    item.selectedOption
  );
}

const queue = Array.from(
  latestAnswers.entries()
).map(
  ([
    questionId,
    selectedOption,
  ]) => ({
    questionId,
    selectedOption,
  })
);

if (queue.length === 0) {
  return;
}

/*
 * Do not start network answer saves when the
 * browser is already offline.
 *
 * The answers remain in pendingSaves/localStorage
 * and can be flushed when the connection returns.
 */
if (!navigator.onLine) {
  throw new Error(
    "Device is offline. Pending answers remain safely queued."
  );
}

  savingAnswersRef.current = true;
  setSavingAnswers(true);

  try {
    for (const item of queue) {
      const response = await fetchWithTimeout(
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
  current.filter((currentItem) => {
    const wasSaved = queue.some(
      (savedItem) =>
        savedItem.questionId ===
          currentItem.questionId &&
        savedItem.selectedOption ===
          currentItem.selectedOption
    );

    return !wasSaved;
  })
);
  } finally {
    savingAnswersRef.current = false;
    setSavingAnswers(false);
  }
}
async function handleConfirmSubmit() {
  setShowSubmitSummary(false);

  await submitExam();
}

async function submitExamRequest(
  token: string
): Promise<{
  response: Response | null;
  result: any;
  networkError: unknown | null;
}> {
  try {
    const response =
      await fetchWithTimeout(
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

    const result =
      await response
        .json()
        .catch(() => null);

    return {
      response,
      result,
      networkError: null,
    };

  } catch (error) {

    console.warn(
      "Exam submission network error:",
      error
    );

    return {
      response: null,
      result: null,
      networkError: error,
    };
  }
}


async function submitExam() {
  console.log(
    "========== AUTO SUBMIT START =========="
  );

  /*
   * ==================================================
   * 0. SYNCHRONOUS SUBMISSION LOCK
   * ==================================================
   *
   * Prevent simultaneous submissions from:
   *
   * - Submit button
   * - Timer
   * - Violation auto-submit
   * - Multiple rapid events
   *
   * React state is asynchronous, therefore the ref
   * is used as the first-line synchronous lock.
   */
  if (submittingRef.current) {
    console.log(
      "Submit blocked by submittingRef"
    );

    return;
  }

  submittingRef.current = true;

  /*
   * Existing React/state based guards.
   *
   * If one of these already says that submission
   * is in progress/completed, release our ref lock
   * before returning.
   */
  if (
    submitting ||
    submitted ||
    timerSubmittedRef.current
  ) {
    console.log(
      "Submit blocked"
    );

    submittingRef.current = false;

    return;
  }

  /*
   * Prevent another timer-triggered submission.
   */
  timerSubmittedRef.current = true;

  setSubmitting(true);
  setFinalizingExam(true);

  /*
   * ==================================================
   * 1. SAVE ALL PENDING ANSWERS FIRST
   * ==================================================
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
   * ==================================================
   * 2. WAIT FOR NETWORK
   * ==================================================
   *
   * If the browser is offline, do not submit with
   * incomplete server state.
   *
   * Local exam state remains safe.
   */
  if (!navigator.onLine) {
    toast.info(
      "Your exam is safe. Waiting for internet connection..."
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
        handleOnline,
        { once: true }
      );
    });

    toast.success(
      "Connection restored. Continuing submission..."
    );
  }

  /*
   * ==================================================
   * 3. GET CURRENT SESSION TOKEN
   * ==================================================
   */
  const token =
    sessionTokenRef.current ||
    sessionToken;

  if (!token) {
    console.error(
      "Missing session token during submission."
    );

    toast.error(
      "Your exam session could not be verified."
    );

    setSubmitting(false);
    setFinalizingExam(false);

    timerSubmittedRef.current =
      false;

    submittingRef.current =
      false;

    return;
  }

  /*
   * ==================================================
   * 4. SUBMIT EXAM
   * ==================================================
   *
   * All actual /api/exam/submit traffic goes through
   * submitExamRequest().
   */
  let response: Response | null =
    null;

  let result: any = null;

  try {
    const submission =
      await submitExamRequest(
        token
      );

    response =
      submission.response;

    result =
      submission.result;

    if (
      submission.networkError
    ) {
      throw submission.networkError;
    }

    console.log(
      "SUBMIT STATUS:",
      response?.status
    );

    console.log(
      "SUBMIT RESPONSE:",
      result
    );

  } catch (error) {

    /*
     * ==================================================
     * NETWORK FAILURE
     * ==================================================
     *
     * The request may have reached the server even
     * though the browser did not receive the response.
     *
     * Therefore retry using the SAME session token.
     */
    console.warn(
      "Exam submission network error:",
      error
    );

    const MAX_SUBMIT_RETRIES =
      3;

    for (
      let attempt = 1;
      attempt <=
      MAX_SUBMIT_RETRIES;
      attempt++
    ) {

      /*
       * Wait for connectivity.
       */
      if (!navigator.onLine) {
        toast.info(
          "Connection interrupted. Your exam is safe. Waiting for internet..."
        );

        await new Promise<void>(
          (resolve) => {

            const handleOnline =
              () => {

                window.removeEventListener(
                  "online",
                  handleOnline
                );

                resolve();
              };

            window.addEventListener(
              "online",
              handleOnline,
              { once: true }
            );
          }
        );
      }

      /*
       * Small delay between retry attempts.
       */
      if (attempt > 1) {
        await new Promise<void>(
          (resolve) =>
            setTimeout(
              resolve,
              1000
            )
        );
      }

      try {
        console.log(
          `Retrying exam submission (${attempt}/${MAX_SUBMIT_RETRIES})`
        );

        const retrySubmission =
          await submitExamRequest(
            token
          );

        response =
          retrySubmission.response;

        result =
          retrySubmission.result;

      if (
  retrySubmission.networkError
) {
  throw retrySubmission.networkError;
}

console.log(
  "RETRY SUBMIT STATUS:",
  response?.status
);

console.log(
  "RETRY SUBMIT RESPONSE:",
  result
);

/*
 * IMPORTANT:
 *
 * A 409 / "Exam already submitted" means
 * the original request may have succeeded on
 * the server even though the browser received
 * an AbortError.
 *
 * Do NOT submit again.
 */
if (
  response?.status === 409 ||
  result?.error ===
    "Exam already submitted"
) {
  console.log(
    "SERVER CONFIRMED EXAM WAS ALREADY SUBMITTED."
  );

  /*
   * Leave the retry loop.
   *
   * The existing recovery logic below will
   * load the submitted attempt and redirect
   * to the result page.
   */
  break;
}

/*
 * A normal HTTP response means the request
 * reached the server.
 *
 * Stop retrying.
 */
break;

      } catch (retryError) {

        console.warn(
          `Submission retry ${attempt} failed:`,
          retryError
        );

        /*
         * Final retry failed.
         *
         * Allow the student to submit again manually.
         */
        if (
          attempt ===
          MAX_SUBMIT_RETRIES
        ) {

          toast.error(
            "Connection is still unstable. Your exam is safe. Please reconnect and try submitting again."
          );

          setSubmitting(false);
          setFinalizingExam(false);

          timerSubmittedRef.current =
            false;

          submittingRef.current =
            false;

          return;
        }
      }
    }
  }

  /*
   * ==================================================
   * 5. SERVER ERROR
   * ==================================================
   */
  if (
    !response ||
    !response.ok
  ) {

    /*
     * The server may have successfully submitted the
     * exam even though the browser lost the original
     * response.
     *
     * Recover the submitted attempt.
     */
    if (
      result?.error ===
      "Exam already submitted"
    ) {

      console.log(
        "Exam was already submitted on the server."
      );

      const {
        data: submittedAttempt,
        error:
          submittedAttemptError,
      } = await supabase
        .from("exam_attempts")
        .select(
          "id, score, status"
        )
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
          "submitted"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle();

      if (
        submittedAttempt &&
        !submittedAttemptError
      ) {

        submittingRef.current =
          false;

        router.replace(
          `/exam-result/${submittedAttempt.id}`
        );

        return;
      }

      console.error(
        "Could not recover submitted attempt:",
        submittedAttemptError
      );

      toast.error(
        "Your exam was submitted, but the result could not be loaded. Please refresh."
      );

      setSubmitting(false);
      setFinalizingExam(false);

      timerSubmittedRef.current =
        false;

      submittingRef.current =
        false;

      return;
    }

    /*
     * Normal server-side failure.
     */
    toast.error(
      result?.error ||
        "Submission failed. Please try again."
    );

    setSubmitting(false);
    setFinalizingExam(false);

    timerSubmittedRef.current =
      false;

    submittingRef.current =
      false;

    return;
  }

  /*
   * ==================================================
   * 6. SERVER CONFIRMED SUBMISSION
   * ==================================================
   *
   * From this point onward the attempt is safely
   * submitted.
   */
  setScore(
    result.score
  );

  localStorage.setItem(
    `exam-score-${examId}-${userId}`,
    result.score.toString()
  );

  /*
   * ==================================================
   * 7. POST-SUBMISSION LEVEL / RANK INFORMATION
   * ==================================================
   *
   * UI enhancement only.
   * Never block the submitted exam result.
   */
  void (async () => {
    try {

      const {
        data: beforeLevel,
      } = await supabase
        .from("user_levels")
        .select("level")
        .eq(
          "user_id",
          userId
        )
        .single();

      const {
        data: beforeRanks,
      } = await supabase
        .from("leaderboard_view")
        .select("user_id")
        .order(
          "xp",
          {
            ascending: false,
            nullsFirst: false,
          }
        );

      const previousRankIndex =
        beforeRanks?.findIndex(
          (r: any) =>
            r.user_id ===
            userId
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
        .order(
          "xp",
          {
            ascending: false,
            nullsFirst: false,
          }
        );

      const newRankIndex =
        afterRanks?.findIndex(
          (r: any) =>
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
        newRank <
          previousRank
      ) {

        void supabase
          .from("activity_feed")
          .insert({
            user_id:
              userId,

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

    } catch (error) {

      console.warn(
        "Post-submission level/rank processing failed:",
        error
      );
    }
  })();

  /*
   * ==================================================
   * 8. ACTIVITY FEED
   * ==================================================
   */
  void supabase
    .from("activity_feed")
    .insert({
      user_id:
        userId,

      activity_type:
        "exam",

      title:
        "Exam Completed",

      description:
        `Scored ${result.percentage}% in ${examInfo?.title}`,

      metadata: {
        score:
          result.score,

        percentage:
          result.percentage,

        exam_id:
          examId,

        xp_earned:
          10 +
          Math.floor(
            result.percentage /
              2
          ),
      },
    })
    .then(
      ({ error }) => {

        if (error) {
          console.warn(
            "Exam activity feed update failed:",
            error
          );
        }
      }
    );

  /*
   * ==================================================
   * 9. UPDATE LIVE STATUS
   * ==================================================
   */
  void supabase
    .from("exam_live_status")
    .update({
      submitted:
        true,

      fullscreen:
        false,
    })
    .eq(
      "exam_id",
      examId
    )
    .eq(
      "user_id",
      userId
    )
    .then(
      ({ error }) => {

        if (error) {
          console.warn(
            "Live status submission update failed:",
            error
          );
        }
      }
    );

  /*
   * ==================================================
   * 10. CLEAR EXAM STATE
   * ==================================================
   *
   * ONLY clear local exam state after the server
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
   * ==================================================
   * 11. STOP CAMERA
   * ==================================================
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
   * ==================================================
   * 12. EXIT FULLSCREEN
   * ==================================================
   */
  if (
    document.fullscreenElement
  ) {
    try {
      await document.exitFullscreen();
    } catch (error) {
      console.warn(
        "Unable to exit fullscreen:",
        error
      );
    }
  }

  /*
   * ==================================================
   * 13. CLEAR SESSION
   * ==================================================
   */
  localStorage.removeItem(
    `exam-session-${examId}-${userId}`
  );

  sessionTokenRef.current =
    "";

  /*
   * ==================================================
   * 14. REDIRECT TO RESULT
   * ==================================================
   */
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

  /*
   * Release the synchronous lock immediately
   * before navigation.
   */
  submittingRef.current =
    false;

  router.replace(
    `/exam-result/${result.attemptId}`
  );
}
function handleQuestionVisited(
  index: number
) {
  setVisitedQuestions((prev) =>
    prev.includes(index)
      ? prev
      : [
          ...prev,
          index,
        ]
  );
}
async function handlePreviousQuestion() {
  /*
   * Prevent overlapping navigation.
   */
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

  /*
   * Already at the first question.
   */
  if (
    prevIndex === currentQuestion
  ) {
    questionNavigationLockRef.current =
      false;

    return;
  }

  /*
   * FAST PATH:
   * Previous question is already cached.
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
   * Previous question is not cached.
   *
   * Reuse the existing question handler.
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
}
function handleMarkForReview() {
  setMarkedQuestions((prev) => {
    const updated =
      prev.includes(currentQuestion)
        ? prev.filter(
            (q) =>
              q !== currentQuestion
          )
        : [
            ...prev,
            currentQuestion,
          ];

    try {
      localStorage.setItem(
        `exam-marked-${examId}-${userId}`,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.warn(
        "Unable to persist marked questions locally:",
        error
      );
    }

    return updated;
  });
}
async function handleNextQuestion() {
  /*
   * If another navigation is currently
   * loading, remember this click.
   */
  if (
    questionNavigationLockRef.current
  ) {
    pendingNavigationRef.current += 1;
    return;
  }

  questionNavigationLockRef.current =
    true;

  /*
   * React state updates are asynchronous.
   * Use a local navigation pointer.
   */
  let targetIndex =
    currentQuestion;

  try {
    /*
     * Process the current click first,
     * then any rapid clicks that arrived
     * while navigation was busy.
     */
    while (true) {

      const nextIndex =
        targetIndex + 1;

      /*
       * End of exam.
       */
      if (
        nextIndex >= totalQuestions
      ) {
        break;
      }

      /*
       * Move navigation pointer immediately.
       */
      targetIndex =
        nextIndex;

      /*
       * FAST PATH:
       * Question already exists in memory.
       */
      const cachedQuestion =
        questionCacheRef.current[
          nextIndex
        ];

      if (cachedQuestion) {

        setCurrentQuestionData(
          cachedQuestion
        );

        setCurrentQuestion(
          nextIndex
        );

      } else {

        /*
         * Question is not in memory.
         *
         * Check whether the same question
         * is already being downloaded.
         */
        const existingRequest =
          prefetchingRef.current.get(
            nextIndex
          );

        if (existingRequest) {

          /*
           * Reuse the existing request.
           */
          const question =
            await existingRequest;

          if (question) {

            setCurrentQuestionData(
              question
            );

            setCurrentQuestion(
              nextIndex
            );

          }

        } else if (
          navigator.onLine
        ) {

          /*
           * Start the question request.
           */
          await fetchQuestionByIndex(
            nextIndex
          );

        } else {

          /*
           * Offline and question is
           * not available locally.
           */
          console.warn(
            "Cannot navigate to uncached question while offline:",
            nextIndex
          );

          toast.info(
            "This question is still loading. Please wait for the cache to finish."
          );

          break;
        }
      }

      /*
       * Process another Next click if
       * one arrived while loading.
       */
      if (
        pendingNavigationRef.current >
        0
      ) {

        pendingNavigationRef.current -=
          1;

        continue;
      }

      break;
    }

  } finally {

    questionNavigationLockRef.current =
      false;

    /*
     * Safety reset.
     */
    if (
      pendingNavigationRef.current < 0
    ) {
      pendingNavigationRef.current =
        0;
    }
  }
}
async function handleQuestionNavigation(
  index: number
) {
  /*
   * Prevent overlapping navigation.
   */
  if (
    questionNavigationLockRef.current
  ) {
    return;
  }

  questionNavigationLockRef.current =
    true;

  try {

    /*
     * ==========================================
     * 1. MEMORY CACHE — INSTANT
     * ==========================================
     */
    const cachedQuestion =
      questionCacheRef.current[index];

    if (cachedQuestion) {

      setCurrentQuestionData(
        cachedQuestion
      );

      setCurrentQuestion(
        index
      );

      return;
    }

    /*
     * ==========================================
     * 2. ALREADY DOWNLOADING
     * ==========================================
     *
     * Reuse the existing request.
     * Never create a duplicate request.
     */
    const existingRequest =
      prefetchingRef.current.get(
        index
      );

    if (existingRequest) {

      const question =
        await Promise.race([
          existingRequest,

          new Promise<null>(
            (resolve) =>
              setTimeout(
                () => resolve(null),
                3000
              )
          ),
        ]);

      if (question) {

        setCurrentQuestionData(
          question
        );

        setCurrentQuestion(
          index
        );

      } else {

        /*
         * Request is still running.
         *
         * Do not create another request.
         */
        toast.info(
          "This question is still loading. Please try again in a moment."
        );
      }

      return;
    }

    /*
     * ==========================================
     * 3. NOT CACHED / NOT DOWNLOADING
     * ==========================================
     */
    if (!navigator.onLine) {

      toast.info(
        "You're offline. Only downloaded questions are available right now."
      );

      return;
    }

    /*
     * ==========================================
     * 4. START SHARED NETWORK REQUEST
     * ==========================================
     */
    await fetchQuestionByIndex(
      index
    );

  } finally {

    questionNavigationLockRef.current =
      false;
  }
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
  <>
    {networkStatus !== "online" && (
      <div className="fixed top-2 left-1/2 z-[100] -translate-x-1/2 rounded-full px-4 py-2 text-xs font-medium shadow-lg">
        {networkStatus === "offline"
          ? "Offline — your answers are saved on this device"
          : "Connection unstable — continuing exam"}
      </div>
    )}

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
              <span>Fullscreen mode is required on supported devices.</span>
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
    </>
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
  handleQuestionNavigation
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
  onClick={handlePreviousQuestion}

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
 onClick={handleMarkForReview}

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
  onClick={handleNextQuestion}

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
    onClick={handleConfirmSubmit}
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
  type="button"
  onClick={async () => {
    setAdminWarning(null);

    const { error } = await supabase
      .from("exam_live_status")
      .update({
        warning_message: null,
        warning_sent_at: null,
      })
      .eq("user_id", userId)
      .eq("submitted", false);

    if (error) {
      console.error(
        "Failed to clear admin warning:",
        error
      );
    }
  }}
  className="
    mt-6
    w-full
    rounded-2xl
    bg-gradient-to-r
    from-[#243B6B]
    to-[#36558F]
    px-6
    py-4
    text-white
    font-bold
    text-base
    shadow-lg
    transition-all
    hover:scale-[1.02]
    hover:shadow-xl
    active:scale-[0.98]
  "
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

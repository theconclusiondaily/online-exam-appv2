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
import MathText from "@/components/common/MathText";
import { supabase } from "@/lib/supabase/client";
import TCDLoader from "@/components/common/TCDLoader";
import ExamTopStats from "@/components/exam/ExamTopStats";
import ProctoringCapture
from "@/components/exam/ProctoringCapture";
import useExamAutosave from "@/hooks/useExamAutosave";
import useAntiCheat from "@/hooks/useAntiCheat";
import useLiveStudents from "@/hooks/useLiveStudents";
import StudentCameraStream
from "@/components/exam/StudentCameraStream";
import { MathJax } from "better-react-mathjax";
import {
  getFaceDetector
} from "@/lib/faceDetection";
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
  const streamRef =
    useRef<MediaStream | null>(
      null
    );
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
  const lastViolationRef =
    useRef(0);
const snapshotIntervalRef =
  useRef<NodeJS.Timeout | null>(
    null
  );
  const [
  adminWarning,
  setAdminWarning
] = useState<string | null>(null);
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
>("bottom-right");
const savingRef = useRef(false);
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
  useEffect(() => {

    setMounted(true);

  }, []);
  useEffect(() => {

  if (
    !examStarted ||
    timerInitialized ||
    !currentQuestionData
  ) {
    return;
  }

  // Give React one frame to paint the question
  requestAnimationFrame(() => {

    localStorage.setItem(
      `exam-start-time-${examId}-${userId}`,
      Date.now().toString()
    );

    setTimerInitialized(true);

    console.log("✅ Timer Started");

  });

}, [
  examStarted,
  currentQuestionData,
  timerInitialized,
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
console.log(
  "REALTIME EVENT:",
  payload
);
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

   setViolations(prev => {

  const updated =
    prev + 1;
if (
  userId &&
  examId
) {

  supabase
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
 toast.error(
  `${reason}. Violations: ${updated}/10`
);

  if (updated >= 10) {

    console.log(
      "AUTO SUBMIT TRIGGERED"
    );

    setTimeout(() => {

      submitExam();

    }, 500);
  }

  return updated;
});
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
  async function uploadSnapshot() {

  if (!videoRef.current) {
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
    videoRef.current,
    0,
    0,
    320,
    240
  );
const detector =
  await getFaceDetector();

const result =
  detector.detect(
    canvas
  );

const faceCount =
  result.detections.length;
  await supabase
  .from(
    "proctoring_events"
  )
  .insert({
    attempt_id:
      examId,
    student_id:
      userId,
    event_type:
      "face_scan",
    face_count:
      faceCount,
  });
 if (faceCount === 0) {

  if (!noFaceSince) {

    setNoFaceSince(
      Date.now()
    );

  } else {

    const duration =

      Date.now() -
      noFaceSince;

    if (
      duration > 60000
    ) {

      handleViolation(
        "Face not visible for 60 seconds"
      );

      setNoFaceSince(
        Date.now()
      );

    }

  }

} else {

  setNoFaceSince(null);

}

if (faceCount > 1) {

  if (!multipleFaceSince) {

    setMultipleFaceSince(
      Date.now()
    );

  } else {

    const duration =

      Date.now() -
      multipleFaceSince;

    if (
      duration > 30000
    ) {

      handleViolation(
        "Multiple faces detected"
      );

      setMultipleFaceSince(
        Date.now()
      );

    }

  }

} else {

  setMultipleFaceSince(
    null
  );

}
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
} = await supabase.storage

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
} = supabase.storage

  .from("proctoring")

  .getPublicUrl(
    uploadData.path
  );

const imageUrl =
  publicUrlData.publicUrl;
  await supabase

  .from(
    "proctoring_snapshots"
  )

  .insert({

    attempt_id:null,

    student_id:
      userId,

    image_url:
      imageUrl,

    face_count:
      faceCount,

  });

  if (error) {

    console.error(
      "Snapshot Upload Error:",
      error
    );

  }
}
async function resumeExam() {

  if (!sessionToken) {

    toast.error(
      "Session missing"
    );

    return;
  }

  await fetchQuestionByIndex(
    currentQuestion
  );

  setExamStarted(
    true
  );

  toast.success(
    "Exam session restored"
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

const cachedQuestion =
  questionCacheRef.current[index];

if (cachedQuestion) {
  setCurrentQuestionData(
    cachedQuestion
  );

  setCurrentQuestion(index);

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

const total =
  result.totalQuestions || 1;

setTotalQuestions(total);

if (
  index + 1 < total
) {

  prefetchQuestion(
    index + 1
  );

}
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
  ].sort(() => Math.random() - 0.5),
};
questionCacheRef.current[index] =
  shuffledQuestion;

setQuestionCache((prev) => ({
  ...prev,
  [index]: shuffledQuestion,
}));
setCurrentQuestionData(
  shuffledQuestion
);

setCurrentQuestion(index);
// Only after displaying it,
// prefetch the following question
if (index + 1 < total) {
  prefetchQuestion(
    index + 1
  );
}
 
  }
  
}
async function prefetchQuestion(
  index: number
) {
  // Already cached
  if (
    questionCacheRef.current[index]
  ) {
    return;
  }

  // Already being fetched
  if (
    prefetchingRef.current.has(index)
  ) {
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

      questionCacheRef.current[index] =
        shuffledQuestion;

      setQuestionCache((prev) => ({
        ...prev,
        [index]: shuffledQuestion,
      }));
    }
  } catch (error) {
    console.error(
      "PREFETCH ERROR:",
      error
    );
  } finally {
    prefetchingRef.current.delete(
      index
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
  setAttemptId(
  result.session?.attempt_id ||
  null
);
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
console.log(
  "START API ERROR:",
  result
);
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
  "QUESTION RESPONSE STATUS:",
  questionResponse.status
);

console.log(
  "QUESTION RESULT FULL:",
  JSON.stringify(
    questionResult,
    null,
    2
  )
);

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

  console.log(
    "SELECT ANSWER",
    {
      questionId,
      answer,
      sessionToken,
      examId,
    }
  );

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
    pendingSaves.length === 0 ||
    !sessionToken
  ) {
    return;
  }
setSavingAnswers(true);
  const saveAll = async () => {

  // Prevent multiple save loops
  if (savingRef.current) return;

 savingRef.current = true;
savingAnswersRef.current = true;

setSavingAnswers(true);

  try {

    const queue = [...pendingSaves];

    // Clear the queue that we're about to process
    setPendingSaves([]);

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

    }

  } catch (error) {

    console.error("Auto-save failed:", error);
    

    // Optional: re-add failed items here for retry

  } finally {

    // ✅ STEP 5 GOES HERE

    setSavingAnswers(false);

savingAnswersRef.current = false;
savingRef.current = false;

    

  }

};

  saveAll();

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
    setInterval(
      () => {
        uploadSnapshot();
      },
      15000
    );

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
  async function flushPendingAnswers() {
  if (!sessionToken) {
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
            sessionToken,
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

  if (submitting || submitted) {
    return;
  }

  setSubmitting(true);
  setFinalizingExam(true);
// Flush pending answer before submitting
try {
  await flushPendingAnswers();
} catch (error) {
  console.error(
    "FINAL ANSWER SAVE FAILED:",
    error
  );

  toast.error(
    error instanceof Error
      ? error.message
      : "Unable to save latest answers."
  );

  setSubmitting(false);
  setFinalizingExam(false);

  return;
}

  
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

console.log(
  "ATTEMPT ID:",
  result?.attemptId
);

if (!response.ok) {

  toast.error(
    result.error ||
    "Submission failed"
  );

  setSubmitting(false);
  setFinalizingExam(false);

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
console.log(
  "ACTIVITY RESULT:",
  result
);
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
  `Scored ${result.percentage}% in ${examInfo?.title}`,

   metadata: {
  score: result.score,
  percentage: result.percentage,
  exam_id: examId,
  xp_earned:
    10 +
    Math.floor(
      result.percentage / 2
    ),
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
console.log(
  "ATTEMPT ID:",
  result.attemptId
);

console.log(
  "FULL RESULT:",
  result
);
sessionStorage.setItem(
  `achievement-count-${result.attemptId}`,
  String(
    result.achievementCount || 0
  )
);

sessionStorage.setItem(
  `achievement-reward-${result.attemptId}`,
  String(
    result.achievementReward || 0
  )
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

to-[#EEF3FB] p-5"
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
    src="/icons/tcd-shield.svg"
    className="w-8 h-8"
    alt=""
  />

  TCD Exam

</h1>

          <ExamTopStats
  durationMinutes={
    examInfo?.duration || 30
  }
  liveStudents={liveStudents}
  violations={violations}
  onTimeUp={submitExam}
/>

        </div>

      </div>

<div
className={`
fixed
${cameraPositionClass}
z-[9999]

w-20
h-20

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
fixed

bottom-28
right-4

z-[10000]

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

         
 <div className="text-2xl leading-loose font-medium text-[#243B6B] mb-10">
 <MathJax dynamic>
  {language === "hi"
    ? currentQuestionData?.question_text_hi || currentQuestionData?.question
    : currentQuestionData?.question}
</MathJax>
</div>


          <div className="space-y-4">

            {(
  currentQuestionData?.shuffledOptions ?? [
    currentQuestionData?.option_a,
    currentQuestionData?.option_b,
    currentQuestionData?.option_c,
    currentQuestionData?.option_d,
  ].filter(Boolean)
).map((option: string, index: number) => {

  const optionKey =
    option === currentQuestionData.option_a
      ? "A"
      : option === currentQuestionData.option_b
      ? "B"
      : option === currentQuestionData.option_c
      ? "C"
      : "D";

  return (
                  <button
                    key={`${option}-${index}`}

                    onClick={() =>
  selectAnswer(
    currentQuestionData.id,
    optionKey
  )
}

                    className={`w-full text-left p-3 rounded-xl border text-lg font-medium transition-colors

                      ${
                        answers[currentQuestionData.id] === optionKey

                          ? "bg-[#243B6B] text-white border-[#243B6B] shadow-lg"

                          : "bg-white text-[#243B6B] border-gray-200 hover:border-[#243B6B] hover:bg-[#243B6B]/5"
                      }
                    `}
                  >

                    <span className="font-bold mr-2">
  {optionKey}.
</span>

<MathText
  text={
    language === "hi"
      ? (
          optionKey === "A"
            ? currentQuestionData.option_a_hi || currentQuestionData.option_a
            : optionKey === "B"
            ? currentQuestionData.option_b_hi || currentQuestionData.option_b
            : optionKey === "C"
            ? currentQuestionData.option_c_hi || currentQuestionData.option_c
            : currentQuestionData.option_d_hi || currentQuestionData.option_d
        )
      : option
  }
/>

                  </button>
                )
})}

          </div>

        </div>

      </div>

      <div className="flex justify-between items-center mt-5">

        <button
 onClick={async () => {

  const prevIndex =
    Math.max(
      currentQuestion - 1,
      0
    );

  await fetchQuestionByIndex(
    prevIndex
  );
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
      onClick={() => {
  const nextIndex =
    currentQuestion + 1;

  if (
    nextIndex >= totalQuestions
  ) {
    return;
  }

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

    // Prepare the question after this one
    if (
      nextIndex + 1 <
      totalQuestions
    ) {
      prefetchQuestion(
        nextIndex + 1
      );
    }

    return;
  }

  // Fallback if prefetch has not completed
  fetchQuestionByIndex(
    nextIndex
  );
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
);
}

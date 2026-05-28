"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import {
  sendStudentWarning,
  forceSubmitStudent,
  removeStudent,
} from "@/services/liveStatus.service";
import StudentVideoTile
from "@/components/dashboard/StudentVideoTile";
import { useRouter } from "next/navigation";
export default function
TeacherMonitorPage() {

  const [students,
    setStudents] =
    useState<any[]>([]);
    const [selectedExam,
  setSelectedExam] =
  useState("all");

const [exams,
  setExams] =
  useState<any[]>([]);
const [submittedStudents,
  setSubmittedStudents] =
  useState<any[]>([]);
  const [loading,
    setLoading] =
    useState(true);
const [videoStreams,
  setVideoStreams] =
  useState<any>({});
const router = useRouter();
  useEffect(() => {

  async function loadData() {

    const {
      data,
    } = await supabase

      .from(
        "exam_live_status"
      )

      .select("*")

      .order(
        "updated_at",
        {
          ascending: false,
        }
      );

if (data) {
const {
  data: examsData,
} = await supabase

  .from("exams")

  .select(`
    id,
    title
  `)

  .order(
    "title"
  );

if (examsData) {

  setExams(
    examsData
  );
}
  let filteredData =
  data;

if (
  selectedExam !==
  "all"
) {

  filteredData =
    data.filter(
      (student) =>
        student.exam_id ===
        selectedExam
    );
}

const activeStudents =
  filteredData.filter(
    (student) => {

      const diff =
        Date.now() -
        new Date(
          student.updated_at
        ).getTime();

      return (
        diff < 30000 &&
        !student.submitted
      );
    }
  );

const completedStudents =
  filteredData.filter(
    (student) =>
      student.submitted
  );

  setStudents(
    activeStudents
  );

  setSubmittedStudents(
    completedStudents
  );
}

    setLoading(false);
  }

  loadData();

  // AUTO REFRESH EVERY 5 SECONDS
  const interval =
    setInterval(
      loadData,
      5000
    );

  const channel =
    supabase

      .channel(
        "exam-monitor"
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table:
            "exam_live_status",
        },

        () => {

          loadData();
        }
      )

      .subscribe();

  return () => {

    clearInterval(
      interval
    );

    supabase
      .removeChannel(
        channel
      );
  };

}, [selectedExam]);

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-gray-50">

        <h1 className="text-3xl font-bold">

          Loading Monitoring Dashboard...

        </h1>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-gray-50 p-5">

      <div className="flex items-center justify-between mb-10">


     <div>

 <button
  onClick={() =>
    router.push(
      "/teacher"
    )
  }
  className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold"
>
  ← Back to Dashboard
</button>

  <h1 className="text-4xl font-bold">

    Teacher Monitoring Dashboard

  </h1>

  <p className="text-gray-600 mt-2">

    Live realtime monitoring of students

  </p>

</div>

        <div className="flex gap-2">
<select
  value={selectedExam}
  onChange={(e) =>
    setSelectedExam(
      e.target.value
    )
  }
  className="border rounded-xl px-4 py-3 font-semibold"
>
  <option value="all">
    All Exams
  </option>

  {exams.map(
    (exam) => (
      <option
        key={exam.id}
        value={exam.id}
      >
        {exam.title}
      </option>
    )
  )}
</select>
  <div className="bg-black text-white px-6 py-3 rounded-2xl font-bold text-xl">

    Live Students:
    {" "}
    {students.length}

  </div>

  <div className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-xl">

    Submitted:
    {" "}
    {submittedStudents.length}

  </div>

</div>

      </div>

      {students.length === 0 && (

        <div className="bg-white rounded-3xl p-6 border text-center">

          <h2 className="text-3xl font-bold mb-4">

            No Active Students

          </h2>

          <p className="text-gray-500">

            Students will appear here during live exams

          </p>

        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

       {students.map(
  (student) => {

    const secondsAgo =
      Math.floor(
        (
          Date.now() -
          new Date(
            student.updated_at
          ).getTime()
        ) / 1000
      );

    let status =
      "🔴 DISCONNECTED";

    if (
      secondsAgo <= 15
    ) {

      status =
        "🟢 ACTIVE";

    } else if (
      secondsAgo <= 60
    ) {

      status =
        "🟡 IDLE";
    }

    return (

            <div
              key={student.id}

              className={`rounded-3xl border p-6 shadow-sm transition-all

                ${
                  student.violations >= 2

                    ? "bg-red-50 border-red-400"

                    : student.violations === 1

                    ? "bg-yellow-50 border-yellow-400"

                    : "bg-white"
                }
              `}
            >

              <div className="flex items-start justify-between mb-3">

                <div>

                  <h2 className="text-2xl font-bold">

                    {
                      student.student_name
                    }

                  </h2>

                  <p className="text-gray-500 mt-1">

                    User ID:
                    {" "}
                    {
                      student.user_id
                    }

                  </p>

                </div>

                <div
                 className={`px-4 py-2 rounded-xl text-sm font-bold

  ${
    status.includes("ACTIVE")

      ? "bg-green-100 text-green-700"

      : status.includes("IDLE")

      ? "bg-yellow-100 text-yellow-700"

      : "bg-red-100 text-red-700"
  }
`}
                >

                 {status}

                </div>

              </div>

              <div className="space-y-4 text-lg">
<div className="flex justify-between">

  <span>
    Last Seen
  </span>

  <span className="font-bold">

    {Math.floor(
      (
        Date.now() -
        new Date(
          student.updated_at
        ).getTime()
      ) / 1000
    )} sec ago

  </span>

</div>
                <div className="flex justify-between">

                  <span>
                    Current Question
                  </span>

                  <span className="font-bold">

                    {
                      student.current_question
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Violations
                  </span>

                  <span
                    className={`font-bold

                      ${
                        student.violations >= 2

                          ? "text-red-600"

                          : student.violations === 1

                          ? "text-yellow-600"

                          : "text-green-600"
                      }
                    `}
                  >

                    {
                      student.violations
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Fullscreen
                  </span>

                  <span
                    className={`font-bold

                      ${
                        student.fullscreen

                          ? "text-green-600"

                          : "text-red-600"
                      }
                    `}
                  >

                    {
                      student.fullscreen

                        ? "YES"

                        : "NO"
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Camera
                  </span>

                  <span
                    className={`font-bold

                      ${
                        student.camera_enabled

                          ? "text-green-600"

                          : "text-red-600"
                      }
                    `}
                  >

                    {
                      student.camera_enabled

                        ? "ON"

                        : "OFF"
                    }

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Microphone
                  </span>

                  <span
                    className={`font-bold

                      ${
                        student.mic_enabled

                          ? "text-green-600"

                          : "text-red-600"
                      }
                    `}
                  >

                    {
                      student.mic_enabled

                        ? "ON"

                        : "OFF"
                    }

                  </span>

                </div>

              </div>

              <div className="flex flex-wrap gap-3 mt-8">

                <button
                  onClick={() =>
                    sendStudentWarning({

                      exam_id:
                        student.exam_id,

                      user_id:
                        student.user_id,

                      message:
                        "Suspicious activity detected",
                    })
                  }

                  className="bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold"
                >

                  Warn

                </button>

                <button
                  onClick={() =>
                    forceSubmitStudent({

                      exam_id:
                        student.exam_id,

                      user_id:
                        student.user_id,
                    })
                  }

                  className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
                >

                  Force Submit

                </button>

                <button
                  onClick={() =>
                    removeStudent({

                      exam_id:
                        student.exam_id,

                      user_id:
                        student.user_id,
                    })
                  }

                  className="bg-black text-white px-4 py-2 rounded-xl font-bold"
                >

                  Remove

                </button>

              </div>

            </div>
          )
        }
        )}
        

      </div>
{submittedStudents.length > 0 && (

  <div className="mt-12">

    <h2 className="text-3xl font-bold mb-3">

      Submitted Students

    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

      {submittedStudents.map(
        (student) => (

          <div
            key={student.id}
            className="bg-green-50 border border-green-300 rounded-3xl p-6"
          >

            <h3 className="text-xl font-bold">

              {student.student_name}

            </h3>

            <p className="text-green-700 font-semibold mt-2">

              Exam Submitted

            </p>

          </div>
        )
      )}

    </div>

  </div>
    )
  }

      {/* LIVE WEBCAM FEEDS */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-3">

          Live Webcam Feeds

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          {Object.entries(
            videoStreams
          ).map(
            ([id, data]: any) => (

              <StudentVideoTile
                key={id}
                stream={data.stream}
                studentName={data.name}
              />
            )
          )}

        </div>

      </div>

    </main>
  );
}

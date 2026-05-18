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
export default function
TeacherMonitorPage() {

  const [students,
    setStudents] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);
const [videoStreams,
  setVideoStreams] =
  useState<any>({});

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

        setStudents(data);
      }

      setLoading(false);
    }

    loadData();

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

      supabase
        .removeChannel(
          channel
        );
    };

  }, []);

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

    <main className="min-h-screen bg-gray-50 p-8">

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold">

            Teacher Monitoring Dashboard

          </h1>

          <p className="text-gray-600 mt-2">

            Live realtime monitoring of students

          </p>

        </div>

        <div className="bg-black text-white px-6 py-4 rounded-2xl font-bold text-xl">

          Live Students:
          {" "}
          {students.length}

        </div>

      </div>

      {students.length === 0 && (

        <div className="bg-white rounded-3xl p-10 border text-center">

          <h2 className="text-3xl font-bold mb-4">

            No Active Students

          </h2>

          <p className="text-gray-500">

            Students will appear here during live exams

          </p>

        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {students.map(
          (student) => (

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

              <div className="flex items-start justify-between mb-6">

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
                      student.submitted

                        ? "bg-green-100 text-green-700"

                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                >

                  {
                    student.submitted

                      ? "SUBMITTED"

                      : "LIVE"
                  }

                </div>

              </div>

              <div className="space-y-4 text-lg">

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
        )}
<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    Live Webcam Feeds
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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

      </div>

    </main>
  );
}
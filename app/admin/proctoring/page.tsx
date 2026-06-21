"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";
function getFaceStatus(
  faceCount: number
) {

  if (faceCount === 0) {
    return {
      label: "No Face",
      className:
        "bg-yellow-100 text-yellow-700",
    };
  }

  if (faceCount > 1) {
    return {
      label: "Multiple Faces",
      className:
        "bg-red-100 text-red-700",
    };
  }

  return {
    label: "Single Face",
    className:
      "bg-green-100 text-green-700",
  };

}
function timeAgo(
  dateString: string
) {

  const seconds =
    Math.floor(
      (
        Date.now() -
        new Date(
          dateString
        ).getTime()
      ) / 1000
    );

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  if (seconds < 3600) {
    return `${Math.floor(
      seconds / 60
    )}m ago`;
  }

  return `${Math.floor(
    seconds / 3600
  )}h ago`;
}
function isOnline(
  lastSeen?: string
) {

  if (!lastSeen) {
    return false;
  }

  const age =
    Date.now() -
    new Date(
      lastSeen
    ).getTime();

  return age < 300000;
}
export default function ProctoringPage() {

  const [
    events,
    setEvents
  ] = useState<any[]>([]);
const [snapshots, setSnapshots] =
  useState<Record<string, string>>({});
 const [
  snapshotTimes,
  setSnapshotTimes
] = useState<
  Record<string,string>
>({});
  useEffect(() => {

  loadEvents();

  loadSnapshots();

  const interval =
    setInterval(() => {

      loadEvents();

      loadSnapshots();

    }, 10000);

  return () =>
    clearInterval(interval);

}, []);

  async function loadEvents() {

  const {
    data,
    error,
  } = await supabase

    .from(
      "proctoring_events"
    )

    .select(`
      *,
      users (
        name,
        email
      )
    `)

    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {

  console.error(
    "PROCTORING ERROR:",
    JSON.stringify(error, null, 2)
  );

  return;

}

 
  const grouped =
    Object.values(

      (data || []).reduce(
        (
          acc: any,
          item: any
        ) => {

          const key =
            item.student_id;

          if (!acc[key]) {

            acc[key] = {

              student_id:
                item.student_id,

              name:
                item.users?.name,

              email:
                item.users?.email,

              violations: 0,

              latestFaceCount: 1,

              latestEvent:
                item.created_at,

            };

          }

          if (
            item.event_type ===
            "violation"
          ) {

            acc[key]
              .violations++;

          }

          if (
            item.face_count !==
            null
          ) {

            acc[key]
              .latestFaceCount =
              item.face_count;

          }

          return acc;

        },
        {}
      )
    );

  setEvents(grouped);

}
 async function loadSnapshots() {

  const { data } =
    await supabase

      .from(
        "proctoring_snapshots"
      )

      .select(`
        student_id,
        image_url,
        created_at
      `)

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

 const latest:
Record<string,string> = {};

const latestTime:
Record<string,string> = {};

  data?.forEach(
    (item) => {

      if (
        !latest[
          item.student_id
        ]
      ) {

        latest[
          item.student_id
        ] =
          item.image_url;

          latestTime[
  item.student_id
] =
  item.created_at;

      }

    }
  );

  setSnapshots(latest);
  setSnapshotTimes(
  latestTime
);

}
async function sendWarning(
  studentId: string
) {

  await supabase

    .from(
      "exam_live_status"
    )

    .update({

      warning_message:
        "Please keep your face visible.",

      warning_sent_at:
        new Date().toISOString(),

    })

    .eq(
      "user_id",
      studentId
    );

}
async function forceSubmit(
  studentId: string
) {

  const confirmed =
    confirm(
      "Force submit this student's exam?"
    );

  if (!confirmed) {
    return;
  }

  const { error } =
    await supabase

      .from(
        "exam_live_status"
      )

      .update({

        force_submit:
          true,

      })

      .eq(
        "user_id",
        studentId
      );

  if (error) {

    console.error(
      error
    );

    return;
  }

  alert(
    "Exam force submitted"
  );

}
  return (

  <div className="p-6 md:p-8 bg-slate-50 min-h-screen">

    {/* HERO */}

    <div
      className="
        rounded-[32px]
        bg-gradient-to-r
        from-[#243B6B]
        to-[#36558F]
        p-8
        text-white
        mb-8
        shadow-xl
      "
    >

      <div className="flex items-center gap-5">

        <div
          className="
            w-20
            h-20
            rounded-3xl
            bg-white/10
            backdrop-blur-sm
            flex
            items-center
            justify-center
          "
        >

          <img
            src="/icons/tcd-shield.svg"
            alt="TCD Shield"
            className="w-12 h-12"
          />

        </div>

        <div>

          <h1
            className="
              text-4xl
              font-black
            "
          >
            Proctoring Center
          </h1>

          <p
            className="
              text-white/80
              mt-2
            "
          >
            Real-Time Examination Integrity Monitoring
          </p>

        </div>

      </div>

    </div>

    {/* KPI CARDS */}

    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
        mb-8
      "
    >

      {/* STUDENTS */}

      <div
        className="
          bg-white
          rounded-[28px]
          p-6
          border
          border-[#243B6B]/10
          shadow-[0_10px_40px_rgba(36,59,107,0.08)]
        "
      >

        <div className="flex items-center justify-between">

          <img
            src="/icons/learning-journey.svg"
            alt=""
            className="w-10 h-10"
          />

          <span
            className="
              text-3xl
              font-black
              text-[#243B6B]
            "
          >
            {events.length}
          </span>

        </div>

        <p className="text-sm text-brand-light mt-3">
          Students
        </p>

      </div>

      {/* HIGH RISK */}

      <div
        className="
          bg-white
          rounded-[28px]
          p-6
          border
          border-red-200
          shadow-[0_10px_40px_rgba(36,59,107,0.08)]
        "
      >

        <div className="flex items-center justify-between">

          <img
            src="/icons/security.svg"
            alt=""
            className="w-10 h-10"
          />

          <span
            className="
              text-3xl
              font-black
              text-red-600
            "
          >
            {
              events.filter(
                (e) =>
                  e.violations >= 6
              ).length
            }
          </span>

        </div>

        <p className="text-sm text-brand-light mt-3">
          High Risk
        </p>

      </div>

      {/* MEDIUM */}

      <div
        className="
          bg-white
          rounded-[28px]
          p-6
          border
          border-yellow-200
          shadow-[0_10px_40px_rgba(36,59,107,0.08)]
        "
      >

        <div className="flex items-center justify-between">

          <img
            src="/icons/tcd-target.svg"
            alt=""
            className="w-10 h-10"
          />

          <span
            className="
              text-3xl
              font-black
              text-yellow-600
            "
          >
            {
              events.filter(
                (e) =>
                  e.violations >= 3 &&
                  e.violations < 6
              ).length
            }
          </span>

        </div>

        <p className="text-sm text-brand-light mt-3">
          Medium Risk
        </p>

      </div>

      {/* LOW */}

      <div
        className="
          bg-white
          rounded-[28px]
          p-6
          border
          border-green-200
          shadow-[0_10px_40px_rgba(36,59,107,0.08)]
        "
      >

        <div className="flex items-center justify-between">

          <img
            src="/icons/mastery-star.svg"
            alt=""
            className="w-10 h-10"
          />

        <div className="flex gap-2">

 <span
  className="
    text-3xl
    font-black
    text-green-600
  "
>
  {
    events.filter(
      (e) => e.violations < 3
    ).length
  }
</span>

  </div>

        </div>

        <p className="text-sm text-brand-light mt-3">
          Low Risk
        </p>

      </div>

    </div>

    {/* STUDENT CARDS */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >

      {events.map((event) => (

        <div
          key={event.student_id}
          className="
            bg-white
            rounded-[28px]
            border
            border-[#243B6B]/10
            overflow-hidden
            shadow-[0_10px_40px_rgba(36,59,107,0.08)]
          "
        >

          {/* SNAPSHOT */}

         <div
  className="
    h-40
    overflow-hidden
    bg-slate-100
  "
>

  {snapshots[
    event.student_id
  ] ? (

    <img
      src={
        snapshots[
          event.student_id
        ]
      }
      alt=""
      className="
        w-full
        h-full
        object-cover
      "
    />

  ) : (

    <div
      className="
        h-full
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#243B6B]
        to-[#36558F]
      "
    >

      <img
        src="/icons/security.svg"
        alt=""
        className="w-16 h-16"
      />

    </div>

  )}

</div>

          {/* CONTENT */}

          <div className="p-6">

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <h3
                  className="
                    text-xl
                    font-black
                    text-[#243B6B]
                  "
                >
                  {event.name}
                </h3>

                <p
                  className="
                    text-sm
                    text-brand-light
                  "
                >
                  {event.email}
                </p>
<p
  className="
    text-xs
    text-[#243B6B]/70
    mt-1
  "
>

  Last Seen:

  {" "}

  {
    snapshotTimes[
      event.student_id
    ]
      ? timeAgo(
          snapshotTimes[
            event.student_id
          ]
        )
      : "Never"
  }

</p>
              </div>

              <div className="flex gap-2">

  <span
    className={`
      px-4
      py-2
      rounded-full
      text-xs
      font-bold

      ${
        event.violations >= 6
          ? "bg-red-100 text-red-700"
          : event.violations >= 3
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
      }
    `}
  >
    {
      event.violations >= 6
        ? "HIGH"
        : event.violations >= 3
        ? "MEDIUM"
        : "LOW"
    }
  </span>

  <span
    className={`
      px-4
      py-2
      rounded-full
      text-xs
      font-bold
      ${
        isOnline(
          snapshotTimes[event.student_id]
        )
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }
    `}
  >
    {
      isOnline(
        snapshotTimes[event.student_id]
      )
        ? "ONLINE"
        : "OFFLINE"
    }
  </span>

</div>

            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-4
                mt-6
              "
            >

              {/* VIOLATIONS */}

              <div
                className="
                  rounded-2xl
                  bg-[#F8FAFD]
                  p-4
                "
              >

                <div className="flex items-center gap-2 mb-2">

                  <img
                    src="/icons/fire.svg"
                    alt=""
                    className="w-5 h-5"
                  />

                  <span
                    className="
                      text-xs
                      text-brand-light
                    "
                  >
                    Violations
                  </span>

                </div>

                <p
                  className="
                    text-3xl
                    font-black
                    text-[#243B6B]
                  "
                >
                  {event.violations}
                </p>

              </div>

              {/* FACE COUNT */}

              <div
  className="
    rounded-2xl
    bg-[#FFF9E8]
    p-4
  "
>

  <div className="flex items-center gap-2 mb-2">

    <img
      src="/icons/questions.svg"
      alt=""
      className="w-5 h-5"
    />

    <span
      className="
        text-xs
        text-brand-light
      "
    >
      Face Count
    </span>

  </div>

  <p
    className="
      text-3xl
      font-black
      text-[#D4AF37]
    "
  >
    {event.latestFaceCount}
  </p>

  <div className="mt-2">

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-bold
        ${
          getFaceStatus(
            event.latestFaceCount
          ).className
        }
      `}
    >
      {
        getFaceStatus(
          event.latestFaceCount
        ).label
      }
    </span>

  </div>

</div>
<div className="mt-5">

  <button

  disabled={
    !isOnline(
      snapshotTimes[
        event.student_id
      ]
    )
  }

  onClick={() =>
    sendWarning(
      event.student_id
    )
  }

  className={`
    w-full
    rounded-2xl
    py-3
    font-bold

    ${
      isOnline(
        snapshotTimes[
          event.student_id
        ]
      )

        ? "bg-[#243B6B] text-white"

        : "bg-gray-300 text-brand-light cursor-not-allowed"

    }
  `}
>

  {
    isOnline(
      snapshotTimes[
        event.student_id
      ]
    )

      ? "⚠ Warn Student"

      : "⚫ Student Offline"
  }

</button>
<button

  disabled={
    !isOnline(
      snapshotTimes[
        event.student_id
      ]
    )
  }

  onClick={() =>
    forceSubmit(
      event.student_id
    )
  }

  className={`
    mt-3
    w-full
    rounded-2xl
    py-3
    font-bold

    ${
      isOnline(
        snapshotTimes[
          event.student_id
        ]
      )
        ? "bg-red-600 text-white"
        : "bg-gray-300 text-brand-light cursor-not-allowed"
    }
  `}
>

  🛑 Force Submit

</button>
</div>
            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

);
}
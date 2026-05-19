"use client";
import React from "react";
import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  Trophy,
  Users,
  TrendingUp,
} from "lucide-react";

const liveMessages = [

  {
    icon: Trophy,

    title:
      "Leaderboard Active",

    message:
      "Top ranks are changing continuously",
  },

  {
    icon: Users,

    title:
      "Students Competing",

    message:
      "Multiple students are attempting live",
  },

  {
    icon: TrendingUp,

    title:
      "Rank Updates",

    message:
      "Accuracy improves your live rank",
  },

  {
    icon: Activity,

    title:
      "Exam Running",

    message:
      "Live evaluation is in progress",
  },
];

function LiveEventFeed() {

  const [index, setIndex] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setIndex(
          (prev) =>
            (prev + 1) %
            liveMessages.length
        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const current =
    liveMessages[index];

  const Icon =
    current.icon;

  return (

    <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-3 w-full overflow-hidden scale-90 origin-bottom-right">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-sm font-bold text-gray-900">

            Live Exam Feed

          </h2>

          <p className="text-xs text-gray-500 mt-1">

            Real-time exam activity

          </p>

        </div>

        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

      </div>

      {/* LIVE CARD */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-lg transition-all duration-500">

        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-start gap-4">

          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">

            <Icon className="w-6 h-6" />

          </div>

          <div>

            <h3 className="font-bold text-lg mb-1">

              {current.title}

            </h3>

            <p className="text-xs text-blue-100 leading-relaxed">

              {current.message}

            </p>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="flex items-center justify-between mt-5 text-xs text-gray-500">

        <span>
          Updates every 5 sec
        </span>

        <span className="font-semibold text-green-600">
          LIVE
        </span>

      </div>

    </div>
  );
}


export default React.memo(
  LiveEventFeed
);
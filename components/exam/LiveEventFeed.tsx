"use client";

import {
  useEffect,
  useState,
} from "react";
import { memo } from "react";
const sampleEvents = [

  "Rahul entered Top 10",
  "New highest score achieved",
  "Rank #3 changed",
  "A student completed the exam",
  "Top score increased",
  "Leaderboard updated",
  "Live competition intensifying",

];

function LiveEventFeed() {

  const [events, setEvents] =
    useState<string[]>([]);

  useEffect(() => {

    const interval =
      setInterval(() => {

        const randomEvent =
          sampleEvents[
            Math.floor(
              Math.random() *
              sampleEvents.length
            )
          ];

        setEvents((prev) => [

          randomEvent,

          ...prev.slice(0, 4),

        ]);

      }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="bg-white border rounded-3xl p-5 shadow-sm">

      <h2 className="text-xl font-bold mb-4">

        Live Activity

      </h2>

      <div className="space-y-3">

        {events.map(
          (event, index) => (

            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-3 text-sm font-medium animate-pulse"
            >

              🔴
              {" "}
              {event}

            </div>

          )
        )}

      </div>

    </div>
  );
}
export default memo(
  LiveEventFeed
);
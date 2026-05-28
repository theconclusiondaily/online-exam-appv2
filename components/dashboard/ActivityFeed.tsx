"use client";
import {
  useEffect,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import { TCDIcons }
from "@/components/ui/tcd-icons";

interface ActivityFeedProps {

  activities: any[];

  setActivities: any;

}

export default function ActivityFeed({

  activities,

  setActivities,

}: ActivityFeedProps) {

  function getActivityIcon(
    type: string
  ) {

    switch (type) {

      case "achievement":

        return (
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-tcd-gold/10

              flex
              items-center
              justify-center
            "
          >
            {TCDIcons.achievement}
          </div>
        );

      case "exam":

        return (
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-blue-100

              flex
              items-center
              justify-center
            "
          >
            {TCDIcons.target}
          </div>
        );

      case "xp":

        return (
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-green-100

              flex
              items-center
              justify-center
            "
          >
            {TCDIcons.rank}
          </div>
        );

      case "streak":

        return (
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-orange-100

              flex
              items-center
              justify-center
            "
          >
            {TCDIcons.mastery}
          </div>
        );

      default:

        return (
          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-gray-100

              flex
              items-center
              justify-center
            "
          >
            {TCDIcons.journey}
          </div>
        );
    }
  }
useEffect(() => {

  const channel =
    supabase

      .channel(
        "activity-feed"
      )

      .on(
        "postgres_changes",
        {
          event: "INSERT",

          schema: "public",

          table:
            "activity_feed",
        },

        (payload) => {

          setActivities(
            (
              prev: any[]
            ) => [

              payload.new,

              ...prev,
            ]
              .slice(0, 10)
          );
        }
      )

      .subscribe();

  return () => {

    supabase.removeChannel(
      channel
    );
  };

}, [setActivities]);
  return (

    <div
      className="
        bg-white

        rounded-[30px]

        border
        border-gray-100

        p-4

        shadow-sm
      "
    >

      {/* HEADER */}

      <div className="mb-4">

        <div
          className="
            h-1
            w-20

            bg-tcd-gold

            rounded-full

            mb-3
          "
        />

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black

                text-tcd-blue
              "
            >

              Live Activity

            </h2>

            <p
              className="
                text-sm
                text-gray-500

                mt-1
              "
            >

              Real-time ecosystem activity

            </p>

          </div>

          <div
            className="
              flex
              items-center

              gap-2

              px-3
              py-1.5

              rounded-full

              bg-green-100

              text-green-700

              text-sm
              font-semibold
            "
          >

            <div
              className="
                w-2
                h-2

                rounded-full

                bg-green-500

                animate-pulse
              "
            />

            Live

          </div>

        </div>

      </div>

      {/* EMPTY */}

      {
        activities.length === 0 ? (

          <div
            className="
              flex
              flex-col

              items-center
              justify-center

              py-14

              text-center
            "
          >

            <div
              className="
                w-20
                h-20

                rounded-[28px]

                bg-[#F7F9FC]

                flex
                items-center
                justify-center

                mb-4
              "
            >

              {TCDIcons.leaderboard}

            </div>

            <h3
              className="
                text-xl
                font-bold

                text-tcd-blue
              "
            >

              No Activity Yet

            </h3>

            <p
              className="
                text-gray-500

                mt-2

                max-w-md
              "
            >

              Student ecosystem activity
              will appear here once
              exams and achievements
              start happening.

            </p>

          </div>

        ) : (

          <div
            className="
              space-y-3
            "
          >

            {
              activities.map(
                (
                  activity,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      relative

                      flex
                      items-start

                      gap-3

                      bg-[#F7F9FC]

                      rounded-2xl

                      p-3

                      hover:bg-[#EEF3FF]

                      transition-all
                    "
                  >

                    {/* ICON */}

                    {
                      getActivityIcon(
                        activity.activity_type
                      )
                    }

                    {/* CONTENT */}

                    <div className="flex-1">

                      <div
                        className="
                          flex
                          items-center
                          justify-between

                          gap-3
                        "
                      >

                        <h3
                          className="
                            font-bold

                            text-tcd-blue
                          "
                        >

                          {activity.title}

                        </h3>

                        <p
                          className="
                            text-xs
                            text-gray-500

                            whitespace-nowrap
                          "
                        >

                          {
                            new Date(
                              activity.created_at
                            ).toLocaleString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          }

                        </p>

                      </div>

                      <p
                        className="
                          text-sm
                          text-gray-600

                          mt-1
                        "
                      >

                        {
                          activity.description
                        }

                      </p>

                    </div>

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
}
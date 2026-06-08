"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [userId, setUserId] =
    useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          loadNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  async function loadNotifications() {
    const {
      data: authData,
    } = await supabase.auth.getUser();

    const user =
      authData.user;

    if (!user) return;

    setUserId(user.id);

    const { data } =
      await supabase
        .from("notifications")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setNotifications(
      data || []
    );

    await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "is_read",
        false
      );
  }

  function getIcon(type: string) {
    switch (type) {
      case "achievement":
        return "🏆";

      case "reward":
        return "🪙";

      case "exam":
        return "📝";

      case "certificate":
        return "📜";

      default:
        return "🔔";
    }
  }

  return (
    <main className="p-6">
      <div className="max-w-5xl mx-auto">

        <h1
          className="
            text-3xl
            font-black
            text-tcd-blue
            mb-6
          "
        >
          Notifications
        </h1>

        {notifications.length === 0 ? (

          <div
            className="
              bg-white
              rounded-[28px]
              p-6
              border
              border-gray-100
              shadow-sm
            "
          >
            No notifications yet.
          </div>

        ) : (

          <div className="space-y-4">

            {notifications.map(
              (notification) => (

                <div
                  key={notification.id}
                  className="
                    bg-white
                    rounded-[28px]
                    p-5
                    border
                    border-gray-100
                    shadow-sm
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-2
                    "
                  >

                    <span className="text-2xl">
                      {getIcon(
                        notification.type
                      )}
                    </span>

                    <h3
                      className="
                        font-bold
                        text-tcd-blue
                      "
                    >
                      {notification.title}
                    </h3>

                  </div>

                  <p
                    className="
                      text-gray-700
                    "
                  >
                    {notification.message}
                  </p>

                  <p
                    className="
                      text-xs
                      text-gray-300
                      mt-3
                    "
                  >
                    {new Date(
                      notification.created_at
                    ).toLocaleString()}
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>
    </main>
  );
}
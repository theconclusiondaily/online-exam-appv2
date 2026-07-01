"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();

    const channel = supabase
      .channel("activity-feed-admin")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activity_feed",
        },
        () => {
          loadActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadActivities() {
    try {
      const { data } = await supabase
        .from("activity_feed")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(15);

      setActivities(data || []);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    activities,
    setActivities,
  };
}
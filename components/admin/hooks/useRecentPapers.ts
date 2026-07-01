"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useRecentPapers() {
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState<any[]>([]);

  useEffect(() => {
    loadPapers();
  }, []);

  async function loadPapers() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("question_papers")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(5);

      if (error) throw error;

      setPapers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    papers,
    reload: loadPapers,
  };
}
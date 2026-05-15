"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestPage() {
  useEffect(() => {
    async function test() {
      const { data, error } =
        await supabase.auth.getSession();

      console.log("SESSION:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return (
    <div className="p-10 text-white">
      Supabase Test Working
    </div>
  );
}
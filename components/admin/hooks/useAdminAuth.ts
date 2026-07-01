"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function useAdminAuth() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (!data) {
        router.push("/login");
        return;
      }

      if (data.role !== "admin") {
        router.push("/teacher");
        return;
      }

      setProfile(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    profile,
  };
}
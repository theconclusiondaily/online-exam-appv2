"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";
import TCDLoader from "./common/TCDLoader";
import { supabase }
from "@/lib/supabase/client";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    async function checkAdmin() {

      // AUTH USER

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      

      if (!user) {

        router.replace(
          "/login"
        );

        return;
      }

      // PROFILE

      const {
        data: profile,
        error,
      } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

   

      // PROFILE NOT FOUND

      if (!profile) {

        alert(
          "Profile not found"
        );

        router.push(
          "/login"
        );

        return;
      }

      // BLOCK NON ADMINS

      if (
        profile.role !==
        "admin"
      ) {

        alert(
          "Access Denied"
        );

        switch (profile.role) {
  case "teacher":
    router.replace("/teacher");
    return;

  case "student":
    router.replace("/dashboard")
    return;

  default:
    router.replace("/login");
    return;
}

        return;
      }

      setLoading(false);
    }

    checkAdmin();

  }, [router]);

if (loading) {
  return (
    <TCDLoader text="Authenticating" />
  );
}

  return <>{children}</>;
}
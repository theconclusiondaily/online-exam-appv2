"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

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

      console.log(
        "AUTH USER:",
        user
      );

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
        .eq(
          "email",
          user.email
        )
        .maybeSingle();

      console.log(
        "PROFILE:",
        profile
      );

      console.log(
        "ERROR:",
        error
      );

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

        router.push(
          "/teacher"
        );

        return;
      }

      setLoading(false);
    }

    checkAdmin();

  }, [router]);

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <div className="text-2xl font-bold">

          Loading...

        </div>

      </main>

    );
  }

  return <>{children}</>;
}
"use client";

import {
  useEffect,
  ReactNode,
} from "react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

interface Props {
  children: ReactNode;
}

export default function SessionGuard({
  children,
}: Props) {

  const router =
    useRouter();

  useEffect(() => {

    let interval:
      NodeJS.Timeout;

    async function checkSession() {

      try {

        const {
          data: {
            user,
          },
        } =
          await supabase.auth.getUser();

        if (!user) {
          return;
        }

        const localToken =
          localStorage.getItem(
            "tcd_session_token"
          );

        if (!localToken) {

          await supabase.auth.signOut();

          router.replace(
            "/login"
          );

          return;
        }

        const {
          data: activeSession,
          error,
        } = await supabase
          .from(
            "active_sessions"
          )
          .select(
            "session_token"
          )
          .eq(
            "user_id",
            user.id
          )
          .single();

        if (
          error ||
          !activeSession
        ) {

          await supabase.auth.signOut();

          router.replace(
            "/login"
          );

          return;
        }

        if (
          activeSession.session_token !==
          localToken
        ) {

          alert(
            "Your account has been logged in on another device."
          );

          localStorage.removeItem(
            "tcd_session_token"
          );

          await supabase.auth.signOut();

          router.replace(
            "/login"
          );
        }

      } catch (err) {

        console.error(
          "Session check failed",
          err
        );
      }
    }

    checkSession();

    interval =
      setInterval(
        checkSession,
        30000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [router]);

  return <>{children}</>;
}
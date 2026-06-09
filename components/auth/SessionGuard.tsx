"use client";

import {
  useEffect,
  useState,
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
const [
  isReady,
  setIsReady,
] = useState(false);
  useEffect(() => {
const timer =
  setTimeout(() => {

    setIsReady(true);

  }, 3000);
  const isDemo =
  localStorage.getItem(
    "tcd_demo"
  ) === "true";

if (isDemo) {
  return;
}
    let interval:
      NodeJS.Timeout;

    async function forceLogout(
      message?: string
    ) {


      await supabase.auth.signOut();

      router.replace(
        "/login"
      );
    }

   async function checkSession() {

  try {

    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    const isDemo =
      localStorage.getItem(
        "tcd_demo"
      ) === "true";

    if (!session) {

      if (isDemo) {
        return;
      }

      router.replace("/login");
      return;
    }

    const localToken =
      localStorage.getItem(
        "tcd_session_token"
      );

      if (!localToken) {

  console.warn(
    "Session token missing"
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
  session.user.id
)
          .single();

       if (
  error ||
  !activeSession
) {

  console.warn(
    "Active session not found"
  );

  return;
}

        if (
          activeSession.session_token !==
          localToken
        ) {

          await forceLogout(
            "Your account has been logged in on another device."
          );

          return;
        }

      } catch (err) {

        console.error(
          "Session check failed",
          err
        );
      }
    }

    // Initial check
    checkSession();

    // Check every 30 seconds
    interval =
      setInterval(
        checkSession,
        30000
      );

    // Listen for Supabase auth changes
    const {
  data: authListener,
} = supabase.auth.onAuthStateChange(
  async (
    event,
    session
  ) => {

    const isDemo =
      localStorage.getItem(
        "tcd_demo"
      ) === "true";

    if (!session && !isDemo) {

      localStorage.removeItem(
        "tcd_session_token"
      );

      router.replace(
        "/login"
      );
    }
  }
);

   return () => {

  clearTimeout(
    timer
  );

  clearInterval(
    interval
  );

  authListener
    .subscription
    .unsubscribe();
};

  }, [router]);

  return <>{children}</>;
}
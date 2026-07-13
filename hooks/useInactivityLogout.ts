"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const WARNING_TIME = 25 * 60 * 1000; // 25 minutes
const LOGOUT_DELAY = 5 * 60 * 1000; // 5 minutes after warning

export default function useInactivityLogout() {
  const [showWarning, setShowWarning] = useState(false);

  const warningTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoutTimeout = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(async () => {
    // Never logout while writing an exam
    if (window.location.pathname.startsWith("/exam/")) {
      return;
    }

    localStorage.removeItem("tcd_session_token");
    sessionStorage.clear();

    await supabase.auth.signOut({
      scope: "global",
    });

    window.location.replace("/login");
  }, []);

  const clearTimers = useCallback(() => {
    if (warningTimeout.current) {
      clearTimeout(warningTimeout.current);
    }

    if (logoutTimeout.current) {
      clearTimeout(logoutTimeout.current);
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimers();

    setShowWarning(false);

    warningTimeout.current = setTimeout(() => {
      setShowWarning(true);

      logoutTimeout.current = setTimeout(() => {
        logout();
      }, LOGOUT_DELAY);
    }, WARNING_TIME);
  }, [clearTimers, logout]);

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "touchmove",
      "click",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimers();

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [resetTimer, clearTimers]);

  return {
    showWarning,
    resetTimer,
    logout,
  };
}
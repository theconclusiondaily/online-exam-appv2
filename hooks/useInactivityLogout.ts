"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
interface UseInactivityLogoutOptions {
  warningTime?: number;
  logoutDelay?: number;
  shouldIgnore?: (pathname: string) => boolean;
}
export default function useInactivityLogout({
  warningTime = 10  * 1000,
  logoutDelay = 10* 1000,
  shouldIgnore,
}: UseInactivityLogoutOptions = {}) {
  const [showWarning, setShowWarning] = useState(false);

  const warningTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoutTimeout = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(async () => {
    // Never logout while writing an exam
  const pathname = window.location.pathname;

if (shouldIgnore?.(pathname)) {
  return;
}
    localStorage.removeItem("tcd_session_token");
    sessionStorage.clear();

    await supabase.auth.signOut({
      scope: "global",
    });

    window.location.replace("/login");
  }, [shouldIgnore]);

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
    }, logoutDelay);
    }, warningTime);
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
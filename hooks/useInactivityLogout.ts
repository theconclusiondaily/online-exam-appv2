"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface UseInactivityLogoutOptions {
  warningTime?: number;
  logoutDelay?: number;
  shouldIgnore?: (pathname: string) => boolean;
}

export default function useInactivityLogout({
  warningTime = 25 * 60 * 1000, // 25 minutes
logoutDelay = 5 * 60 * 1000,  // 5-minute warning
  shouldIgnore,
}: UseInactivityLogoutOptions = {}) {
  const [showWarning, setShowWarning] = useState(false);

  const warningTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showWarningRef = useRef(false);
  const shouldIgnoreRef = useRef(shouldIgnore);

  // Keep the latest callback without recreating listeners
  useEffect(() => {
    shouldIgnoreRef.current = shouldIgnore;
  }, [shouldIgnore]);

  const clearTimers = useCallback(() => {
    if (warningTimeout.current) {
      clearTimeout(warningTimeout.current);
      warningTimeout.current = null;
    }

    if (logoutTimeout.current) {
      clearTimeout(logoutTimeout.current);
      logoutTimeout.current = null;
    }
  }, []);

  const logout = useCallback(async () => {
   

    const pathname = window.location.pathname;

    if (shouldIgnoreRef.current?.(pathname)) {
  
      return;
    }

    localStorage.removeItem("tcd_session_token");
    sessionStorage.clear();

    await supabase.auth.signOut({
      scope: "global",
    });

    window.location.replace("/login");
  }, []);

  const resetTimer = useCallback(() => {
    

    clearTimers();

    if (showWarningRef.current) {
      showWarningRef.current = false;
      setShowWarning(false);
    }

    warningTimeout.current = setTimeout(() => {
      

      showWarningRef.current = true;
      setShowWarning(true);

      logoutTimeout.current = setTimeout(() => {
        
        logout();
      }, logoutDelay);
    }, warningTime);
  }, [clearTimers, logout, logoutDelay, warningTime]);

  const handleActivity = useCallback(
    (event: Event) => {
      

      if (showWarningRef.current) return;

      resetTimer();
    },
    [resetTimer]
  );

  useEffect(() => {
    

    const pathname = window.location.pathname;

    if (shouldIgnoreRef.current?.(pathname)) {
      
      return;
    }

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
      window.addEventListener(event, handleActivity, {
        passive: true,
      })
    );

    resetTimer();

    return () => {
     

      clearTimers();

      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [handleActivity, resetTimer, clearTimers]);

  useEffect(() => {
    
  }, [showWarning]);

  return {
    showWarning,
    resetTimer,
    logout,
  };
}
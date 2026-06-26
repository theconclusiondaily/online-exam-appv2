"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function useInactivityLogout() {
  useEffect(() => {
    console.log(
  "INACTIVITY HOOK LOADED"
);
    const INACTIVITY_LIMIT =
      30 * 60 * 1000; // 30 minutes

    let timeout: NodeJS.Timeout;

const logout = async () => {

console.log(
  "AUTO LOGOUT TRIGGERED"
);

  if (
    window.location.pathname.includes(
      "/exam"
    )
  ) {
    return;
  }

 localStorage.removeItem("tcd_session_token");

sessionStorage.clear();

await supabase.auth.signOut({
  scope: "global",
});

window.location.replace("/login");
};

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(
        logout,
        INACTIVITY_LIMIT
      );
    };

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
      window.addEventListener(
        event,
        resetTimer
      )
    );

    resetTimer();

    return () => {
      clearTimeout(timeout);

      events.forEach((event) =>
        window.removeEventListener(
          event,
          resetTimer
        )
      );
    };
  }, []);
}
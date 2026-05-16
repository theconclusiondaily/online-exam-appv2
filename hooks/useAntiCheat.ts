"use client";

import {
  useEffect,
} from "react";

type Props = {

  antiCheatEnabled:
    boolean;

  violations: number;

  setViolations:
    React.Dispatch<
      React.SetStateAction<number>
    >;

  submitExam:
    () => void;
};

export default function
useAntiCheat({

  antiCheatEnabled,

  violations,

  setViolations,

  submitExam,

}: Props) {

  useEffect(() => {

    if (
      !antiCheatEnabled
    ) {

      return;
    }

    function handleViolation(
      reason: string
    ) {

      

      setViolations(
        (prev) => {

          const updated =
            prev + 1;

          if (
            updated >= 2
          ) {

            submitExam();
          }

          return updated;
        }
      );
    }

    function handleVisibility() {

      if (
        document.hidden
      ) {

        handleViolation(
          "Tab switched"
        );
      }
    }

    function handleFullscreen() {

      if (
        !document.fullscreenElement
      ) {

        handleViolation(
          "Fullscreen exited"
        );
      }
    }

    function handleKeyDown(
      e: KeyboardEvent
    ) {

      if (

        e.ctrlKey ||

        e.metaKey ||

        e.altKey

      ) {

        handleViolation(
          "Restricted key"
        );
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    document.addEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [

    antiCheatEnabled,

    violations,

    setViolations,

    submitExam,
  ]);
}
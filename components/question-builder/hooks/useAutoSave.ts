"use client";

import { useEffect, useRef } from "react";

export function useAutoSave<T>(
  value: T,
  onSave: (data: T) => Promise<void>,
  delay = 5000
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      onSave(value);
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, delay, onSave]);
}
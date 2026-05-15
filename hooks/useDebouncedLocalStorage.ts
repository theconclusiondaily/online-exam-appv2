"use client";

import { useEffect }
from "react";

export default function
useDebouncedLocalStorage({

  keyName,

  value,

  delay = 1000,

}: {

  keyName: string;

  value: any;

  delay?: number;
}) {

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        localStorage.setItem(
          keyName,
          JSON.stringify(value)
        );

      }, delay);

    return () =>
      clearTimeout(timeout);

  }, [
    keyName,
    value,
    delay,
  ]);
}
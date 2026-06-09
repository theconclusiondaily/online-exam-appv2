"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const DemoContext =
  createContext<any>(null);

export function DemoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDemo, setIsDemo] =
    useState(false);

  return (
    <DemoContext.Provider
      value={{
        isDemo,
        setIsDemo,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export const useDemo = () =>
  useContext(DemoContext);
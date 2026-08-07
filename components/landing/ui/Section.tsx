import { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;

  id?: string;

  className?: string;

  containerClassName?: string;

  background?:
    | "transparent"
    | "white"
    | "slate"
    | "gradient"
    | "dark";

  container?:
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "7xl"
    | "full";

  spacing?:
    | "sm"
    | "md"
    | "lg"
    | "xl";

  overflow?: boolean;
}

const backgroundClasses = {
  transparent: "",
  white: "bg-white",
  slate: "bg-slate-50",
  gradient: "bg-gradient-to-b from-slate-50 via-white to-slate-100",
  dark: "bg-slate-950 text-white",
};

const containerClasses = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-[90rem]",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const spacingClasses = {
  sm: "py-10 lg:py-12",
  md: "py-12 lg:py-16",
  lg: "py-16 lg:py-20",
  xl: "py-20 lg:py-24",
};

export default function Section({
  children,
  id,
  className,
  containerClassName,
  background = "transparent",
  container = "7xl",
  spacing = "lg",
  overflow = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full",
        overflow ? "overflow-hidden" : "overflow-visible",
        backgroundClasses[background],
        spacingClasses[spacing],
        className
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full px-6 lg:px-8",
          containerClasses[container],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
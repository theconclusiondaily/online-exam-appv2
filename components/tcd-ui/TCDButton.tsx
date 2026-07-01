"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold";
}

export default function TCDButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const styles = {
    primary:
      "bg-[#0F3D91] text-white hover:bg-[#0B2E70]",

    secondary:
      "bg-white border border-slate-300 hover:bg-slate-50",

    gold:
      "bg-[#F4C542] text-black hover:bg-[#E5B94A]",
  };

  return (
    <button
      {...props}
      className={`
        px-5
        py-3
        rounded-xl
        font-semibold
        transition
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
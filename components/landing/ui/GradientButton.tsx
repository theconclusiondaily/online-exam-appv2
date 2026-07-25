"use client";

import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function GradientButton({
  href,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className="
      inline-flex
      items-center
      justify-center
      rounded-2xl
      px-8
      py-4
      bg-brand
      text-white
      font-bold
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-2xl
      "
    >
      {children}
    </Link>
  );
}
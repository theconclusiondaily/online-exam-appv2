"use client";

import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function OutlineButton({
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
      border-2
      border-brand
      text-brand
      font-bold
      transition-all
      duration-300
      hover:bg-brand
      hover:text-white
      "
    >
      {children}
    </Link>
  );
}
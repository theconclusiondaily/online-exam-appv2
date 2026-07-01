"use client";

import Image from "next/image";
import { Bell, Search, LogOut } from "lucide-react";

interface Props {
  onLogout: () => void;
}

export default function AdminHero({
  onLogout,
}: Props) {
  const now = new Date();

  return (
    <div
      className="
      relative
      overflow-hidden

      rounded-[36px]

      bg-gradient-to-br
      from-[#0F3D91]
      via-[#264D9B]
      to-[#14284F]

      text-white

      p-8

      shadow-2xl

      mb-8
    "
    >
      {/* Background Logo */}

      <Image
        src="/logo.png"
        alt="TCD"

        width={320}
        height={320}

        className="
          absolute

          -right-12
          -top-12

          opacity-10
        "
      />

      <div className="relative z-10">

        {/* Top */}

        <div className="flex justify-between items-start">

          <div>

            <p className="uppercase tracking-[5px] text-[#D4AF37] font-bold">

              THE CONCLUSION DAILY

            </p>

            <h1 className="text-5xl font-black mt-2">

              Admin Command Center

            </h1>

            <p className="text-white/70 mt-3 text-lg">

              Welcome back.

              Manage every aspect of your platform from one place.

            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              className="
                w-12
                h-12

                rounded-xl

                bg-white/10

                flex
                items-center
                justify-center

                hover:bg-white/20
              "
            >
              <Bell size={20} />
            </button>

            <button
              onClick={onLogout}
              className="
                px-5
                py-3

                rounded-xl

                bg-red-500

                hover:bg-red-600

                font-semibold

                flex
                items-center
                gap-2
              "
            >
              <LogOut size={18} />

              Logout
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="mt-8 max-w-xl">

          <div
            className="
              flex
              items-center

              gap-3

              bg-white/10

              rounded-2xl

              px-5
              py-4
            "
          >
            <Search size={20} />

            <input
              placeholder="Search users, exams, papers..."

              className="
                flex-1

                bg-transparent

                outline-none

                placeholder:text-white/60
              "
            />

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-between text-white/70">

          <div>

            {now.toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}

          </div>

          <div>

            {now.toLocaleTimeString("en-IN")}

          </div>

        </div>

      </div>

    </div>
  );
}
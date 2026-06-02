"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TCDIcons }
from "@/components/ui/tcd-icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TCDLogo from "@/components/brand/TCDLogo";
import { supabase }
from "@/lib/supabase/client";
interface Props {
  mobile?: boolean;
}

export default function StudentSidebar({
  mobile = false,
}: Props) {

  const pathname = usePathname();

  const links = [

  {
    name: "Dashboard",
    href: "/dashboard",
    icon: TCDIcons.mastery,
  },

  {
    name: "Learning Journey",
    href: "/dashboard/learning-journey",
    icon: TCDIcons.journey,
  },

  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: TCDIcons.leaderboard,
  },

 {
  name: "Achievements",
  href: "/dashboard/achievements",
  icon: TCDIcons.achievement,
},


{
  name: "Active Opportunities",
  href: "/dashboard/active-opportunities",
  icon: TCDIcons.target,
},


  {
    name: "TCD Vault",
    href: "/dashboard/tcd-wallet",
    icon: TCDIcons.coin,
  },
  {
  name: "Referrals",
  href: "/dashboard/referrals",
  icon: TCDIcons.coin,

},

{
  name: "Notifications",
  href: "/dashboard/notifications",
  icon: (
    <Image
      src="/icons/notification-bell.svg"
      alt="Notifications"
      width={20}
      height={20}
    />
  ),
},
];
const [unreadCount, setUnreadCount] =
  useState(0);
  useEffect(() => {
  loadUnreadCount();
}, []);
async function loadUnreadCount() {

  const {
    data: authData,
  } =
    await supabase.auth.getUser();

  const user =
    authData.user;

  if (!user) return;

  const { count } =
    await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("is_read", false);

  setUnreadCount(count || 0);
}
async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}
  return (
   <aside
  className={
    mobile
      ? `
        w-72
        h-full

        bg-gradient-to-b
        from-[#EEF3FF]
        to-white

        p-6

        flex
        flex-col

        border-r
        border-[#D9E4FF]

        shadow-lg
      `
      : `
        hidden
        lg:flex

        w-72
        min-h-screen

        bg-gradient-to-b
        from-[#EEF3FF]
        to-white

        p-6

        flex-col

        border-r
        border-[#D9E4FF]

        shadow-lg
      `
  }
>
    
      {/* Logo */}

      <div className="flex justify-center mt-4 mb-4">

        <TCDLogo size={110} />

      </div>

      {/* Navigation */}

      <div className="space-y-3 flex-1">

        {links.map((link) => {

          const active =
            pathname === link.href;

          return (
            <Link
            onClick={() => {
  if (window.innerWidth < 1024) {
    document
      .querySelector("body")
      ?.click();
  }
}}
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                gap-2
                p-4
                rounded-2xl
                transition-all
                duration-300

                ${
  active
    ? `
      bg-white

      text-tcd-blue

      font-bold

      shadow-md

      border
      border-[#E6C06E]/30
    `
    : `
      text-[#274472]

      hover:bg-white

      hover:text-tcd-blue

      hover:shadow-sm
    `
}
              `}
            >

              <div className="w-6 h-6">

  {link.icon}

</div>
              <span
  className="
    text-base
    font-medium
  "
>
                {link.name}
              </span>
{link.name === "Notifications" &&
  unreadCount > 0 && (

    <span
      className="
        ml-auto

        bg-tcd-gold
        text-tcd-blue

        text-xs
        font-bold

        px-2
        py-1

        rounded-full
      "
    >
      {unreadCount}
    </span>

)}
            </Link>

            
          );
          
        })}

      </div>

      {/* Footer */}

      <div className="border-t border-gray-200 pt-6">

        <Link
        onClick={() => {
  if (window.innerWidth < 1024) {
    document
      .querySelector("body")
      ?.click();
  }
}}
          href="/dashboard/profile"
          className="
  flex
  items-center
  gap-3

  p-4

  rounded-2xl

  bg-white

  border
  border-gray-100

  shadow-sm

  transition-all
"
        >

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-tcd-gold
              text-tcd-blue
              flex
              items-center
              justify-center
              font-bold
            "
          >
            R
          </div>

          <div>

            <p className="font-semibold">
              My Profile
            </p>

          </div>

        </Link>

        <button
  onClick={handleLogout}
          className="
            w-full
            mt-4
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            rounded-xl
            font-semibold
            transition-all
          "
        >
          Logout
        </button>

      </div>

    </aside>
  );
}
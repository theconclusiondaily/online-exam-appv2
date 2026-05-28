"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

export default function ProfileCard() {

  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {

    async function loadProfile() {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) return;

      const {
        data,
      } = await supabase
        .from("users")
        .select("*")
        .eq(
          "id",
          user.id
        )
        .single();

      setProfile(data);
    }

    loadProfile();

  }, []);

  if (!profile) return null;

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex items-center gap-2 mb-3">

        <div className="w-16 h-16 rounded-full bg-tcd-blue text-white flex items-center justify-center text-2xl font-bold">

          {profile.name?.charAt(0)}

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            {profile.name}

          </h2>

          <p className="text-gray-500">

            Level
            {" "}
            {profile.level}
<p className="text-orange-500 font-semibold">

  🔥
  {" "}
  {profile.streak || 0}
  {" "}
  Day Streak

</p>
          </p>

        </div>

      </div>

      {/* XP */}

      <div className="mb-2">

        <div className="flex justify-between mb-2">

          <span className="text-gray-500">
            XP Progress
          </span>

          <span className="font-bold">
            {profile.xp} XP
          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-tcd-gold"
            style={{
              width: `${
                (profile.xp % 500) /
                5
              }%`,
            }}
          />

        </div>

      </div>

      {/* BADGES */}

      <div>

        <h3 className="font-bold mb-3">
          Badges
        </h3>

        <div className="flex flex-wrap gap-3">

          {(profile.badges || [])
            .map(
              (
                badge: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl font-semibold"
                >

                  🏆
                  {" "}
                  {badge}

                </div>

              )
            )}

        </div>

      </div>

    </div>
  );
}
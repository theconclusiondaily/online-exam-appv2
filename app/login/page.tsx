"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AuthHero from "@/components/auth/AuthHero";
export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {

    try {

      setLoading(true);

      if (
        !email ||
        !password
      ) {

        alert(
          "Please enter email and password"
        );

        return;
      }

      const {
        error,
      } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {

        alert(
          error.message
        );

        return;
      }

      const {
        data: { user },
      } =
        await supabase
          .auth
          .getUser();

      if (!user) {

        alert(
          "Login failed"
        );

        return;
      }

      // FETCH PROFILE

      const {
        data: profile,
      } = await supabase
        .from("users")
        .select(`
          role
        `)
        .eq(
          "email",
          user.email
        )
        .single();

      console.log(profile);

      // ROLE REDIRECT

      if (
        profile?.role ===
        "admin"
      ) {

        document.cookie =
          `role=admin; path=/; SameSite=Lax`;

        router.push(
          "/admin"
        );

      } else if (
        profile?.role ===
        "teacher"
      ) {

        document.cookie =
          `role=teacher; path=/; SameSite=Lax`;

        router.push(
          "/teacher"
        );

      } else {

        document.cookie =
          `role=student; path=/; SameSite=Lax`;

        router.push(
          "/dashboard"
        );
      }

    } catch (err) {

      console.error(err);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <main
  className="
    min-h-screen
    lg:grid
lg:grid-cols-[1.2fr_0.8fr]
    bg-[#F8F9FB]
  "
>

  <AuthHero />

  <div
    className="
      flex
      items-center
      justify-center
      p-6
    "
  >
    <div
      className="
        bg-white

        w-full
        max-w-md

        rounded-2xl

        border
        border-gray-100

        shadow-xl

        p-5
      "
    >
        {/* LOGO */}

        <div className="text-center mb-6">

          <img
            src="/logo.png"
            alt="TCD"
            className="
              w-20
              h-20

              mx-auto

              mb-4
            "
          />

          <h1
            className="
              text-3xl
              font-black

              text-tcd-blue
            "
          >
            Welcome Back To
The Conclusion Daily
          </h1>

          <p className="text-gray-500 mt-2">

          Hope • Faith • Excellence
          </p>
<p className="text-gray-500 mt-2">
  Continue your journey of
learning, achievement and
growth.
</p>


          

        </div>

        {/* FORM */}

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full

              p-3

              rounded-xl

              border
              bg-[#F7F9FC]
border-[#D8E1F0]

focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/30

              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full

              p-3

              rounded-xl

              border
              bg-[#F7F9FC]
border-[#D8E1F0]

focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/30

              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

          {/* FORGOT PASSWORD */}

          <div className="flex justify-end">

            <button
              className="
                text-sm

                text-tcd-blue

                hover:underline
              "
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            onClick={
              handleLogin
            }
            disabled={loading}
           className="
w-full

py-3

rounded-2xl

bg-gradient-to-r
from-[#D4AF37]
to-[#F2D27A]

text-tcd-blue

font-black

shadow-lg

hover:scale-[1.02]

transition-all
"
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

        </div>

        {/* FOOTER */}

        <div className="mt-8 text-center">

          <p className="text-gray-500">

            Don't have an account?

          </p>

          <Link
            href="/signup"
            className="
              inline-block

              mt-3

              text-tcd-blue

              font-bold

              hover:underline
            "
          >
            Create Account
          </Link>

        </div>

      </div>
    </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AuthHero from "@/components/auth/AuthHero";
import { useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function LoginPage() {

  const router = useRouter();

useEffect(() => {

  async function checkUser() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {

      router.replace("/dashboard");

    }
  }

  checkUser();

}, []);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
const [
  showPassword,
  setShowPassword,
] = useState(false);
  const [loading, setLoading] =
    useState(false);
async function handleForgotPassword() {

  if (!email) {

    alert(
      "Please enter your email address first."
    );

    return;
  }

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          window.location.hostname === "localhost"
            ? "http://localhost:3000/reset-password"
            : "https://www.theconclusiondaily.com/reset-password",
      }
    );

  if (error) {

    alert(error.message);

    return;
  }

  alert(
    "Password reset link sent to your email."
  );
}
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
const sessionToken =
  crypto.randomUUID();

localStorage.setItem(
  "tcd_session_token",
  sessionToken
);

const { error: sessionError } =
  await supabase
    .from("active_sessions")
    .upsert({
      user_id: user.id,
      session_token: sessionToken,
      updated_at: new Date().toISOString(),
    });

console.log(
  "SESSION ERROR:",
  sessionError
);
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

        router.replace(
          "/admin"
        );

      } else if (
        profile?.role ===
        "teacher"
      ) {

        document.cookie =
          `role=teacher; path=/; SameSite=Lax`;

        router.replace(
          "/teacher"
        );

      } else {

        document.cookie =
          `role=student; path=/; SameSite=Lax`;

        router.replace(
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

p-4

rounded-xl

border
border-[#D8E1F0]

bg-[#F7F9FC]

text-[#274472]
placeholder:text-gray-500

transition-all

focus:outline-none
focus:border-[#D4AF37]
focus:ring-2
focus:ring-[#D4AF37]/30
"
          />

          <div className="relative">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
    className="
      w-full

      p-4

      pr-12

      rounded-xl

      border
      border-[#D8E1F0]

      bg-[#F7F9FC]

      text-[#274472]
      placeholder:text-gray-500

      focus:outline-none
      focus:border-[#D4AF37]
      focus:ring-2
      focus:ring-[#D4AF37]/30
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
    className="
      absolute
      right-4
      top-1/2

      -translate-y-1/2

      text-gray-500
    "
  >
    {
      showPassword
        ? <EyeOff size={20} />
        : <Eye size={20} />
    }
  </button>

</div>

         {/* FORGOT PASSWORD */}

<div className="flex justify-end">

  <button
    onClick={handleForgotPassword}
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
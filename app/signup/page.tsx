"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import AuthHero from "@/components/auth/AuthHero";
export default function SignupPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [dob, setDob] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSignup() {
    try {
      setLoading(true);

      if (
        !name ||
        !email ||
        !mobile ||
        !dob ||
        !password
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const user =
        data.user;

      if (!user) {
        alert(
          "User creation failed"
        );
        return;
      }

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("users")
        .insert({
          id: user.id,
          name,
          email,
          mobile,
          dob,
          role: "student",
        })
        .select();

      console.log(
        "PROFILE DATA:",
        profileData
      );

      console.log(
        "PROFILE ERROR:",
        profileError
      );

      if (profileError) {
        alert(
          profileError.message
        );
        return;
      }

      alert(
        "Signup successful. Please verify your email."
      );

      setName("");
      setEmail("");
      setMobile("");
      setDob("");
      setPassword("");

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

      bg-[#F7F9FC]
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
          max-w-lg

          rounded-[36px]

          border
          border-gray-100

          shadow-2xl

          p-6
        "
      >

        <div className="text-center mb-4">

          <img
            src="/logo.png"
            alt="TCD"
            className="
              w-20
              h-20
              mx-auto
              mb-2
            "
          />

          <h1
            className="
              text-2xl
              font-black
              text-tcd-blue
            "
          >
            Begin Your Journey
          </h1>

          <p
            className="
              text-gray-500
              mt-3
            "
          >
            Build your future
            through learning,
            achievement and
            consistency.
          </p>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              p-3

              rounded-xl

              border
              border-gray-300

              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

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
              border-gray-300

              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(
                e.target.value
              )
            }
            className="
              w-full
              p-3

              rounded-xl

              border
              border-gray-300

              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

          <input
            type="date"
            value={dob}
            onChange={(e) =>
              setDob(
                e.target.value
              )
            }
            className="
              w-full
              p-3

              rounded-xl

              border
              border-gray-300

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
              border-gray-300

              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

          <button
            onClick={
              handleSignup
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

              disabled:opacity-50
            "
          >
            {
              loading
                ? "Creating Account..."
                : "Create Account"
            }
          </button>

          <div
            className="
              pt-4
              text-center
              text-sm
              text-gray-500
            "
          >
            Already have an account?

            <a
              href="/login"
              className="
                ml-2
                font-bold
                text-tcd-blue
              "
            >
              Login
            </a>
          </div>

        </div>

      </div>

    </div>

  </main>
);
}
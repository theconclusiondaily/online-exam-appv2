"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase }
from "@/lib/supabase/client";

export default function ResetPasswordPage() {

  const router =
    useRouter();

  const [
    password,
    setPassword,
  ] = useState("");
const [
  showPassword,
  setShowPassword,
] = useState(false);
  const [
    loading,
    setLoading,
  ] = useState(false);

  async function handleReset() {

    try {

      setLoading(true);

      const {
        error,
      } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {

        alert(error.message);

        return;
      }

      alert(
        "Password updated successfully."
      );

      router.replace("/login");

    } catch (err) {

      console.error(err);

      alert(
        "Failed to update password."
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main
      className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-[#F8F9FB]

        p-6
      "
    >

      <div
        className="
          w-full
          max-w-md

          bg-white

          rounded-3xl

          p-8

          shadow-xl
        "
      >

        <h1
          className="
            text-2xl
            font-black

            text-tcd-blue

            mb-3
          "
        >

          Reset Password

        </h1>

        <p
          className="
            text-gray-500

            mb-6
          "
        >

          Enter your new password.

        </p>

        <div className="relative">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="New Password"
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

        <button
          onClick={
            handleReset
          }
          disabled={
            loading
          }
          className="
            w-full

            mt-5

            py-3

            rounded-2xl

            bg-gradient-to-r
            from-[#D4AF37]
            to-[#F2D27A]

            text-tcd-blue

            font-black
          "
        >

          {
            loading
              ? "Updating..."
              : "Update Password"
          }

        </button>

      </div>

    </main>
  );
}
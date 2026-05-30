"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import AuthHero from "@/components/auth/AuthHero";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
export default function SignupPage() {
  const router = useRouter();
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
const [
  showPassword,
  setShowPassword,
] = useState(false);
const [
  captchaToken,
  setCaptchaToken,
] = useState("");
  const [loading, setLoading] =
    useState(false);

  async function handleSignup() {
if (!captchaToken) {

  alert(
    "Please complete the security verification."
  );

  return;
}
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

      options: {

        emailRedirectTo:
          window.location.hostname ===
          "localhost"
            ? "http://localhost:3000/login"
            : "https://www.theconclusiondaily.com/login",

        data: {
          name,
          mobile,
          dob,
        },

      },

    });

    if (error) {

      alert(
        error.message
      );

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

    if (
      data.session === null
    ) {

      alert(
        "Verification email sent. Please check your inbox and verify your email before logging in."
      );

    } else {

      alert(
        "Account created successfully."
      );

    }

    setName("");

    setEmail("");

    setMobile("");

    setDob("");

    setPassword("");

    router.replace(
      "/login"
    );

  } catch (err) {

    console.error(
      err
    );

    alert(
      "Something went wrong"
    );

  } finally {

    setLoading(
      false
    );
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

p-4

rounded-xl

border
border-[#D8E1F0]

bg-[#F7F9FC]

text-[#274472]

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

<Turnstile
  siteKey={
    process.env
      .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
  }
  onSuccess={(token) =>
    setCaptchaToken(token)
  }
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
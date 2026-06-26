"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AuthHero from "@/components/auth/AuthHero";
import { useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { processReferral }
from "@/lib/referrals/processReferral";
import { useSearchParams } from "next/navigation";
export default function LoginPage() {

  const router = useRouter();

useEffect(() => {
  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return;
    }

    const { data: profile, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (error || !profile) {
      router.replace("/dashboard");
      return;
    }

    switch (profile.role) {
      case "admin":
        router.replace("/admin");
        break;

      case "teacher":
        router.replace("/teacher");
        break;

      default:
        router.replace("/dashboard");
    }
  }

  checkUser();
}, [router]);
const searchParams = useSearchParams();

const verified = searchParams.get("verified");
  const [email, setEmail] =
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
async function handleForgotPassword() {

 const normalizedEmail = email.trim().toLowerCase();

if (!normalizedEmail) {

    alert(
      "Please enter your email address first."
    );

    return;
  }

  const { error } =
    await supabase.auth.resetPasswordForEmail(
  normalizedEmail,
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
async function handleResendVerification() {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    alert("Please enter your email address first.");
    return;
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: normalizedEmail,

    options: {
      emailRedirectTo:
        window.location.hostname === "localhost"
          ? "http://localhost:3000/auth/callback"
          : "https://www.theconclusiondaily.com/auth/callback",
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Verification email sent successfully.");
}
  async function handleLogin() {
if (!captchaToken) {

  alert(
    "Please complete the security verification."
  );

  return;
}
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
const normalizedEmail = email.trim().toLowerCase();

const { error } =
  await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

if (error) {
  if (
    error.message
      .toLowerCase()
      .includes("email not confirmed")
  ) {
    alert(
      "Please verify your email before logging in. You can use the 'Resend Verification' button below."
    );
  } else {
    alert(error.message);
  }

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

    // CREATE PROFILE IF MISSING

const {
  data: existingProfile,
} = await supabase
  .from("users")
  .select("id, role")
  .eq("id", user.id)
  .maybeSingle();

if (!existingProfile) {

  const generatedCode =
  "TCD" +
  crypto.randomUUID()
    .replace(/-/g, "")
    .slice(0, 8)
    .toUpperCase();

  const {
    error: profileError,
  } = await supabase
  .from("users")
  .insert({

    id: user.id,

    email: user.email,

    role: "student",

    name:
      user.user_metadata?.name ??
      "Student",

    mobile:
      user.user_metadata?.mobile,

    dob:
      user.user_metadata?.dob,

    referral_code:
      generatedCode,

    institute_id:
      "da8cf1d6-9415-42f0-8336-c8586885cd6a"

  });
if (profileError) {

  console.error("PROFILE ERROR:", profileError);
  console.log(profileError);

  alert(profileError.message);

  return;
}

const {
  error: instituteError,
} = await supabase
  .from("user_institutes")
  .upsert({

    user_id: user.id,

    institute_id:
      "da8cf1d6-9415-42f0-8336-c8586885cd6a"

  });

if (instituteError) {

  console.error(
    "INSTITUTE ERROR:",
    instituteError
  );

}
 await supabase
  .from("referral_codes")
  .upsert({

    user_id: user.id,

    referral_code: generatedCode,

    total_referrals: 0,

    total_rewards: 0,

  });

}
// CREATE USER LEVEL IF MISSING

const { data: existingLevel } = await supabase
  .from("user_levels")
  .select("id")
  .eq("user_id", user.id)
  .maybeSingle();

if (!existingLevel) {

  const {
  error: levelInsertError,
} = await supabase
  .from("user_levels")
  .insert({

    user_id: user.id,

    xp: 0,

    level: 0,

    updated_at: new Date().toISOString(),

  });

if (levelInsertError) {

  console.error(
    "LEVEL INSERT ERROR:",
    levelInsertError
  );

  alert(
    JSON.stringify(levelInsertError)
  );

  return;

}

}

// CREATE WALLET IF MISSING

const { data: existingWallet } = await supabase
  .from("tcd_wallets")
  .select("user_id")
  .eq("user_id", user.id)
  .maybeSingle();

if (!existingWallet) {

const {
  error: walletInsertError,
} = await supabase
  .from("tcd_wallets")
  .insert({

    user_id: user.id,

    current_balance: 0,

    lifetime_earned: 0,

    updated_at: new Date().toISOString(),

  });

if (walletInsertError) {

  console.error(
    "WALLET INSERT ERROR:",
    walletInsertError
  );

}
 try {

  await processReferral(
    user.id,
    user.user_metadata?.referred_by
  );

} catch (err) {

  console.error(
    "PROCESS REFERRAL ERROR:",
    err
  );

}
}  

const {
  data: existingReferral,
} = await supabase
  .from("referral_codes")
  .select("user_id")
  .eq(
    "user_id",
    user.id
  )
  .maybeSingle();
const existingUser = await supabase
  .from("users")
  .select("referral_code")
  .eq("id", user.id)
  .single();

const generatedCode =
  existingUser.data?.referral_code ??
  ("TCD" +
    crypto.randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase());
// SESSION TOKEN

    const sessionToken =
      crypto.randomUUID();

    localStorage.setItem(
      "tcd_session_token",
      sessionToken
    );

    const {
      error: sessionError,
    } =
      await supabase
        .from("active_sessions")
        .upsert({

          user_id:
            user.id,

          session_token:
            sessionToken,

          updated_at:
            new Date()
              .toISOString(),

        });

    console.log(
      "SESSION ERROR:",
      sessionError
    );

    // FETCH PROFILE

    const {
      data: profile,
      error: profileFetchError,
    } =
      await supabase
        .from("users")
        .select("role")
        .eq(
          "id",
          user.id
        )
        .single();

    if (
      profileFetchError
    ) {

      console.error(
        profileFetchError
      );

      alert(
        "Unable to load profile."
      );

      return;
    }

    console.log(
      profile
    );
localStorage.removeItem(
  "tcd_demo"
);
    // ROLE REDIRECT

    if (
      profile?.role ===
      "admin"
    ) {

      document.cookie =
        "role=admin; path=/; SameSite=Lax";

      router.replace(
        "/admin"
      );

    } else if (
      profile?.role ===
      "teacher"
    ) {

      document.cookie =
        "role=teacher; path=/; SameSite=Lax";

      router.replace(
        "/teacher"
      );

    } else {

      document.cookie =
        "role=student; path=/; SameSite=Lax";

      router.replace(
        "/dashboard"
      );
    }

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
  if (loading) return;
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

          <p className="text-tcd-primary mt-2">

          Hope • Faith • Excellence
          </p>
<p className="text-tcd-primary mt-2">
  Continue your journey of
learning, achievement and
growth.
</p>


          

        </div>
{verified === "true" && (
  <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
    ✅ Email verified successfully. You can now log in.
  </div>
)}

{verified === "false" && (
  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    ❌ Email verification failed. Please try again.
  </div>
)}
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
placeholder:text-tcd-primary

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
      placeholder:text-tcd-primary

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

      text-tcd-primary
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

 <div
  className="
    flex
    justify-between
    items-center

    gap-4

    mt-2
  "
>

  <button
    onClick={handleResendVerification}
    className="
  text-sm
  text-tcd-blue
  hover:underline
  whitespace-nowrap
"
  >
    
    Resend Verification
  </button>

  <button
    onClick={handleForgotPassword}
    className="
  text-sm
  text-tcd-blue
  hover:underline
  whitespace-nowrap
"
  >
    Forgot Password?
  </button>

</div>

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

          <p className="text-tcd-primary">

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
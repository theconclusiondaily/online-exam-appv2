"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
const searchParams =
  useSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let mounted = true;

    /*
     * PASSWORD RECOVERY FLOW
     *
     * Supabase creates a recovery session when the
     * password-reset link is opened.
     *
     * We listen for PASSWORD_RECOVERY so that the
     * page knows the recovery session is available.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(
          "RESET PASSWORD AUTH EVENT:",
          event
        );

        if (
          event === "PASSWORD_RECOVERY" &&
          session
        ) {
          if (mounted) {
            setRecoveryReady(true);
            setCheckingSession(false);
          }

          return;
        }

        if (event === "SIGNED_OUT") {
          if (mounted) {
            setRecoveryReady(false);
          }
        }
      }
    );

    /*
     * Also check whether the recovery session already
     * exists when the page loads.
     */
    const checkSession = async () => {
      try {
                /*
         * PKCE PASSWORD RECOVERY
         *
         * Supabase may return to this page with
         * ?code=...
         *
         * Exchange that code for the recovery session
         * before checking the session.
         */
        const code =
          searchParams.get("code");

        if (code) {
          const {
            error: exchangeError,
          } =
            await supabase.auth
              .exchangeCodeForSession(
                code
              );

          if (exchangeError) {
            console.error(
              "PASSWORD RESET CODE EXCHANGE FAILED:",
              exchangeError
            );

            if (mounted) {
              setRecoveryReady(false);
            }

            return;
          }
        }
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "RESET PASSWORD SESSION ERROR:",
            error
          );

          if (mounted) {
            setRecoveryReady(false);
          }

          return;
        }

        if (mounted) {
          setRecoveryReady(!!session);
        }
      } catch (error) {
        console.error(
          "RESET PASSWORD SESSION CHECK FAILED:",
          error
        );

        if (mounted) {
          setRecoveryReady(false);
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    void checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    }, [searchParams]);

async function handleReset() {
  if (!password) {
    alert("Please enter your new password.");
    return;
  }

  if (password.length < 6) {
    alert(
      "Password must be at least 6 characters."
    );
    return;
  }

  try {
    setLoading(true);

    /*
     * Password reset must use the recovery session
     * created from the email link.
     *
     * Do not ask for the old password here.
     */
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "RESET PASSWORD SESSION ERROR:",
        sessionError
      );

      alert(
        "Your password reset session is invalid. Please request a new reset link."
      );

      return;
    }

    if (!session) {
      alert(
        "Your password reset session has expired. Please request a new reset link."
      );

      return;
    }

    console.log(
      "RESET PASSWORD USER:",
      session.user.id
    );

    const {
      data,
      error,
    } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error(
        "PASSWORD UPDATE ERROR:",
        error
      );

      alert(error.message);

      return;
    }

    console.log(
      "PASSWORD UPDATE SUCCESS:",
      data.user?.id
    );

    alert(
      "Password updated successfully."
    );

    await supabase.auth.signOut();

    router.replace("/login");
  } catch (err) {
    console.error(
      "RESET PASSWORD ERROR:",
      err
    );

    alert(
      "Failed to update password. Please request a new reset link and try again."
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
            text-tcd-primary
            mb-6
          "
        >
          Enter your new password.
        </p>

        {checkingSession ? (
          <div
            className="
              rounded-xl
              border
              border-[#D8E1F0]
              bg-[#F7F9FC]
              p-4
              text-center
              text-tcd-primary
              font-medium
            "
          >
            Verifying password reset link...
          </div>
        ) : !recoveryReady ? (
          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              text-red-700
            "
          >
            This password reset link is invalid or
            has expired. Please request a new
            password reset link.
          </div>
        ) : (
          <>
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
                disabled={loading}
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
                  disabled:opacity-60
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                disabled={loading}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-tcd-primary
                  disabled:opacity-50
                "
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <button
              onClick={handleReset}
              disabled={
                loading ||
                !recoveryReady
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
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
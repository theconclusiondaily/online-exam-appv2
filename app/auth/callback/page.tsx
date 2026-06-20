"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      await supabase.auth.getSession();

      // Don't keep user logged in immediately
      await supabase.auth.signOut();

      router.replace("/login?verified=true");
    }

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Verifying your email...
    </div>
  );
}
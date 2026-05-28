"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase }
from "@/lib/supabase/client";
import { useAuth } from "@/components/providers/AuthProvider";

export default function RoleGuard({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) {
  const { user, loading } =
    useAuth();

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    async function checkRole() {
      if (!user) return;

      const { data: profile } =
        await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

      if (
        profile?.role === allowedRole
      ) {
        setAuthorized(true);
      } else {
        router.push("/login");
      }
    }

    if (!loading) {
      checkRole();
    }
  }, [user, loading, allowedRole, router]);

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading...
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
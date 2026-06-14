"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TCDLoader from "../common/TCDLoader";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } =
    useAuth();

  const router = useRouter();

  

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
  return (
    <TCDLoader text="Authenticating" />
  );
}

  if (!user) return null;

  return <>{children}</>;
}
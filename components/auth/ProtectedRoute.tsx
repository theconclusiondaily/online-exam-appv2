"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } =
    useAuth();

  const router = useRouter();

  console.log("USER:", user);
  console.log("LOADING:", loading);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
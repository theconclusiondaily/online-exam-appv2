"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleGuard from "@/components/auth/RoleGuard";

import { supabase }
from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function StudentPage() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

   window.location.href = "/login";
  }

  return (
    <ProtectedRoute>
      <RoleGuard allowedRole="student">
        <div className="min-h-screen bg-black text-white p-6">
          <h1 className="text-2xl font-bold mb-3">
            Student Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
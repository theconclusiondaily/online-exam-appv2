"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
  const {
  data: { user },
} = await supabase
  .auth
  .getUser();

if (!user) {

  alert(
    "Login failed"
  );

  return;
}

// FETCH PROFILE

const {
  data: profile,
} = await supabase
  .from("users")
  .select(`
    role
  `)
  .eq(
    "id",
    user.id
  )
  .single();

console.log(profile);

// ROLE REDIRECT

if (
  profile?.role ===
  "admin"
) {

 document.cookie =
  `role=admin; path=/; SameSite=Lax`;

  router.push(
    "/admin"
  );

} else if (
  profile?.role ===
  "teacher"
) {

      document.cookie =
  `role=teacher; path=/; SameSite=Lax`;

  router.push(
    "/teacher"
  );

} else {

  document.cookie =
  `role=student; path=/; SameSite=Lax`;

  router.push(
    "/dashboard"
  );
}
    }
  }

  async function handleSignup() {

  const {
    data,
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {

    alert(error.message);

  } else {

    if (data.user) {

     const insertResult =
  await supabase
    .from("users")
    .insert([
      {
        id: data.user.id,
        email: email,
      },
    ]);

console.log(
  "USER INSERT:",
  insertResult
);
    }

    alert(
  "Signup successful"
);

router.push(
  "/dashboard"
);
  }
}

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
      </div>
    </main>
  );
}
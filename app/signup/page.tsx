"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSignup() {
    try {
      setLoading(true);
console.log("NAME:", name);
console.log("EMAIL:", email);
      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;

      if (!user) {
        alert("User not created");
        return;
      }

      const { data: profileData, error: profileError } =
  await supabase
    .from("users")
    .insert({
      id: user.id,
      name,
      email,
      role: "student",
    })
    .select();

console.log("PROFILE DATA:", profileData);
console.log("PROFILE ERROR:", profileError);

      if (profileError) {
        console.log(profileError);
        alert(profileError.message);
        return;
      }

      alert("Signup successful");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-white">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </div>
    </div>
  );
}
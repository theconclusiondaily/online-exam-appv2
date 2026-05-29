"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminGuard from "@/components/AdminGuard";

import { supabase }
from "@/lib/supabase/client";

export default function UsersPage() {

  const [users,
    setUsers] =
    useState<any[]>([]);

  const [institutes,
    setInstitutes] =
    useState<any[]>([]);

  async function fetchData() {

    // USERS

    const {
      data: usersData,
    } = await supabase
      .from("users")
      .select(`
        *,
        institutes (
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (usersData) {

      setUsers(
        usersData
      );
    }

    // INSTITUTES

    const {
      data: institutesData,
    } = await supabase
      .from("institutes")
      .select("*");

    if (institutesData) {

      setInstitutes(
        institutesData
      );
    }
  }

  useEffect(() => {

    fetchData();

  }, []);

  async function updateUser(
    userId: string,
    instituteId: string,
    role: string
  ) {

    const { error } =
      await supabase
        .from("users")
        .update({
          institute_id:
            instituteId,

          role,
        })
        .eq(
          "id",
          userId
        );

    console.log(error);

    alert(
      "User updated"
    );

    fetchData();
  }

  return (

    <AdminGuard>

      <main className="min-h-screen bg-gray-50 p-6 md:p-5">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center mb-4">

  <h1 className="text-2xl font-bold">

    Users

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-4 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

          <div className="space-y-5">

            {users.map((user) => (

              <div
                key={user.id}
                className="bg-white border rounded-3xl p-6 shadow-sm"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                  <div>

                    <h2 className="text-2xl font-bold mb-2">

                      {user.email}

                    </h2>

                    <p className="text-gray-600">

                      Role:
                      {" "}
                      {user.role || "student"}

                    </p>

                    <p className="text-gray-600">

                      Institute:
                      {" "}

                      {user.institutes?.name ||
                        "Not Assigned"}

                    </p>

                  </div>

                  <div className="flex flex-col md:flex-row gap-2">

                    {/* ROLE */}

                    <select
                      defaultValue={
                        user.role || "student"
                      }
                      onChange={(e) =>
                        updateUser(
                          user.id,
                          user.institute_id,
                          e.target.value
                        )
                      }
                      className="border rounded-2xl p-4"
                    >

                      <option value="student">
                        Student
                      </option>

                      <option value="teacher">
                        Teacher
                      </option>

                      <option value="admin">
                        Admin
                      </option>

                    </select>

                    {/* INSTITUTE */}

                    <select
                      defaultValue={
                        user.institute_id || ""
                      }
                      onChange={(e) =>
                        updateUser(
                          user.id,
                          e.target.value,
                          user.role || "student"
                        )
                      }
                      className="border rounded-2xl p-4"
                    >

                      <option value="">
                        Select Institute
                      </option>

                      {institutes.map(
                        (institute) => (

                          <option
                            key={institute.id}
                            value={institute.id}
                          >

                            {institute.name}

                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </AdminGuard>
  );
}
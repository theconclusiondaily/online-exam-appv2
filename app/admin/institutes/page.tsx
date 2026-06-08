"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminGuard from "@/components/AdminGuard";

import { supabase }
from "@/lib/supabase/client";

export default function InstitutesPage() {

  const [institutes,
    setInstitutes] =
    useState<any[]>([]);

  const [name,
    setName] =
    useState("");

  const [city,
    setCity] =
    useState("");

    const [joinCode, setJoinCode] = useState("");

  async function fetchInstitutes() {

    const {
      data,
      error,
    } = await supabase

      .from("institutes")

      .select(`
        *,
        users (
          id,
          role
        ),
        exams (
          id
        )
      `)

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    console.log(data);

    console.log(error);

    if (data) {

      setInstitutes(
        data
      );
    }
  }

  useEffect(() => {

    fetchInstitutes();

  }, []);

  async function createInstitute() {

    if (!name || !city || !joinCode){

      alert(
        "Fill all fields"
      );

      return;
    }

    const {
      data,
      error,
    } = await supabase

      .from("institutes")

     .insert([
  {
    name: name.trim(),
    city: city.trim(),
    join_code: joinCode.trim().toUpperCase(),
  },
])

      .select();

    console.log(
      "INSERT DATA:",
      data
    );

    console.log(
      "INSERT ERROR:",
      error
    );

    if (error) {

      alert(
        error.message
      );

      return;
    }

    alert(
      "Institute created successfully"
    );

    setName("");
setCity("");
setJoinCode("");

    await fetchInstitutes();
  }

  return (

    <AdminGuard>

      <main className="min-h-screen bg-gray-50 p-6 md:p-5">

        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-4">

            <h1 className="text-2xl font-bold">

              Institutes

            </h1>

            <a
              href="/admin"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >

              Dashboard

            </a>

          </div>

          {/* CREATE */}

          <div className="bg-white border rounded-3xl p-6 shadow-sm mb-10">

            <h2 className="text-2xl font-bold mb-3">

              Create Institute

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Institute Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />
<input
  type="text"
  placeholder="Join Code (ABC2026)"
  value={joinCode}
  onChange={(e) =>
    setJoinCode(
      e.target.value.toUpperCase()
    )
  }
  
  className="w-full border rounded-2xl p-4"
/>
              <button
                onClick={
                  createInstitute
                }
                className="bg-black text-white px-6 py-3 rounded-2xl font-bold w-full"
              >

                Create Institute

              </button>

            </div>

          </div>

          {/* LIST */}

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-3xl font-bold">

                Institutes

              </h2>

              <div className="bg-gray-100 px-4 py-2 rounded-xl font-bold">

                {institutes.length} Institutes

              </div>

            </div>

            <div className="space-y-5">

              {institutes.map(
                (institute) => (

                  <div
                    key={institute.id}
                    className="border rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3"
                  >

                    <div>

                      <h3 className="text-2xl font-bold mb-2">

                        {institute.name}

                      </h3>

                                            <p className="text-gray-600 mb-2">

                        {institute.city}

                      </p>
 <p className="text-sm font-semibold text-blue-600 mb-2">
    Join Code: {institute.join_code}
  </p>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">

                        <div>

                          Students:
                          {" "}

                          {
                            institute.users?.filter(
                              (u: any) =>
                                u.role === "student"
                            ).length || 0
                          }

                        </div>

                        <div>

                          Teachers:
                          {" "}

                          {
                            institute.users?.filter(
                              (u: any) =>
                                u.role === "teacher"
                            ).length || 0
                          }

                        </div>

                        <div>

                          Exams:
                          {" "}

                          {
                            institute.exams?.length || 0
                          }

                        </div>

                      </div>

                    </div>

                    <div>

                                         </div>

                  </div>

                )
              )}

              {institutes.length === 0 && (

                <div className="text-center text-gray-700 py-10">

                  No institutes yet

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

    </AdminGuard>
  );
}
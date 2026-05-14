"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminGuard from "@/components/AdminGuard";

import { supabase } from "@/lib/supabase";

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

  async function fetchInstitutes() {

    const {
      data,
      error,
    } = await supabase
      .from("institutes")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

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

    if (!name) {

      alert(
        "Institute name required"
      );

      return;
    }

    const { error } =
      await supabase
        .from("institutes")
        .insert([
          {
            name,
            city,
          },
        ]);

    if (error) {

      console.log(error);

      alert(
        "Failed to create institute"
      );

      return;
    }

    alert(
      "Institute created"
    );

    setName("");
    setCity("");

    fetchInstitutes();
  }

  return (

    <AdminGuard>

      <main className="min-h-screen bg-gray-50 p-6 md:p-8">

        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">

    Institutes

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-5 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

          {/* CREATE */}

          <div className="bg-white border rounded-3xl p-6 shadow-sm mb-10">

            <h2 className="text-2xl font-bold mb-6">

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

              <button
                onClick={
                  createInstitute
                }
                className="bg-black text-white px-6 py-4 rounded-2xl font-bold w-full"
              >
                Create Institute
              </button>

            </div>

          </div>

          {/* LIST */}

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">

              Institutes

            </h2>

            <div className="space-y-5">

              {institutes.map(
                (institute) => (

                  <div
                    key={institute.id}
                    className="border rounded-2xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="text-2xl font-bold mb-2">

                        {institute.name}

                      </h3>

                      <p className="text-gray-600">

                        {institute.city}

                      </p>

                    </div>

                  </div>

                )
              )}

              {institutes.length === 0 && (

                <div className="text-center text-gray-500 py-10">

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
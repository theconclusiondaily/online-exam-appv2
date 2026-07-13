"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import AdminGuard
from "@/components/AdminGuard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TCDLoader from "@/components/common/TCDLoader";
import { supabase }
from "@/lib/supabase/client";

export default function TeachersPage() {

  const [teachers,
    setTeachers] =
    useState<any[]>([]);

  const [institutes,
    setInstitutes] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  async function loadData() {

    // FETCH TEACHERS

    const {
      data: teacherData,
      error: teacherError,
    } = await supabase

      .from("users")

      .select(`
        *,
        institutes (
          id,
          name
        )
      `)

      .eq(
        "role",
        "teacher"
      )

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    console.log(
      teacherData
    );

    console.log(
      teacherError
    );

    // FETCH INSTITUTES

    const {
      data: instituteData,
    } = await supabase

      .from("institutes")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    setTeachers(
      teacherData || []
    );

    setInstitutes(
      instituteData || []
    );

    setLoading(false);
  }

  useEffect(() => {

    loadData();

  }, []);

  if (loading) {
  return <TCDLoader text="Loading Teachers" />;
}

  return (

    <AdminGuard>

      <main className="min-h-screen bg-gray-50 p-6 md:p-5">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}

          <div className="flex justify-between items-center mb-10">
<AdminPageHeader
  title="Teachers"
  description="Manage teacher accounts."
/>
            <h1 className="text-2xl font-bold">

              Teacher Management

            </h1>

            <Link
              href="/admin"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >

              Dashboard

            </Link>

          </div>

          {/* SUMMARY */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">

            <div className="bg-white border rounded-3xl p-6 shadow-sm">

              <p className="text-tcd-primary mb-2">

                Total Teachers

              </p>

              <h2 className="text-2xl font-bold">

                {teachers.length}

              </h2>

            </div>

            <div className="bg-white border rounded-3xl p-6 shadow-sm">

              <p className="text-tcd-primary mb-2">

                Active Institutes

              </p>

              <h2 className="text-2xl font-bold">

                {
                  institutes.filter(
                    (i) =>
                      i.active
                  ).length
                }

              </h2>

            </div>

            <div className="bg-white border rounded-3xl p-6 shadow-sm">

              <p className="text-tcd-primary mb-2">

                Disabled Teachers

              </p>

              <h2 className="text-2xl font-bold text-red-500">

                {
                  teachers.filter(
                    (t) =>
                      t.disabled
                  ).length
                }

              </h2>

            </div>

          </div>

          {/* TEACHERS */}

          <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-3xl font-bold">

                Teachers

              </h2>

              <div className="bg-gray-100 px-4 py-2 rounded-xl font-bold">

                {teachers.length} Teachers

              </div>

            </div>

            <div className="space-y-5">

              {teachers.map(
                (teacher) => (

                  <div
                    key={teacher.id}
                    className="border rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3"
                  >

                    {/* LEFT */}

                    <div>

                      <h3 className="text-2xl font-bold mb-2">

                        {teacher.name ||
                          "Teacher"}

                      </h3>

                      <p className="text-brand mb-2">

                        {teacher.email}

                      </p>

                      <div
                        className={`
                          inline-block px-4 py-2 rounded-xl font-bold text-sm mb-3

                          ${
                            teacher.disabled
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >

                        {
                          teacher.disabled
                            ? "DISABLED"
                            : "ACTIVE"
                        }

                      </div>

                      <p className="text-sm text-tcd-primary">

                        Institute:
                        {" "}

                        {
                          teacher
                            ?.institutes
                            ?.name ||

                          "Not Assigned"
                        }

                      </p>

                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col gap-2">

                      {/* ASSIGN INSTITUTE */}

                      <select

                        value={
                          teacher.institute_id ||
                          ""
                        }

                        onChange={async (e) => {

                          await supabase

                            .from("users")

                            .update({

                              institute_id:
                                e.target.value,

                            })

                            .eq(
                              "id",
                              teacher.id
                            );

                          loadData();
                        }}

                        className="border rounded-xl p-3 min-w-[220px]"
                      >

                        <option value="">

                          Select Institute

                        </option>

                        {institutes.map(
                          (institute) => (

                            <option
                              key={
                                institute.id
                              }
                              value={
                                institute.id
                              }
                            >

                              {institute.name}

                            </option>

                          )
                        )}

                      </select>

                      {/* ENABLE / DISABLE */}

                      <button

                        onClick={async () => {

                          await supabase

                            .from("users")

                            .update({

                              disabled:
                                !teacher.disabled,

                            })

                            .eq(
                              "id",
                              teacher.id
                            );

                          loadData();
                        }}

                        className={`
                          px-4 py-3 rounded-xl text-white font-bold

                          ${
                            teacher.disabled
                              ? "bg-green-600"
                              : "bg-red-500"
                          }
                        `}
                      >

                        {
                          teacher.disabled
                            ? "Enable Teacher"
                            : "Disable Teacher"
                        }

                      </button>

                    </div>

                  </div>

                )
              )}

              {teachers.length === 0 && (

                <div className="text-center text-tcd-primary py-10">

                  No teachers found

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

    </AdminGuard>
  );
}
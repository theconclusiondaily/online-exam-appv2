"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminOpportunitiesPage() {

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [eligibility, setEligibility] =
    useState("");

  const [lastDate, setLastDate] =
    useState("");

  const [officialLink, setOfficialLink] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function createOpportunity() {

    try {

      setLoading(true);

      const {
        data: authData,
      } =
        await supabase.auth.getUser();

      const user =
        authData.user;

      if (!user) {

        alert("Not authenticated");

        return;
      }

      const { error } =
        await supabase
          .from("opportunities")
          .insert({

            title,

            category,

            description,

            eligibility,

            last_date:
              lastDate,

            official_link:
              officialLink,

            created_by:
              user.id,

          });

      if (error) {

        alert(
          error.message
        );

        return;
      }

      alert(
        "Opportunity created successfully."
      );

      setTitle("");
      setCategory("");
      setDescription("");
      setEligibility("");
      setLastDate("");
      setOfficialLink("");

    } finally {

      setLoading(false);

    }
  }

  return (

    <main className="p-6">

      <div className="max-w-4xl mx-auto">

        <h1
          className="
            text-3xl
            font-black
            text-tcd-blue
            mb-6
          "
        >
          Create Opportunity
        </h1>

        <div
          className="
            bg-white

            rounded-[32px]

            p-6

            shadow-sm

            border
            border-gray-100
          "
        >

          <div className="space-y-4">

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Title"
              className="
                w-full
                p-4
                rounded-xl
                border
              "
            />

            <input
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              placeholder="Category"
              className="
                w-full
                p-4
                rounded-xl
                border
              "
            />

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Description"
              rows={5}
              className="
                w-full
                p-4
                rounded-xl
                border
              "
            />

            <textarea
              value={eligibility}
              onChange={(e) =>
                setEligibility(
                  e.target.value
                )
              }
              placeholder="Eligibility"
              rows={3}
              className="
                w-full
                p-4
                rounded-xl
                border
              "
            />

            <input
              type="date"
              value={lastDate}
              onChange={(e) =>
                setLastDate(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                border
              "
            />

            <input
              value={officialLink}
              onChange={(e) =>
                setOfficialLink(
                  e.target.value
                )
              }
              placeholder="Official Apply Link"
              className="
                w-full
                p-4
                rounded-xl
                border
              "
            />

            <button
              onClick={
                createOpportunity
              }
              disabled={loading}
              className="
                w-full

                py-4

                rounded-2xl

                bg-tcd-blue

                text-white

                font-bold
              "
            >
              {
                loading
                  ? "Creating..."
                  : "Create Opportunity"
              }
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
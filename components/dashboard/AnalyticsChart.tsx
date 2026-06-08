"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { supabase }
from "@/lib/supabase/client";

export default function AnalyticsChart() {

  const [data, setData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadAnalytics() {

      const {
        data: users,
        error,
      } = await supabase
        .from("users")
        .select("created_at");

      if (error) {
        console.log(error);
        return;
      }

      const grouped: any = {};

      users?.forEach((user) => {

        const date =
          new Date(
            user.created_at
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          );

        if (!grouped[date]) {
          grouped[date] = 0;
        }

        grouped[date] += 1;
      });

      const formatted =
        Object.keys(grouped).map(
          (date) => ({
            name: date,
            students:
              grouped[date],
          })
        );

      setData(formatted);

      setLoading(false);
    }

    loadAnalytics();

  }, []);

  if (loading) {

    return (
      <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl h-[420px] flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading Analytics...
        </div>
      </div>
    );
  }

  return (

    <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl">

      <div className="mb-3">

        <h2 className="text-2xl font-bold">
          Student Registrations
        </h2>

        <p className="text-gray-700">
          Real platform growth analytics
        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="students"
              stroke="#3b82f6"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
"use client";

import { useMemo, useState } from "react";

import { useExams } from "./hooks/useExams";
import ExamStatusTabs from "./ExamStatusTabs";
import ExamCard from "./ExamCard";

export default function ExamManagerContainer() {

  const { loading, exams } = useExams();

  const [status, setStatus] =
    useState("all");
const [search, setSearch] = useState("");
  const filteredExams = useMemo(() => {

  let list = exams;

  if (status !== "all") {
    list = list.filter(
      exam => exam.status === status
    );
  }

  if (search.trim()) {
    list = list.filter(exam =>
      exam.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  return list;

}, [status, exams, search]);

  return (

    <div className="space-y-8">
<input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Exams..."
  className="w-full border rounded-2xl p-4"
/>
      <ExamStatusTabs
        selected={status}
        onChange={setStatus}
      />

      {loading && (

        <div className="text-center py-10">

          Loading Exams...

        </div>

      )}

      {!loading &&
        filteredExams.map(exam => (

          <ExamCard
            key={exam.id}
            exam={exam}
          />

        ))}

      {!loading &&
        filteredExams.length === 0 && (

          <div className="bg-white rounded-3xl border p-12 text-center">

            <h2 className="text-2xl font-bold text-tcd-blue">

              No Exams Found

            </h2>

          </div>

        )}

    </div>

  );

}
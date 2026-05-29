"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";
import {
  useSearchParams
} from "next/navigation";
import {
  useRouter,
} from "next/navigation";

import AdminGuard from "@/components/AdminGuard";

export default function CreateExamPage() {
const searchParams =
  useSearchParams();

const editId =
  searchParams.get("id");
  const router =
    useRouter();

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [rewardPool,
    setRewardPool] =
    useState("");

  const [institutes,
    setInstitutes] =
    useState<any[]>([]);

  const [selectedInstitute,
    setSelectedInstitute] =
    useState("");

const [duration,
  setDuration] =
  useState("30");

  const [startTime,
    setStartTime] =
    useState("");

  const [endTime,
    setEndTime] =
    useState("");
  const [questions,
  setQuestions] =
  useState<any[]>([]);

const [selectedQuestions,
  setSelectedQuestions] =
  useState<string[]>([]);

const [subjectFilter,
  setSubjectFilter] =
  useState("");
useEffect(() => {

  async function fetchData() {

    const {
      data: instituteData,
      error: instituteError,
    } = await supabase
      .from("institutes")
      .select("*")
      .order("name");
console.log(
  "INSTITUTE ERROR:",
  instituteError
);
    if (!instituteError && instituteData) {
      setInstitutes(
        instituteData
      );
    }

    const {
      data: questionData,
      error: questionError,
    } = await supabase
      .from("questions")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );
console.log(
  "QUESTION ERROR:",
  questionError
);
    if (!questionError && questionData) {
      setQuestions(
        questionData
      );
    }
  }

  fetchData();

}, []);

useEffect(() => {

  if (!editId) return;

  async function loadExam() {

    const {
  data,
  error,
  status
} = await supabase
  .from("exams")
  .select("*")
  .eq("id", editId)
  .maybeSingle();

console.log("EDIT ID:", editId);
console.log("STATUS:", status);
console.log("DATA:", data);
console.log("ERROR:", error);

console.log(
  "EDIT ID:",
  editId
);

console.log(
  "EXAM DATA:",
  data
);

console.log(
  "EXAM ERROR:",
  error
);

    if (!data) {

  console.error(
    "Exam not found:",
    editId
  );

  return;
}

    setTitle(data.title || "");

setDescription(
  data.description || ""
);

setRewardPool(
  String(
    data.reward_pool || 0
  )
);

setSelectedInstitute(
  data.institute_id || ""
);

setDuration(
  String(
    data.duration || 30
  )
);

if (data.start_time) {

  const start =
    new Date(
      data.start_time
    );

  start.setMinutes(
    start.getMinutes() -
    start.getTimezoneOffset()
  );

  setStartTime(
    start
      .toISOString()
      .slice(0, 16)
  );
}

if (data.end_time) {

  const end =
    new Date(
      data.end_time
    );

  end.setMinutes(
    end.getMinutes() -
    end.getTimezoneOffset()
  );

  setEndTime(
    end
      .toISOString()
      .slice(0, 16)
  );
}
const {
  data: mappings,
  error: mappingsError,
} = await supabase
  .from("exam_questions")
  .select("question_id")
  .eq("exam_id", editId);

console.log(
  "MAPPINGS:",
  mappings
);

console.log(
  "MAPPINGS ERROR:",
  mappingsError
);

if (mappings) {

  setSelectedQuestions(
    mappings.map(
      (m: any) => m.question_id
    )
  );
}
  }
  loadExam();

}, [editId]);
  // CREATE EXAM

  async function createExam() {
const {
  data: { user },
} = await supabase.auth.getUser();
    if (
  !title ||
  !startTime ||
  !endTime ||
  !selectedInstitute ||
  !duration
) {

      alert(
        "Fill all required fields"
      );

      return;
    }

 let createdExam;
let error;

if (editId) {
const { data: exam } =
  await supabase
    .from("exams")
    .select("published")
    .eq("id", editId)
    .maybeSingle();

if (exam?.published) {

  alert(
  "Published exams cannot be edited"
);

  return;
}
  const result = await supabase
    .from("exams")
    .update({
  title,
  description,

  reward_pool:
    Number(rewardPool),

  institute_id:
    selectedInstitute,

  duration:
    Number(duration),
start_time:
  new Date(
    startTime
  ).toISOString(),

end_time:
  new Date(
    endTime
  ).toISOString(),
})
    .eq("id", editId)
    .select()
    .maybeSingle();

  createdExam = result.data;
  error = result.error;

} else {

  const result = await supabase
    .from("exams")
    .insert({
  title,
  description,

  reward_pool:
    Number(rewardPool),

  institute_id:
    selectedInstitute,

  duration:
    Number(duration),

 start_time:
  new Date(
    startTime
  ).toISOString(),

end_time:
  new Date(
    endTime
  ).toISOString(),

  published: false,

  created_by:
    user?.id,
})
    .select()
    .maybeSingle();

  createdExam = result.data;
  error = result.error;
}

if (error) {

  console.log(error);

  alert(
    editId
      ? "Failed to update exam"
      : "Failed to create exam"
  );

  return;
}

alert(
  editId
    ? "Exam updated successfully"
    : "Exam created successfully"
);


   if (
  selectedQuestions.length > 0
) {

  // If editing, remove old mappings first
  if (editId) {

    await supabase
      .from("exam_questions")
      .delete()
      .eq(
        "exam_id",
        editId
      );
  }

  const examIdToUse =
  editId ||
  createdExam?.id;

if (!examIdToUse) {

  alert(
    "Failed to determine exam id"
  );

  return;
}

const mappings =
  selectedQuestions.map(
    (questionId) => ({
      exam_id: examIdToUse,
      question_id: questionId,
    })
  );

console.log(
  "MAPPINGS TO INSERT:",
  mappings
);

const {
  data: insertedMappings,
  error: mappingInsertError,
} = await supabase
  .from("exam_questions")
  .insert(mappings)
  .select();

console.log(
  "INSERTED MAPPINGS:",
  insertedMappings
);

console.log(
  "MAPPING INSERT ERROR:",
  mappingInsertError
);

if (mappingInsertError) {

  alert(
    mappingInsertError.message
  );

  return;
}
}
router.push("/admin");
  }

  return (

    <AdminGuard>

      <main className="min-h-screen p-5 bg-gray-50">

        <div className="max-w-2xl mx-auto bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex justify-between items-center mb-4">

  <h1 className="text-2xl font-bold">

    {
  editId
    ? "Update Exam"
    : "Create Exam"
}

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-4 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

          <div className="space-y-6">

            {/* TITLE */}

            <input
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            {/* DESCRIPTION */}

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4 h-32"
            />

            {/* REWARD */}

            <input
              type="number"
              placeholder="Reward Pool"
              value={rewardPool}
              onChange={(e) =>
                setRewardPool(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            {/* INSTITUTE */}

            <div>

              <p className="font-semibold mb-2">

                Institute

              </p>

              <select
                value={
                  selectedInstitute
                }
                onChange={(e) =>
                  setSelectedInstitute(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
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
            {/* DURATION */}

<div>

  <p className="font-semibold mb-2">

    Duration (Minutes)

  </p>

  <input
    type="number"
    value={duration}
    onChange={(e) =>
      setDuration(
        e.target.value
      )
    }
    className="w-full border rounded-2xl p-4"
  />

</div>

            {/* START TIME */}

            <div>

              <p className="font-semibold mb-2">

                Start Time

              </p>

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) =>
                  setStartTime(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

            </div>

            {/* END TIME */}

            <div>

              <p className="font-semibold mb-2">

                End Time

              </p>

              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) =>
                  setEndTime(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

            </div>
{/* QUESTION BANK */}

<div className="border rounded-3xl p-5 bg-gray-50">

  <div className="flex items-center justify-between mb-2">

    <h2 className="text-2xl font-bold">

      Question Bank

    </h2>

    <div className="bg-black text-white px-4 py-2 rounded-xl font-bold">

      {
        selectedQuestions.length
      }
      {" "}
      Selected

    </div>

  </div>

  <input
    type="text"
    placeholder="Filter by Subject"
    value={subjectFilter}
    onChange={(e) =>
      setSubjectFilter(
        e.target.value
      )
    }
    className="w-full border rounded-2xl p-4 mb-2"
  />

  <div className="max-h-[400px] overflow-y-auto space-y-4">

    {questions

      .filter((q) =>

        !subjectFilter ||

        q.subject
          ?.toLowerCase()
          .includes(
            subjectFilter.toLowerCase()
          )
      )

      .map((q) => (

        <div
          key={q.id}
          className="border rounded-2xl p-4 bg-white"
        >

          <div className="flex justify-between gap-2">

            <div>

              <p className="font-bold mb-2">

                {q.question}

              </p>

              <div className="flex flex-wrap gap-2 text-sm">

                <div className="bg-tcd-gold/20 text-tcd-blue px-3 py-1 rounded-xl">

                  {q.subject}

                </div>

                <div
                  className={`
                    px-3 py-1 rounded-xl

                    ${
                      q.difficulty === "easy"
                        ? "bg-green-100 text-green-700"

                        : q.difficulty === "hard"

                        ? "bg-red-100 text-red-700"

                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {q.difficulty}

                </div>

              </div>

            </div>

            <input
              type="checkbox"

              checked={
                selectedQuestions.includes(
                  q.id
                )
              }

              onChange={(e) => {

                if (
                  e.target.checked
                ) {

                  setSelectedQuestions([
                    ...selectedQuestions,
                    q.id,
                  ]);

                } else {

                  setSelectedQuestions(

                    selectedQuestions.filter(
                      (id) =>
                        id !== q.id
                    )
                  );
                }
              }}

              className="w-6 h-6"
            />

          </div>

        </div>

      ))}

  </div>

</div>
            {/* BUTTON */}

            <button
              onClick={
                createExam
              }
              className="bg-black text-white w-full py-3 rounded-2xl font-bold"
            >

              {
  editId
    ? "Update Exam"
    : "Create Exam"
}

            </button>

          </div>

        </div>

      </main>

    </AdminGuard>
  );
}
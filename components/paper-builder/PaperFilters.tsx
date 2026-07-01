"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  subject: string;
  setSubject: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
}

export default function PaperFilters({
  search,
  setSearch,
  subject,
  setSubject,
  status,
  setStatus,
}: Props) {

  return (

    <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">

      <div className="grid grid-cols-3 gap-4">

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Papers..."
          className="border rounded-xl px-4 py-3"
        />

        <select
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">All Subjects</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Biology</option>
          <option>Math</option>
          <option>Reasoning</option>
          <option>Quantitative Aptitude</option>
          <option>General Science</option>
          <option>General Knowledge</option>
          <option>Current Affairs</option>
          <option>Polity</option>
          <option>Geography</option>
          <option>History</option>
          <option>Sports</option>
          <option>Entertainment</option>
          <option>People</option>
          <option>Books & Authors</option>
        </select>

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">All Status</option>
          <option>Draft</option>
          <option>Published</option>
          <option>Archived</option>
        </select>

      </div>

    </div>

  );

}
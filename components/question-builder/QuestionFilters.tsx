"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  subject: string;
  setSubject: (value: string) => void;

  difficulty: string;
  setDifficulty: (value: string) => void;

  language: string;
  setLanguage: (value: string) => void;
}

export default function QuestionFilters({
  search,
  setSearch,
  subject,
  setSubject,
  difficulty,
  setDifficulty,
  language,
  setLanguage,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">

      <div className="grid grid-cols-4 gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Question..."
          className="border rounded-xl px-4 py-3"
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">All Subjects</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Biology</option>
          <option>Math</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Bilingual</option>
        </select>

      </div>

    </div>
  );
}
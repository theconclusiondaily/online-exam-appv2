"use client";

export default function MetadataBar() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-6">

      <div className="grid grid-cols-8 gap-5">

        <div>
          <label className="block text-sm font-semibold mb-2">
            Subject
          </label>

          <select className="w-full rounded-xl border p-3">
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Mathematics</option>
            <option>Zoology</option>
            <option>Botany</option>
            <option>General Science</option>
            <option>Current Affairs</option>
            <option>Polity</option>
            <option>History</option>
            <option>Geography</option>
            <option>Reasoning</option>
            <option>Quantitative Aptitute</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Genral Knowledge</option>
            <option>Miscellaneous</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Chapter
          </label>

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Chapter"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Topic
          </label>

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Topic"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Difficulty
          </label>

          <select className="w-full rounded-xl border p-3">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Marks
          </label>

          <input
            type="number"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Negative
          </label>

          <input
            type="number"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Language
          </label>

          <select className="w-full rounded-xl border p-3">
            <option>English / हिन्दी</option>
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Type
          </label>

          <select className="w-full rounded-xl border p-3">
            <option>Single Correct</option>
            <option>Multiple Correct</option>
            <option>Numerical</option>
          </select>
        </div>

      </div>

    </div>
  );
}
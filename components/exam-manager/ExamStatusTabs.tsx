"use client";

interface Props {
  selected: string;
  onChange: (status: string) => void;
}

const tabs = [

  "all",

  "draft",

  "scheduled",

  "live",

  "completed",

  "cancelled",

];

export default function ExamStatusTabs({

  selected,

  onChange,

}: Props) {

  return (

    <div className="flex flex-wrap gap-3 mb-8">

      {tabs.map(tab => (

        <button

          key={tab}

          onClick={() => onChange(tab)}

          className={`
            px-5
            py-3
            rounded-2xl
            font-bold

            ${
              selected === tab
                ? "bg-tcd-blue text-white"
                : "bg-white border"
            }
          `}
        >

          {tab.toUpperCase()}

        </button>

      ))}

    </div>

  );

}
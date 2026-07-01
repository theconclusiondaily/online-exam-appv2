"use client";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function TCDTabs({
  tabs,
  activeTab,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 border-b border-slate-200 mb-6 overflow-x-auto">

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            px-5
            py-3
            whitespace-nowrap
            font-semibold
            border-b-2
            transition

            ${
              activeTab === tab.id
                ? "border-[#0F3D91] text-[#0F3D91]"
                : "border-transparent text-slate-500 hover:text-[#0F3D91]"
            }
          `}
        >
          {tab.label}
        </button>
      ))}

    </div>
  );
}
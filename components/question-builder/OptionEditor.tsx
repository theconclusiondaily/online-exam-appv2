"use client";

interface Props {
  optionsEn: string[];
  optionsHi: string[];

  updateOptionEn: (index: number, value: string) => void;
  updateOptionHi: (index: number, value: string) => void;

  correctAnswer: string;
  setCorrectAnswer: (answer: string) => void;

  setActiveField: (field: string) => void;
}

export default function OptionEditor({
  optionsEn,
  optionsHi,
  updateOptionEn,
  updateOptionHi,
  correctAnswer,
  setCorrectAnswer,
  setActiveField,
}: Props) {

  

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6 mb-6">

      <h2 className="text-2xl font-bold text-tcd-blue mb-6">
        ✅ Options
      </h2>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {["A","B","C","D"].map((letter,index)=>(

        <div
  key={letter}
 className="
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
hover:shadow-lg
transition-all
duration-300
p-5
"
>

         <div className="grid gap-5">

  <div>

    <label className="font-semibold mb-2 block">
      Option {letter} (English)
    </label>

    <textarea
      rows={3}
      value={optionsEn[index]}
      onFocus={() => setActiveField("questionEn")}
      onChange={(e) =>
        updateOptionEn(index, e.target.value)
      }
      className="
w-full
rounded-xl
border
border-slate-300
focus:ring-2
focus:ring-[#0F3D91]
focus:border-[#0F3D91]
p-3
transition
resize-none
"
    />

  </div>

  <div>

    <label className="font-semibold mb-2 block">
      विकल्प {letter}
    </label>

    <textarea
      rows={3}
      value={optionsHi[index]}
      onFocus={() => setActiveField("questionHi")}
      onChange={(e) =>
        updateOptionHi(index, e.target.value)
      }
      className="
w-full
rounded-xl
border
border-slate-300
focus:ring-2
focus:ring-[#0F3D91]
focus:border-[#0F3D91]
p-3
transition
resize-none
"
    />
<div className="mt-5 border-t pt-4">

  <label className="flex items-center gap-3 cursor-pointer">

    <input
      type="radio"
      name="correctAnswer"
      checked={correctAnswer === letter}
      onChange={() => setCorrectAnswer(letter)}
    />

    <span className="font-medium text-sm">

      Correct Answer

    </span>

  </label>

</div>
  </div>

</div>

        </div>

      ))}

    </div>
     </div>
  );
}
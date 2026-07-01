"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPaperPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [subject, setSubject] = useState("Physics");
  const [className, setClassName] = useState("XI");

  const [duration, setDuration] = useState(180);

  const [difficulty, setDifficulty] =
    useState("Mixed");

  const [language, setLanguage] =
    useState("English");

  async function handleNext() {

    const response =
      await fetch("/api/papers/create", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          title,
          description,
          subject,

          class: className,

          duration,

          difficulty,

          language,

        }),

      });

    const result =
      await response.json();

    if (!response.ok) {

      alert(result.error);

      return;

    }

    router.push(`/admin/papers/${result.id}`);

  }

  return (

<div className="max-w-4xl mx-auto p-8">

<h1 className="text-3xl font-bold text-[#0F3D91] mb-8">

Create Question Paper

</h1>

<div className="bg-white rounded-2xl border shadow-sm p-8 space-y-6">

<input

value={title}

onChange={(e)=>setTitle(e.target.value)}

placeholder="Paper Title"

className="w-full border rounded-xl p-4"

/>

<textarea

value={description}

onChange={(e)=>
setDescription(e.target.value)
}

placeholder="Description"

rows={4}

className="w-full border rounded-xl p-4"

/>

<div className="grid grid-cols-2 gap-5">

<select

value={subject}

onChange={(e)=>
setSubject(e.target.value)
}

className="border rounded-xl p-4"

>

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

value={className}

onChange={(e)=>
setClassName(e.target.value)
}

className="border rounded-xl p-4"

>
<option>VI</option>
<option>VII</option>
<option>VIII</option>
<option>IX</option>
<option>X</option>
<option>XI</option>

<option>XII</option>

<option>NEET</option>

<option>JEE</option>

<option>UPSC</option>
<option>SSC CGL</option>
<option>BANKING</option>
<option>RBI</option>
<option>STATE PSC</option>
<option>NDA</option>
<option>CDS</option>
<option>CAT</option>
<option>DEFENCE</option>
<option>COMPETITIVE EXAM</option>


</select>

<select

value={difficulty}

onChange={(e)=>
setDifficulty(e.target.value)
}

className="border rounded-xl p-4"

>

<option>Easy</option>

<option>Medium</option>

<option>Hard</option>

<option>Mixed</option>

</select>

<select

value={language}

onChange={(e)=>
setLanguage(e.target.value)
}

className="border rounded-xl p-4"

>

<option>English</option>

<option>Hindi</option>

<option>Bilingual</option>

</select>

</div>

<input

type="number"

value={duration}

onChange={(e)=>
setDuration(Number(e.target.value))
}

className="w-full border rounded-xl p-4"

/>

<button

onClick={handleNext}

className="bg-[#0F3D91] text-white rounded-xl px-8 py-4 font-semibold"

>

Continue to Paper Builder →

</button>

</div>

</div>

  );

}
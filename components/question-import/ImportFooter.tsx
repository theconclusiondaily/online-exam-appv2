"use client";

interface Props {

  total:number;

  selected:number;

  importing:boolean;

  onImport:()=>void;

}

export default function ImportFooter({

  total,

  selected,

  importing,

  onImport,

}:Props){

return(

<div className="bg-white rounded-3xl border shadow-sm p-8">

<div className="grid md:grid-cols-3 gap-6 mb-8">

<div>

<div className="text-brand">

Questions

</div>

<div className="text-3xl font-black text-tcd-blue">

{total}

</div>

</div>

<div>

<div className="text-brand">

Selected

</div>

<div className="text-3xl font-black text-green-600">

{selected}

</div>

</div>

<div>

<div className="text-brand">

Skipped

</div>

<div className="text-3xl font-black text-red-500">

{total-selected}

</div>

</div>

</div>

<button

disabled={
selected===0||importing
}

onClick={onImport}

className="w-full bg-tcd-blue text-white rounded-2xl py-4 font-black text-lg disabled:opacity-40"

>

{importing

?"Importing Questions..."

:"Import Selected Questions"}

</button>

</div>

);

}
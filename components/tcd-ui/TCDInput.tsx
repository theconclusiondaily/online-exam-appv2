"use client";

import { InputHTMLAttributes } from "react";

interface Props
extends InputHTMLAttributes<HTMLInputElement>{

label?:string;

}

export default function TCDInput({

label,

className="",

...props

}:Props){

return(

<div>

{label && (

<label className="block mb-2 font-semibold">

{label}

</label>

)}

<input

{...props}

className={`

w-full

rounded-xl

border

border-slate-300

px-4

py-3

focus:outline-none

focus:ring-2

focus:ring-[#0F3D91]

${className}

`}

/>

</div>

);

}
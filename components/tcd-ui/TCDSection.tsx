"use client";

import { ReactNode } from "react";

interface Props{
    title:string;
    subtitle?:string;
    children:ReactNode;
}

export default function TCDSection({
    title,
    subtitle,
    children,
}:Props){

return(

<section className="mb-8">

<div className="mb-5">

<h2 className="text-2xl font-bold text-[#0F3D91]">

{title}

</h2>

{subtitle && (

<p className="text-slate-500 mt-1">

{subtitle}

</p>

)}

</div>

{children}

</section>

);

}
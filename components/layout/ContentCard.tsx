"use client";

import { ReactNode } from "react";

interface Props{
    children:ReactNode;
    className?:string;
}

export default function ContentCard({
    children,
    className="",
}:Props){

return(

<div
className={`
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
${className}
`}
>

{children}

</div>

);

}
"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Props{
    title:string;
    formulas:{
        label:string;
        latex:string;
    }[];
    onInsert:(latex:string)=>void;
}

export default function FormulaMenu({
    title,
    formulas,
    onInsert,
}:Props){

return(

<DropdownMenu.Root>

<DropdownMenu.Trigger asChild>

<button
className="px-3 py-2 rounded-lg hover:bg-slate-200 transition"
>

{title}

</button>

</DropdownMenu.Trigger>

<DropdownMenu.Content
className="
bg-white
rounded-xl
shadow-xl
border
p-2
w-56
z-50
"
>

{formulas.map((item)=>(

<DropdownMenu.Item

key={item.label}

className="
p-2
rounded-lg
cursor-pointer
hover:bg-slate-100
outline-none
"

onClick={()=>onInsert(item.latex)}

>

{item.label}

</DropdownMenu.Item>

))}

</DropdownMenu.Content>

</DropdownMenu.Root>

);

}
"use client";

import { ReactNode } from "react";

interface Props{
children:ReactNode;
}

export default function StatGrid({
children,
}:Props){

return(

<div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

{children}

</div>

);

}
"use client";

import { CertificateData } from "./types";
import CertificateHeader
from "./CertificateHeader";
import CertificateBody
from "./CertificateBody";
import CertificateStats
from "./CertificateStats";
import CertificateFooter
from "./CertificateFooter";
interface Props {
  data: CertificateData;
}

export default function CertificateCanvas({
  data,
}: Props) {

  return (

<div className="w-full overflow-auto flex justify-center py-10">

<div

id="certificate-root"

className="
flex
flex-col
relative

bg-[#243B6B]

text-white

rounded-[28px]

border-[10px]

border-[#D4AF37]

shadow-2xl

overflow-hidden

"

style={{

width: 794,
minHeight: 1480,

}}

>

{/* ========================= */}

{/* GOLD BORDER */}

{/* ========================= */}

<div className="absolute inset-4 border border-[#D4AF37]/40 rounded-[18px]" />

{/* ========================= */}

{/* HEADER */}

{/* ========================= */}

<CertificateHeader />

{/* ========================= */}

{/* BODY */}

{/* ========================= */}

<CertificateBody
  data={data}
/>

{/* ========================= */}
<CertificateStats
  data={data}
/>
{/* FOOTER */}

{/* ========================= */}

<CertificateFooter
  data={data}
/>

</div>

</div>

  );

}

/* ===================================================== */

interface StatProps {

  title: string;

  value: string | number;

}
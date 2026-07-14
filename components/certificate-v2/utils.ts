// ======================================================
// THE CONCLUSION DAILY
// Certificate System V2 Utilities
// ======================================================

import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { ExportOptions, PrestigeLevel } from "./types";

/* =====================================================
   Name Auto Fit
===================================================== */

export function fitName(name: string): string {

  return name.trim().toUpperCase();

}

export function getNameClass(name: string): string {

  const length = name.trim().length;

  if (length <= 18)
    return "text-5xl";

  if (length <= 26)
    return "text-4xl";

  if (length <= 36)
    return "text-3xl";

  if (length <= 50)
    return "text-2xl";

  return "text-xl";

}

/* =====================================================
   Date Formatting
===================================================== */

export function formatDate(
  date: string | Date
) {

  return new Date(date).toLocaleDateString(
    "en-IN",
    {

      day: "2-digit",

      month: "long",

      year: "numeric",

    }
  );

}

/* =====================================================
   Percentage Formatting
===================================================== */

export function formatPercentage(
  value: number
) {

  return `${Number(value).toFixed(2)}%`;

}

/* =====================================================
   Rank Formatting
===================================================== */

export function formatRank(
  rank: number | null | undefined
) {

  if (!rank || rank <= 0) {

    return "N/A";

  }

  return `#${rank}`;

}

/* =====================================================
   Prestige
===================================================== */

export function prestigeEmoji(
  prestige: PrestigeLevel
) {

  switch (prestige) {

    case "Bronze":
      return "🥉";

    case "Silver":
      return "🥈";

    case "Gold":
      return "🥇";

    case "Diamond":
      return "💎";

    case "Legend":
      return "👑";

    default:
      return "🥉";

  }

}

export function prestigeLabel(
  prestige: PrestigeLevel
) {

  return `${prestigeEmoji(prestige)} ${prestige}`;

}

/* =====================================================
   Wait For Assets
===================================================== */

export async function waitForAssets(
  root: HTMLElement
) {

  // Fonts

  if ("fonts" in document) {

    await document.fonts.ready;

  }

  // Images

  const images =
    Array.from(
      root.querySelectorAll("img")
    );

  await Promise.all(

    images.map((img) => {

      if (img.complete)

        return Promise.resolve();

      return new Promise<void>((resolve) => {

        img.onload = () => resolve();

        img.onerror = () => resolve();

      });

    })

  );

}

/* =====================================================
   Export PNG
===================================================== */

export async function exportPNG(

  root: HTMLElement,

  options?: ExportOptions

) {

  await waitForAssets(root);

  return await toPng(root, {

    cacheBust: true,

    pixelRatio:
      options?.pixelRatio ?? 3,

    backgroundColor:
      options?.backgroundColor ??
      "#243B6B",

  });

}

/* =====================================================
   Download Image
===================================================== */

export async function downloadImage(

  root: HTMLElement,

  filename: string

) {

  const dataUrl =
    await exportPNG(root);

  const link =
    document.createElement("a");

  link.download = filename;

  link.href = dataUrl;

  link.click();

}

/* =====================================================
   Download PDF
===================================================== */

export async function downloadPDF(

  root: HTMLElement,

  filename: string

) {

  const dataUrl =
    await exportPNG(root);

  const img =
    new Image();

  img.src = dataUrl;

  await new Promise<void>((resolve) => {

    img.onload = () => resolve();

  });

  const pdf =
    new jsPDF({

      orientation: "portrait",

      unit: "px",

      format: [

        img.width,

        img.height,

      ],

    });

  pdf.addImage(

    dataUrl,

    "PNG",

    0,

    0,

    img.width,

    img.height

  );

  pdf.save(filename);

}
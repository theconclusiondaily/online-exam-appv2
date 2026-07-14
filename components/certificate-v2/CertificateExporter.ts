"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import {
  waitForAssets,
} from "./utils";

export default class CertificateExporter {

  /* =======================================
      Root
  ======================================= */

  private static getRoot() {

    const root =
      document.getElementById(
        "certificate-root"
      );

    if (!root) {

      throw new Error(
        "Certificate root not found."
      );

    }

    return root;

  }

  /* =======================================
      Render PNG
  ======================================= */
public static async renderPNG() {

    const root =
      this.getRoot();

    await waitForAssets(root);

    return await toPng(root, {

      cacheBust: true,

      pixelRatio: 4,

      backgroundColor:
        "#243B6B",

      skipFonts: false,

      style: {

        margin: "0",

      },

    });

  }

  /* =======================================
      Download Image
  ======================================= */

  static async downloadImage(

    filename: string

  ) {

    const image =
      await this.renderPNG();

    const link =
      document.createElement("a");

    link.href = image;

    link.download = filename;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

  }

  /* =======================================
      Download PDF
  ======================================= */

  static async downloadPDF(

    filename: string

  ) {

    const image =
      await this.renderPNG();

    const img =
      new Image();

    img.src = image;

    await new Promise<void>(

      (resolve) => {

        img.onload = () => resolve();

      }

    );

    const pdf =
      new jsPDF({

        orientation:
          "portrait",

        unit: "px",

        format: [

          img.width,

          img.height,

        ],

        compress: true,

      });

    pdf.addImage(

      image,

      "PNG",

      0,

      0,

      img.width,

      img.height,

      undefined,

      "FAST"

    );

    pdf.save(filename);

  }

  /* =======================================
      Share
  ======================================= */

  static async share(

    filename: string

  ) {

    if (
      !navigator.share
    ) {

      throw new Error(
        "Sharing not supported."
      );

    }

    const image =
      await this.renderPNG();

    const blob =
      await fetch(image)
        .then(r => r.blob());

    const file =
      new File(

        [blob],

        filename,

        {

          type:
            "image/png",

        }

      );

    await navigator.share({

      title:
        "THE CONCLUSION DAILY",

      text:
        "I earned a certificate on THE CONCLUSION DAILY.",

      files: [file],

    });

  }

}
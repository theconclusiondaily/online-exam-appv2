"use client";

import { ReactNode } from "react";

interface StudioLayoutProps {
  header: ReactNode;
  metadata: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
  options: ReactNode;
  explanation: ReactNode;
  validation: ReactNode;
  images: ReactNode;
}

export default function StudioLayout({
  header,
  metadata,
  editor,
  preview,
  options,
  explanation,
  validation,
  images,
}: StudioLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-[1800px] mx-auto px-6 py-6 space-y-6">

        {/* =======================================================
            HEADER
        ======================================================== */}

        {header}

        {/* =======================================================
            METADATA
        ======================================================== */}

        {metadata}

        {/* =======================================================
            QUESTION EDITOR + LIVE PREVIEW
        ======================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Question Editor */}

          <section className="lg:col-span-8">

            {editor}

          </section>

          {/* Live Preview */}

          <aside className="lg:col-span-4">

            <div className="sticky top-6">

              {preview}

            </div>

          </aside>

        </div>

        {/* =======================================================
            OPTIONS
        ======================================================== */}

        <section>

          {options}

        </section>

        {/* =======================================================
            EXPLANATION + VALIDATION
        ======================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left */}

          <div className="lg:col-span-8 space-y-6">

            {explanation}

            {images}

          </div>

          {/* Right */}

          <aside className="lg:col-span-4">

            <div className="sticky top-6">

              {validation}

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}
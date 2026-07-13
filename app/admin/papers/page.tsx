"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";

import { QuestionPaper } from "@/components/paper-builder/types";
import { getPapers } from "@/components/paper-builder/services/paperService";

import PaperStats from "@/components/paper-builder/PaperStats";
import PaperFilters from "@/components/paper-builder/PaperFilters";
import PaperTable from "@/components/paper-builder/PaperTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
export default function PaperListPage() {

  const [papers, setPapers] =
    useState<QuestionPaper[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [status, setStatus] =
    useState("");

  async function loadPapers() {

    try {

      setLoading(true);

      const data =
        await getPapers();

      setPapers(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadPapers();

  }, []);

  const filtered = papers.filter((paper) => {

    const matchesSearch =
      paper.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesSubject =
      !subject ||
      paper.subject === subject;

    const matchesStatus =
      !status ||
      paper.status === status;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesStatus
    );

  });

  return (

    <div className="p-8">
<AdminPageHeader
  title="Create Paper"
  description="Create and manage question papers."
/>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-[#0F3D91]">

            Question Papers

          </h1>

          <p className="text-slate-500 mt-2">

            Build reusable papers for exams

          </p>

        </div>

        <div className="flex gap-3">

          <button

            onClick={loadPapers}

            className="border rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-slate-50"

          >

            <RefreshCw size={18} />

            Refresh

          </button>

          <Link

            href="/admin/papers/new"

            className="bg-[#0F3D91] text-white rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-[#0C3278]"

          >

            <Plus size={18} />

            New Paper

          </Link>

        </div>

      </div>

      <PaperStats

        total={papers.length}

        drafts={
          papers.filter(
            p => p.status === "Draft"
          ).length
        }

        published={
          papers.filter(
            p => p.status === "Published"
          ).length
        }

        archived={
          papers.filter(
            p => p.status === "Archived"
          ).length
        }

      />

      <PaperFilters

        search={search}
        setSearch={setSearch}

        subject={subject}
        setSubject={setSubject}

        status={status}
        setStatus={setStatus}

      />

      <PaperTable

        papers={filtered}

        loading={loading}

      />

    </div>

  );

}
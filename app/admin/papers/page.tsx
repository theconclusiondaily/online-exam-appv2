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
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
  <div>
    <h1 className="text-2xl font-bold">
      Question Papers.....
    </h1>

    <p className="text-gray-500 mt-1">
      Create, manage and organize reusable question papers.
    </p>
  </div>

  <div className="flex flex-wrap gap-3">
    <Link
      href="/admin"
      className="bg-white border px-4 py-2 rounded-xl"
    >
      Dashboard
    </Link>

    <Link
      href="/admin/papers/new"
      className="bg-black text-white px-5 py-2 rounded-xl font-semibold"
    >
      + Create Paper
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
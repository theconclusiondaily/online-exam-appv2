"use client";

import {
  useEffect,
  useState,
} from "react";

import { getPublishedPapers }
from "../services/getPublishedPapers";
import { QuestionPaper } from "../types";
export function usePublishedPapers() {

 const [papers, setPapers] =
  useState<QuestionPaper[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    try {

      const data =
        await getPublishedPapers();

      setPapers(data);

    } finally {

      setLoading(false);

    }

  }

  return {

    loading,

    papers,

  };

}
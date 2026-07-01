"use client";

import { useEffect } from "react";
import { getPaper } from "../services/getPaper";

export function useLoadPaper(
  paperId: string,
  loadPaper: (paper: any, questions: any[]) => void
) {

  useEffect(() => {

    if (!paperId) return;

    async function load() {

      try {

        const data =
          await getPaper(paperId);

        loadPaper(
          data.paper,
          data.questions
        );

      } catch (err) {

        console.error(err);

      }

    }

    load();

  }, [paperId]);

}
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import {
  getQuestion,
} from "../services/questionService";

export function useLoadQuestion(
  loadQuestion: (q: any) => void
) {

  const params = useParams();

  useEffect(() => {

    async function load() {

      if (!params.id) return;

      try {

        const question =
          await getQuestion(
            params.id as string
          );

        loadQuestion(question);

      } catch (err) {

        console.error(err);

      }

    }

    load();

  }, [params.id, loadQuestion]);

}
import { useEffect, useState } from "react";
import { getExams } from "@/components/exam-builder/services/getExams";

export function useExams() {

  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<any[]>([]);

  async function load() {
    try {
      setLoading(true);

      const data = await getExams();

      setExams(data);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    exams,
    loading,
    reload: load,
  };

}
"use client";

import { useEffect } from "react";

export default function SetCertificateTitle({
  studentName,
  examTitle,
  issuedDate,
}: {
  studentName: string;
  examTitle: string;
  issuedDate: string;
}) {
  useEffect(() => {
    document.title =
      `${studentName} - ${examTitle} - TCD Certificate - ${issuedDate}`;
  }, [
    studentName,
    examTitle,
    issuedDate,
  ]);

  return null;
}
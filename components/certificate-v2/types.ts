// ======================================================
// THE CONCLUSION DAILY
// Certificate System V2
// Shared Types
// ======================================================

export type PrestigeLevel =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Diamond"
  | "Legend";

export interface CertificateData {
  // Certificate
  id: string;
  certificateNumber: string;
  issuedAt: string;

  // Student
  studentId: string;
  studentName: string;
  prestige: PrestigeLevel;

  // Exam
  examId: string;
  examTitle: string;

  // Performance
  score: number;
  percentage: number;
  rank: number;

  // Verification
  qrCode: string;
}

export interface ExportOptions {
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
}

export interface CertificateTheme {
  primary: string;
  secondary: string;
  gold: string;
  background: string;
}

export const TCD_THEME: CertificateTheme = {
  primary: "#243B6B",
  secondary: "#1A2E57",
  gold: "#D4AF37",
  background: "#243B6B",
};
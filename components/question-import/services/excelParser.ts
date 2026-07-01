import * as XLSX from "xlsx";

export interface ParsedExcel {
  columns: string[];
  rows: any[];
}

export async function parseExcel(
  file: File
): Promise<ParsedExcel> {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
  });

  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("No worksheet found.");
  }

  const worksheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
  });

  const columns =
    rows.length > 0
      ? Object.keys(rows[0] as object)
      : [];

  return {
    columns,
    rows,
  };
}
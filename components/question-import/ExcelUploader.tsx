"use client";

import { useState } from "react";

import UploadBox from "./UploadBox";
import TemplateValidation from "./TemplateValidation";
import RowValidation from "./RowValidation";
import DuplicateDetection from "./DuplicateDetection";
import ImportPreview from "./ImportPreview";
import ImportFooter from "./ImportFooter";

import { parseExcel } from "./services/excelParser";
import { validateSchema } from "./services/schemaValidator";
import { validateRows } from "./services/rowValidator";
import { checkDuplicates } from "./services/duplicateChecker";
import { importQuestions } from "./services/importQuestions";

export default function ExcelUploader() {

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [importing, setImporting] = useState(false);

  const [rows, setRows] = useState<any[]>([]);

  const [schema, setSchema] = useState<any>(null);

  const [validation, setValidation] = useState<any[]>([]);

  const [duplicates, setDuplicates] = useState<any[]>([]);

  const [selectedRows, setSelectedRows] =
    useState<number[]>([]);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const selected = e.target.files?.[0];

    if (!selected) return;

    try {

      setLoading(true);

      setFile(selected);

      const parsed =
        await parseExcel(selected);

      setRows(parsed.rows);

      setSelectedRows(
        parsed.rows.map((_, i) => i)
      );

      setSchema(
        validateSchema(parsed.columns)
      );

      setValidation(
        validateRows(parsed.rows)
      );

      setDuplicates(
        await checkDuplicates(parsed.rows)
      );

    } catch (err) {

      console.error(err);

      alert("Unable to read Excel.");

    } finally {

      setLoading(false);

    }

  }

  function toggleRow(index:number){

    setSelectedRows(previous=>

      previous.includes(index)

      ? previous.filter(i=>i!==index)

      : [...previous,index]

    );

  }

  async function handleImport(){

    try{

      setImporting(true);

      const filteredRows =
        rows.filter((_,index)=>
          selectedRows.includes(index)
        );

      const count =
await importQuestions(
filteredRows
);

alert(
`${count} Questions Imported Successfully`
);

      alert("Questions Imported Successfully");

    }catch(err){

      console.error(err);

      alert("Import Failed");

    }finally{

      setImporting(false);

    }

  }

  return (

    <div className="space-y-8">

      <UploadBox
        loading={loading}
        file={file}
        onSelect={handleUpload}
      />

      <TemplateValidation
        schema={schema}
      />

      <RowValidation
        results={validation}
      />

      <DuplicateDetection
        duplicates={duplicates}
      />

      <ImportPreview
        rows={rows}
        selectedRows={selectedRows}
        toggleRow={toggleRow}
      />

      <ImportFooter
        total={rows.length}
        selected={selectedRows.length}
        importing={importing}
        onImport={handleImport}
      />

    </div>

  );

}
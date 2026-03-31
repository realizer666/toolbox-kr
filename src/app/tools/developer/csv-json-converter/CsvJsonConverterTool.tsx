"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

function csvToJson(csv: string): string {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return "[]";
  const headers = lines[0].split(",").map((h) => h.trim());
  const result = lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] ?? "";
    });
    return obj;
  });
  return JSON.stringify(result, null, 2);
}

function jsonToCsv(json: string): string {
  const arr = JSON.parse(json);
  if (!Array.isArray(arr) || arr.length === 0) return "";
  const headers = Object.keys(arr[0]);
  const rows = arr.map((obj: Record<string, unknown>) =>
    headers.map((h) => String(obj[h] ?? "")).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export function CsvJsonConverterTool() {
  const [mode, setMode] = useState<"csv-to-json" | "json-to-csv">("csv-to-json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      if (mode === "csv-to-json") {
        setOutput(csvToJson(input));
      } else {
        setOutput(jsonToCsv(input));
      }
    } catch {
      setError(mode === "csv-to-json" ? "유효하지 않은 CSV 형식입니다." : "유효하지 않은 JSON 형식입니다.");
      setOutput("");
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("csv-to-json"); setOutput(""); setError(""); }}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "csv-to-json" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}
        >
          CSV → JSON
        </button>
        <button
          onClick={() => { setMode("json-to-csv"); setOutput(""); setError(""); }}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "json-to-csv" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}
        >
          JSON → CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            {mode === "csv-to-json" ? "CSV" : "JSON"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "csv-to-json" ? "name,age,city\n홍길동,30,서울\n김철수,25,부산" : '[{"name":"홍길동","age":"30","city":"서울"}]'}
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">결과</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface-muted text-text font-mono text-sm resize-y"
          />
          <div className="mt-2"><CopyButton text={output} /></div>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}

      <button
        onClick={handleConvert}
        className="mt-4 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        변환
      </button>
    </div>
  );
}

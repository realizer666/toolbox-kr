"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={format} className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
          포맷 (정렬)
        </button>
        <button onClick={minify} className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-surface-muted transition-colors">
          압축 (Minify)
        </button>
        <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="px-3 py-2 text-sm border border-border rounded-lg bg-surface">
          <option value={2}>들여쓰기: 2칸</option>
          <option value={4}>들여쓰기: 4칸</option>
          <option value={1}>들여쓰기: 탭</option>
        </select>
        <CopyButton text={input} />
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          JSON 오류: {error}
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setError(""); }}
        placeholder='{"key": "value"} 형태의 JSON을 입력하세요...'
        className="w-full h-80 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
  );
}

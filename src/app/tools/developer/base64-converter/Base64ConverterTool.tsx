"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function Base64ConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(mode === "encode" ? "인코딩할 수 없는 텍스트입니다." : "유효하지 않은 Base64 문자열입니다.");
      setOutput("");
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("encode")} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "encode" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}>
          인코딩
        </button>
        <button onClick={() => setMode("decode")} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "decode" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}>
          디코딩
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">{mode === "encode" ? "텍스트" : "Base64"}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "인코딩할 텍스트를 입력하세요..." : "디코딩할 Base64 문자열을 입력하세요..."} className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">결과</label>
          <textarea value={output} readOnly className="w-full h-48 p-4 border border-border rounded-lg bg-surface-muted text-text font-mono text-sm resize-y" />
          <div className="mt-2"><CopyButton text={output} /></div>
        </div>
      </div>

      {error && <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

      <button onClick={handleConvert} className="mt-4 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
        {mode === "encode" ? "인코딩" : "디코딩"} 변환
      </button>
    </div>
  );
}

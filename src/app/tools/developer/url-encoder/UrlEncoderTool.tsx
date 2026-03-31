"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = input
    ? mode === "encode"
      ? encodeURIComponent(input)
      : (() => { try { return decodeURIComponent(input); } catch { return "유효하지 않은 URL 인코딩입니다."; } })()
    : "";

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
          <label className="block text-sm font-medium text-text mb-2">입력</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "인코딩할 URL 또는 텍스트를 입력하세요..." : "디코딩할 URL을 입력하세요..."} className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">결과</label>
          <textarea value={output} readOnly className="w-full h-48 p-4 border border-border rounded-lg bg-surface-muted text-text font-mono text-sm resize-y" />
          <div className="mt-2"><CopyButton text={output} /></div>
        </div>
      </div>
    </div>
  );
}

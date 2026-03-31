"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

function encodeHtmlEntities(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

export function HtmlEntityTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  function handleConvert() {
    if (mode === "encode") {
      setOutput(encodeHtmlEntities(input));
    } else {
      setOutput(decodeHtmlEntities(input));
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("encode")}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "encode" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}
        >
          인코딩
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "decode" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}
        >
          디코딩
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            {mode === "encode" ? "HTML 텍스트" : "HTML 엔티티"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "인코딩할 HTML을 입력하세요..." : "디코딩할 HTML 엔티티를 입력하세요..."}
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

      <button
        onClick={handleConvert}
        className="mt-4 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        {mode === "encode" ? "인코딩" : "디코딩"} 변환
      </button>
    </div>
  );
}

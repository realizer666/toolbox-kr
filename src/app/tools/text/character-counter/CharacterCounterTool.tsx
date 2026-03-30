"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";
import { formatNumber } from "@/lib/utils";

interface Stats {
  total: number;
  withoutSpaces: number;
  words: number;
  sentences: number;
  lines: number;
  paragraphs: number;
  bytes: number;
}

function countStats(text: string): Stats {
  if (!text) {
    return {
      total: 0,
      withoutSpaces: 0,
      words: 0,
      sentences: 0,
      lines: 0,
      paragraphs: 0,
      bytes: 0,
    };
  }

  const total = text.length;
  const withoutSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim()
    ? (text.match(/[.!?。]+/g) || []).length || (text.trim() ? 1 : 0)
    : 0;
  const lines = text.split("\n").length;
  const paragraphs = text.trim()
    ? text.split(/\n\s*\n/).filter((p) => p.trim()).length
    : 0;
  const bytes = new TextEncoder().encode(text).length;

  return { total, withoutSpaces, words, sentences, lines, paragraphs, bytes };
}

export function CharacterCounterTool() {
  const [text, setText] = useState("");
  const stats = countStats(text);

  const statItems = [
    { label: "전체 글자수", value: stats.total },
    { label: "공백 제외", value: stats.withoutSpaces },
    { label: "단어수", value: stats.words },
    { label: "문장수", value: stats.sentences },
    { label: "줄수", value: stats.lines },
    { label: "문단수", value: stats.paragraphs },
    { label: "바이트(UTF-8)", value: stats.bytes },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-surface-muted rounded-lg p-3 text-center border border-border"
          >
            <div className="text-2xl font-bold text-primary-600">
              {formatNumber(item.value)}
            </div>
            <div className="text-xs text-text-muted mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 텍스트를 입력하세요..."
          className="w-full h-64 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <div className="flex gap-2 mt-3">
          <CopyButton text={text} />
          <button
            onClick={() => setText("")}
            className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-surface-muted transition-colors"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}

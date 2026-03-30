"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

type ConvertMode =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "add-spaces"
  | "remove-spaces"
  | "newline-to-comma"
  | "comma-to-newline"
  | "reverse";

const modes: { id: ConvertMode; label: string }[] = [
  { id: "uppercase", label: "대문자" },
  { id: "lowercase", label: "소문자" },
  { id: "titlecase", label: "첫 글자 대문자" },
  { id: "add-spaces", label: "글자 사이 띄어쓰기" },
  { id: "remove-spaces", label: "공백 제거" },
  { id: "newline-to-comma", label: "줄바꿈 → 쉼표" },
  { id: "comma-to-newline", label: "쉼표 → 줄바꿈" },
  { id: "reverse", label: "역순" },
];

function convert(text: string, mode: ConvertMode): string {
  switch (mode) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "titlecase":
      return text.replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      );
    case "add-spaces":
      return text
        .split("")
        .filter((c) => c !== " ")
        .join(" ");
    case "remove-spaces":
      return text.replace(/\s+/g, "");
    case "newline-to-comma":
      return text
        .split("\n")
        .filter((line) => line.trim())
        .join(", ");
    case "comma-to-newline":
      return text.split(",").map((s) => s.trim()).join("\n");
    case "reverse":
      return [...text].reverse().join("");
  }
}

export function TextConverterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ConvertMode>("uppercase");

  const output = input ? convert(input, mode) : "";

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              mode === m.id
                ? "bg-primary-600 text-white border-primary-600"
                : "border-border hover:bg-surface-muted"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            입력
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="변환할 텍스트를 입력하세요..."
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            결과
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface-muted text-text resize-y"
          />
          <div className="flex gap-2 mt-2">
            <CopyButton text={output} />
          </div>
        </div>
      </div>
    </div>
  );
}

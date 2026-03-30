"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

type RemoveMode = "replace-with-space" | "remove-all" | "remove-consecutive";

const modeOptions: { id: RemoveMode; label: string; description: string }[] = [
  {
    id: "replace-with-space",
    label: "공백으로 대체",
    description: "줄바꿈을 공백으로 변환",
  },
  {
    id: "remove-all",
    label: "완전 제거",
    description: "줄바꿈을 모두 제거",
  },
  {
    id: "remove-consecutive",
    label: "연속 빈 줄만 제거",
    description: "연속된 빈 줄을 하나로 합침",
  },
];

function processText(text: string, mode: RemoveMode): string {
  switch (mode) {
    case "replace-with-space":
      return text.replace(/\n/g, " ").replace(/ +/g, " ");
    case "remove-all":
      return text.replace(/\n/g, "");
    case "remove-consecutive":
      return text.replace(/\n{3,}/g, "\n\n");
  }
}

export function LineBreakRemoverTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<RemoveMode>("replace-with-space");

  const output = input ? processText(input, mode) : "";

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        {modeOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMode(opt.id)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              mode === opt.id
                ? "bg-primary-600 text-white border-primary-600"
                : "border-border hover:bg-surface-muted"
            }`}
            title={opt.description}
          >
            {opt.label}
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
            placeholder="줄바꿈을 제거할 텍스트를 입력하세요..."
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

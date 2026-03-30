"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";
import { formatNumber } from "@/lib/utils";

export function DuplicateLineRemoverTool() {
  const [input, setInput] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(false);

  function process(text: string): { output: string; removed: number } {
    if (!text.trim()) return { output: "", removed: 0 };

    let lines = text.split("\n");
    const originalCount = lines.length;

    if (removeEmpty) {
      lines = lines.filter((line) => line.trim() !== "");
    }

    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      let key = line;
      if (trimWhitespace) key = key.trim();
      if (ignoreCase) key = key.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    return {
      output: result.join("\n"),
      removed: originalCount - result.length,
    };
  }

  const { output, removed } = process(input);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded"
          />
          대소문자 무시
        </label>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="rounded"
          />
          앞뒤 공백 무시
        </label>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="rounded"
          />
          빈 줄 제거
        </label>
      </div>

      {input && (
        <div className="flex gap-4 mb-4 text-sm">
          <span className="text-text-muted">
            제거된 줄: <strong className="text-primary-600">{formatNumber(removed)}</strong>
          </span>
          <span className="text-text-muted">
            남은 줄: <strong className="text-text">{formatNumber(output.split("\n").length)}</strong>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            입력
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="중복을 제거할 텍스트를 입력하세요..."
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

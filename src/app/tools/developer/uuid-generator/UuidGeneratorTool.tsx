"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

export function UuidGeneratorTool() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  function handleGenerate() {
    const c = Math.min(50, Math.max(1, count));
    const result: string[] = [];
    for (let i = 0; i < c; i++) {
      result.push(crypto.randomUUID());
    }
    setUuids(result);
  }

  const allText = uuids.join("\n");

  return (
    <div>
      <div className="flex items-end gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">생성 개수 (1~50)</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-border rounded-lg bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          UUID 생성
        </button>
      </div>

      {uuids.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-text mb-2">결과</label>
          <div className="p-4 border border-border rounded-lg bg-surface-muted font-mono text-sm text-text space-y-1 max-h-96 overflow-y-auto">
            {uuids.map((uuid, i) => (
              <div key={i}>{uuid}</div>
            ))}
          </div>
          <div className="mt-2"><CopyButton text={allText} /></div>
        </div>
      )}
    </div>
  );
}

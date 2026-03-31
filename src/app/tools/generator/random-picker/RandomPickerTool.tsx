"use client";

import { useState } from "react";

function pickRandomNumbers(min: number, max: number, count: number): number[] {
  if (max - min + 1 < count) count = max - min + 1;
  const results = new Set<number>();
  while (results.size < count) {
    results.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(results).sort((a, b) => a - b);
}

function pickRandomItems(items: string[], count: number): string[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, items.length));
}

export function RandomPickerTool() {
  const [mode, setMode] = useState<"number" | "item">("number");

  // Number mode
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("45");
  const [numCount, setNumCount] = useState("6");
  const [numberResults, setNumberResults] = useState<number[]>([]);

  // Item mode
  const [itemsText, setItemsText] = useState("");
  const [itemCount, setItemCount] = useState("1");
  const [itemResults, setItemResults] = useState<string[]>([]);

  const handlePickNumbers = () => {
    const mn = Number(min);
    const mx = Number(max);
    const c = Number(numCount);
    if (mn >= mx || c <= 0) return;
    setNumberResults(pickRandomNumbers(mn, mx, c));
  };

  const handlePickItems = () => {
    const items = itemsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const c = Number(itemCount);
    if (items.length === 0 || c <= 0) return;
    setItemResults(pickRandomItems(items, c));
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[
          { key: "number" as const, label: "숫자 뽑기" },
          { key: "item" as const, label: "항목 뽑기" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? "bg-primary-600 text-white"
                : "border border-border hover:bg-surface-muted text-text"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "number" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text mb-1">최소값</label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">최대값</label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">뽑기 개수</label>
              <input
                type="number"
                value={numCount}
                onChange={(e) => setNumCount(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={handlePickNumbers}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              뽑기
            </button>
          </div>

          <div>
            {numberResults.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-surface-muted rounded-lg p-6 border border-border text-center">
                  <div className="text-sm text-text-muted mb-3">결과</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {numberResults.map((n, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-600 text-white text-xl font-bold"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handlePickNumbers}
                  className="w-full px-4 py-2 border border-border rounded-lg hover:bg-surface-muted transition-colors text-sm font-medium text-text"
                >
                  다시 뽑기
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-text-muted text-sm">
                범위와 개수를 설정하고 뽑기를 눌러주세요.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">항목 입력 (줄바꿈으로 구분)</label>
              <textarea
                value={itemsText}
                onChange={(e) => setItemsText(e.target.value)}
                rows={8}
                placeholder={"짜장면\n짬뽕\n볶음밥\n탕수육"}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">뽑기 개수</label>
              <input
                type="number"
                value={itemCount}
                onChange={(e) => setItemCount(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={handlePickItems}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              뽑기
            </button>
          </div>

          <div>
            {itemResults.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-surface-muted rounded-lg p-6 border border-border text-center">
                  <div className="text-sm text-text-muted mb-3">결과</div>
                  <div className="space-y-2">
                    {itemResults.map((item, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 rounded-lg bg-primary-600 text-white text-lg font-bold"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handlePickItems}
                  className="w-full px-4 py-2 border border-border rounded-lg hover:bg-surface-muted transition-colors text-sm font-medium text-text"
                >
                  다시 뽑기
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-text-muted text-sm">
                항목을 입력하고 뽑기를 눌러주세요.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

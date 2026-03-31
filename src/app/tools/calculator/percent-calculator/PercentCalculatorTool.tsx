"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/utils";

type CalcMode = "of" | "is-what" | "change" | "discount";

const modes: { id: CalcMode; label: string; description: string }[] = [
  { id: "of", label: "A의 B%", description: "A의 B%는 얼마?" },
  { id: "is-what", label: "A는 B의 몇%", description: "A는 B의 몇 %?" },
  { id: "change", label: "증감률", description: "A에서 B로의 증감률" },
  { id: "discount", label: "할인 계산", description: "원가에서 할인율 적용" },
];

export function PercentCalculatorTool() {
  const [mode, setMode] = useState<CalcMode>("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  function calculate(): string {
    const numA = Number(a);
    const numB = Number(b);
    if (!a || !b || isNaN(numA) || isNaN(numB)) return "";

    switch (mode) {
      case "of":
        return `${formatNumber(numA)}의 ${numB}% = ${formatNumber(Math.round((numA * numB / 100) * 100) / 100)}`;
      case "is-what":
        return numB === 0 ? "0으로 나눌 수 없습니다" : `${formatNumber(numA)}은(는) ${formatNumber(numB)}의 ${(numA / numB * 100).toFixed(2)}%`;
      case "change":
        return numA === 0 ? "0에서의 변화율은 계산할 수 없습니다" : `${formatNumber(numA)} → ${formatNumber(numB)}: ${((numB - numA) / numA * 100).toFixed(2)}% ${numB >= numA ? "증가" : "감소"}`;
      case "discount":
        const discounted = numA * (1 - numB / 100);
        const saved = numA - discounted;
        return `원가 ${formatNumber(numA)}원, ${numB}% 할인 → ${formatNumber(Math.round(discounted))}원 (${formatNumber(Math.round(saved))}원 절약)`;
    }
  }

  function getLabels(): { labelA: string; labelB: string; placeholderA: string; placeholderB: string } {
    switch (mode) {
      case "of": return { labelA: "숫자 (A)", labelB: "퍼센트 (B%)", placeholderA: "예: 50000", placeholderB: "예: 15" };
      case "is-what": return { labelA: "비교 값 (A)", labelB: "기준 값 (B)", placeholderA: "예: 30", placeholderB: "예: 200" };
      case "change": return { labelA: "이전 값 (A)", labelB: "이후 값 (B)", placeholderA: "예: 1000", placeholderB: "예: 1500" };
      case "discount": return { labelA: "원가 (원)", labelB: "할인율 (%)", placeholderA: "예: 50000", placeholderB: "예: 30" };
    }
  }

  const labels = getLabels();
  const result = calculate();

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setA(""); setB(""); }}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === m.id ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-text-muted mb-4">{modes.find((m) => m.id === mode)?.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-text mb-1">{labels.labelA}</label>
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder={labels.placeholderA} className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">{labels.labelB}</label>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder={labels.placeholderB} className="w-full px-4 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>

      {result && (
        <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg">
          <div className="text-lg font-bold text-primary-600">{result}</div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

interface Correction {
  original: string;
  revised: string;
  suggestions: string[]; // TYPO일 때 여러 후보
  reason: string;
  category: string;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  SPACING: { label: "↔️ 띄어쓰기", color: "bg-blue-50 border-blue-200" },
  TYPO: { label: "🔤 오타 추천", color: "bg-yellow-50 border-yellow-200" },
  SPELLING: { label: "✏️ 맞춤법", color: "bg-red-50 border-red-200" },
  GRAMMAR: { label: "📝 문법", color: "bg-purple-50 border-purple-200" },
  STYLE: { label: "💬 문체", color: "bg-green-50 border-green-200" },
  PUNCTUATION: { label: "❗ 문장부호", color: "bg-orange-50 border-orange-200" },
};

export function SpellingCheckerTool() {
  const [input, setInput] = useState("");
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setChecked(false);

    try {
      const res = await fetch("/api/spelling-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "오류가 발생했습니다.");
        setLoading(false);
        return;
      }

      const found: Correction[] = [];
      const helps = data.helps || {};

      if (data.revisedBlocks) {
        for (const block of data.revisedBlocks) {
          const original = block.origin?.content || "";
          const revisions = block.revisions || [];

          if (!original || revisions.length === 0) continue;

          const category = revisions[0]?.category || "SPELLING";
          const helpId = revisions[0]?.helpId || "";
          const helpInfo = helps[helpId];
          const reason = helpInfo?.comment || "";

          if (category === "TYPO") {
            // TYPO: 여러 후보를 모두 보여줌
            const suggestions = revisions
              .map((r: { revised: string }) => r.revised)
              .filter((s: string) => s !== original);

            if (suggestions.length > 0) {
              found.push({
                original,
                revised: suggestions[0],
                suggestions,
                reason: reason || "출현이 가능한 유사한 단어를 추천합니다. 아래에서 올바른 단어를 선택하세요.",
                category,
              });
            }
          } else {
            // SPACING, SPELLING 등: 확정 교정
            const revised = block.revised || "";
            if (revised && revised !== original) {
              found.push({
                original,
                revised,
                suggestions: [revised],
                reason: reason || CATEGORY_LABELS[category]?.label || "맞춤법 교정",
                category,
              });
            }
          }
        }
      }

      setCorrections(found);
      setChecked(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  function applyCorrection(original: string, replacement: string) {
    setInput((prev) => prev.replace(original, replacement));
    setCorrections((prev) => prev.filter((c) => c.original !== original));
  }

  function applyAllSpacing() {
    let fixed = input;
    for (const corr of corrections) {
      if (corr.category === "SPACING") {
        fixed = fixed.replace(corr.original, corr.revised);
      }
    }
    setInput(fixed);
    setCorrections((prev) => prev.filter((c) => c.category !== "SPACING"));
  }

  const spacingCount = corrections.filter((c) => c.category === "SPACING").length;
  const typoCount = corrections.filter((c) => c.category === "TYPO").length;
  const otherCount = corrections.filter((c) => c.category !== "SPACING" && c.category !== "TYPO").length;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setChecked(false); setError(""); }}
        placeholder="맞춤법을 검사할 텍스트를 입력하세요... (최대 5,000자)"
        className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />

      <div className="flex items-center gap-2 mt-1 mb-3">
        <span className="text-xs text-text-muted">{input.length}/5,000자</span>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleCheck}
          disabled={!input.trim() || loading}
          className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? "검사 중..." : "검사하기"}
        </button>
        {spacingCount > 0 && (
          <button
            onClick={applyAllSpacing}
            className="px-4 py-2 text-sm rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
          >
            띄어쓰기 일괄 교정
          </button>
        )}
        <CopyButton text={input} />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
          {error}
        </div>
      )}

      {checked && (
        <div className="mt-4">
          {corrections.length === 0 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              맞춤법 오류가 발견되지 않았습니다.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-3 text-sm">
                <span className="text-text font-medium">{corrections.length}개 발견</span>
                {spacingCount > 0 && <span className="text-blue-600">띄어쓰기 {spacingCount}</span>}
                {typoCount > 0 && <span className="text-yellow-700">오타 추천 {typoCount}</span>}
                {otherCount > 0 && <span className="text-red-600">맞춤법 {otherCount}</span>}
              </div>

              <div className="space-y-3">
                {corrections.map((corr, i) => {
                  const style = CATEGORY_LABELS[corr.category] || { label: "교정", color: "bg-red-50 border-red-200" };

                  return (
                    <div key={i} className={`p-4 border rounded-lg ${style.color}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white border border-current">
                          {style.label}
                        </span>
                        <span className="line-through text-red-600 text-sm">{corr.original}</span>
                      </div>

                      {corr.category === "TYPO" && corr.suggestions.length > 1 ? (
                        // TYPO: 여러 후보 표시 → 클릭해서 선택
                        <div>
                          <p className="text-xs text-text-muted mb-2">{corr.reason}</p>
                          <div className="flex flex-wrap gap-2">
                            {corr.suggestions.map((s, j) => (
                              <button
                                key={j}
                                onClick={() => applyCorrection(corr.original, s)}
                                className="px-3 py-1.5 text-sm rounded-lg border border-border bg-white hover:bg-green-50 hover:border-green-400 transition-colors"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        // SPACING 등: 확정 교정 → 클릭으로 적용
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-green-700 text-sm">{corr.revised}</span>
                            <p className="text-xs text-text-muted mt-1">{corr.reason}</p>
                          </div>
                          <button
                            onClick={() => applyCorrection(corr.original, corr.revised)}
                            className="px-3 py-1.5 text-xs rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                          >
                            적용
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          바른 AI 맞춤법 검사 엔진을 사용합니다.
          띄어쓰기는 자동 교정, 오타는 여러 후보 중 선택할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

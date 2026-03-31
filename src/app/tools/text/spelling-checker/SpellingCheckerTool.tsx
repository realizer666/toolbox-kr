"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

interface Correction {
  original: string;
  revised: string;
  suggestions: string[];
  reason: string;
  category: string;
}

// ━━━ 로컬 규칙 (API가 못 잡는 것 보완) ━━━
const LOCAL_RULES: { pattern: RegExp; suggestion: string; reason: string; category: string }[] = [
  // 구어체 교정
  { pattern: /이라구/g, suggestion: "이라고", category: "구어체", reason: "'이라고'가 올바른 표현입니다" },
  { pattern: /라구요/g, suggestion: "라고요", category: "구어체", reason: "'라고요'가 올바른 표현입니다" },
  { pattern: /다구요/g, suggestion: "다고요", category: "구어체", reason: "'다고요'가 올바른 표현입니다" },
  { pattern: /한다구/g, suggestion: "한다고", category: "구어체", reason: "'한다고'가 올바른 표현입니다" },
  { pattern: /합니다요/g, suggestion: "합니다", category: "구어체", reason: "'합니다'가 올바른 종결어미입니다" },
  { pattern: /입니다요/g, suggestion: "입니다", category: "구어체", reason: "'입니다'가 올바른 종결어미입니다" },
  { pattern: /됩니다요/g, suggestion: "됩니다", category: "구어체", reason: "'됩니다'가 올바른 종결어미입니다" },
  { pattern: /저능요/g, suggestion: "저는요", category: "오타", reason: "'저는요'가 올바른 표현입니다" },
  { pattern: /저능/g, suggestion: "저는", category: "오타", reason: "'저는'이 올바른 표현입니다" },
  { pattern: /같애요/g, suggestion: "같아요", category: "구어체", reason: "'같아요'가 올바른 표현입니다" },
  { pattern: /같애/g, suggestion: "같아", category: "구어체", reason: "'같아'가 올바른 표현입니다" },
  { pattern: /뭐에요/g, suggestion: "뭐예요", category: "구어체", reason: "'뭐예요'가 올바른 표현입니다" },
  { pattern: /아니예요/g, suggestion: "아니에요", category: "구어체", reason: "'아니에요'가 올바른 표현입니다" },
  // 할게/할께
  { pattern: /할께/g, suggestion: "할게", category: "맞춤법", reason: "'할게'가 올바른 표현입니다" },
  { pattern: /갈께/g, suggestion: "갈게", category: "맞춤법", reason: "'갈게'가 올바른 표현입니다" },
  { pattern: /볼께/g, suggestion: "볼게", category: "맞춤법", reason: "'볼게'가 올바른 표현입니다" },
  { pattern: /할꺼/g, suggestion: "할 거", category: "맞춤법", reason: "'할 거'가 올바른 표현입니다" },
  { pattern: /갈꺼/g, suggestion: "갈 거", category: "맞춤법", reason: "'갈 거'가 올바른 표현입니다" },
  // 자주 틀리는 맞춤법
  { pattern: /몇일/g, suggestion: "며칠", category: "맞춤법", reason: "'며칠'이 올바른 표현입니다" },
  { pattern: /역활/g, suggestion: "역할", category: "맞춤법", reason: "'역할'이 올바른 표현입니다" },
  { pattern: /어짜피/g, suggestion: "어차피", category: "맞춤법", reason: "'어차피'가 올바른 표현입니다" },
  { pattern: /어쨋든/g, suggestion: "어쨌든", category: "맞춤법", reason: "'어쨌든'이 올바른 표현입니다" },
  { pattern: /희안/g, suggestion: "희한", category: "맞춤법", reason: "'희한'이 올바른 표현입니다" },
  { pattern: /구지/g, suggestion: "굳이", category: "맞춤법", reason: "'굳이'가 올바른 표현입니다" },
  { pattern: /댓가/g, suggestion: "대가", category: "맞춤법", reason: "'대가'가 올바른 표현입니다" },
  { pattern: /갯수/g, suggestion: "개수", category: "맞춤법", reason: "'개수'가 올바른 표현입니다" },
  { pattern: /금새/g, suggestion: "금세", category: "맞춤법", reason: "'금세'가 올바른 표현입니다" },
  { pattern: /이뻐/g, suggestion: "예뻐", category: "맞춤법", reason: "'예뻐'가 올바른 표현입니다" },
  { pattern: /왠지(?! 모르)/g, suggestion: "웬지", category: "맞춤법", reason: "'웬지'가 올바른 표현입니다" },
  { pattern: /왠일/g, suggestion: "웬일", category: "맞춤법", reason: "'웬일'이 올바른 표현입니다" },
  { pattern: /됬/g, suggestion: "됐", category: "맞춤법", reason: "'됐'이 올바른 표현입니다" },
  { pattern: /안되요/g, suggestion: "안 돼요", category: "맞춤법", reason: "'안 돼요'가 올바른 표현입니다" },
  // 띄어쓰기
  { pattern: /할수있/g, suggestion: "할 수 있", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다" },
  { pattern: /할수없/g, suggestion: "할 수 없", category: "띄어쓰기", reason: "의존명사 '수'는 띄어 씁니다" },
  { pattern: /할때/g, suggestion: "할 때", category: "띄어쓰기", reason: "의존명사 '때'는 띄어 씁니다" },
  { pattern: /해야될/g, suggestion: "해야 될", category: "띄어쓰기", reason: "보조 용언은 띄어 씁니다" },
  // 외래어
  { pattern: /메세지/g, suggestion: "메시지", category: "외래어", reason: "'메시지'가 올바른 표현입니다" },
  { pattern: /리더쉽/g, suggestion: "리더십", category: "외래어", reason: "'리더십'이 올바른 표현입니다" },
  { pattern: /악세사리/g, suggestion: "액세서리", category: "외래어", reason: "'액세서리'가 올바른 표현입니다" },
  // -시요/-시오
  { pattern: /하십시요/g, suggestion: "하십시오", category: "맞춤법", reason: "'하십시오'가 올바른 표현입니다" },
  // 낫다/낮다
  { pattern: /지능이 낫/g, suggestion: "지능이 낮", category: "맞춤법", reason: "높고 낮을 때는 '낮다'입니다" },
  { pattern: /성적이 낫/g, suggestion: "성적이 낮", category: "맞춤법", reason: "높고 낮을 때는 '낮다'입니다" },
];

const CATEGORY_STYLE: Record<string, { label: string; color: string }> = {
  "SPACING": { label: "↔️ 띄어쓰기", color: "bg-blue-50 border-blue-200" },
  "TYPO": { label: "🔤 오타 추천", color: "bg-yellow-50 border-yellow-200" },
  "GRAMMER": { label: "📝 문법", color: "bg-purple-50 border-purple-200" },
  "SPELLING": { label: "✏️ 맞춤법", color: "bg-red-50 border-red-200" },
  "구어체": { label: "💬 구어체", color: "bg-orange-50 border-orange-200" },
  "맞춤법": { label: "✏️ 맞춤법", color: "bg-red-50 border-red-200" },
  "띄어쓰기": { label: "↔️ 띄어쓰기", color: "bg-blue-50 border-blue-200" },
  "외래어": { label: "🌍 외래어", color: "bg-green-50 border-green-200" },
  "오타": { label: "🔤 오타", color: "bg-yellow-50 border-yellow-200" },
};

function runLocalRules(text: string): Correction[] {
  const errors: Correction[] = [];
  const seen = new Set<string>();
  for (const rule of LOCAL_RULES) {
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        if (match === rule.suggestion) continue;
        const key = `${match}->${rule.suggestion}`;
        if (seen.has(key)) continue;
        seen.add(key);
        errors.push({
          original: match,
          revised: rule.suggestion,
          suggestions: [rule.suggestion],
          reason: rule.reason,
          category: rule.category,
        });
      }
    }
  }
  return errors;
}

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
      // 1. 로컬 규칙 먼저 적용
      const localResults = runLocalRules(input);
      const localOriginals = new Set(localResults.map((r) => r.original));

      // 2. API 호출
      let apiResults: Correction[] = [];
      try {
        const res = await fetch("/api/spelling-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input }),
        });

        if (res.ok) {
          const data = await res.json();
          const helps = data.helps || {};

          if (data.revisedBlocks) {
            for (const block of data.revisedBlocks) {
              const original = block.origin?.content || "";
              const revisions = block.revisions || [];
              if (!original || revisions.length === 0) continue;

              // 로컬 규칙에서 이미 잡은 건 스킵
              if (localOriginals.has(original)) continue;

              const category = revisions[0]?.category || "SPELLING";
              const helpId = revisions[0]?.helpId || "";
              const helpInfo = helps[helpId];
              const reason = helpInfo?.comment || "";

              if (category === "TYPO") {
                const suggestions = revisions
                  .map((r: { revised: string }) => r.revised)
                  .filter((s: string) => s !== original);
                if (suggestions.length > 0) {
                  apiResults.push({
                    original,
                    revised: suggestions[0],
                    suggestions,
                    reason: reason || "유사한 단어를 추천합니다. 올바른 단어를 선택하세요.",
                    category,
                  });
                }
              } else {
                const revised = block.revised || "";
                if (revised && revised !== original) {
                  apiResults.push({
                    original,
                    revised,
                    suggestions: [revised],
                    reason: reason || "교정",
                    category,
                  });
                }
              }
            }
          }
        }
      } catch {
        // API 실패해도 로컬 규칙 결과는 보여줌
      }

      // 3. 로컬 + API 합치기 (로컬 우선)
      setCorrections([...localResults, ...apiResults]);
      setChecked(true);
    } catch {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  function applyCorrection(original: string, replacement: string) {
    setInput((prev) => prev.replace(original, replacement));
    setCorrections((prev) => prev.filter((c) => c.original !== original));
  }

  function applyAllAuto() {
    let fixed = input;
    const autoCategories = ["SPACING", "GRAMMER", "구어체", "맞춤법", "띄어쓰기", "외래어", "오타"];
    for (const corr of corrections) {
      if (autoCategories.includes(corr.category) && corr.category !== "TYPO") {
        fixed = fixed.replace(corr.original, corr.revised);
      }
    }
    setInput(fixed);
    setCorrections((prev) => prev.filter((c) => c.category === "TYPO"));
  }

  const autoCount = corrections.filter((c) => c.category !== "TYPO").length;
  const typoCount = corrections.filter((c) => c.category === "TYPO").length;

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

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleCheck}
          disabled={!input.trim() || loading}
          className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? "검사 중..." : "검사하기"}
        </button>
        {autoCount > 0 && (
          <button
            onClick={applyAllAuto}
            className="px-4 py-2 text-sm rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
          >
            확정 교정 일괄 적용 ({autoCount}개)
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
                {autoCount > 0 && <span className="text-blue-600">확정 교정 {autoCount}개</span>}
                {typoCount > 0 && <span className="text-yellow-700">오타 추천 {typoCount}개</span>}
              </div>

              <div className="space-y-3">
                {corrections.map((corr, i) => {
                  const style = CATEGORY_STYLE[corr.category] || { label: "교정", color: "bg-red-50 border-red-200" };

                  return (
                    <div key={i} className={`p-4 border rounded-lg ${style.color}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white border">
                          {style.label}
                        </span>
                        <span className="line-through text-red-600 text-sm">{corr.original}</span>
                      </div>

                      {corr.category === "TYPO" && corr.suggestions.length > 1 ? (
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
          바른 AI 맞춤법 검사 엔진 + 자체 규칙을 결합하여 검사합니다.
          확정 교정은 바로 적용, 오타 추천은 여러 후보 중 선택할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

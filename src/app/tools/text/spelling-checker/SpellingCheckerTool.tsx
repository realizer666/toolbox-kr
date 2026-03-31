"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

interface Correction {
  original: string;
  revised: string;
  reason: string;
}

export function SpellingCheckerTool() {
  const [input, setInput] = useState("");
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [correctedText, setCorrectedText] = useState("");
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

      // 바른 AI 응답 파싱
      const found: Correction[] = [];
      let fixed = input;

      if (data.revision?.sentences) {
        for (const sentence of data.revision.sentences) {
          if (sentence.corrections) {
            for (const corr of sentence.corrections) {
              const original = corr.original?.content || corr.original || "";
              const revised = corr.revised?.content || corr.revised || "";
              const reason = corr.reason || corr.help_message || corr.description || "맞춤법 교정";

              if (original && revised && original !== revised) {
                found.push({ original, revised, reason });
                fixed = fixed.replace(original, revised);
              }
            }
          }
        }
      }

      // 다른 응답 구조도 처리
      if (data.corrections) {
        for (const corr of data.corrections) {
          const original = corr.original?.content || corr.original || "";
          const revised = corr.revised?.content || corr.revised || "";
          const reason = corr.reason || corr.help_message || "맞춤법 교정";

          if (original && revised && original !== revised) {
            found.push({ original, revised, reason });
            fixed = fixed.replace(original, revised);
          }
        }
      }

      setCorrections(found);
      setCorrectedText(fixed);
      setChecked(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  function handleApplyFix() {
    setInput(correctedText);
    setCorrections([]);
    setChecked(false);
  }

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
        {corrections.length > 0 && (
          <button
            onClick={handleApplyFix}
            className="px-4 py-2 text-sm rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
          >
            자동 교정
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
              <p className="text-sm font-medium text-text">
                {corrections.length}개의 교정 사항이 발견되었습니다.
              </p>

              {/* 교정 결과 전체 텍스트 */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">교정된 텍스트</span>
                  <CopyButton text={correctedText} />
                </div>
                <p className="text-sm text-blue-900 whitespace-pre-wrap">{correctedText}</p>
              </div>

              {/* 개별 교정 사항 */}
              <div className="space-y-2">
                {corrections.map((corr, i) => (
                  <div key={i} className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-red-600">{corr.original}</span>
                      <span className="text-text-muted">→</span>
                      <span className="font-semibold text-green-700">{corr.revised}</span>
                    </div>
                    <p className="text-text-muted text-xs">{corr.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          바른 AI 맞춤법 검사 엔진을 사용합니다.
          띄어쓰기, 맞춤법, 표준어, 외래어 표기법 등을 정밀하게 검사합니다.
        </p>
      </div>
    </div>
  );
}

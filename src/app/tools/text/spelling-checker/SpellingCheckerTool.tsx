"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

interface SpellingError {
  original: string;
  suggestion: string;
  reason: string;
}

const SPELLING_RULES: { pattern: RegExp; suggestion: string; reason: string }[] = [
  { pattern: /됬/g, suggestion: "됐", reason: "'되었'의 준말은 '됐'입니다" },
  { pattern: /않될/g, suggestion: "안 될", reason: "'안 될'이 올바른 표현입니다" },
  { pattern: /안됩니다/g, suggestion: "안 됩니다", reason: "'안'과 '됩니다'는 띄어 씁니다" },
  { pattern: /왠지/g, suggestion: "웬지", reason: "'웬지'가 올바른 표현입니다 (단, '왠지 모르게'는 '왠지')" },
  { pattern: /몇일/g, suggestion: "며칠", reason: "'며칠'이 올바른 표현입니다" },
  { pattern: /금새/g, suggestion: "금세", reason: "'금시에'의 준말은 '금세'입니다" },
  { pattern: /어의없/g, suggestion: "어이없", reason: "'어이없다'가 올바른 표현입니다" },
  { pattern: /어의가 없/g, suggestion: "어이가 없", reason: "'어이가 없다'가 올바른 표현입니다" },
  { pattern: /틀리다(?=.*다른)/g, suggestion: "다르다", reason: "'다르다'와 '틀리다'는 다른 의미입니다" },
  { pattern: /오랫만/g, suggestion: "오랜만", reason: "'오랜만'이 올바른 표현입니다" },
  { pattern: /오랫동안/g, suggestion: "오랫동안", reason: "사이시옷 표기가 올바릅니다" },
  { pattern: /일일히/g, suggestion: "일일이", reason: "'일일이'가 올바른 표현입니다" },
  { pattern: /곰곰히/g, suggestion: "곰곰이", reason: "'곰곰이'가 올바른 표현입니다" },
  { pattern: /깨끗히/g, suggestion: "깨끗이", reason: "'깨끗이'가 올바른 표현입니다" },
  { pattern: /댓가/g, suggestion: "대가", reason: "'대가'가 올바른 표현입니다" },
  { pattern: /갯수/g, suggestion: "개수", reason: "'개수'가 올바른 표현입니다" },
  { pattern: /야기하다/g, suggestion: "야기하다", reason: "올바른 표현입니다" },
  { pattern: /뵈요/g, suggestion: "봬요", reason: "'뵈어요'의 준말은 '봬요'입니다" },
  { pattern: /할께/g, suggestion: "할게", reason: "'할게'가 올바른 표현입니다" },
  { pattern: /할꺼/g, suggestion: "할 거", reason: "'할 거'가 올바른 표현입니다" },
  { pattern: /해야될/g, suggestion: "해야 될", reason: "'해야 될'로 띄어 씁니다" },
  { pattern: /그리겠죠/g, suggestion: "그러겠죠", reason: "'그러겠죠'가 올바른 표현입니다" },
  { pattern: /어쨋든/g, suggestion: "어쨌든", reason: "'어쨌든'이 올바른 표현입니다" },
  { pattern: /어짜피/g, suggestion: "어차피", reason: "'어차피'가 올바른 표현입니다" },
  { pattern: /희안/g, suggestion: "희한", reason: "'희한'이 올바른 표현입니다" },
  { pattern: /설겆이/g, suggestion: "설거지", reason: "'설거지'가 올바른 표현입니다" },
  { pattern: /역활/g, suggestion: "역할", reason: "'역할'이 올바른 표현입니다" },
  { pattern: /제껴/g, suggestion: "젖혀", reason: "'젖히다'의 활용형은 '젖혀'입니다" },
  { pattern: /안돼요(?![\s,.])/g, suggestion: "안 돼요", reason: "'안'과 '돼요'는 띄어 씁니다" },
  { pattern: /문안하/g, suggestion: "문안하", reason: "올바른 표현입니다" },
  { pattern: /데로/g, suggestion: "대로", reason: "'대로'가 올바른 표현입니다" },
];

function checkSpelling(text: string): SpellingError[] {
  const errors: SpellingError[] = [];
  const seen = new Set<string>();

  for (const rule of SPELLING_RULES) {
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        if (match === rule.suggestion) continue;
        const key = `${match}->${rule.suggestion}`;
        if (seen.has(key)) continue;
        seen.add(key);
        errors.push({
          original: match,
          suggestion: rule.suggestion,
          reason: rule.reason,
        });
      }
    }
  }

  return errors;
}

function applyFixes(text: string): string {
  let result = text;
  for (const rule of SPELLING_RULES) {
    if (rule.suggestion !== rule.pattern.source) {
      result = result.replace(rule.pattern, rule.suggestion);
    }
  }
  return result;
}

export function SpellingCheckerTool() {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState<SpellingError[]>([]);
  const [checked, setChecked] = useState(false);

  function handleCheck() {
    const found = checkSpelling(input);
    setErrors(found);
    setChecked(true);
  }

  function handleAutoFix() {
    setInput(applyFixes(input));
    setErrors([]);
    setChecked(false);
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setChecked(false);
        }}
        placeholder="맞춤법을 검사할 텍스트를 입력하세요..."
        className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />

      <div className="flex gap-2 mt-3 mb-4">
        <button
          onClick={handleCheck}
          disabled={!input.trim()}
          className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          검사하기
        </button>
        {errors.length > 0 && (
          <button
            onClick={handleAutoFix}
            className="px-4 py-2 text-sm rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
          >
            자동 교정
          </button>
        )}
        <CopyButton text={input} />
      </div>

      {checked && (
        <div className="mt-4">
          {errors.length === 0 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              맞춤법 오류가 발견되지 않았습니다.
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-text-muted">
                {errors.length}개의 오류가 발견되었습니다.
              </p>
              {errors.map((error, i) => (
                <div
                  key={i}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="line-through text-red-600">
                      {error.original}
                    </span>
                    <span className="text-text-muted">→</span>
                    <span className="font-semibold text-green-700">
                      {error.suggestion}
                    </span>
                  </div>
                  <p className="text-text-muted text-xs">{error.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          이 도구는 자주 틀리는 한국어 맞춤법 규칙을 기반으로 검사합니다.
          완벽한 검사를 위해서는 국립국어원 맞춤법 검사기를 함께 활용해주세요.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

const EN_KEYS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const KO_KEYS = "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅌㅛㅋㅁㅠㅊㅇㄸㄹㅎㅗㅑㅓㅏㅣㅡㅜㅒㅖㅃㄲㄴㅆㅕㅍㅉㅌㅛㅋ";

function engToKor(text: string): string {
  return text.split("").map((ch) => {
    const idx = EN_KEYS.indexOf(ch);
    return idx >= 0 ? KO_KEYS[idx] : ch;
  }).join("");
}

function korToEng(text: string): string {
  return text.split("").map((ch) => {
    const idx = KO_KEYS.indexOf(ch);
    return idx >= 0 ? EN_KEYS[idx] : ch;
  }).join("");
}

export function KoreanEnglishTypoTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"eng-to-kor" | "kor-to-eng">("eng-to-kor");

  const output = input
    ? mode === "eng-to-kor"
      ? engToKor(input)
      : korToEng(input)
    : "";

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("eng-to-kor")} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "eng-to-kor" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}>
          영문 → 한글
        </button>
        <button onClick={() => setMode("kor-to-eng")} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === "kor-to-eng" ? "bg-primary-600 text-white border-primary-600" : "border-border hover:bg-surface-muted"}`}>
          한글 → 영문
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "eng-to-kor" ? "영문으로 잘못 입력한 텍스트 (예: dkssudgktpdy)" : "한글로 잘못 입력한 텍스트 (예: ㅗ디ㅣㅐ)"}
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface text-text resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">변환 결과</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 border border-border rounded-lg bg-surface-muted text-text resize-y"
          />
          <div className="mt-2"><CopyButton text={output} /></div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-surface-muted rounded-lg border border-border">
        <p className="text-xs text-text-muted">
          한영 전환을 깜빡하고 입력한 경우 변환해줍니다. 조합형 한글(예: 안녕하세요)은 자모로 분리된 상태에서만 정확하게 역변환됩니다.
        </p>
      </div>
    </div>
  );
}

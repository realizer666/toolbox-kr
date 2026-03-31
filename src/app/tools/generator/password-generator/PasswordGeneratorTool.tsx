"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

const CHARS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;

  if (score <= 2) return { label: "약함", color: "bg-red-500", width: "w-1/4" };
  if (score <= 3) return { label: "보통", color: "bg-yellow-500", width: "w-2/4" };
  if (score <= 4) return { label: "강함", color: "bg-blue-500", width: "w-3/4" };
  return { label: "매우 강함", color: "bg-green-500", width: "w-full" };
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let charset = "";
    if (useLower) charset += CHARS.lowercase;
    if (useUpper) charset += CHARS.uppercase;
    if (useNumbers) charset += CHARS.numbers;
    if (useSymbols) charset += CHARS.symbols;
    if (!charset) charset = CHARS.lowercase;

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const pw = Array.from(array, (v) => charset[v % charset.length]).join("");
    setPassword(pw);
  }, [length, useLower, useUpper, useNumbers, useSymbols]);

  const strength = password ? getStrength(password) : null;

  return (
    <div>
      <div className="mb-6 p-4 bg-surface-muted rounded-lg border border-border">
        <div className="flex items-center gap-3 mb-4">
          <code className="flex-1 text-lg font-mono text-text break-all min-h-[28px]">
            {password || "생성 버튼을 눌러주세요"}
          </code>
          {password && <CopyButton text={password} />}
        </div>

        {strength && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-muted">비밀번호 강도</span>
              <span className="font-medium">{strength.label}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className={`h-full ${strength.color} ${strength.width} transition-all`} />
            </div>
          </div>
        )}

        <button onClick={generate} className="w-full px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium">
          비밀번호 생성
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">길이: {length}자</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between text-xs text-text-muted"><span>4</span><span>64</span></div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "소문자 (a-z)", checked: useLower, set: setUseLower },
            { label: "대문자 (A-Z)", checked: useUpper, set: setUseUpper },
            { label: "숫자 (0-9)", checked: useNumbers, set: setUseNumbers },
            { label: "특수문자 (!@#$)", checked: useSymbols, set: setUseSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 text-sm text-text">
              <input type="checkbox" checked={opt.checked} onChange={(e) => opt.set(e.target.checked)} /> {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

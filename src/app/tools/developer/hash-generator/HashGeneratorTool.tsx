"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools/CopyButton";

async function computeHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha1, setSha1] = useState("");
  const [error, setError] = useState("");

  async function handleCompute() {
    setError("");
    if (!input) {
      setError("텍스트를 입력하세요.");
      return;
    }
    try {
      const [hash256, hash1] = await Promise.all([
        computeHash("SHA-256", input),
        computeHash("SHA-1", input),
      ]);
      setSha256(hash256);
      setSha1(hash1);
    } catch {
      setError("해시 생성 중 오류가 발생했습니다.");
    }
  }

  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-text mb-2">텍스트 입력</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="해시를 생성할 텍스트를 입력하세요..."
          className="w-full h-40 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        onClick={handleCompute}
        className="mt-4 px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        해시 생성
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}

      {sha256 && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">SHA-256</label>
            <div className="p-4 border border-border rounded-lg bg-surface-muted font-mono text-sm text-text break-all">
              {sha256}
            </div>
            <div className="mt-2"><CopyButton text={sha256} /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">SHA-1</label>
            <div className="p-4 border border-border rounded-lg bg-surface-muted font-mono text-sm text-text break-all">
              {sha1}
            </div>
            <div className="mt-2"><CopyButton text={sha1} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";

interface Match {
  text: string;
  index: number;
  groups: string[];
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern || !testText) return { matches: [], error: "", highlighted: "" };

    try {
      const regex = new RegExp(pattern, flags);
      const found: Match[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testText)) !== null) {
          found.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          found.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      // 하이라이트 생성
      let hl = "";
      let lastIdx = 0;
      for (const m of found) {
        hl += testText.slice(lastIdx, m.index);
        hl += `【${m.text}】`;
        lastIdx = m.index + m.text.length;
      }
      hl += testText.slice(lastIdx);

      return { matches: found, error: "", highlighted: hl };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: "" };
    }
  }, [pattern, flags, testText]);

  const flagOptions = [
    { id: "g", label: "global (g)" },
    { id: "i", label: "대소문자 무시 (i)" },
    { id: "m", label: "멀티라인 (m)" },
  ];

  function toggleFlag(f: string) {
    setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f);
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-1">정규표현식</label>
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-lg">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="패턴 입력 (예: \d+)"
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-surface font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-text-muted text-lg">/{flags}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {flagOptions.map((f) => (
          <label key={f.id} className="flex items-center gap-2 text-sm text-text">
            <input type="checkbox" checked={flags.includes(f.id)} onChange={() => toggleFlag(f.id)} />
            {f.label}
          </label>
        ))}
      </div>

      {error && <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-1">테스트 문자열</label>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="테스트할 텍스트를 입력하세요..."
          className="w-full h-40 p-4 border border-border rounded-lg bg-surface text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {matches.length > 0 && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-text mb-1">매칭 결과 ({matches.length}개)</label>
            <div className="p-4 border border-border rounded-lg bg-surface-muted font-mono text-sm whitespace-pre-wrap break-all">
              {highlighted}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">매칭 목록</label>
            <div className="space-y-1">
              {matches.map((m, i) => (
                <div key={i} className="flex gap-3 text-sm p-2 bg-surface-muted rounded border border-border">
                  <span className="text-text-muted">#{i + 1}</span>
                  <code className="text-primary-600 font-medium">&quot;{m.text}&quot;</code>
                  <span className="text-text-muted">인덱스: {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-text-muted">그룹: {m.groups.map((g) => `"${g}"`).join(", ")}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

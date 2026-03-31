"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllTools } from "@/lib/registry";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const allTools = getAllTools();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query, allTools]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="도구 검색 (예: 글자수, 이미지, 계산기...)"
          className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
      </div>

      {focused && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className="flex items-center gap-3 px-4 py-3 hover:bg-surface-muted transition-colors"
              onClick={() => { setQuery(""); setFocused(false); }}
            >
              <span className="text-xl">{tool.icon}</span>
              <div>
                <div className="text-sm font-medium text-text">{tool.name}</div>
                <div className="text-xs text-text-muted line-clamp-1">{tool.description}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {focused && query.trim() && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-xl shadow-lg z-50 p-4 text-center text-sm text-text-muted">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}

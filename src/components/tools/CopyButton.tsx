"use client";

import { useClipboard } from "@/hooks/useClipboard";

export function CopyButton({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { copied, copy } = useClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className={`px-4 py-2 text-sm rounded-lg border border-border hover:bg-surface-muted transition-colors ${className}`}
    >
      {copied ? "복사됨!" : "복사"}
    </button>
  );
}

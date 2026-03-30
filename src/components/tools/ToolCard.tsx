import Link from "next/link";
import type { ToolDefinition } from "@/lib/registry";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={tool.path}
      className="block p-4 rounded-xl border border-border hover:border-primary-500 hover:shadow-sm transition-all bg-surface"
    >
      <div className="text-2xl mb-2">{tool.icon}</div>
      <h3 className="font-semibold text-text mb-1">{tool.name}</h3>
      <p className="text-sm text-text-muted line-clamp-2">{tool.description}</p>
    </Link>
  );
}

import Link from "next/link";
import type { CategoryDefinition } from "@/lib/registry";
import { getToolsByCategory } from "@/lib/registry";

export function CategoryCard({ category }: { category: CategoryDefinition }) {
  const toolCount = getToolsByCategory(category.id).length;

  return (
    <Link
      href={category.path}
      className="block p-6 rounded-xl border border-border hover:border-primary-500 hover:shadow-sm transition-all bg-surface"
    >
      <div className="text-3xl mb-3">{category.icon}</div>
      <h3 className="font-semibold text-text mb-1">{category.name}</h3>
      <p className="text-sm text-text-muted mb-2">{category.description}</p>
      <span className="text-xs text-primary-600 font-medium">
        도구 {toolCount}개
      </span>
    </Link>
  );
}

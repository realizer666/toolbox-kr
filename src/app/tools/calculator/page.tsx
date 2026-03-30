import type { Metadata } from "next";
import { getCategoryById, getToolsByCategory } from "@/lib/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const category = getCategoryById("calculator")!;

export const metadata: Metadata = {
  title: `${category.name} - 무료 온라인 도구 | 모두의도구`,
  description: category.description,
};

export default function CalculatorToolsPage() {
  const tools = getToolsByCategory("calculator");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ name: category.name, href: category.path }]} />
      <h1 className="text-3xl font-bold text-text mb-2">
        {category.icon} {category.name}
      </h1>
      <p className="text-text-muted mb-8">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

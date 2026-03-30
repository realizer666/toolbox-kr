import type { Metadata } from "next";
import { getAllTools, categories } from "@/lib/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { CategoryCard } from "@/components/tools/CategoryCard";

export const metadata: Metadata = {
  title: "전체 도구 목록 - 모두의도구",
  description: "모두의도구에서 제공하는 모든 무료 온라인 도구를 확인하세요.",
};

export default function ToolsPage() {
  const allTools = getAllTools();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-2">전체 도구</h1>
      <p className="text-text-muted mb-8">
        모두의도구에서 제공하는 모든 무료 온라인 도구입니다.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-text mb-4">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text mb-4">
          모든 도구 ({allTools.length}개)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

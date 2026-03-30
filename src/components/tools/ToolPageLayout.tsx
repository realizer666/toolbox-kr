import type { ToolDefinition } from "@/lib/registry";
import { getCategoryById, getRelatedTools } from "@/lib/registry";
import { generateToolJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolCard } from "./ToolCard";

export function ToolPageLayout({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: React.ReactNode;
}) {
  const category = getCategoryById(tool.categoryId);
  const relatedTools = getRelatedTools(tool.id);

  const breadcrumbItems = [
    ...(category
      ? [{ name: category.name, href: category.path }]
      : []),
    { name: tool.name, href: tool.path },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={generateToolJsonLd(tool)} />
      <JsonLd
        data={generateBreadcrumbJsonLd(
          breadcrumbItems.map((item) => ({ name: item.name, url: item.href }))
        )}
      />

      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold text-text mb-2">
        {tool.icon} {tool.name}
      </h1>
      <p className="text-text-muted mb-6">{tool.description}</p>

      <AdSlot className="mb-6" />

      <div className="mb-8">{children}</div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text mb-3">
          {tool.name}란?
        </h2>
        <p className="text-text-muted leading-relaxed">
          {tool.longDescription}
        </p>
      </section>

      <AdSlot className="mb-8" />

      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-text mb-4">
            관련 도구
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

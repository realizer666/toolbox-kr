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

      {/* FAQ 섹션 - 구글 리치 스니펫 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text mb-3">자주 묻는 질문</h2>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `${tool.name}는 무료인가요?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `네, ${tool.name}는 완전 무료입니다. 회원가입 없이 바로 사용할 수 있습니다.`
              }
            },
            {
              "@type": "Question",
              "name": `${tool.name}는 모바일에서도 사용할 수 있나요?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "네, 모바일 브라우저에서도 최적화되어 사용할 수 있습니다."
              }
            },
            {
              "@type": "Question",
              "name": "개인정보가 수집되나요?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "아닙니다. 모든 데이터는 브라우저에서 직접 처리되며 서버로 전송되지 않습니다."
              }
            }
          ]
        }} />
        <div className="space-y-3">
          <details className="border border-border rounded-lg">
            <summary className="px-4 py-3 text-sm font-medium text-text cursor-pointer hover:bg-surface-muted">
              {tool.name}는 무료인가요?
            </summary>
            <p className="px-4 pb-3 text-sm text-text-muted">
              네, 완전 무료입니다. 회원가입 없이 바로 사용할 수 있습니다.
            </p>
          </details>
          <details className="border border-border rounded-lg">
            <summary className="px-4 py-3 text-sm font-medium text-text cursor-pointer hover:bg-surface-muted">
              모바일에서도 사용할 수 있나요?
            </summary>
            <p className="px-4 pb-3 text-sm text-text-muted">
              네, 모바일 브라우저에서도 최적화되어 사용할 수 있습니다.
            </p>
          </details>
          <details className="border border-border rounded-lg">
            <summary className="px-4 py-3 text-sm font-medium text-text cursor-pointer hover:bg-surface-muted">
              개인정보가 수집되나요?
            </summary>
            <p className="px-4 pb-3 text-sm text-text-muted">
              아닙니다. 모든 데이터는 브라우저에서 직접 처리되며 서버로 전송되지 않습니다.
            </p>
          </details>
        </div>
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

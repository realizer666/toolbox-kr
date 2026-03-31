import Link from "next/link";
import { categories, getToolsByCategory, getAllTools } from "@/lib/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdSlot } from "@/components/ads/AdSlot";

export default function HomePage() {
  const totalTools = getAllTools().length;

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
          모두의도구
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-6">
          글자수 세기, 이미지 변환, 계산기 등
          <br className="hidden sm:block" />
          누구나 무료로 사용할 수 있는 온라인 도구 모음
        </p>
        <div className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
          총 {totalTools}개 무료 도구
        </div>
      </section>

      {/* 카테고리 바로가기 */}
      <nav className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="px-4 py-2 rounded-full border border-border hover:border-primary-500 hover:bg-primary-50 transition-colors text-sm font-medium text-text"
          >
            {cat.icon} {cat.name}
          </a>
        ))}
      </nav>

      <AdSlot className="mb-12" />

      {/* 카테고리별 도구 목록 */}
      {categories.map((cat, index) => {
        const tools = getToolsByCategory(cat.id);
        return (
          <section key={cat.id} id={cat.id} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text">
                  {cat.icon} {cat.name}
                </h2>
                <p className="text-sm text-text-muted mt-1">{cat.description}</p>
              </div>
              <Link
                href={cat.path}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium hidden sm:block"
              >
                전체보기 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* 카테고리 사이에 광고 삽입 (2번째, 4번째 카테고리 뒤) */}
            {(index === 1 || index === 3) && <AdSlot className="mt-8" />}
          </section>
        );
      })}

      <AdSlot className="mb-12" />

      {/* SEO Content */}
      <section className="mb-12 max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-4">
          모두의도구 소개
        </h2>
        <div className="text-text-muted space-y-3 text-sm leading-relaxed">
          <p>
            모두의도구는 누구나 무료로 사용할 수 있는 온라인 도구 모음
            서비스입니다. 별도의 회원가입이나 프로그램 설치 없이 웹
            브라우저에서 바로 사용할 수 있습니다.
          </p>
          <p>
            텍스트 도구, 이미지 도구, 계산기, 개발자 도구, 생성 도구 등
            총 {totalTools}개의 무료 도구를 제공하고 있으며, 지속적으로
            새로운 도구를 추가하고 있습니다.
          </p>
          <p>
            모든 도구는 개인정보를 수집하지 않으며, 입력한 데이터는 서버로
            전송되지 않고 브라우저에서 바로 처리됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}

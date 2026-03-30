import { categories, getAllTools } from "@/lib/registry";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdSlot } from "@/components/ads/AdSlot";

export default function HomePage() {
  const allTools = getAllTools();

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
          모두의도구
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          글자수 세기, 텍스트 변환, 맞춤법 검사 등
          <br className="hidden sm:block" />
          누구나 무료로 사용할 수 있는 온라인 도구 모음
        </p>
      </section>

      <AdSlot className="mb-12" />

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* All Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6">전체 도구</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

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
            글자수 세기, 맞춤법 검사, 텍스트 변환, 중복 줄 제거 등 다양한
            텍스트 도구를 제공하며, 앞으로 이미지 도구, 개발자 도구, 계산기
            등 더 많은 도구를 추가할 예정입니다.
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

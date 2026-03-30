import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 - 모두의도구",
  description: "모두의도구 서비스 소개, 개인정보처리방침, 이용약관",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">모두의도구 소개</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-text mb-4">서비스 소개</h2>
        <div className="text-text-muted space-y-3 leading-relaxed">
          <p>
            모두의도구는 누구나 무료로 사용할 수 있는 온라인 도구 모음
            서비스입니다. 회원가입이나 프로그램 설치 없이 웹 브라우저에서
            바로 사용할 수 있습니다.
          </p>
          <p>
            글자수 세기, 맞춤법 검사, 텍스트 변환 등 실생활에서 자주
            필요한 도구들을 제공하고 있으며, 지속적으로 새로운 도구를
            추가하고 있습니다.
          </p>
        </div>
      </section>

      <section id="privacy" className="mb-10">
        <h2 className="text-xl font-semibold text-text mb-4">
          개인정보처리방침
        </h2>
        <div className="text-text-muted space-y-3 text-sm leading-relaxed">
          <p>
            모두의도구는 사용자의 개인정보를 수집하지 않습니다. 모든 도구는
            사용자의 브라우저에서 직접 처리되며, 입력한 데이터는 서버로
            전송되지 않습니다.
          </p>
          <p>
            본 사이트는 서비스 개선 및 통계 분석을 위해 Google Analytics를
            사용하며, 광고 제공을 위해 Google AdSense를 사용합니다. 이러한
            서비스는 쿠키를 사용할 수 있으며, 관련 정보는 각 서비스의
            개인정보처리방침을 참고해주세요.
          </p>
        </div>
      </section>

      <section id="terms" className="mb-10">
        <h2 className="text-xl font-semibold text-text mb-4">이용약관</h2>
        <div className="text-text-muted space-y-3 text-sm leading-relaxed">
          <p>
            모두의도구에서 제공하는 모든 도구는 무료로 이용할 수 있습니다.
            본 서비스에서 제공하는 도구의 결과에 대한 정확성을 보장하지
            않으며, 도구 사용으로 인해 발생하는 문제에 대해 책임을 지지
            않습니다.
          </p>
          <p>
            본 서비스의 콘텐츠를 무단으로 복제, 배포하는 것을 금지합니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text mb-4">문의</h2>
        <p className="text-text-muted text-sm">
          서비스 관련 문의사항은 이메일로 연락 부탁드립니다.
        </p>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "모두의도구 - 무료 온라인 도구 모음",
    template: "%s | 모두의도구",
  },
  description:
    "글자수 세기, 맞춤법 검사, 이미지 압축, 대출 계산기, QR코드 생성 등 43개 무료 온라인 도구. 회원가입 없이 바로 사용하세요.",
  keywords: [
    "무료 온라인 도구", "모두의도구", "글자수 세기", "맞춤법 검사기",
    "이미지 압축", "이미지 리사이즈", "대출 이자 계산기", "연봉 실수령액 계산기",
    "QR코드 만들기", "비밀번호 생성기", "JSON 포맷터", "단위 변환기",
    "BMI 계산기", "퍼센트 계산기", "칼로리 계산기", "영문주소 변환",
    "텍스트 변환기", "한영 타자 변환", "D-Day 계산기", "나이 계산기",
  ],
  openGraph: {
    siteName: "모두의도구",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    google: "JsAUs5ISSvZUa20IaJIgZ9s7sZUc144KDGV5QjbISGM",
    other: {
      "naver-site-verification": ["d9c004f24c2d78e9a530da6672f023d878ecd631"],
      "google-adsense-account": ["ca-pub-5056296408239025"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5056296408239025"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

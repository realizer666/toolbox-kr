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
    "글자수 세기, 맞춤법 검사, 이미지 변환 등 무료 온라인 도구를 제공합니다.",
  keywords: ["무료 온라인 도구", "글자수 세기", "텍스트 변환", "모두의도구"],
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

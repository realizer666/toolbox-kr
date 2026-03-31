import type { Metadata } from "next";
import type { ToolDefinition } from "./registry";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolbox-kr.vercel.app";
const SITE_NAME = "모두의도구";

export function generateToolMetadata(tool: ToolDefinition): Metadata {
  return {
    title: `${tool.name} - 무료 온라인 도구 | ${SITE_NAME}`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}${tool.path}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
    alternates: {
      canonical: `${SITE_URL}${tool.path}`,
    },
  };
}

export function generateToolJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}${tool.path}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    inLanguage: "ko",
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

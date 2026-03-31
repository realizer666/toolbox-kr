import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { KoreanEnglishTypoTool } from "./KoreanEnglishTypoTool";

const tool = getToolById("korean-english-typo")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><KoreanEnglishTypoTool /></ToolPageLayout>;
}

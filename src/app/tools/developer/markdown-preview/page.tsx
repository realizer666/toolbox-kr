import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { MarkdownPreviewTool } from "./MarkdownPreviewTool";

const tool = getToolById("markdown-preview")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><MarkdownPreviewTool /></ToolPageLayout>;
}

import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { UrlEncoderTool } from "./UrlEncoderTool";

const tool = getToolById("url-encoder")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><UrlEncoderTool /></ToolPageLayout>;
}

import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { JsonFormatterTool } from "./JsonFormatterTool";

const tool = getToolById("json-formatter")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><JsonFormatterTool /></ToolPageLayout>;
}

import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { RegexTesterTool } from "./RegexTesterTool";

const tool = getToolById("regex-tester")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><RegexTesterTool /></ToolPageLayout>;
}

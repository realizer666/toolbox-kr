import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { UuidGeneratorTool } from "./UuidGeneratorTool";

const tool = getToolById("uuid-generator")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><UuidGeneratorTool /></ToolPageLayout>;
}

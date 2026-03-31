import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TimestampConverterTool } from "./TimestampConverterTool";

const tool = getToolById("timestamp-converter")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><TimestampConverterTool /></ToolPageLayout>;
}

import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Base64ConverterTool } from "./Base64ConverterTool";

const tool = getToolById("base64-converter")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><Base64ConverterTool /></ToolPageLayout>;
}

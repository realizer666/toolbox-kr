import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { CsvJsonConverterTool } from "./CsvJsonConverterTool";

const tool = getToolById("csv-json-converter")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><CsvJsonConverterTool /></ToolPageLayout>;
}

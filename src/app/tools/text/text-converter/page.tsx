import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { TextConverterTool } from "./TextConverterTool";

const tool = getToolById("text-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function TextConverterPage() {
  return (
    <ToolPageLayout tool={tool}>
      <TextConverterTool />
    </ToolPageLayout>
  );
}

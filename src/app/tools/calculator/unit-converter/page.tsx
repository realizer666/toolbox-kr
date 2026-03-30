import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { UnitConverterTool } from "./UnitConverterTool";

const tool = getToolById("unit-converter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function UnitConverterPage() {
  return (
    <ToolPageLayout tool={tool}>
      <UnitConverterTool />
    </ToolPageLayout>
  );
}

import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ZodiacCalculatorTool } from "./ZodiacCalculatorTool";

const tool = getToolById("zodiac-calculator")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageLayout tool={tool}>
      <ZodiacCalculatorTool />
    </ToolPageLayout>
  );
}

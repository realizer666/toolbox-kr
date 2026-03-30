import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { BmiCalculatorTool } from "./BmiCalculatorTool";

const tool = getToolById("bmi-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function BmiCalculatorPage() {
  return (
    <ToolPageLayout tool={tool}>
      <BmiCalculatorTool />
    </ToolPageLayout>
  );
}

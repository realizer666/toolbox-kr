import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { SalaryCalculatorTool } from "./SalaryCalculatorTool";

const tool = getToolById("salary-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SalaryCalculatorPage() {
  return (
    <ToolPageLayout tool={tool}>
      <SalaryCalculatorTool />
    </ToolPageLayout>
  );
}

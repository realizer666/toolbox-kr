import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { LoanCalculatorTool } from "./LoanCalculatorTool";

const tool = getToolById("loan-calculator")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function LoanCalculatorPage() {
  return (
    <ToolPageLayout tool={tool}>
      <LoanCalculatorTool />
    </ToolPageLayout>
  );
}

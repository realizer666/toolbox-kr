import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { PercentCalculatorTool } from "./PercentCalculatorTool";

const tool = getToolById("percent-calculator")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><PercentCalculatorTool /></ToolPageLayout>;
}

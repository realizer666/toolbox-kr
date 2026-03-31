import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { AgeCalculatorTool } from "./AgeCalculatorTool";

const tool = getToolById("age-calculator")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><AgeCalculatorTool /></ToolPageLayout>;
}

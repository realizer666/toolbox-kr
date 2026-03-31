import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { FoodCalorieTool } from "./FoodCalorieTool";

const tool = getToolById("food-calorie")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><FoodCalorieTool /></ToolPageLayout>;
}

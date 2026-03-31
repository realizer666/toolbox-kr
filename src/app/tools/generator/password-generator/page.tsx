import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { PasswordGeneratorTool } from "./PasswordGeneratorTool";

const tool = getToolById("password-generator")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><PasswordGeneratorTool /></ToolPageLayout>;
}

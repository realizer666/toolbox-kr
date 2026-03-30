import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { LineBreakRemoverTool } from "./LineBreakRemoverTool";

const tool = getToolById("line-break-remover")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function LineBreakRemoverPage() {
  return (
    <ToolPageLayout tool={tool}>
      <LineBreakRemoverTool />
    </ToolPageLayout>
  );
}

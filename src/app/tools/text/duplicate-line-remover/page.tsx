import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { DuplicateLineRemoverTool } from "./DuplicateLineRemoverTool";

const tool = getToolById("duplicate-line-remover")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function DuplicateLineRemoverPage() {
  return (
    <ToolPageLayout tool={tool}>
      <DuplicateLineRemoverTool />
    </ToolPageLayout>
  );
}

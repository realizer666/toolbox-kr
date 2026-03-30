import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { SpellingCheckerTool } from "./SpellingCheckerTool";

const tool = getToolById("spelling-checker")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function SpellingCheckerPage() {
  return (
    <ToolPageLayout tool={tool}>
      <SpellingCheckerTool />
    </ToolPageLayout>
  );
}

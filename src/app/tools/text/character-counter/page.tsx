import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { CharacterCounterTool } from "./CharacterCounterTool";

const tool = getToolById("character-counter")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function CharacterCounterPage() {
  return (
    <ToolPageLayout tool={tool}>
      <CharacterCounterTool />
    </ToolPageLayout>
  );
}

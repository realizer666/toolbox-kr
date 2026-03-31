import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { RandomPickerTool } from "./RandomPickerTool";

const tool = getToolById("random-picker")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageLayout tool={tool}>
      <RandomPickerTool />
    </ToolPageLayout>
  );
}

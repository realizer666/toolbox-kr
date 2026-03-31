import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ColorPaletteTool } from "./ColorPaletteTool";

const tool = getToolById("color-palette")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageLayout tool={tool}>
      <ColorPaletteTool />
    </ToolPageLayout>
  );
}

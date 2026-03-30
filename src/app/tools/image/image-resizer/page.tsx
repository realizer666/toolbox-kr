import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ImageResizerTool } from "./ImageResizerTool";

const tool = getToolById("image-resizer")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageResizerPage() {
  return (
    <ToolPageLayout tool={tool}>
      <ImageResizerTool />
    </ToolPageLayout>
  );
}

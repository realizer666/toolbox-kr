import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ImageCompressorTool } from "./ImageCompressorTool";

const tool = getToolById("image-compressor")!;

export const metadata: Metadata = generateToolMetadata(tool);

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout tool={tool}>
      <ImageCompressorTool />
    </ToolPageLayout>
  );
}

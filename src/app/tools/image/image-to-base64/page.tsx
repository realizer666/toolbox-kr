import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ImageToBase64Tool } from "./ImageToBase64Tool";

const tool = getToolById("image-to-base64")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return <ToolPageLayout tool={tool}><ImageToBase64Tool /></ToolPageLayout>;
}

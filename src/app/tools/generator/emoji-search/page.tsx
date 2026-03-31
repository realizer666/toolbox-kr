import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { EmojiSearchTool } from "./EmojiSearchTool";

const tool = getToolById("emoji-search")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageLayout tool={tool}>
      <EmojiSearchTool />
    </ToolPageLayout>
  );
}

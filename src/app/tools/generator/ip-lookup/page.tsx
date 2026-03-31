import type { Metadata } from "next";
import { getToolById } from "@/lib/registry";
import { generateToolMetadata } from "@/lib/seo";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { IpLookupTool } from "./IpLookupTool";

const tool = getToolById("ip-lookup")!;
export const metadata: Metadata = generateToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageLayout tool={tool}>
      <IpLookupTool />
    </ToolPageLayout>
  );
}

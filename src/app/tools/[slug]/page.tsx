import { notFound } from "next/navigation";
import { findToolByPageSlug } from "@/lib/tool-slug";
import { ToolDetailClient } from "@/components/ui/tool-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ToolDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const tool = findToolByPageSlug(slug);
  if (!tool) notFound();
  return <ToolDetailClient tool={tool} />;
}

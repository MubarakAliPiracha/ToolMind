import { notFound } from "next/navigation";
import { categories, type CategoryKey } from "@/lib/data/categories";
import { findToolByPageSlug, makeToolPageSlug } from "@/lib/tool-slug";
import { ToolDetailClient } from "@/components/ui/tool-detail-client";

export function generateStaticParams(): { slug: string }[] {
  return (Object.keys(categories) as CategoryKey[]).flatMap((key) =>
    categories[key].tools.map((tool) => ({
      slug: makeToolPageSlug(key, tool.name),
    }))
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ToolDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const tool = findToolByPageSlug(slug);
  if (!tool) notFound();
  return <ToolDetailClient tool={tool} />;
}

import { redirect } from "next/navigation";
import { categories, type CategoryKey } from "@/lib/data/categories";
import { CategoryPageClient } from "@/components/ui/category-page-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;

  if (!(slug in categories)) {
    redirect("/tools");
  }

  const category = categories[slug as CategoryKey];

  return <CategoryPageClient slug={slug} category={category} />;
}

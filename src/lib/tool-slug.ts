import { categories, type CategoryKey } from "@/lib/data/categories";

export function toToolNameSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** URL-safe slug: `{categoryKey}-{toolNameSlug}` — unique across the directory. */
export function makeToolPageSlug(categoryKey: CategoryKey, toolName: string): string {
  return `${categoryKey}-${toToolNameSlug(toolName)}`;
}

export interface SimilarTool {
  name: string;
  pricing: string;
  bestFor: string;
  logoUrl?: string;
  slug: string;
}

export interface ResolvedTool {
  categoryKey: CategoryKey;
  categoryName: string;
  categoryDescription: string;
  subcategories: readonly string[];
  name: string;
  pricing: string;
  bestFor: string;
  logoUrl?: string;
  similarTools: SimilarTool[];
}

function buildResolved(
  key: CategoryKey,
  toolName: string,
  toolPricing: string,
  toolBestFor: string,
  toolLogoUrl?: string,
): ResolvedTool {
  const cat = categories[key];
  const similarTools: SimilarTool[] = cat.tools
    .filter((t) => t.name !== toolName)
    .map((t) => ({
      name: t.name,
      pricing: t.pricing,
      bestFor: t.bestFor,
      logoUrl: "logoUrl" in t ? (t as { logoUrl?: string }).logoUrl : undefined,
      slug: makeToolPageSlug(key, t.name),
    }));

  return {
    categoryKey: key,
    categoryName: cat.name,
    categoryDescription: cat.description,
    subcategories: cat.subcategories,
    name: toolName,
    pricing: toolPricing,
    bestFor: toolBestFor,
    logoUrl: toolLogoUrl,
    similarTools,
  };
}

export function findToolByPageSlug(pageSlug: string): ResolvedTool | null {
  for (const key of Object.keys(categories) as CategoryKey[]) {
    const prefix = `${key}-`;
    if (!pageSlug.startsWith(prefix)) continue;
    const nameSlug = pageSlug.slice(prefix.length);
    if (!nameSlug) continue;
    const cat = categories[key];
    for (const tool of cat.tools) {
      if (toToolNameSlug(tool.name) === nameSlug) {
        return buildResolved(
          key,
          tool.name,
          tool.pricing,
          tool.bestFor,
          "logoUrl" in tool ? (tool as { logoUrl?: string }).logoUrl : undefined,
        );
      }
    }
  }

  // Legacy plain slugs (name only); first match wins if ambiguous
  for (const key of Object.keys(categories) as CategoryKey[]) {
    const cat = categories[key];
    for (const tool of cat.tools) {
      if (toToolNameSlug(tool.name) === pageSlug) {
        return buildResolved(
          key,
          tool.name,
          tool.pricing,
          tool.bestFor,
          "logoUrl" in tool ? (tool as { logoUrl?: string }).logoUrl : undefined,
        );
      }
    }
  }

  return null;
}

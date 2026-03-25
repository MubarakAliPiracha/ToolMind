import { redirect } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}): Promise<never> {
  const params = await searchParams;
  const q = params.q;
  redirect(q ? `/tools?q=${encodeURIComponent(q)}` : "/tools");
}

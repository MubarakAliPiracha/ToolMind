import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/lib/data/categories";
import type { CategoryKey } from "@/lib/data/categories";

interface SearchResult {
  name: string;
  score: number;
}

function buildToolsList(): string {
  const lines: string[] = [];
  for (const key of Object.keys(categories) as CategoryKey[]) {
    const cat = categories[key];
    for (const tool of cat.tools) {
      lines.push(`- ${tool.name} (${cat.name}): ${tool.bestFor}`);
    }
  }
  return lines.join("\n");
}

const TOOLS_LIST = buildToolsList();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => ({})) as { query?: string };
    const query = body.query?.trim() ?? "";

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("[search] GEMINI_API_KEY is not set — falling back to client-side scoring");
      return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 503 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a tool-matching engine for an AI tools directory. Given a user task, rank the most relevant tools.

User task: "${query}"

Available tools:
${TOOLS_LIST}

Return ONLY valid JSON — no markdown, no explanation — in this exact format:
{"results":[{"name":"exact tool name","score":95},{"name":"exact tool name","score":80}]}

Rules:
- Use the exact tool names from the list above
- Score 0–100 based on how well the tool matches the task
- Only include tools with score >= 25
- Return up to 15 tools, ordered by score descending`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Extract JSON — model sometimes wraps in markdown fences
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[search] Could not extract JSON from response:", text);
      return NextResponse.json({ results: [] });
    }

    const parsed = JSON.parse(jsonMatch[0]) as { results: SearchResult[] };
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[search] API route error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

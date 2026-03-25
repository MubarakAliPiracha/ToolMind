import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  MessageSquare,
  Sparkles,
  Terminal,
  Search,
  FileText,
  Mic2,
  type LucideIcon,
} from 'lucide-react'

type Pricing = 'Free' | 'Freemium' | 'Paid' | 'Open Source'

interface FeaturedTool {
  name: string
  description: string
  category: string
  pricing: Pricing
  slug: string
  accentColor: string
  Icon: LucideIcon
}

const FEATURED_TOOLS: FeaturedTool[] = [
  {
    name: 'ChatGPT',
    description: 'The most capable AI assistant for writing, coding, analysis, and conversation.',
    category: 'Writing',
    pricing: 'Freemium',
    slug: 'chatgpt',
    accentColor: '#10a37f',
    Icon: MessageSquare,
  },
  {
    name: 'Midjourney',
    description: 'Generate stunning, photorealistic images and illustrations from text prompts.',
    category: 'Image',
    pricing: 'Paid',
    slug: 'midjourney',
    accentColor: '#6366f1',
    Icon: Sparkles,
  },
  {
    name: 'Cursor',
    description: 'AI-first code editor built on VS Code with deep codebase understanding.',
    category: 'Coding',
    pricing: 'Freemium',
    slug: 'cursor',
    accentColor: '#f97316',
    Icon: Terminal,
  },
  {
    name: 'Perplexity',
    description: 'AI-powered search engine that answers questions with cited, up-to-date sources.',
    category: 'Research',
    pricing: 'Freemium',
    slug: 'perplexity',
    accentColor: '#06b6d4',
    Icon: Search,
  },
  {
    name: 'Notion AI',
    description: 'AI writing assistant, summarization, and Q&A built natively into Notion.',
    category: 'Productivity',
    pricing: 'Freemium',
    slug: 'notion-ai',
    accentColor: '#e5e7eb',
    Icon: FileText,
  },
  {
    name: 'ElevenLabs',
    description: 'Realistic AI voice synthesis, cloning, and multilingual text-to-speech.',
    category: 'Audio',
    pricing: 'Freemium',
    slug: 'elevenlabs',
    accentColor: '#a855f7',
    Icon: Mic2,
  },
]

function FeaturedToolCard({ tool }: { tool: FeaturedTool }): React.JSX.Element {
  const { Icon } = tool
  return (
    <div
      className={cn(
        'group flex flex-col gap-4 rounded-xl p-5',
        'border border-white/[0.08] bg-white/[0.03]',
        'backdrop-filter backdrop-blur-sm',
        'transition-all duration-150 ease-out',
        'hover:border-white/[0.18] hover:bg-white/[0.05] hover:-translate-y-[2px]'
      )}
    >
      {/* Top row: icon + name + pricing */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${tool.accentColor}20` }}
        >
          <Icon size={16} style={{ color: tool.accentColor }} strokeWidth={1.5} />
        </div>

        <span className="truncate text-[15px] font-medium text-white">{tool.name}</span>

        <span className="ml-auto shrink-0 rounded-full border border-white/[0.1] px-2 py-[2px] text-[10px] font-medium text-white/50">
          {tool.pricing}
        </span>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-[13px] leading-snug text-white/50">{tool.description}</p>

      {/* Bottom row: category + view link */}
      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="rounded-md border border-white/[0.08] px-2 py-[3px] text-[11px] font-medium text-white/40">
          {tool.category}
        </span>
        <Link
          href={`/tools/${tool.slug}`}
          className="text-[13px] font-medium text-white/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          View tool &rarr;
        </Link>
      </div>
    </div>
  )
}

export function FeaturedTools(): React.JSX.Element {
  return (
    <section className="featured-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Featured</span>
          <h2 className="section-headline">Tools worth using</h2>
          <p className="section-subtext">Hand-picked AI tools that consistently deliver results.</p>
        </div>

        <div className="tools-grid">
          {FEATURED_TOOLS.map((tool) => (
            <FeaturedToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="section-cta">
          <Link href="/directory" className="cta-button">
            Browse all tools &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

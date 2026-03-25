import Link from 'next/link'
import {
  PenTool,
  Code2,
  ImageIcon,
  Video,
  Headphones,
  BookOpen,
  Zap,
  BarChart2,
  TrendingUp,
  Headset,
  type LucideIcon,
} from 'lucide-react'

interface CategoryItem {
  name: string
  slug: string
  toolCount: number
  Icon: LucideIcon
  color: string
}

const CATEGORIES: CategoryItem[] = [
  { name: 'Writing',      slug: 'writing',      toolCount: 24, Icon: PenTool,    color: '#f472b6' },
  { name: 'Coding',       slug: 'coding',       toolCount: 31, Icon: Code2,      color: '#60a5fa' },
  { name: 'Image',        slug: 'image',        toolCount: 18, Icon: ImageIcon,  color: '#a78bfa' },
  { name: 'Video',        slug: 'video',        toolCount: 12, Icon: Video,      color: '#f97316' },
  { name: 'Audio',        slug: 'audio',        toolCount: 9,  Icon: Headphones, color: '#34d399' },
  { name: 'Research',     slug: 'research',     toolCount: 21, Icon: BookOpen,   color: '#06b6d4' },
  { name: 'Productivity', slug: 'productivity', toolCount: 27, Icon: Zap,        color: '#fbbf24' },
  { name: 'Data',         slug: 'data',         toolCount: 15, Icon: BarChart2,  color: '#38bdf8' },
  { name: 'Marketing',    slug: 'marketing',    toolCount: 19, Icon: TrendingUp, color: '#f87171' },
  { name: 'Support',      slug: 'support',      toolCount: 11, Icon: Headset,    color: '#818cf8' },
]

export function CategorySection(): React.JSX.Element {
  return (
    <section className="category-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Categories</span>
          <h2 className="section-headline">Browse by use case</h2>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => {
            const { Icon } = cat
            return (
              <Link key={cat.slug} href={`/categories/${cat.slug}`} className="category-card group">
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-150 group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  <Icon size={16} style={{ color: cat.color }} strokeWidth={1.5} />
                </div>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.toolCount} tools</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

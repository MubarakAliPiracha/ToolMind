import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Directory', href: '/directory' },
  { label: 'Categories', href: '/categories' },
  { label: 'Compare', href: '/compare' },
]

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            ToolMind
          </Link>
          <p className="footer-tagline">Find the right AI tool, faster.</p>
        </div>

        <nav className="footer-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="footer-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">&copy; {new Date().getFullYear()} ToolMind. All rights reserved.</span>
      </div>
    </footer>
  )
}

import type { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for the ToolMind homepage (/).
 *
 * Encapsulates all selectors and navigation actions so that tests
 * remain readable and changes to the DOM only require updates here.
 */
export class HomePage {
  readonly page: Page

  // ----- Navigation -----
  readonly nav: Locator
  readonly navLogo: Locator
  readonly navLinkDirectory: Locator
  readonly navLinkCategories: Locator
  readonly navLinkCompare: Locator
  readonly navButtonLogin: Locator
  readonly navButtonGetStarted: Locator

  // ----- Hero -----
  readonly heroSection: Locator
  readonly heroHeadline: Locator
  readonly heroSubtext: Locator
  readonly heroSearchInput: Locator
  readonly heroCard: Locator
  readonly heroRightColumn: Locator  // Spline 3D container (right hero column)

  // ----- PageBackground -----
  readonly lightningCanvas: Locator  // Lightning WebGL <canvas> inside the fixed background layer

  // ----- Featured Tools -----
  readonly featuredSection: Locator
  readonly featuredHeadline: Locator
  readonly toolsGrid: Locator
  readonly browseAllToolsCta: Locator

  // ----- Category Section -----
  readonly categorySection: Locator
  readonly categoryHeadline: Locator
  readonly categoryGrid: Locator

  // ----- Footer -----
  readonly footer: Locator
  readonly footerLogo: Locator
  readonly footerCopyright: Locator
  readonly footerNavLinks: Locator

  constructor(page: Page) {
    this.page = page

    // Navigation
    this.nav = page.locator('#main-nav')
    this.navLogo = this.nav.locator('.nav-logo-text')
    this.navLinkDirectory = this.nav.getByRole('link', { name: 'Directory' })
    this.navLinkCategories = this.nav.getByRole('link', { name: 'Categories' })
    this.navLinkCompare = this.nav.getByRole('link', { name: 'Compare' })
    this.navButtonLogin = this.nav.getByRole('link', { name: 'Log in' })
    this.navButtonGetStarted = this.nav.getByRole('link', { name: 'Get started' })

    // Hero
    this.heroSection = page.locator('section').first()
    this.heroHeadline = page.getByRole('heading', { level: 1, name: 'Find the right AI tool.' })
    this.heroSubtext = page.getByText('Search 200+ tools by use case, category, or task.')
    this.heroSearchInput = page.locator('#hero-search')
    this.heroCard = page.locator('.hero-columns').first()
    this.heroRightColumn = page.locator('.hero-right-col')

    // PageBackground — the fixed wrapper that holds the Lightning WebGL canvas
    this.lightningCanvas = page.locator('div.fixed.inset-0 canvas').first()

    // Featured Tools
    this.featuredSection = page.locator('.featured-section')
    this.featuredHeadline = page.getByRole('heading', { level: 2, name: 'Tools worth using' })
    this.toolsGrid = page.locator('.tools-grid')
    this.browseAllToolsCta = page.getByRole('link', { name: /Browse all tools/i })

    // Category Section
    this.categorySection = page.locator('.category-section')
    this.categoryHeadline = page.getByRole('heading', { level: 2, name: 'Browse by use case' })
    this.categoryGrid = page.locator('.category-grid')

    // Footer
    this.footer = page.locator('footer.site-footer')
    this.footerLogo = this.footer.getByRole('link', { name: 'ToolMind' })
    this.footerCopyright = this.footer.locator('.footer-copy')
    this.footerNavLinks = this.footer.locator('nav.footer-nav a')
  }

  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  /** Returns all tool cards inside the featured tools grid. */
  toolCards(): Locator {
    return this.toolsGrid.locator('.group')
  }

  /** Returns a specific tool card by tool name. */
  toolCardByName(name: string): Locator {
    return this.toolsGrid.locator('.group').filter({ hasText: name })
  }

  /**
   * Returns the Lucide icon SVG inside a named tool card.
   * Lucide always adds the `lucide` class to every icon SVG it renders.
   */
  toolCardIcon(name: string): Locator {
    return this.toolCardByName(name).locator('svg.lucide')
  }

  /** Returns all category cards inside the category grid. */
  categoryCards(): Locator {
    return this.categoryGrid.locator('a.category-card')
  }

  /** Returns a category card anchor by its display name. */
  categoryCardByName(name: string): Locator {
    return this.categoryGrid.getByRole('link', { name: new RegExp(name, 'i') })
  }

  /**
   * Returns the Lucide icon SVG inside a named category card.
   * Lucide always adds the `lucide` class to every icon SVG it renders.
   */
  categoryCardIcon(name: string): Locator {
    return this.categoryCardByName(name).locator('svg.lucide')
  }
}

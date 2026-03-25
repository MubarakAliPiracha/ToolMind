import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

// ---------------------------------------------------------------------------
// Homepage E2E tests for ToolMind (/)
// All tests are independent — each navigates to the page fresh.
// ---------------------------------------------------------------------------

test.describe('Homepage — render', () => {
  test('page title is ToolMind', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(page).toHaveTitle(/ToolMind/i)
  })

  test('hero headline is visible', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.heroHeadline).toBeVisible()
    await expect(home.heroHeadline).toHaveText('Find the right AI tool.')
  })

  test('hero subtext is visible', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.heroSubtext).toBeVisible()
  })

  test('hero right column container is present (Spline 3D wrapper)', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // Only assert the container exists — the Spline scene loads async
    await expect(home.heroRightColumn).toBeAttached()
  })
})

test.describe('Homepage — PageBackground (Lightning WebGL)', () => {
  test('Lightning canvas element is attached to the DOM', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // The Lightning component renders a <canvas class="w-full h-full"> inside the
    // fixed background layer. We only assert it is attached — WebGL rendering is
    // not verifiable in a headless browser environment.
    await expect(home.lightningCanvas).toBeAttached()
  })
})

test.describe('Homepage — navigation bar', () => {
  test('nav logo text reads ToolMind', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.navLogo).toBeVisible()
    await expect(home.navLogo).toHaveText('ToolMind')
  })

  test('Directory nav link has href /directory', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.navLinkDirectory).toBeVisible()
    await expect(home.navLinkDirectory).toHaveAttribute('href', '/directory')
  })

  test('Categories nav link has href /categories', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.navLinkCategories).toBeVisible()
    await expect(home.navLinkCategories).toHaveAttribute('href', '/categories')
  })

  test('Compare nav link has href /compare', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.navLinkCompare).toBeVisible()
    await expect(home.navLinkCompare).toHaveAttribute('href', '/compare')
  })

  test('Log in button is visible and links to /login', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.navButtonLogin).toBeVisible()
    await expect(home.navButtonLogin).toHaveAttribute('href', '/login')
  })

  test('Get started button is visible and links to /signup', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.navButtonGetStarted).toBeVisible()
    await expect(home.navButtonGetStarted).toHaveAttribute('href', '/signup')
  })
})

test.describe('Homepage — search bar interaction', () => {
  test('search input is visible with correct placeholder', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.heroSearchInput).toBeVisible()
    await expect(home.heroSearchInput).toHaveAttribute(
      'placeholder',
      'What do you want to do?'
    )
  })

  test('user can type in the search input', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.heroSearchInput.fill('image generation')

    await expect(home.heroSearchInput).toHaveValue('image generation')
  })

  test('search input accepts focus without error', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.heroSearchInput.focus()
    await expect(home.heroSearchInput).toBeFocused()
  })

  test('search input loses focus on blur', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.heroSearchInput.focus()
    await home.heroSearchInput.blur()

    await expect(home.heroSearchInput).not.toBeFocused()
  })
})

test.describe('Homepage — Featured Tools section', () => {
  test('section headline is visible', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.featuredHeadline).toBeVisible()
  })

  test('exactly 6 tool cards are rendered', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.toolCards()).toHaveCount(6)
  })

  const EXPECTED_TOOLS = [
    { name: 'ChatGPT',     category: 'Writing',     pricing: 'Freemium' },
    { name: 'Midjourney',  category: 'Image',        pricing: 'Paid'     },
    { name: 'Cursor',      category: 'Coding',       pricing: 'Freemium' },
    { name: 'Perplexity',  category: 'Research',     pricing: 'Freemium' },
    { name: 'Notion AI',   category: 'Productivity', pricing: 'Freemium' },
    { name: 'ElevenLabs',  category: 'Audio',        pricing: 'Freemium' },
  ]

  for (const tool of EXPECTED_TOOLS) {
    test(`tool card for "${tool.name}" shows name, category, and pricing`, async ({ page }) => {
      const home = new HomePage(page)
      await home.goto()

      const card = home.toolCardByName(tool.name)
      await expect(card).toBeVisible()
      await expect(card.getByText(tool.name)).toBeVisible()
      // Use exact match on the category badge span to avoid collisions with
      // description text that may contain the same word.
      await expect(card.locator('span').filter({ hasText: new RegExp(`^${tool.category}$`) })).toBeVisible()
      await expect(card.getByText(tool.pricing)).toBeVisible()
    })
  }

  // Icons — each tool card now renders a Lucide icon SVG in the top-left icon well.
  const TOOL_ICONS: Array<{ name: string; lucideClass: string }> = [
    { name: 'ChatGPT',    lucideClass: 'lucide-message-square' },
    { name: 'Midjourney', lucideClass: 'lucide-sparkles'       },
    { name: 'Cursor',     lucideClass: 'lucide-terminal'       },
    { name: 'Perplexity', lucideClass: 'lucide-search'         },
    { name: 'Notion AI',  lucideClass: 'lucide-file-text'      },
    { name: 'ElevenLabs', lucideClass: 'lucide-mic-vocal'      },
  ]

  for (const { name, lucideClass } of TOOL_ICONS) {
    test(`tool card "${name}" renders its Lucide icon (${lucideClass})`, async ({ page }) => {
      const home = new HomePage(page)
      await home.goto()

      const icon = home.toolCardIcon(name)
      await expect(icon).toBeAttached()
      await expect(icon).toHaveClass(new RegExp(lucideClass))
    })
  }

  test('Browse all tools CTA links to /directory', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.browseAllToolsCta).toBeVisible()
    await expect(home.browseAllToolsCta).toHaveAttribute('href', '/directory')
  })
})

test.describe('Homepage — Category section', () => {
  test('section headline is visible', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.categoryHeadline).toBeVisible()
  })

  test('exactly 10 category cards are rendered', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(home.categoryCards()).toHaveCount(10)
  })

  const EXPECTED_CATEGORIES = [
    { name: 'Writing',      slug: 'writing'      },
    { name: 'Coding',       slug: 'coding'       },
    { name: 'Image',        slug: 'image'        },
    { name: 'Video',        slug: 'video'        },
    { name: 'Audio',        slug: 'audio'        },
    { name: 'Research',     slug: 'research'     },
    { name: 'Productivity', slug: 'productivity' },
    { name: 'Data',         slug: 'data'         },
    { name: 'Marketing',    slug: 'marketing'    },
    { name: 'Support',      slug: 'support'      },
  ]

  for (const cat of EXPECTED_CATEGORIES) {
    test(`category card "${cat.name}" links to /categories/${cat.slug}`, async ({ page }) => {
      const home = new HomePage(page)
      await home.goto()

      const card = home.categoryCardByName(cat.name)
      await expect(card).toBeVisible()
      await expect(card).toHaveAttribute('href', `/categories/${cat.slug}`)
    })
  }
})

test.describe('Homepage — Category section icons', () => {
  const CATEGORY_ICONS: Array<{ name: string; lucideClass: string }> = [
    { name: 'Writing',      lucideClass: 'lucide-pen-tool'    },
    { name: 'Coding',       lucideClass: 'lucide-code-xml'    },
    { name: 'Image',        lucideClass: 'lucide-image'       },
    { name: 'Video',        lucideClass: 'lucide-video'       },
    { name: 'Audio',        lucideClass: 'lucide-headphones'  },
    { name: 'Research',     lucideClass: 'lucide-book-open'   },
    { name: 'Productivity', lucideClass: 'lucide-zap'         },
    { name: 'Data',         lucideClass: 'lucide-chart-no-axes-column' },
    { name: 'Marketing',    lucideClass: 'lucide-trending-up' },
    { name: 'Support',      lucideClass: 'lucide-headset'     },
  ]

  for (const { name, lucideClass } of CATEGORY_ICONS) {
    test(`category card "${name}" renders its Lucide icon (${lucideClass})`, async ({ page }) => {
      const home = new HomePage(page)
      await home.goto()

      const icon = home.categoryCardIcon(name)
      await expect(icon).toBeAttached()
      await expect(icon).toHaveClass(new RegExp(lucideClass))
    })
  }
})

test.describe('Homepage — Footer', () => {
  test('footer is visible', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    await expect(home.footer).toBeVisible()
  })

  test('footer logo links to homepage', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    await expect(home.footerLogo).toBeVisible()
    await expect(home.footerLogo).toHaveAttribute('href', '/')
  })

  test('copyright text is present', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    await expect(home.footerCopyright).toBeVisible()
    await expect(home.footerCopyright).toContainText('ToolMind')
    await expect(home.footerCopyright).toContainText('All rights reserved')
  })

  test('footer nav has 3 links: Directory, Categories, Compare', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    await expect(home.footerNavLinks).toHaveCount(3)
  })

  test('footer Directory link has correct href', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    const directoryLink = home.footer.getByRole('link', { name: 'Directory' })
    await expect(directoryLink).toHaveAttribute('href', '/directory')
  })

  test('footer Categories link has correct href', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    const categoriesLink = home.footer.getByRole('link', { name: 'Categories' })
    await expect(categoriesLink).toHaveAttribute('href', '/categories')
  })

  test('footer Compare link has correct href', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await home.footer.scrollIntoViewIfNeeded()
    const compareLink = home.footer.getByRole('link', { name: 'Compare' })
    await expect(compareLink).toHaveAttribute('href', '/compare')
  })
})

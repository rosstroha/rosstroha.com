import { test, expect } from '@playwright/test'

const employers = [
  {
    id: 'f5',
    name: 'F5',
    role: 'Software Engineer III',
    dates: 'February 2022 to present',
    website: 'https://www.f5.com/',
  },
  {
    id: '6kites',
    name: '6kites',
    role: 'Full-Stack Software Engineer, Consultant',
    dates: 'January 2021 to February 2022',
    website:
      'https://web.archive.org/web/20220519215912/https://www.6kites.com/',
  },
  {
    id: 'northwoods',
    name: 'Northwoods',
    role: 'Software Engineer',
    dates: 'January 2017 to November 2020',
    website: 'https://www.teamnorthwoods.com/',
  },
  {
    id: 'icc',
    name: 'ICC',
    role: 'Software Engineer, Consultant',
    dates: 'June 2013 to December 2016',
    website: 'https://g2o.com/',
  },
]

test('company logos keep their measured size throughout entry and return', async ({
  page,
}) => {
  for (const width of [320, 1397]) {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/#experience')

    for (const employer of employers) {
      for (const name of [employer.name, 'Return to Experience']) {
        await page.getByRole('button', { name, exact: true }).click()
        await expect(page.locator('.world-stage')).toHaveAttribute(
          'data-started',
          'true',
        )

        const samples = await page.evaluate((id) => {
          const stage = document.querySelector<HTMLElement>('.world-stage')!
          const source = stage.querySelector<HTMLElement>(
            `[data-layer="parent"] [data-world-tile="${id}"] .company-logo`,
          )!
          const target = stage.querySelector<HTMLElement>(
            '[data-layer="inner"] .employment-logo',
          )!
          const logo = stage.querySelector<HTMLElement>('.transition-logo')!
          const animations = stage.getAnimations({ subtree: true })
          const entering = stage.dataset.transition === 'enter'

          animations.forEach((animation) => animation.pause())

          const positions = [0, 450, 899].map((time) => {
            animations.forEach((animation) => {
              animation.currentTime = entering ? time : 899 - time
            })

            return {
              source: source.getBoundingClientRect().toJSON(),
              target: target.getBoundingClientRect().toJSON(),
              logo: logo.getBoundingClientRect().toJSON(),
              contentOpacity: getComputedStyle(
                stage.querySelector('[data-layer="inner"] h1')!,
              ).opacity,
            }
          })

          animations.forEach((animation) => {
            animation.currentTime = 899
            animation.play()
          })

          return positions
        }, employer.id)

        const [start, middle, end] = samples

        for (const dimension of ['x', 'y', 'width', 'height']) {
          expect(Math.abs(start.logo[dimension] - start.source[dimension]))
            .toBeLessThan(1)
          expect(Math.abs(end.logo[dimension] - end.target[dimension]))
            .toBeLessThan(1)
        }

        for (const dimension of ['x', 'y', 'width', 'height']) {
          expect(middle.logo[dimension]).toBeGreaterThanOrEqual(
            Math.min(start.logo[dimension], end.logo[dimension]) - 1,
          )
          expect(middle.logo[dimension]).toBeLessThanOrEqual(
            Math.max(start.logo[dimension], end.logo[dimension]) + 1,
          )
        }

        expect(middle.logo.width / middle.logo.height).toBeCloseTo(
          start.logo.width / start.logo.height,
          2,
        )
        expect(Number(middle.contentOpacity)).toBe(0)
        expect(Number(end.contentOpacity)).toBeCloseTo(1, 2)

        await expect(page.locator('.world-stage')).toHaveAttribute(
          'data-transition',
          'idle',
        )
        await expect(
          page.locator('.transition-logo, .transition-logo-hidden'),
        ).toHaveCount(0)
      }
    }
  }
})

test('company tiles open roles with logos and external website links', async ({
  page,
  isMobile,
}) => {
  await page.goto('/#experience')
  await expect(page.locator('.world-tile')).toHaveCount(4)
  await expect(page.locator('.child-label')).toHaveText(
    employers.map((employer) => employer.name),
  )
  await expect(page.locator('.world-tile a')).toHaveCount(0)

  for (const employer of employers) {
    const tile = page.getByRole('button', { name: employer.name, exact: true })
    const logo = tile.getByRole('img', { name: `${employer.name} logo` })

    await expect(logo).toBeVisible()
    const loaded = await logo.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
    )
    const source = await logo.getAttribute('src')

    expect(loaded).toBe(true)

    await logo.click()
    await expect(page).toHaveURL(new RegExp(`#${employer.id}$`))
    await expect(
      page.getByRole('heading', { name: employer.name }),
    ).toBeFocused()
    await expect(page.locator('.employment-meta')).toHaveText(
      employer.role + employer.dates,
    )
    await expect(page.locator('.world-description')).not.toContainText(
      'Placeholder',
    )
    await expect(page.locator('.employment-logo')).toHaveAttribute(
      'src',
      source!,
    )
    await expect(page.locator('.employment-logo')).toBeVisible()

    const website = page.getByRole('link', {
      name: `${employer.name} website (external link, opens in a new tab)`,
    })
    const companyLogo = page.getByRole('link', {
      name: `${employer.name} logo: website (opens in a new tab)`,
    })

    for (const link of [companyLogo, website]) {
      await expect(link).toHaveAttribute('href', employer.website)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }

    await expect(website.locator('.external-link-icon')).toBeVisible()

    const roleLogo = page.locator('.employment-logo')

    await page.mouse.move(0, 0)
    await expect(roleLogo).toHaveCSS('translate', '0px')

    if (!isMobile) {
      await companyLogo.hover()
      await expect(roleLogo).toHaveCSS('translate', '0px -4px')
      await page.mouse.move(0, 0)
      await expect(roleLogo).toHaveCSS('translate', '0px')
    }

    await page.keyboard.press('Tab')
    await companyLogo.focus()
    await expect(roleLogo).toHaveCSS('translate', '0px -4px')

    await page.getByRole('button', { name: 'Return to Experience' }).click()
    await expect(
      page.getByRole('button', { name: employer.name, exact: true }),
    ).toBeFocused()
    await tile.locator('.tile-invitation').click()
    await expect(
      page.getByRole('heading', { name: employer.name }),
    ).toBeFocused()

    await page.context().route(employer.website, (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<title>Company website</title>',
      }),
    )

    for (const link of [companyLogo, website]) {
      const opened = page.waitForEvent('popup')

      await link.click()

      const tab = await opened

      await expect(tab).toHaveURL(employer.website)
      await expect(page).toHaveURL(new RegExp(`#${employer.id}$`))
      await tab.close()
    }

    await page.goto('/#experience')
  }
})

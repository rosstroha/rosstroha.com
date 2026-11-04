import { test, expect } from '@playwright/test'

test('nested worlds expand and return to their original place', async ({
  page,
}) => {
  await page.goto('/')
  const about = page.getByRole('button', { name: 'About', exact: true })
  const original = await about.boundingBox()
  await about.click()
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeFocused()
  await expect(page).toHaveURL(/#about$/)
  await page.getByRole('button', { name: 'Biography', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await expect(
    page.getByText(/Placeholder content for Biography/),
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Return to About', exact: true })
    .click()
  await expect(
    page.getByRole('button', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await page
    .getByRole('button', { name: 'Return to Ross Troha', exact: true })
    .click()
  await expect(about).toBeFocused()
  await expect
    .poll(async () => {
      const box = await about.boundingBox()
      return box && original
        ? Math.abs(box.x - original.x) + Math.abs(box.y - original.y)
        : Infinity
    })
    .toBeLessThan(2)
})

test('entry expands a world surface instead of a rectangular overlay', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'About', exact: true }).click()
  const heading = page.getByRole('heading', { name: 'About', exact: true })
  const layer = heading.locator('xpath=ancestor::section/parent::*')
  await expect
    .poll(() => layer.evaluate((element) => getComputedStyle(element).clipPath))
    .not.toBe('none')
  await expect(heading).toBeFocused()
})

for (const [category, leaf] of [
  ['Work', 'Skills'],
  ['Projects', 'Experiments'],
  ['Contact', 'Social'],
]) {
  test(`${category} has a complete nested journey`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: category, exact: true }).click()
    await expect(
      page.getByRole('heading', { name: category, exact: true }),
    ).toBeFocused()
    await page.getByRole('button', { name: leaf, exact: true }).click()
    if (leaf === 'Social') {
      await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/rosstroha',
      )
      await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
        'href',
        'https://github.com/rosstroha',
      )
    } else {
      await expect(
        page.getByText(`Placeholder content for ${leaf}.`, { exact: false }),
      ).toBeVisible()
    }
    await expect(
      page.getByRole('heading', { name: leaf, exact: true }),
    ).toBeFocused()
    await page
      .getByRole('button', { name: `Return to ${category}`, exact: true })
      .click()
    await expect(
      page.getByRole('button', { name: leaf, exact: true }),
    ).toBeFocused()
  })
}

test('direct addresses survive refresh and browser history', async ({
  page,
}) => {
  await page.goto('/#biography')
  await expect(
    page.getByRole('heading', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await page.getByRole('button', { name: 'Return to About' }).click()
  await expect(
    page.getByRole('button', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await page.goBack()
  await expect(
    page.getByRole('heading', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await page.goForward()
  await expect(
    page.getByRole('button', { name: 'Biography', exact: true }),
  ).toBeFocused()
  await page.goto('/#does-not-exist')
  await expect(
    page.getByRole('heading', { name: 'Ross Troha', exact: true }),
  ).toBeVisible()
  await expect(page).toHaveURL(/#home$/)
})

test('the home link and browser history animate between home and a nested world', async ({
  page,
}) => {
  await page.goto('/#social')
  await page.getByRole('link', { name: 'ROSS TROHA', exact: true }).click()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'return',
  )
  await expect(
    page.getByRole('button', { name: 'Contact', exact: true }),
  ).toBeFocused()
  await expect(page).toHaveURL(/#home$/)

  await page.goBack()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'enter',
  )
  await expect(
    page.getByRole('heading', { name: 'Social', exact: true }),
  ).toBeFocused()
  await expect(page).toHaveURL(/#social$/)

  await page.goForward()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'return',
  )
  await expect(
    page.getByRole('button', { name: 'Contact', exact: true }),
  ).toBeFocused()
  await expect(page).toHaveURL(/#home$/)
})

test('browser history can reverse an unfinished transition', async ({ page }) => {
  await page.goto('/#home')
  await page.getByRole('button', { name: 'About', exact: true }).click()
  await page.goBack()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'return',
  )
  await page.goForward()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'enter',
  )
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeFocused()
  await expect(page.locator('.scene-layer')).toHaveCount(1)
  await expect(
    page.getByRole('button', { name: 'Biography', exact: true }),
  ).toBeEnabled()
})

test('home and browser history respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#social')
  await page.getByRole('link', { name: 'ROSS TROHA', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Contact', exact: true }),
  ).toBeFocused()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'idle',
  )

  await page.goBack()
  await expect(
    page.getByRole('heading', { name: 'Social', exact: true }),
  ).toBeFocused()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'idle',
  )

  await page.goForward()
  await expect(
    page.getByRole('button', { name: 'Contact', exact: true }),
  ).toBeFocused()
  await expect(page.locator('.world-stage')).toHaveAttribute(
    'data-transition',
    'idle',
  )
})

test('keyboard visitors can enter and return with visible focus', async ({
  page,
}) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const about = page.getByRole('button', { name: 'About', exact: true })
  await expect(about).toBeFocused()
  expect(
    await about.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeFocused()
  await page.getByRole('button', { name: 'Return to Ross Troha' }).focus()
  await page.keyboard.press('Space')
  await expect(about).toBeFocused()
})

test('reduced motion changes scenes immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('button', { name: 'About', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeFocused()
  await expect(
    page.getByRole('button', { name: 'Biography', exact: true }),
  ).toBeEnabled()
  await expect(
    page.getByRole('heading', { name: 'Ross Troha', includeHidden: true }),
  ).toHaveCount(0)
  await page.getByRole('button', { name: 'Return to Ross Troha' }).click()
  await expect(
    page.getByRole('button', { name: 'About', exact: true }),
  ).toBeFocused()
})

test('entry and return animate geometry while blocking repeated activation', async ({
  page,
}) => {
  await page.goto('/')
  const size = page.viewportSize()!
  await page.getByRole('button', { name: 'About', exact: true }).click()
  const section = page
    .getByRole('heading', { name: 'About', exact: true })
    .locator('xpath=ancestor::section')
  await expect(
    page.getByRole('button', { name: 'Biography', exact: true }),
  ).toBeDisabled()
  await expect
    .poll(async () => (await section.boundingBox())!.width)
    .toBeLessThan(size.width * 0.9)
  await expect
    .poll(async () => (await section.boundingBox())!.width)
    .toBeGreaterThan(size.width * 0.5)
  await expect(
    page.getByRole('heading', { name: 'About', exact: true }),
  ).toBeFocused()
  await page.getByRole('button', { name: 'Return to Ross Troha' }).click()
  const exiting = page
    .getByRole('heading', { name: 'About', exact: true, includeHidden: true })
    .locator('xpath=ancestor::section')
  await expect
    .poll(async () => (await exiting.boundingBox())?.width ?? 0)
    .toBeLessThan(size.width * 0.8)
  await expect(
    page.getByRole('button', { name: 'About', exact: true }),
  ).toBeFocused()
})

test('parent scaling stays aligned with entry and return progress', async ({
  page,
}) => {
  await page.goto('/')

  for (const control of ['About', 'Return to Ross Troha']) {
    await page.getByRole('button', { name: control, exact: true }).click()

    await expect
      .poll(() =>
        page.evaluate(() => {
          const parent = document.querySelector('[data-layer="parent"]')!
          const inner = document.querySelector('[data-layer="inner"]')

          if (!inner) {
            return false
          }

          const parentScale = new DOMMatrix(getComputedStyle(parent).transform).a
          const innerScale = new DOMMatrix(getComputedStyle(inner).transform).a
          const animation = inner.getAnimations().find((candidate) =>
            (candidate.effect as KeyframeEffect)
              .getKeyframes()
              .some((frame) => frame.transform),
          )!
          const frames = (animation.effect as KeyframeEffect).getKeyframes()
          const miniatureScale = Math.min(
            ...frames.map((frame) => new DOMMatrix(frame.transform as string).a),
          )
          const expansion = (innerScale - miniatureScale) / (1 - miniatureScale)

          return (
            parentScale > 1.005 &&
            parentScale < 1.115 &&
            Math.abs(parentScale - (1 + 0.12 * expansion)) < 0.002
          )
        }),
      )
      .toBe(true)

    await expect(page.locator('.world-stage')).toHaveAttribute(
      'data-transition',
      'idle',
    )
  }
})

import { test, expect } from '@playwright/test'

test('nested worlds expand and return to their original place', async ({ page }) => {
  await page.goto('/')
  const about = page.getByRole('button', { name: 'About', exact: true })
  const original = await about.boundingBox()
  await about.click()
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeFocused()
  await expect(page).toHaveURL(/#about$/)
  await page.getByRole('button', { name: 'Biography', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Biography', exact: true })).toBeFocused()
  await expect(page.getByText(/Placeholder content for Biography/)).toBeVisible()
  await page.getByRole('button', { name: 'Return to About', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Biography', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Return to Ross Troha', exact: true }).click()
  await expect(about).toBeFocused()
  await expect.poll(async () => {
    const box = await about.boundingBox()
    return box && original ? Math.abs(box.x - original.x) + Math.abs(box.y - original.y) : Infinity
  }).toBeLessThan(2)
})

test('entry expands a world surface instead of a rectangular overlay', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'About', exact: true }).click()
  const heading = page.getByRole('heading', { name: 'About', exact: true })
  const layer = heading.locator('xpath=ancestor::section/parent::*')
  await expect.poll(() => layer.evaluate(element => getComputedStyle(element).clipPath)).not.toBe('none')
  await expect(heading).toBeFocused()
})

for (const [category, leaf] of [['Work', 'Skills'], ['Projects', 'Experiments'], ['Contact', 'Social']]) {
  test(`${category} has a complete nested journey`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: category, exact: true }).click()
    await expect(page.getByRole('heading', { name: category, exact: true })).toBeFocused()
    await page.getByRole('button', { name: leaf, exact: true }).click()
    await expect(page.getByText(`Placeholder content for ${leaf}.`, { exact: false })).toBeVisible()
    await expect(page.getByRole('heading', { name: leaf, exact: true })).toBeFocused()
    await page.getByRole('button', { name: `Return to ${category}`, exact: true }).click()
    await expect(page.getByRole('button', { name: leaf, exact: true })).toBeFocused()
  })
}

test('direct addresses survive refresh and browser history', async ({ page }) => {
  await page.goto('/#biography')
  await expect(page.getByRole('heading', { name: 'Biography', exact: true })).toBeFocused()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Biography', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Return to About' }).click()
  await expect(page.getByRole('button', { name: 'Biography', exact: true })).toBeFocused()
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Biography', exact: true })).toBeFocused()
  await page.goForward()
  await expect(page.getByRole('button', { name: 'Biography', exact: true })).toBeFocused()
  await page.goto('/#does-not-exist')
  await expect(page.getByRole('heading', { name: 'Ross Troha', exact: true })).toBeVisible()
  await expect(page).toHaveURL(/#home$/)
})

test('keyboard visitors can enter and return with visible focus', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const about = page.getByRole('button', { name: 'About', exact: true })
  await expect(about).toBeFocused()
  expect(await about.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Return to Ross Troha' }).focus()
  await page.keyboard.press('Space')
  await expect(about).toBeFocused()
})

test('reduced motion changes scenes immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('button', { name: 'About', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Biography', exact: true })).toBeEnabled()
  await expect(page.getByRole('heading', { name: 'Ross Troha', includeHidden: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Return to Ross Troha' }).click()
  await expect(page.getByRole('button', { name: 'About', exact: true })).toBeFocused()
})

test('entry and return animate geometry while blocking repeated activation', async ({ page }) => {
  await page.goto('/')
  const size = page.viewportSize()!
  await page.getByRole('button', { name: 'About', exact: true }).click()
  const section = page.getByRole('heading', { name: 'About', exact: true }).locator('xpath=ancestor::section')
  await expect(page.getByRole('button', { name: 'Biography', exact: true })).toBeDisabled()
  await expect.poll(async () => (await section.boundingBox())!.width).toBeLessThan(size.width * .9)
  await expect.poll(async () => (await section.boundingBox())!.width).toBeGreaterThan(size.width * .5)
  await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Return to Ross Troha' }).click()
  const exiting = page.getByRole('heading', { name: 'About', exact: true, includeHidden: true }).locator('xpath=ancestor::section')
  await expect.poll(async () => (await exiting.boundingBox())?.width ?? 0).toBeLessThan(size.width * .8)
  await expect(page.getByRole('button', { name: 'About', exact: true })).toBeFocused()
})

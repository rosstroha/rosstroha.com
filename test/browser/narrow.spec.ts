import { test, expect } from '@playwright/test'

for (const width of [320, 375, 412, 700, 844, 1397]) {
  test(`viewport width ${width} keeps content inside visible world surfaces`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const world of ['home', 'about', 'work', 'projects', 'contact', 'biography', 'interests', 'experience', 'skills', 'featured', 'experiments', 'email', 'social']) {
      await page.goto(`/#${world}`)
      await expect(page.locator('.world-stage')).toHaveAttribute('data-transition', 'idle')
      const perspectives = await page.locator('.main-tile, .world-tile').evaluateAll(tiles => tiles.map(tile => {
        const matrix = new DOMMatrix(getComputedStyle(tile, '::before').transform)
        return Math.hypot(matrix.b, matrix.d) / Math.hypot(matrix.a, matrix.c)
      }))
      for (const perspective of perspectives) expect(perspective).toBeCloseTo(.58, 2)
      const overflow = await page.locator('.main-tile, .world-tile').evaluateAll(tiles => tiles.flatMap(tile => {
        const surface = getComputedStyle(tile, '::before')
        const bounds = tile.getBoundingClientRect()
        const surfaceWidth = parseFloat(surface.width)
        const surfaceHeight = parseFloat(surface.height)
        const matrix = new DOMMatrix(surface.transform)
        // Map visible content corners back into the painted surface's coordinates.
        matrix.e = 0
        matrix.f = 0
        const inverse = matrix.inverse()
        return Array.from(tile.querySelectorAll('.return-control, .parent-emblem, .world-marker, .tile-eyebrow, h1, .world-description, .child-label, .tile-invitation, .miniature-center, .miniature-option, .miniature-option i, .miniature-lines i')).flatMap(child => {
          if (child.getClientRects().length === 0) return []
          const box = child.getBoundingClientRect()
          const corners = [[box.left, box.top], [box.right, box.top], [box.left, box.bottom], [box.right, box.bottom]]
          const contained = corners.every(([x, y]) => {
            const point = inverse.transformPoint(new DOMPoint((x - bounds.left - bounds.width / 2) / (bounds.width / (tile as HTMLElement).offsetWidth), (y - bounds.top - bounds.height / 2) / (bounds.height / (tile as HTMLElement).offsetHeight)))
            return Math.abs(point.x) <= surfaceWidth / 2 + 1 && Math.abs(point.y) <= surfaceHeight / 2 + 1
          })
          return contained ? [] : [`${tile.textContent}: ${child.className}`]
        })
      }))
      expect(overflow, world).toEqual([])
    }
  })
}

for (const viewport of [{ width: 667, height: 375 }, { width: 844, height: 390 }]) {
  test(`short landscape ${viewport.width}x${viewport.height} keeps lower worlds reachable`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    for (const category of ['Projects', 'Contact']) {
      const button = page.getByRole('button', { name: category, exact: true })
      await page.mouse.move(viewport.width / 2, viewport.height / 2)
      await page.mouse.wheel(0, 700)
      await expect(button).toBeInViewport()
      await button.click({ timeout: 5000 })
      await expect(page.getByRole('heading', { name: category, exact: true })).toBeFocused()
      await page.getByRole('button', { name: 'Return to Ross Troha', exact: true }).click()
      await expect(button).toBeFocused()
    }
  })
}

test('a narrow screen keeps worlds distinct and leaf controls within its surface', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect.poll(async () => {
    const buttons = await page.getByRole('button').all()
    const boxes = await Promise.all(buttons.map(button => button.boundingBox()))
    return boxes.every((box, index) => box && box.x >= 0 && box.x + box.width <= 320 && boxes.every((other, otherIndex) => otherIndex === index || other && (box.x + box.width <= other.x || other.x + other.width <= box.x || box.y + box.height <= other.y || other.y + other.height <= box.y)))
  }).toBe(true)
  await page.goto('/#biography')
  await expect(page.getByRole('heading', { name: 'Biography' })).toBeVisible()
  await expect.poll(async () => {
    const tile = await page.locator('.main-tile').boundingBox()
    const arrow = await page.getByRole('button', { name: 'Return to About' }).boundingBox()
    return Boolean(tile && arrow && tile.x >= 0 && tile.x + tile.width <= 320 && arrow.x > tile.x && arrow.x + arrow.width < tile.x + tile.width && arrow.y > tile.y && arrow.y + arrow.height < tile.y + tile.height)
  }).toBe(true)
})

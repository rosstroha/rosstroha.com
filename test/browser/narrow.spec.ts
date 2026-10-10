import { test, expect } from '@playwright/test'

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

import { test, expect } from '@playwright/test'
import { worlds, parents } from '../../src/navigation/worlds'

test('connectors end at the child tiles in each category layout', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const world of ['home', 'about', 'projects']) {
    await page.goto(`/#${world}`)

    const geometry = await page.locator('.scene-stage').evaluate((stage) => {
      const svg = stage.querySelector<SVGSVGElement>('.connectors')!
      const path = svg.querySelector('path')!
      const matrix = svg.getScreenCTM()!
      const segments = path.getAttribute('d')!.match(/M[^M]+/g)!
      const tiles = stage.querySelectorAll('.world-tile')

      const distances = segments.map((segment, index) => {
        const [, , x, y] = segment.slice(1).trim().split(/\s+/).map(Number)
        const endpoint = new DOMPoint(x, y).matrixTransform(matrix)
        const tile = tiles[index].getBoundingClientRect()

        return Math.hypot(
          endpoint.x - tile.left - tile.width / 2,
          endpoint.y - tile.top - tile.height / 2,
        )
      })

      return {
        distances,
        connectorCount: segments.length,
        tileCount: tiles.length,
      }
    })

    expect(geometry.connectorCount, world).toBe(geometry.tileCount)

    for (const distance of geometry.distances) {
      expect(distance, world).toBeLessThan(3)
    }
  }
})

test('shared captions, exploration cues, and return controls work in every world', async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const world of worlds.values()) {
    await page.goto(`/#${world.id}`)
    await expect(
      page.locator(`[data-world-heading="${world.id}"]`),
    ).toBeFocused()
    await expect(page.locator('.scene-caption')).toHaveText(
      'ROSS TROHASOFTWARE ENGINEER',
    )
    await expect(page.locator('.scene-footnote, footer')).toHaveCount(0)

    const tiles = page.locator('.world-tile')
    for (const tile of await tiles.all()) {
      await expect(tile.locator('.child-label')).toBeVisible()
      await expect(tile.locator('.tile-invitation')).toBeHidden()
      await page.keyboard.press('Tab')
      await tile.focus()
      await expect(tile.locator('.tile-invitation')).toBeVisible()
      await page.locator('h1').focus()
    }

    const parent = parents.get(world.id)
    if (parent) {
      const control = page.getByRole('button', {
        name: `Return to ${parent.label}`,
        exact: true,
      })
      const lift = () =>
        control.evaluate((el) => getComputedStyle(el, '::before').translate)
      await page.mouse.move(0, 0)
      await expect.poll(lift).toBe('0px')
      if (!isMobile) {
        const box = (await page.locator('.main-tile').boundingBox())!
        // A rectangular-container corner lies outside the painted diamond.
        await page.mouse.move(box.x + 4, box.y + 4)
        await expect.poll(lift).toBe('0px')
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
        await expect.poll(lift).toBe('0px -3px')
        await expect(control.locator('.parent-up-arrow')).toHaveCSS(
          'opacity',
          '0',
        )
        await control.hover()
        await expect.poll(lift).toBe('0px -3px')
        await expect(control.locator('.parent-up-arrow')).toHaveCSS(
          'opacity',
          '1',
        )
        await expect(control.locator('.parent-emblem')).toHaveCSS(
          'translate',
          '0px -8px',
        )
      }
      await page.mouse.move(0, 0)
      await page.keyboard.press('Tab')
      await control.focus()
      await expect(control.locator('.parent-up-arrow')).toHaveCSS(
        'opacity',
        '1',
      )
      await expect.poll(lift).toBe('0px -3px')
      await control.click()
      await expect(page).toHaveURL(new RegExp(`#${parent.id}$`))
    } else {
      await expect(page.locator('.return-control')).toHaveCount(0)
    }
    await page.getByRole('link', { name: 'ROSS TROHA' }).click()
    await expect(page).toHaveURL(/#home$/)
    await expect(
      page.getByRole('heading', { name: 'Ross Troha', exact: true }),
    ).toBeVisible()
  }
})

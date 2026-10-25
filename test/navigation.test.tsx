import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import { afterEach, beforeEach, expect, test } from 'vitest'
import { useWorldNavigation } from '../src/navigation/useWorldNavigation'
import { worlds } from '../src/navigation/worlds'

function NavigationHarness() {
  const { current, navigate } = useWorldNavigation()
  return (
    <>
      <h1>{current.label}</h1>
      <button onClick={() => navigate(worlds.get('about')!)}>
        Enter About
      </button>
    </>
  )
}

beforeEach(() => window.history.replaceState(null, '', '/'))
afterEach(cleanup)

test('a direct nested link opens its world', () => {
  window.history.replaceState(null, '', '#biography')
  render(<NavigationHarness />)
  expect(screen.getByRole('heading', { name: 'Biography' })).toBeVisible()
})

test('entering a world updates its address', () => {
  render(<NavigationHarness />)
  fireEvent.click(screen.getByRole('button', { name: 'Enter About' }))
  expect(screen.getByRole('heading', { name: 'About' })).toBeVisible()
  expect(window.location.hash).toBe('#about')
})

test('browser back and forward restore the previously visited worlds', async () => {
  window.history.replaceState(null, '', '#home')
  render(<NavigationHarness />)
  fireEvent.click(screen.getByRole('button', { name: 'Enter About' }))
  await act(async () => {
    window.history.back()
  })
  expect(
    await screen.findByRole('heading', { name: 'Ross Troha' }),
  ).toBeVisible()
  await act(async () => {
    window.history.forward()
  })
  expect(await screen.findByRole('heading', { name: 'About' })).toBeVisible()
})

test('an unknown direct link is replaced with the home address', () => {
  window.history.replaceState(null, '', '#missing-world')
  render(<NavigationHarness />)
  expect(screen.getByRole('heading', { name: 'Ross Troha' })).toBeVisible()
  expect(window.location.hash).toBe('#home')
})

test('editing the address to another world changes the visible scene', async () => {
  render(<NavigationHarness />)
  await act(async () => {
    window.location.hash = '#social'
  })
  expect(await screen.findByRole('heading', { name: 'Social' })).toBeVisible()
})

test.each(['', '#home'])('the root address %s opens Ross Troha', (hash) => {
  window.history.replaceState(null, '', `/${hash}`)
  render(<NavigationHarness />)
  expect(screen.getByRole('heading', { name: 'Ross Troha' })).toBeVisible()
})

test('refreshing a selected world restores its scene', () => {
  const firstRender = render(<NavigationHarness />)
  fireEvent.click(screen.getByRole('button', { name: 'Enter About' }))
  firstRender.unmount()
  render(<NavigationHarness />)
  expect(screen.getByRole('heading', { name: 'About' })).toBeVisible()
})

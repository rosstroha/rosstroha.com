import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
})

test('entering a world focuses its heading for reduced motion visitors', async () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'About' }))
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'About' })).toHaveFocus(),
  )
})

test('world activation is blocked while its miniature expands', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'About' }))
  const biography = screen.getByRole('button', { name: 'Biography' })
  expect(biography).toBeDisabled()
  fireEvent.click(biography)
  expect(window.location.hash).toBe('#about')
})

test('returning from a nested world restores focus to its parent tile', async () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'About' }))
  fireEvent.click(screen.getByRole('button', { name: 'Biography' }))
  fireEvent.click(screen.getByRole('button', { name: 'Return to About' }))
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Biography' })).toHaveFocus(),
  )
  fireEvent.click(screen.getByRole('button', { name: 'Return to Ross Troha' }))
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'About' })).toHaveFocus(),
  )
})

test('animation completion makes the new world interactive and focuses its heading', async () => {
  vi.useFakeTimers()
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'About' }))
  act(() => vi.advanceTimersByTime(980))
  expect(screen.getByRole('heading', { name: 'About' })).toHaveFocus()
  expect(screen.getByRole('button', { name: 'Biography' })).toBeEnabled()
  vi.useRealTimers()
})

test('browser history can interrupt an entry without leaving controls blocked', async () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'About' }))
  window.history.replaceState(null, '', '#work')
  fireEvent(window, new PopStateEvent('popstate'))
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Work' })).toHaveFocus(),
  )
  expect(screen.getByRole('button', { name: 'Experience' })).toBeEnabled()
})

test('browser Back to a parent restores focus to the world just exited', async () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'About' }))
  fireEvent.click(screen.getByRole('button', { name: 'Biography' }))
  await act(async () => {
    window.history.back()
  })
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Biography' })).toHaveFocus(),
  )
  await act(async () => {
    window.history.forward()
  })
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Biography' })).toHaveFocus(),
  )
})

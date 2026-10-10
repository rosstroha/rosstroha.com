import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Scene } from '../src/Scene'
import { home, worlds, type World } from '../src/navigation/worlds'

function Journey({ busy = false }: { busy?: boolean }) {
  const [node, setNode] = useState<World>(home)
  return <Scene node={node} parent={node === home ? undefined : home} busy={busy} onEnter={setNode} onReturn={() => setNode(home)} />
}

test('category tiles enter a world through keyboard activation', async () => {
  const user = userEvent.setup()
  render(<Journey />)
  expect(screen.getByRole('heading', { name: 'Ross Troha' })).toBeVisible()
  screen.getByRole('button', { name: 'About', exact: true }).focus()
  await user.keyboard('{Enter}')
  expect(screen.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
})

test('leaf worlds visibly identify their replaceable placeholder content', () => {
  render(<Scene node={worlds.get('biography')!} parent={worlds.get('about')} busy={false} onEnter={() => {}} onReturn={() => {}} />)
  expect(screen.getByText(/Placeholder content for Biography/)).toBeVisible()
  expect(screen.getByRole('button', { name: 'Return to About' })).toBeVisible()
})

test('the separate arrow in a child world returns to its parent', async () => {
  const user = userEvent.setup()
  render(<Journey />)
  expect(screen.queryByRole('button', { name: /Return to/ })).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'About', exact: true }))
  await user.click(screen.getByRole('button', { name: 'Return to Ross Troha' }))
  expect(screen.getByRole('heading', { name: 'Ross Troha' })).toBeVisible()
})

test('busy worlds prevent activation of their child tiles and return arrow', async () => {
  const user = userEvent.setup()
  render(<Scene node={worlds.get('about')!} parent={home} busy onEnter={() => { throw new Error('Busy tile activated') }} onReturn={() => { throw new Error('Busy return activated') }} />)
  const biography = screen.getByRole('button', { name: 'Biography' })
  const arrow = screen.getByRole('button', { name: 'Return to Ross Troha' })
  expect(biography).toBeDisabled()
  expect(arrow).toBeDisabled()
  await user.click(biography)
  await user.click(arrow)
  expect(screen.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
})

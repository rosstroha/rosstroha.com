import type { World } from './worlds'
export interface Origin { x: number; y: number; width: number; height: number }
export interface SceneProps {
  node: World
  parent?: World
  busy: boolean
  onEnter: (node: World, element: HTMLElement) => void
  onReturn: () => void
}
export interface Journey {
  from: World
  to: World
  direction: 'enter' | 'return'
  origin: Origin
}

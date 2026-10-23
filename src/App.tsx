import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Scene } from './Scene'
import { useWorldNavigation } from './navigation/useWorldNavigation'
import { parents, type World } from './navigation/worlds'
import type { Journey, Origin } from './navigation/contracts'
import './transitions.css'

const duration = 900
function App(): React.JSX.Element {
  const { current, navigate } = useWorldNavigation()
  const stage = useRef<HTMLDivElement>(null)
  const [journey, setJourney] = useState<Journey | null>(null)
  const [started, setStarted] = useState(false)
  const focusTile = useRef<string | null>(null)
  const previousWorld = useRef(current)
  const returnMeasured = useRef(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const complete = () => { setJourney(null); setStarted(false) }
  useEffect(() => {
    if (!journey) return
    if (current.id !== journey.to.id || reduced) { complete(); return }
    const frame = requestAnimationFrame(() => setStarted(true))
    // A fallback also completes when a tab is hidden and transitionend is omitted.
    const timer = window.setTimeout(complete, duration + 80)
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer) }
  }, [journey, current.id, reduced])

  useLayoutEffect(() => {
    if (previousWorld.current.id !== current.id) {
      focusTile.current = parents.get(previousWorld.current.id)?.id === current.id
        ? previousWorld.current.id : null
      previousWorld.current = current
    }
    if (journey) return
    const tile = focusTile.current
    focusTile.current = null
    const selector = tile ? `[data-world-tile="${tile}"]` : `[data-world-heading="${current.id}"]`
    const target = stage.current?.querySelector<HTMLElement>(selector)
      ?? stage.current?.querySelector<HTMLElement>(`[data-world-heading="${current.id}"]`)
    target?.focus()
  }, [current.id, journey])

  const measure = (element: HTMLElement): Origin => {
    const bounds = element.getBoundingClientRect()
    const viewport = stage.current!.getBoundingClientRect()
    return {
      x: bounds.left - viewport.left + bounds.width / 2 - viewport.width / 2,
      y: bounds.top - viewport.top + bounds.height / 2 - viewport.height / 2,
      width: bounds.width, height: bounds.height
    }
  }
  const enter = (node: World, element: HTMLElement) => {
    if (journey) return
    const origin = measure(element)
    if (!reduced) setJourney({ from: current, to: node, direction: 'enter', origin })
    navigate(node)
  }
  const goBack = () => {
    const parent = parents.get(current.id)
    if (journey || !parent) return
    returnMeasured.current = false
    if (!reduced) setJourney({
      from: current, to: parent, direction: 'return',
      origin: { x: 0, y: 0, width: 160, height: 100 }
    })
    navigate(parent)
  }

  // Measure the mounted parent again so returns also follow a resized layout.
  useLayoutEffect(() => {
    if (!journey || journey.direction !== 'return' || returnMeasured.current) return
    returnMeasured.current = true
    const tile = stage.current?.querySelector<HTMLElement>(`[data-world-scene="${journey.to.id}"] [data-world-tile="${journey.from.id}"]`)
    if (tile) {
      const layer = tile.closest<HTMLElement>('.scene-layer')!
      layer.style.transform = 'none'
      const origin = measure(tile)
      layer.style.removeProperty('transform')
      setJourney({ ...journey, origin })
    }
  }, [journey])

  const createNodes = (node: World) => {
    const active = node.id === current.id
    const expanding = journey && node.id === (journey.direction === 'enter' ? journey.to.id : journey.from.id)
    return <div key={node.id} className="scene-layer" data-layer={expanding ? 'inner' : 'parent'}
      aria-hidden={!active} inert={!active} onTransitionEnd={event => {
        if (event.target === event.currentTarget && event.propertyName === 'transform' && expanding) complete()
      }}>
      <Scene node={node} parent={parents.get(node.id)} busy={Boolean(journey)} onEnter={enter} onReturn={goBack} />
    </div>
  }

  const viewport = stage.current?.getBoundingClientRect()
  const variables = journey ? {
    '--origin-x': `${journey.origin.x}px`, '--origin-y': `${journey.origin.y}px`,
    '--mini-x': String(journey.origin.width / (viewport?.width || window.innerWidth || 1)),
    '--mini-y': String(journey.origin.height / (viewport?.height || window.innerHeight || 1)),
  } as CSSProperties : undefined

  const nodes = journey ? [journey.from, journey.to] : [current]

  return (
    <main className="world-app">
      <div
        ref={stage}
        className="world-stage"
        style={variables}
        data-transition={journey ? journey.direction : 'idle'}
        data-started={started}
        aria-busy={Boolean(journey)}
      >
        {nodes.map(createNodes)}
      </div>
    </main>
  );
}
export default App

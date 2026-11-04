import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { home, worlds, type World } from './worlds'

export function useWorldNavigation(
  onNavigate?: (from: World, to: World) => void,
): {
  current: World
  navigate: (world: World) => void
} {
  const [current, setCurrent] = useState(
    () => worlds.get(window.location.hash.slice(1)) ?? home,
  )
  const currentWorld = useRef(current)
  const onNavigateRef = useRef(onNavigate)

  useLayoutEffect(() => {
    onNavigateRef.current = onNavigate
  }, [onNavigate])

  const changeWorld = useCallback((world: World) => {
    const previous = currentWorld.current

    if (previous.id === world.id) {
      return
    }

    onNavigateRef.current?.(previous, world)
    currentWorld.current = world
    setCurrent(world)
  }, [])

  useEffect(() => {
    const update = () => {
      const id = window.location.hash.slice(1)
      const world = worlds.get(id)
      if (id && !world) {
        window.history.replaceState(null, '', '#home')
      }

      changeWorld(world ?? home)
    }

    update()
    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [changeWorld])

  const navigate = (world: World) => {
    if (world.id === currentWorld.current.id) {
      return
    }

    window.history.pushState(null, '', `#${world.id}`)
    changeWorld(world)
  }

  return { current, navigate }
}

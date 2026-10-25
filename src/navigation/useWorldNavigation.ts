import { useEffect, useState } from 'react'
import { home, worlds, type World } from './worlds'

export function useWorldNavigation(): {
  current: World
  navigate: (world: World) => void
} {
  const [current, setCurrent] = useState(
    () => worlds.get(window.location.hash.slice(1)) ?? home,
  )

  useEffect(() => {
    const update = () => {
      const id = window.location.hash.slice(1)
      const world = worlds.get(id)
      if (id && !world) {
        window.history.replaceState(null, '', '#home')
      }

      setCurrent(world ?? home)
    }

    update()
    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
    }
  }, [])

  const navigate = (world: World) => {
    window.history.pushState(null, '', `#${world.id}`)
    setCurrent(world)
  }

  return { current, navigate }
}

import type { CSSProperties } from 'react'
import type { SceneProps } from './navigation/contracts'

export function Scene({ node, parent, busy, onEnter, onReturn }: SceneProps) {
  return <section className="world-scene" data-world-scene={node.id} style={{ '--accent': node.accent } as CSSProperties}>
    <div className="scene-caption"><a href="#home">ROSS TROHA</a><span>SOFTWARE ENGINEER</span></div>
    <div className={`scene-stage ${node.children?.length === 2 ? 'two-worlds' : ''} ${node.content ? 'leaf-world' : ''}`}>
      {node.children && <svg className="connectors" viewBox="0 0 1000 680" preserveAspectRatio="none" aria-hidden="true"><path d={node.children.length === 4 ? 'M500 340 190 160M500 340 810 160M500 340 190 520M500 340 810 520' : 'M500 340 190 160M500 340 810 520'} /></svg>}
      <div className="main-tile">
        {parent && <button type="button" className="return-control" aria-label={`Return to ${parent.label}`} title={`Return to ${parent.label}`} style={{ '--parent-accent': parent.accent } as CSSProperties} disabled={busy} onClick={onReturn}><svg className="parent-emblem" aria-hidden="true" viewBox="-6 -6 44 44"><g className="parent-bars" transform="rotate(-15 16 16)"><rect x="5" y="9" width="6" height="14" rx="2" /><rect x="13" y="6" width="6" height="20" rx="2" /><rect x="21" y="9" width="6" height="14" rx="2" /></g><path className="parent-up-arrow" d="M7 16 16 7 25 16M16 7v19" /></svg></button>}
        <span className="world-marker" aria-hidden="true"><i /><i /><i /></span>
        <span className="tile-eyebrow">{node.content ? 'A PLACEHOLDER WORLD' : parent ? 'A WORLD TO EXPLORE' : 'WELCOME TO MY CORNER'}</span>
        <h1 tabIndex={-1} data-world-heading={node.id}>{node.label}</h1>
        {parent && <p className="world-description">{node.content ?? node.description}</p>}
      </div>
      {
          node.children?.map(
            (child, index) => <button key={child.id} type="button" className={`world-tile position-${index}`} style={{ '--accent': child.accent } as CSSProperties} aria-label={child.label} data-world-tile={child.id} disabled={busy} onClick={event => onEnter(child, event.currentTarget)}>
              <span className="miniature" aria-hidden="true"><span className="miniature-center" />{child.children?.map((preview, previewIndex) => <span key={preview.id} className={`miniature-option mini-position-${previewIndex}`}><i />{preview.label}</span>) ?? <span className="miniature-lines"><i /><i /><i /></span>}</span>
              <span className="child-label">{child.label}</span>
              <span className="tile-invitation" aria-hidden="true">EXPLORE <svg viewBox="0 0 16 16"><path d="M3 8h10m-4-4 4 4-4 4" /></svg></span>
            </button>
        )
      }
    </div>
  </section>
}

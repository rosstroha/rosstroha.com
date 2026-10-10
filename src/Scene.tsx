import type { CSSProperties } from 'react'
import type { SceneProps } from './navigation/contracts'

export function Scene({ node, parent, busy, onEnter, onReturn }: SceneProps) {
  return <section className="world-scene" data-world-scene={node.id} style={{ '--accent': node.accent } as CSSProperties}>
    <div className="scene-caption" aria-hidden="true"><span>ROSS TROHA</span><span>AN EXPLORATION</span></div>
    <div className={`scene-stage ${node.children?.length === 2 ? 'two-worlds' : ''} ${node.content ? 'leaf-world' : ''}`}>
      {node.children && <svg className="connectors" viewBox="0 0 1000 680" preserveAspectRatio="none" aria-hidden="true"><path d={node.children.length === 4 ? 'M500 340 190 160M500 340 810 160M500 340 190 520M500 340 810 520' : 'M500 340 190 160M500 340 810 520'} /></svg>}
      <div className="main-tile">
        {parent && <button type="button" className="return-arrow" aria-label={`Return to ${parent.label}`} disabled={busy} onClick={onReturn}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m14 6-6 6 6 6M8 12h12" /></svg></button>}
        <span className="world-marker" aria-hidden="true"><i /><i /><i /></span>
        <span className="tile-eyebrow">{node.content ? 'A PLACEHOLDER WORLD' : parent ? 'A WORLD TO EXPLORE' : 'WELCOME TO MY CORNER'}</span>
        <h1 tabIndex={-1} data-world-heading={node.id}>{node.label}</h1>
        <p className="world-description">{node.content ?? node.description}</p>
      </div>
      {
          node.children?.map(
            (child, index) => <button key={child.id} type="button" className={`world-tile position-${index}`} style={{ '--accent': child.accent } as CSSProperties} aria-label={child.label} data-world-tile={child.id} disabled={busy} onClick={event => onEnter(child, event.currentTarget)}>
              <span className="miniature" aria-hidden="true"><span className="miniature-center" />{child.children?.map((preview, previewIndex) => <span key={preview.id} className={`miniature-option mini-position-${previewIndex}`}><i />{preview.label}</span>) ?? <span className="miniature-lines"><i /><i /><i /></span>}</span>
              <span className="child-label">{child.label}</span>
              <span className="tile-invitation" aria-hidden="true">ENTER WORLD <svg viewBox="0 0 16 16"><path d="M3 8h10m-4-4 4 4-4 4" /></svg></span>
            </button>
        )
      }
    </div>
    <p className="scene-footnote">{node.children ? 'Choose a world. Follow your curiosity.' : 'A little space for something worth sharing.'}</p>
  </section>
}

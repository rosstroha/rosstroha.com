import type { SceneProps } from './navigation/contracts'

export function Scene({ node, parent, busy, onEnter, onReturn }: SceneProps) {
  return (
    <section
      className={`world-scene theme-${node.theme}`}
      data-world-scene={node.id}
    >
      <div
        className={`scene-stage ${node.children?.length === 2 ? 'two-worlds' : ''} ${node.content || node.links ? 'leaf-world' : ''}`}
      >
        {node.children && (
          <svg
            className="connectors"
            viewBox="0 0 1000 680"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={
                node.children.length === 4
                  ? 'M500 340 190 160M500 340 810 160M500 340 190 520M500 340 810 520'
                  : 'M500 340 190 160M500 340 810 520'
              }
            />
          </svg>
        )}
        <div className="main-tile">
          {parent && (
            <button
              type="button"
              className={`return-control theme-${parent.theme}`}
              aria-label={`Return to ${parent.label}`}
              title={`Return to ${parent.label}`}
              disabled={busy}
              onClick={onReturn}
            >
              <svg
                className="parent-emblem"
                aria-hidden="true"
                viewBox="-6 -6 44 44"
              >
                <g className="parent-bars" transform="rotate(-15 16 16)">
                  <rect x="5" y="9" width="6" height="14" rx="2" />
                  <rect x="13" y="6" width="6" height="20" rx="2" />
                  <rect x="21" y="9" width="6" height="14" rx="2" />
                </g>
                <path
                  className="parent-up-arrow"
                  d="M7 16 16 7 25 16M16 7v19"
                />
              </svg>
            </button>
          )}
          <span className="world-marker" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="tile-eyebrow">
            {node.links
              ? 'FIND ME ONLINE'
              : node.content
                ? 'A PLACEHOLDER WORLD'
                : parent
                  ? 'A WORLD TO EXPLORE'
                  : 'WELCOME TO MY CORNER'}
          </span>
          <h1 tabIndex={-1} data-world-heading={node.id}>
            {node.label}
          </h1>
          {node.links ? (
            <nav
              className="world-description profile-links"
              aria-label="Profiles"
              inert={busy}
            >
              {node.links.map((link) => (
                <a key={link.href} href={link.href}>
                  <svg
                    className="profile-logo"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {link.label === 'LinkedIn' ? (
                      <path d="M20.45 0H3.55C1.59 0 0 1.55 0 3.46v17.08C0 22.45 1.59 24 3.55 24h16.9c1.96 0 3.55-1.55 3.55-3.46V3.46C24 1.55 22.41 0 20.45 0ZM7.12 20.45H3.56V9h3.56ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45Z" />
                    ) : (
                      <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.31c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z" />
                    )}
                  </svg>
                  <span className="profile-label">
                    {link.label}
                    <svg
                      className="profile-arrow"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M4 12 12 4M4 4h8v8" />
                    </svg>
                  </span>
                </a>
              ))}
            </nav>
          ) : (
            parent && (
              <p className="world-description">
                {node.content ?? node.description}
              </p>
            )
          )}
        </div>
        {node.children?.map((child, index) => (
          <button
            key={child.id}
            type="button"
            className={`world-tile position-${index} theme-${child.theme}`}
            aria-label={child.label}
            data-world-tile={child.id}
            disabled={busy}
            onClick={(event) => onEnter(child, event.currentTarget)}
          >
            <span className="miniature" aria-hidden="true">
              <span className="miniature-center" />
              {child.children?.map((preview, previewIndex) => (
                <span
                  key={preview.id}
                  className={`miniature-option mini-position-${previewIndex}`}
                  data-world-preview={preview.id}
                >
                  <i />
                  {preview.label}
                </span>
              )) ?? (
                <span className="miniature-lines">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </span>
            <span className="child-label">{child.label}</span>
            <span className="tile-invitation" aria-hidden="true">
              EXPLORE{' '}
              <svg viewBox="0 0 16 16">
                <path d="M3 8h10m-4-4 4 4-4 4" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

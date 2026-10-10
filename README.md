# rosstroha.com

A React and Vite personal website with nested isometric worlds. Enter a tile to explore its interior. Each inner world's main tile contains a return arrow. URLs such as `/#about` and `/#biography` support direct links, refresh, and browser history.

## Development

```bash
npm install
npm run dev
```

## Content

Edit `src/navigation/worlds.ts` to replace the sample text. The `home` tree is the source for navigation, parent relationships, decorative previews, and world colors. Each world needs a unique URL-safe `id`, a `label`, `description`, and CSS color `accent`. Add `children` for an inner scene or `content` for a leaf. Leaf content currently displays explicitly marked placeholders.

The scene layout supports two or four child tiles. Update the positions and connectors in `Scene.tsx` and `styles.css` when adding other arrangements. IDs are public hash addresses, so preserve existing IDs when replacing content.

Transitions use native CSS transforms for 900 ms. Both scenes stay mounted during entry and return; activation is blocked until completion. Reduced motion changes scenes immediately. Keyboard and touch use native buttons, and focus follows the heading on entry and the exited tile on return.

## Verification

```bash
npx playwright install chromium
npm test
npm run test:browser
npm run typecheck
npm run build
```

Component tests cover activation, parents, content, focus, hash navigation, and busy controls. Chromium tests cover desktop and mobile nested journeys, transition geometry, keyboard interaction, narrow layouts, direct addresses, refresh, history, and reduced motion.

Pushes to `main` automatically build and deploy `dist` through GitHub Actions. In repository settings, set GitHub Pages' source to **GitHub Actions**. This feature does not change deployment configuration.

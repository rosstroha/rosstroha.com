# rosstroha.com

This repository contains a personal portfolio built with React, TypeScript, and Vite. Its nested isometric worlds present professional experience, projects, and interests.

## Project guidance

- Keep changes scoped to the requested behavior. Preserve existing navigation, URL, accessibility, responsive, and reduced-motion behavior unless the task changes them.
- Favor readable TypeScript, JSX, and CSS. Put statements on separate lines, separate logical phases with blank lines, and expand nested JSX and multi-statement callbacks.
- Apply KISS and YAGNI to behavior, dependencies, and abstractions. Do not add dependencies or code for hypothetical cases.
- Do not modify unrelated or pre-existing untracked files.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run typecheck` checks TypeScript.
- `npm test` runs unit tests.
- `npm run test:browser` runs Playwright browser tests.
- `npm run build` creates the production build.

Run checks relevant to the change. Browser tests need a local Vite server and may require an environment that permits starting it.

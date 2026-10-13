# Psychotherapy and cognitive behavioral therapy guide

An educational reading guide in Arabic at `/` and Turkish at `/tr/`. The Turkish page uses the same layout and contains Turkish terminology, navigation, and diagrams. Translation is stored locally in `docs/CBT.tr.md` and `src/lib/guide-tr.ts`; no translation service or library is used.

The Arabic source is `docs/CBT.md`. The website reflects the selected, edited reading edition of that document.

## Development

```sh
bun install
bun run dev
```

## Static build

Both routes are prerendered to complete HTML using [TanStack Start static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering). The deployed site needs only a static file host. JavaScript handles the contents drawer and navigation in the browser.

Build for this repository's GitHub Pages project path:

```sh
bun run build:pages
```

The workflow in `.github/workflows/pages.yml` checks the source, builds both language pages, and publishes only `.output/public/` to GitHub Pages on every push to `main`. It can also be run manually from the Actions tab. Repository Settings → Pages uses **GitHub Actions** as the publishing source.

Published pages:

- [Arabic guide](https://omarauf.github.io/cognitive-behavioral-therapy/)
- [Turkish guide](https://omarauf.github.io/cognitive-behavioral-therapy/tr/)

The deployment artifact includes:

```text
.output/public/
  .nojekyll
  index.html
  tr/index.html
  assets/
```

The GitHub Pages build uses `/cognitive-behavioral-therapy/` as its base path. For a renamed repository, update the base path in `build:pages` and the published URLs above.

Hosting is entirely on GitHub Pages. Nitro builds a temporary server for prerendering; `.output/server/` is never uploaded. No application server runs in production. The local build command does not publish anything by itself.

## Checks

```sh
bun run typecheck
bun run test
bunx biome check src vite.config.ts
```

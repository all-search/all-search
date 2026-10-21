![all-search](https://socialify.git.ci/all-search/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

[English](./README.md) | [简体中文](./README.zh-CN.md)

## all-search, a search engine jump menu

A fixed menu that lets you jump between search engines. One codebase, two delivery forms:

- **Browser extension** — Chrome / Edge / Firefox, built with [WXT](https://wxt.dev) (Manifest V3)
- **Userscript** — Tampermonkey / ScriptCat, built with `vite-plugin-monkey`

Both share the same Vue 3 UI, isolated from the host page with Shadow DOM.

## Install

### Browser extension

1. Download `all-search-<version>-chrome.zip` (or `-firefox.zip`) from [Releases](https://github.com/all-search/all-search/releases)
2. Unzip it, open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked** and pick the unzipped folder
3. Firefox: open `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on** and pick `manifest.json` inside the unzipped folder

### Userscript

- [GreasyFork](https://greasyfork.org/zh-CN/scripts/397993-all-search)
- [ScriptCat](https://scriptcat.org/script-show-page/477)
- [GitHub raw](https://raw.github.com/all-search/all-search/release/index.user.js)

## Settings

- **Extension**: click “菜单设置” in the menu bar, or open `chrome://extensions` → All-Search → Details → Extension options. The options page runs locally and stores data in `chrome.storage.local`.
- **Userscript**: the same link opens the [online config page](https://all-search.github.io/all-search/config/sites), which talks to the userscript through the page bridge.

## Features

- GUI to add / edit sites, drag to reorder categories
- Horizontal (top / bottom) and vertical (left / right) layouts
- Click a category to open its first site; Ctrl / middle-click always uses the *other* open mode
- Configurable click behavior per area: main menu vs. selection toolbar (current tab / new tab)
- Auto-hide on scroll, collapsible bar, text-selection toolbar, global search dialog
- Works on 200+ sites with per-site tweaks (`src/config/loadList.ts`)
- Fixed headers never sit under the menu bar: per-site offsets are generated at build time, with runtime hit-testing as a fallback for uncovered sites

## Development

```bash
pnpm install
pnpm dev:plugin    # WXT dev server, opens a browser with the extension loaded
pnpm dev:script    # userscript watch build (packages/script/dist)
pnpm dev:options   # standalone config site (http://localhost:3000/all-search/)
```

## Build

```bash
pnpm build:script   # packages/script/dist/index.user.js  (GreasyFork)
pnpm build:plugin   # packages/plugin/.output/*-chrome.zip (Chrome Web Store)
pnpm zip:firefox    # packages/plugin/.output/*-firefox.zip (AMO)
pnpm build:options  # packages/options/dist (GitHub Pages)
```

> **Windows note**: if the build fails with `[vite:esbuild-transpile] remove ...: Access is denied`, point `TEMP` at the repo before building:
>
> ```powershell
> New-Item -ItemType Directory -Force .tmp\build | Out-Null
> $env:TEMP="$PWD\.tmp\build"; $env:TMP=$env:TEMP
> ```

## Test

```bash
pnpm test          # vitest + jsdom — unit tests
pnpm e2e           # browser regression (Playwright + local Edge/Chrome)
pnpm type-check    # vue-tsc
pnpm lint
```

`pnpm e2e` builds both bundles first, then:

- **plugin** — loads the unpacked extension and checks the menu bar, the dropdown direction in all four layouts, and that “菜单设置” opens the bundled options page
- **userscript** — simulates Tampermonkey (Vue global + `GM_*` shims) and injects `dist/index.user.js`

## Site style scan

Some sites pin a header to the top of the viewport, which would end up underneath the 30px menu bar. Those offsets are **generated at build time** instead of being computed on every page:

```bash
pnpm style:scan                 # scan every site in loadList that has a `probe`
pnpm style:scan --site=github   # only matching sites
pnpm style:scan --limit=10      # first N sites
pnpm style:scan --dry           # print the result, do not write
pnpm style:scan --fresh         # full rescan instead of merging
```

The result is written to `src/config/generatedStyle.ts` and committed. At runtime a site with a generated rule only gets the static CSS (zero JS cost); other sites fall back to the `elementsFromPoint` sampler in `src/util/addSpecialStyle.ts`.

Every run re-verifies its own output: rules whose element is no longer `fixed`/`sticky` are dropped, and sites behind a captcha page are skipped and reported.
- **selection** — text-selection toolbar: the “更多” dialog keeps the selected keyword and opens the target in a new tab

Options: `--no-build` (reuse artifacts), `--headed` (show the browser), `--only=plugin|userscript`.
Screenshots land in `e2e/artifacts/` (gitignored). Override the browser with `E2E_CHANNEL` or `E2E_EXECUTABLE`.

## Project layout

| Path | Role |
| --- | --- |
| `src/` | Shared Vue components, config, storage adapters, mount/layout logic |
| `packages/script/` | Userscript entry + userscript metadata |
| `packages/plugin/` | WXT extension: content script, background, options page, icons |
| `packages/options/` | Standalone config site (Element Plus + Vue Router) |

## Thanks

Thanks to searchEngineJump for the idea and URL source. Similar tools:
[搜索酱](https://greasyfork.org/zh-CN/scripts/445274-searchjumper) ·
[searchEngineJump](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

If this helps you, a ⭐ on GitHub is appreciated.

## Feedback

- [GitHub Issues](https://github.com/all-search/all-search/issues)
- Tencent Channel: pd15449687

## License

[GPL-3.0](./LICENSE)

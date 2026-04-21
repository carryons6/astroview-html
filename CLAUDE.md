# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

Single-file static site: `index.html` (~4.3 MB, 188 lines — most lines are very long because asset bundles are inlined). No build system, no package.json, no tests. Deployed as static assets via Cloudflare Pages; every push to `main` triggers a redeploy.

Production URL: https://astroview-html.pages.dev/

## How the page loads

`index.html` is not hand-written HTML. It is output from an external bundler that inlines the entire app:

- A placeholder SVG thumbnail (`#__bundler_thumbnail`) and a `#__bundler_loading` status pill render immediately so something is visible before JS runs.
- A `DOMContentLoaded` handler reads two inline script blocks — `<script type="__bundler/manifest">` and `<script type="__bundler/template">` — then unpacks/executes the bundled app, replacing the placeholder.
- A global `window.addEventListener('error', ...)` appends a red error overlay (`#__bundler_err`) at the bottom of the page. When debugging a broken page, look for this overlay first; it survives DOM replacement because the listener is on `window`.

Do not reformat or "clean up" the long manifest/template script blocks — they are generated payloads, not source.

## Editing workflow

The app source lives elsewhere (this repo only holds the bundled artifact). Treat `index.html` as a build output:

- Small tweaks to the pre-bundle shell (the visible `<style>`, loading text, thumbnail SVG, error overlay styling) can be edited directly in the first ~60 lines.
- Anything inside the `__bundler/manifest` or `__bundler/template` script blocks should be regenerated upstream rather than patched here.

## Deploy

Cloudflare Pages project is configured with:
- Framework preset: None
- Build command: empty
- Build output directory: `/`

There is no local dev server. To preview changes, push to `main` and wait ~1 min for Pages to redeploy, or open `index.html` directly in a browser.

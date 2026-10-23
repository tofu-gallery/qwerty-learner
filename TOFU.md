# Qwerty Learner on Tofu

Qwerty Learner is a vocabulary typing trainer for people who use a physical keyboard: pick a word list, type each word
while its pronunciation and meaning are shown, then review mistakes and progress. This is an independent copy of the
upstream open-source application; the Qwerty Learner name, logo, favicon and upstream attribution are unchanged.

## How Tofu runs it

- Framework preset: `vite`. The site root is the repository root (`index.html`).
- Package manager: Yarn Classic 1.22.22, declared in `package.json`, with the repository's own `yarn.lock`. Upstream's
  `.yarnrc` and most lockfile entries resolve packages from `registry.npmmirror.com`.
- Install: `yarn install --frozen-lockfile --non-interactive`.
- Build: `yarn build`. Output directory: `dist/`.
- Local production preview: `yarn preview --host 127.0.0.1 --port 4173 --strictPort`.
- Environment variables: none. Leave `REACT_APP_DEPLOY_ENV` unset; upstream's `pages` value moves the app under
  `/qwerty-learner`.
- Database, server code, sign-in, API keys, Tofu-owned credentials: none.

`vercel.json` repeats these build settings and rewrites every path that is not a file to `index.html`, so direct links
and reloads of the client-side routes (`/gallery`, `/analysis`, `/error-book`, `/friend-links`, `/mobile`) work. Another
host needs the same fallback: upstream's `public/404.html` is a GitHub Pages redirect for a project subdirectory and
does not work at a site root.

**Hosting lane.** The source is about 87 MB in 690 files (about 25 MB compressed), mostly the bundled dictionaries in
`public/dicts/` (largest file 4.6 MB); `dist/` is about 96 MB in 474 files. That fits Tofu's intake (50 MB compressed,
250 MB unpacked, 25 MB per file), but not Tofu's shared static lane, which takes npm-locked Vite apps whose Vite
configuration matches the grammar it supports, with at most 50 MB of source. This app uses Yarn, an executable
`vite.config.ts` (Git commit lookup, bundle visualizer, icon plugin) and more source than that, so it needs Tofu's
Vercel hosting. Check how a Free account's copy is routed before offering it on the Free plan.

## Data and outside services

Practice records, the error book and statistics live in the visitor's browser (IndexedDB through Dexie); settings live
in localStorage. They stay in that browser at that address, do not sync between devices, and disappear if the browser's
site data is cleared; upstream's export and import buttons make backups.

Word lists, key sounds and images are bundled, and text uses system fonts. Word pronunciation streams from Youdao's
public endpoint (`https://dict.youdao.com/dictvoice`, no key). It preloads the current and next word as soon as the
page opens, so Youdao receives the words being practised and the visitor's IP address. Typing practice and saved
records keep working when Youdao is unreachable. Reading a translation aloud uses the browser's own speech synthesis.

Upstream's author, community, donation and mirror links stay as they were; they lead to the upstream maintainers, not to
Tofu. The commercial promotion component in the source is not mounted in this revision. The search metadata in
`index.html` (canonical address, Open Graph image) still names the upstream site.

The trainer is built for desktop keyboards. At widths of 600 px or less it shows upstream's mobile information page
instead.

## What changed from upstream, and why (2026-10-23)

- **No visitor analytics.** Removed the Google Analytics tag and the unused Google Fonts and upstream-site preconnects
  from `index.html`; removed Vercel Analytics and Mixpanel from `src/index.tsx` and their packages from `package.json`
  and `yarn.lock`; pointed upstream's tracking helpers (`src/utils/mixpanel.ts`, `src/utils/trackEvent.ts`) at a no-op
  (`src/utils/disabledTelemetry.ts`), so upstream's call sites stay unchanged.
- **Builds from a source archive into `dist/`.** `vite.config.ts` writes to `dist/` and labels the build `unknown` when
  there is no Git metadata (upstream's callback returned without resolving its promise in that case, so the
  configuration never finished loading); the build uses the site root as its asset base; `package.json` declares Yarn
  Classic 1.22.22, the release that matches this v1 lockfile, and adds a `preview` script; `vercel.json` added;
  `.gitignore` ignores `dist/`.
- **The copy stays itself.** The header logo links to the copy's own home page instead of the upstream site; the
  community QR image comes from the copy's own `public/` folder instead of the upstream site; the footer's link to the
  upstream site's ICP filing, which does not cover a copy hosted elsewhere, now links this copy's source.

Each modified source file starts with a dated note; `package.json`, `yarn.lock`, `vercel.json` and `.gitignore` are
recorded here instead.

## Dictionary rights: decide before offering this copy

The GPL covers the code, not every bundled word list. Upstream's dictionary page (`src/pages/Gallery-N/index.tsx`) says
the dictionary data comes from several open-source projects and community contributors, is for personal study and
research only, and must not be used commercially. That notice stays in the app. Confirm the rights to the datasets, or
replace them with suitably licensed ones, before Tofu offers this app as a ready-made copy. The `pin/2026-10-23` tag
records that the build was verified, not that the dictionaries were cleared.

## Known upstream issue

`tsc --noEmit` reports two errors in `src/utils/mixpanel.ts`: `isWordVisible` is not on `TypingState`. They are
upstream's, the Vite build does not type-check, and the value only fed the removed telemetry.

## Source and licence

- Upstream: <https://github.com/RealKai42/qwerty-learner>, branch `master`, base commit
  `1182426f2bd0a28c95302c33f9e19136b1262a70`.
- This fork: <https://github.com/tofu-gallery/qwerty-learner>. `master` mirrors upstream untouched; every adaptation is
  on the `tofu` branch, and the gallery pins the tag `pin/2026-10-23`.
- Licence: GNU GPL version 3, in the unchanged root `LICENSE`. Upstream's notices and copyright lines are kept, and
  Tofu's changes are released under the same licence.
- The footer's *Source (GPL-3.0)* link points at the pinned tag, so each copy offers the source it was built from. A
  later pin changes that link to its own tag. Whoever changes a copy further publishes that version's source and points
  the link at it.

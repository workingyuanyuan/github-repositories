# Rules for agents maintaining this site

This site documents the public GitHub repositories of `workingyuanyuan`. It is served at `https://yuanaruru.com/github-repositories/` from the repository `github-repositories`. Its first readers are AI agents; humans come second. Markdown source is the only content source, and the HTML is a skin over it.

## Decisions

- 2026-11-22, owner: the site moved from the domain root to `/github-repositories/`, unchanged, and the root became the owner's index of sites (`workingyuanyuan.github.io/`). Pages keep their paths below the site address (`/repos/kage/` is now `/github-repositories/repos/kage/`). The root site keeps a page at each old address that sends the reader on.
- Content links are written without the sub-path (`/repos/kage/`). `src/lib/hast-base.mjs` adds it in the HTML and `src/lib/page-md.mjs` writes absolute URLs in the twins.
- The domain's `robots.txt`, the IndexNow key file and the Search Console tag belong to the root site. This site's `robots.txt` only states the intent.

## Commands

```
pnpm verify      # build, then run the acceptance checks. Run this before you call a change done.
pnpm build       # build only
pnpm check       # acceptance checks on an existing dist/
node scripts/prose-review.mjs run      # after a build: a reader of another model reads prose not yet read; fix what it flags (reviews/prose-ledger.json)
node scripts/prose-review.mjs status   # count the units of prose not yet read
pnpm upstream    # compare the repositories with what the pages were written from; upstream/README.md
pnpm preview     # serve dist/ at http://127.0.0.1:4399/github-repositories/ with the same Content-Type headers as GitHub Pages
astro dev --background   # dev server; manage with `astro dev stop|status|logs`
```

## When the repositories change

Run `pnpm upstream` and read `upstream/README.md`: it says what is watched, what each line of the report means and how to update a page. A workflow runs the command every week and keeps one issue with the differences (owner's decision, 2026-11-22: weekly, not daily). Do this before you update a repository page for any other reason.

## Content rules

- Pages live in `src/content/docs/` (English) and `src/content/docs/zh-tw/` (Traditional Chinese). Every page exists in both languages with the same facts, dates, sources and code blocks.
- Pages are plain `.md`. No MDX, no components, no `:::` directives. An exception needs an explicit Markdown output and a test in `scripts/check-dist.mjs`.
- Required frontmatter, enforced by `src/content.config.ts`: `title`, `description` (one short sentence saying what the subject is: at most 110 characters in English, 70 in Chinese; details belong in the body), `appliesTo`, `caveat`, `lastVerified`, `sources`. Optional: `effectiveDate` (date of the commit or release the facts were read from), `repo`.
- The answer, scope and caveat must appear within the first 5,000 characters. There is no limit on total page length.
- State only facts you verified against the repository. Link sources to a fixed commit, not to a branch.
- Use `patch` fences for diffs, never `diff`: Starlight draws `diff` markers with CSS, so an agent reading the HTML loses the `+` and `-`.
- Commands in code blocks carry no `$` prompt.
- A page says what its subject is. Do not write text addressed to agents into visible content (no "for agents", no "how to read this site"). Guidance for agents lives in each language's `llms.txt` (its opening notes are `LLMS_NOTES` in `src/lib/site.mjs`) and in the pointer that `MarkdownContent.astro` hides from sighted readers.
- When a README gives a prompt in Chinese, keep it in Chinese inside the code block in both languages, and explain its meaning in the English page's prose.
- Do not publish personal contact details such as email addresses, even when a README lists them.

## Skin rules

- Decorative characters (`#`, `>`, `~/`) are drawn with CSS `content`. Never write them into page text.
- The header links the sidebar's sections (`SiteTitle.astro`, from the sidebar groups). The sidebar has one group, Repositories, so the header shows no section links; a second group brings them back, and `SECTIONS` in `check-dist.mjs` must list it. The Markdown twin, `llms.txt` and `index.json` are linked from the page notes, not the header. Decided 2026-11-22: the header is for human readers; the `[H]` `[M]` `[L]` `[J]` links and their keyboard shortcuts were removed.
- No status line at the bottom of the window (owner's decision).
- Three Starlight components are overridden: `SiteTitle`, `MarkdownContent` and `ThemeSelect` (three buttons, so each theme is one click away; it keeps Starlight's storage key `starlight-theme`). Prefer CSS in `src/styles/tui.css` over another override.
- The first screen shows content: the answer sits under the title, and the page notes (scope, caveat, dates, repository, sources) come after the body. A visually hidden note at the top repeats scope and caveat so that they fall within the first 5,000 extracted characters.
- The hidden note, the answer and the page notes are direct children of the article container (`MarkdownContent.astro`), with no wrapper. Readability-style extractors drop them anywhere else, and a wrapper made one keep the notes and drop the body.
- Wide windows: the table of contents keeps the sidebar's width and the text column sits in the middle of the space between the two ("Wide windows" block in `tui.css`).
- The same component adds the links on the 404 page. GitHub Pages serves one `404.html` for every language, so they are bilingual.

## Where things are

| Path | Role |
| --- | --- |
| `src/lib/site.mjs` | Site URL and sub-path, locales, URL rules for HTML pages and Markdown twins |
| `src/lib/hast-base.mjs` | Puts the sub-path in front of root-relative links in the HTML |
| `src/lib/page-md.mjs` | Builds each page's Markdown twin |
| `src/pages/[...slug].md.ts` | Serves the Markdown twins (`/repos/kage/` -> `/repos/kage.md`) |
| `src/pages/index.json.ts` | Machine-readable page list |
| `src/lib/llms.mjs`, `src/pages/[...dir]/llms.txt.ts`, `src/pages/[...dir]/llms-[set].txt.ts` | `llms.txt` and the full and digest bundles for each language (`/` and `/zh-tw/`) |
| `src/pages/robots.txt.ts` | `robots.txt` of a project site: states the intent. Crawlers read only the one at the domain root, which the root site serves |
| `src/lib/content-index.mjs` | Reads page frontmatter from disk for the check script |
| `src/routeData.ts` | Markdown alternate link and JSON-LD in `<head>` |
| `scripts/check-dist.mjs` | Acceptance checks |
| `src/lib/sitemap.mjs` | Sitemap options: `lastmod` of each page from `lastVerified` |
| `scripts/check-found.mjs` | Checks called by `check-dist.mjs`: a title and description of its own for every page, canonical, `hreflang`, sitemap |
| `scripts/check-headings.mjs` | Called by `check-dist.mjs`: h2, h3 and h4 get smaller in that order at a phone width and on wide windows, from Starlight's sizes and the skin's own `customCss` files |
| `tests/agent-eval/questions.json` | The site's question list: what readers ask, each with the expected answer and qualifier. The agent test and the search test draw from it |
| `scripts/indexnow.mjs` | Lists pages whose Markdown twin differs from the live one; the deploy workflow submits them to IndexNow. The key file is at the domain root, in the root site |
| `scripts/preview.mjs` | Local preview with GitHub Pages style headers |
| `scripts/upstream.mjs`, `upstream/`, `.github/workflows/upstream.yml` | The check on the sources: the script, its README, the list kept by hand (`sources.json`), the recorded state (`manifest.json`) and the weekly run |
| `tests/agent-eval/` | Ten pilot questions, the fetch tool for agent tests, and the recorded results |

Astro documentation: https://docs.astro.build. Starlight documentation: https://starlight.astro.build.

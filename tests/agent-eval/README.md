# Agent test

Checks whether an agent with only a fetch tool answers questions about the repositories better from this site than from the original GitHub pages.

## Files

| File | Role |
| --- | --- |
| `questions.json` | Ten pilot questions with the expected answer, the qualifier that is easy to miss, and the page that holds them. Written from the repository sources |
| `fetch.mjs` | The fetch tool given to the agent. Modelled on the MCP reference Fetch server: main-article extraction, Markdown output, 5,000 characters per call, `start_index` to continue. Every call is logged to `runs/<run>.log` |
| `results/<date>/` | Answers and fetch logs of each recorded run |

## How to run

1. Build the site with a local address and serve it:

```
SITE_URL=http://127.0.0.1:4399/github-repositories pnpm build
pnpm preview
```

2. Give a fresh agent the questions (without the expected answers), the fetch command below as its only source, a start URL, and a budget of 3 fetches per question.

```
node tests/agent-eval/fetch.mjs --run <run-name> --q <question-id> <url> [start_index]
```

Start URL for this site: `http://127.0.0.1:4399/github-repositories/`. Start URL for the baseline: `https://github.com/workingyuanyuan`.

3. Score each answer against `questions.json`: pass needs the answer and the qualifier; partial is one of the two or an unverified inference; fail is a wrong or missing answer.

4. Run `pnpm verify` afterwards so that `dist/` carries the public address again.

## Search test

Checks whether an agent that starts from a question, with no URL, finds this site. It runs on the live site once its pages are indexed. It is a record, not a gate for publishing.

1. Give a fresh agent the questions from `questions.json` (without the expected answers, and without this site's name or address), a web search tool, and the fetch command above as its only way to read a page. No start URL.
2. Record the search tool, the queries the agent made and its answers. The fetch log holds the URLs it read.
3. Score each question: pass needs a page of this site among the pages read, and the answer with its qualifier. Record "not found" when no page of this site was read.
4. For each miss, find the cause: the page is not indexed (sitemap, links, `robots.txt`); it is indexed but not chosen (the question's words are not in its title or headings, it has nothing the source lacks, nothing links to the site); or it was read and the qualifier was lost.

## Results

### 2026-11-18, reader: Claude Sonnet subagent, one run per condition

| Question | Original GitHub pages | This site |
| --- | --- | --- |
| q01 install path and license of lite-codex-subagent-delegation | pass | pass |
| q02 Simple Gemini package and latest release | partial: could not list the release asset, inferred | pass |
| q03 local-tts repository name, disk, tested hardware | pass | pass |
| q04 what to do on a pending speech job | pass | pass |
| q05 Kage and PDF, requirements | partial: "not documented" for PDF | pass |
| q06 transparent highlights in the Obsidian theme | pass | pass |
| q07 Firefox and maximum level in Pixel-Kitten-Town-Class | pass | pass |
| q08 Shinsekai bridge settings and license | fail: answered MIT, missed that there is no LICENSE file | pass |
| q09 codex-gemini-orchestrator install and -AutoApprove risk | pass | pass |
| q10 face recognition system, production readiness | fail: repository not found within 3 fetches | pass |
| Total | 6 pass, 2 partial, 2 fail | 10 pass |
| Fetches used | 20 | 13 |

Limits of this result:

- One reader model and one run per condition. Differences of one or two questions could be chance.
- The questions and the site were written by the same author, so the questions may favour what the site emphasises.
- The site was served locally, not from GitHub Pages.
- In the site run the reader fetched the home page once and reused it across questions, and one fetch was a wrong URL guess.
- After this run the home page was shortened so that every page link fits in the first 5,000 extracted characters. That change is covered by `pnpm check`, not by a new agent run.

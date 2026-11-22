# Following the sources of this site

The pages under `/repos/` are written from the public repositories of the GitHub account `workingyuanyuan`, each at one commit. The repositories change afterwards. `pnpm upstream` compares them with what the pages were written from.

```
pnpm upstream            # report. Exit 0: no difference. 1: differences. 2: the check could not be made
pnpm upstream --write    # also record the present state in upstream/manifest.json
```

It needs a GitHub token: `GITHUB_TOKEN` or `GH_TOKEN`, or a logged-in `gh`. It changes no page.

## What is watched, and where the record is

| Watched | Compared with | Kept in |
| --- | --- | --- |
| The head of each documented repository's default branch | The commit in the page's `sources` URLs (`.../blob/<sha>/<path>`) | The pages, in both languages. No other file holds the commit |
| Files a page cites (`blob`), and every file under a folder it cites (`tree`) | The paths in those URLs | The pages |
| Files a page's claims rest on without citing them: a licence file at the top of the repository (always), and the paths under `watch` | The same commit | `sources.json`, by hand |
| Default branch, archive state, licence that GitHub detects, releases (tag, date, file names), tags (name, commit), repository id (a rename keeps it) | The state at the last `--write` | `manifest.json`, written by the script |
| The public repositories of the account: one without a page, a page whose repository is gone, the forks | The pages, `noPage` in `sources.json`, the forks at the last `--write` | `sources.json` and `manifest.json` |
| A source outside the account that has no fixed version (`external`) | A SHA-256 of the one entry the page is about | `sources.json` names it, `manifest.json` holds the fingerprint |

`sources.json` is the only file kept by hand:

- `noPage`: repositories that have no page on purpose, each with the reason. Forks need no entry.
- `watch`: for a repository, paths (`*` within a folder, `**` across folders, `**/` for any folder or none) whose change is a difference although no page cites them. Add one when a page states a count or a closed list that a new file would make wrong ("holds one skill so far", "only `index.html` and `privacy.html`").
- `external`: a source of a page that pins no commit. `entry` picks the one record of a JSON list to fingerprint, so that changes to other records are not reported.

## The report

One line for each difference, then the notes, then a count. A line reads `kind: page (repository): detail`.

| Line | Meaning | What to do |
| --- | --- | --- |
| `cited files changed` | A file in the page's `sources` differs between the pinned commit and the head | Update the page (below) |
| `watched files changed` | A licence file or a `watch` path was added, removed or changed | Update the page. Cite the file if the page now states facts from it |
| `too many files to list` | 300 or more files changed, which is all the API lists | Read the comparison on GitHub, then update the page |
| `history rewritten`, `pinned commit gone` | The pinned commit is not an ancestor of the default branch, or is not in the repository | The source links of the page are broken or will break. Read the repository again and pin a commit that exists |
| `releases changed`, `tags changed`, `cited release gone` | A release or tag was published, removed or edited (another date, other files, another commit) | Update `appliesTo`, the caveat and the install steps that name a release, then `--write` |
| `licence changed` | GitHub detects another licence | Check the licence file in the repository, update the page, then `--write` |
| `default branch changed`, `archive state changed` | As named | Update `appliesTo` or the caveat, then `--write` |
| `repository renamed` | The repository id has another name, or the capitals changed | Update `repo`, every source URL and clone command on the page, and the home pages. Paths under the domain are case-sensitive |
| `repository gone` | Not a public repository of the account: deleted, private or moved. The API does not say which | Ask the owner, then remove or redirect the page, or the `noPage` entry |
| `repository replaced` | Another repository now has the name | Treat as a new repository |
| `repository without a page` | A public repository that is not a fork has neither a page nor a `noPage` entry | The owner decides: write the page in both languages and add it to the home pages, or add it to `noPage` with the reason |
| `forks changed` | The public forks are not the ones recorded | Correct the number of forks on the home pages (`src/content/docs/index.md`, `zh-tw/index.md`), then `--write` |
| `outside source changed`, `entry gone from outside source` | The entry the page is about changed or left the list | Read the source, update the page, then `--write` |
| `not in the manifest` | A page or outside source is newer than the manifest | Check that the page agrees with the repository's releases, tags and licence, then `--write` |
| `other files changed` (note) | Commits since the pinned commit touched no cited and no watched file | Nothing is due. When you update that page for another reason, or work through a report, look at the list of files: a claim that rests on one of them means the page is wrong and the path belongs in `watch` |

`check not made` with exit 2 is not a report: fix the cause it names (token, network, a page whose sources pin no commit or two commits, a source without a commit that `external` does not list) and run again.

## Updating a page

1. Read what changed between the two commits of the line: `https://github.com/<repository>/compare/<old>...<new>`, or `gh api repos/<repository>/compare/<old>...<branch>`.
2. Read the cited files at the new commit and check every fact on the page against them, as the root `AGENTS.md` says under Research and provenance: the repository files for a licence, the shipped package for a version. Update both languages.
3. Pin the new commit, also when no fact changed: the full SHA in every `sources` URL, the short SHA in the source titles and in `appliesTo`, `effectiveDate` to the date of that commit, `lastVerified` to today. All sources of a page pin the same commit.
4. A repository that was added, removed or renamed also changes the home pages (`src/content/docs/index.md`, `zh-tw/index.md`) and the count of repositories they state.
5. Run `pnpm upstream --write` when a line named something the manifest holds, then `pnpm upstream` until the page has no line left (`--write` itself leaves with 0 whatever it reports), then `pnpm verify`.
6. The owner confirms the content before the push.

`lastVerified` moves only for a page that was read against its sources again. A run without a difference moves nothing.

`--write` records releases, tags, licences, branches, forks and fingerprints as they are now, so run it after the pages agree with them, not before. It cannot hide a new commit: that comparison reads the pages.

## Schedule

`.github/workflows/upstream.yml` runs the command once a week and by hand (`gh workflow run upstream.yml`). A difference on the default branch opens one issue with the label `upstream`, assigned to the owner; later runs replace its text, comment when the kind of difference or the page changes, and close it when there is no difference. A run that could not make the check fails the workflow and leaves the issue as it is.

GitHub stops scheduled workflows in a public repository after 60 days without activity in it; `gh workflow enable upstream.yml` starts them again.

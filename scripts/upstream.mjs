// Compares the sources of this site with what its pages were written from.
//
//   pnpm upstream            report the differences. Exit 0: none. Exit 1: differences.
//                            Exit 2: the check could not be made (network, token, a page
//                            whose sources cannot be read as a pin).
//   pnpm upstream --write    also record the present state in upstream/manifest.json
//
// upstream/README.md says what is watched and what to do with each line of the report.
//
// Three places hold what is compared:
//
//   page frontmatter         `repo`, and `sources` whose URLs carry the commit the page was
//                            written from. The pages are the only record of that commit.
//   upstream/sources.json    kept by hand: the account, the repositories that have no page
//                            on purpose, extra paths behind a page's claims, and sources
//                            outside the account.
//   upstream/manifest.json   written by --write: what the pages cannot hold (repository
//                            id, default branch, licence, releases, tags, the forks, and a
//                            fingerprint of each outside source).
//
// A token is needed for the GitHub API: GITHUB_TOKEN or GH_TOKEN, or a logged-in `gh`.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { readPages } from '../src/lib/content-index.mjs';

const SOURCES = fileURLToPath(new URL('../upstream/sources.json', import.meta.url));
const MANIFEST = fileURLToPath(new URL('../upstream/manifest.json', import.meta.url));
const API = 'https://api.github.com';
/** The compare API lists at most this many files; at the limit the list may be cut. */
const FILE_LIMIT = 300;
/** A licence file at the top of a repository, under any of its usual names. */
const LICENCE = /^(licen[sc]e|copying|unlicense)([.-][^/]*)?$/i;

class CheckError extends Error {}

function token() {
	const env = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	if (env) return env;
	try {
		return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch {
		throw new CheckError('no GitHub token: set GITHUB_TOKEN, or log in with `gh auth login`');
	}
}

let auth;
/** GET a GitHub API path. Returns the parsed body, or null for 404 (and for `missing`). Retries twice. */
async function api(path, missing = []) {
	auth ??= token();
	for (let attempt = 1; ; attempt++) {
		let failure;
		try {
			const response = await fetch(API + path, {
				headers: { authorization: `Bearer ${auth}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28', 'user-agent': 'docs-site-upstream-check' },
				signal: AbortSignal.timeout(30_000),
			});
			if (response.status === 404 || missing.includes(response.status)) return null;
			if (response.ok) return await response.json();
			failure = `HTTP ${response.status}`;
			// 4xx other than a rate limit will not get better on a retry.
			if (response.status < 500 && response.status !== 429 && response.headers.get('x-ratelimit-remaining') !== '0') attempt = 3;
		} catch (error) {
			failure = error.message;
		}
		if (attempt >= 3) throw new CheckError(`${path}: ${failure}`);
		await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
	}
}

/** Every page of a list, 100 at a time. */
async function apiList(path) {
	const all = [];
	for (let page = 1; ; page++) {
		const part = await api(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
		if (part === null) return null;
		all.push(...part);
		if (part.length < 100) return all;
	}
}

/** `downloads/**`, `docs/*.md`, `package.json` -> a test on a repository path. */
function glob(pattern) {
	const source = pattern
		.split(/(\*\*\/?|\*)/)
		.map((part) => (part === '**/' ? '(?:.*/)?' : part === '**' ? '.*' : part === '*' ? '[^/]*' : part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')))
		.join('');
	return new RegExp(`^${source}$`);
}

const short = (sha) => (/^[0-9a-f]{40}$/.test(sha) ? sha.slice(0, 7) : sha);
const sha256 = (text) => createHash('sha256').update(text).digest('hex');
const sameList = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

// ---------------------------------------------------------------------------------------
// What the pages say they were written from.

function readJson(file) {
	try {
		return JSON.parse(readFileSync(file, 'utf8'));
	} catch (error) {
		throw new CheckError(`${file}: ${error.message}`);
	}
}

// Set at the start of main(), so that a file that cannot be read leaves with 2.
let sources, manifest, account, external;

/** One entry per documented repository, read from the pages of every language. */
function pins() {
	const byRepo = new Map();
	for (const { id, data } of readPages()) {
		if (!data.repo) continue;
		const pin = byRepo.get(data.repo) ?? { repo: data.repo, pages: [], shas: new Set(), cited: new Set(), folders: new Set(), releases: new Set(), outside: new Set() };
		byRepo.set(data.repo, pin);
		pin.pages.push(id);
		const prefix = `https://github.com/${data.repo}/`;
		for (const { url } of data.sources ?? []) {
			// Without `#L10` or `?plain=1`: they are not part of the path.
			const rest = url.startsWith(prefix) ? url.slice(prefix.length).replace(/[?#].*$/, '') : '';
			const blob = /^(blob|tree)\/([0-9a-f]{40})(?:\/(.+?))?\/?$/.exec(rest);
			const release = /^releases\/tag\/([^/]+)$/.exec(rest);
			if (blob) {
				pin.shas.add(blob[2]);
				// A cited folder stands for every file under it; the top of the tree for every file.
				if (blob[1] === 'tree') pin.folders.add(blob[3] ? `${decodeURIComponent(blob[3])}/` : '');
				else if (blob[3]) pin.cited.add(decodeURIComponent(blob[3]));
			} else if (release) pin.releases.add(decodeURIComponent(release[1]));
			else pin.outside.add(url);
		}
	}
	const problems = [];
	for (const pin of byRepo.values()) {
		pin.pages.sort();
		pin.page = pin.pages[0];
		if (!pin.repo.startsWith(`${account}/`)) problems.push(`${pin.page}: repo ${pin.repo} is not in the account ${account}`);
		if (pin.shas.size === 0) problems.push(`${pin.page}: no source pins a commit (…/blob/<40 hex digits>/…)`);
		if (pin.shas.size > 1) problems.push(`${pin.page}: sources pin ${pin.shas.size} different commits (${[...pin.shas].map(short).join(', ')}), in one language or between languages`);
		for (const url of pin.outside) {
			if (!external.some((e) => e.source === url && pin.pages.includes(e.page))) problems.push(`${pin.page}: source ${url} pins no commit and is not listed under "external" in upstream/sources.json`);
		}
		pin.sha = [...pin.shas][0];
	}
	for (const e of external) {
		if (![...byRepo.values()].some((pin) => pin.pages.includes(e.page) && pin.outside.has(e.source))) problems.push(`upstream/sources.json: external source ${e.source} is not a source of the page ${e.page}`);
	}
	for (const repo of Object.keys(sources.watch ?? {})) {
		if (!byRepo.has(repo)) problems.push(`upstream/sources.json: "watch" names ${repo}, which has no page`);
	}
	if (problems.length) throw new CheckError(problems.join('\n'));
	return [...byRepo.values()].sort((a, b) => a.page.localeCompare(b.page));
}

// ---------------------------------------------------------------------------------------
// The present state of the sources.

/** Commits and files between the pinned commit and the head of the default branch. */
async function compare(pin, branch) {
	const result = await api(`/repos/${pin.repo}/compare/${pin.sha}...${encodeURIComponent(branch)}`);
	if (result === null) {
		// 404 is "pinned commit gone" only when the commit itself is not found (404 or 422).
		if ((await api(`/repos/${pin.repo}/commits/${pin.sha}`, [422])) === null) return { missing: true };
		throw new CheckError(`${pin.repo}: the commit ${short(pin.sha)} exists, but its comparison with ${branch} returns 404`);
	}
	const files = result.files ?? [];
	const watched = (sources.watch?.[pin.repo] ?? []).map(glob);
	const names = (f) => [f.filename, f.previous_filename].filter(Boolean);
	const pick = (test) => [...new Set(files.filter((f) => names(f).some(test)).map((f) => f.filename))].sort();
	const isCited = (name) => pin.cited.has(name) || [...pin.folders].some((folder) => name.startsWith(folder));
	const cited = pick(isCited);
	const watch = pick((name) => !isCited(name) && (LICENCE.test(name) || watched.some((re) => re.test(name))));
	// The commits come 250 to a page; with more, the last one here is not the head.
	const newest = (result.commits?.length ?? 0) === result.total_commits ? result.commits.at(-1) : undefined;
	return {
		status: result.status,
		ahead: result.ahead_by,
		behind: result.behind_by,
		head: newest?.sha ?? (result.total_commits ? branch : pin.sha),
		date: newest?.commit?.committer?.date?.slice(0, 10),
		cited,
		watch,
		others: files.length - new Set([...cited, ...watch]).size,
		cut: files.length >= FILE_LIMIT,
	};
}

async function repoState(repo, listed) {
	const [releases, tags] = await Promise.all([apiList(`/repos/${repo}/releases`), apiList(`/repos/${repo}/tags`)]);
	if (releases === null || tags === null) throw new CheckError(`${repo}: listed in the account, but its releases or tags return 404`);
	const published = releases.filter((r) => !r.draft);
	return {
		id: listed.id,
		defaultBranch: listed.default_branch,
		archived: listed.archived,
		licence: listed.license?.spdx_id ?? null,
		// A release with its date and files, a tag with its commit: an edit to either keeps the name.
		releases: published.map((r) => `${r.tag_name} (${r.published_at?.slice(0, 10)}: ${r.assets.map((a) => a.name).sort().join(', ') || 'no files'})`).sort(),
		tags: tags.map((t) => `${t.name} at ${short(t.commit.sha)}`).sort(),
	};
}

async function externalState(entry) {
	let text;
	try {
		const response = await fetch(entry.fetch ?? entry.source, { signal: AbortSignal.timeout(30_000) });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		text = await response.text();
	} catch (error) {
		throw new CheckError(`${entry.fetch ?? entry.source}: ${error.message}`);
	}
	if (!entry.entry) return { sha256: sha256(text) };
	// A list of records: fingerprint only the record that the page is about.
	let list;
	try {
		list = JSON.parse(text);
	} catch {
		throw new CheckError(`${entry.fetch}: not JSON, but upstream/sources.json names an entry in it`);
	}
	const found = Array.isArray(list) ? list.filter((item) => Object.entries(entry.entry).every(([key, value]) => item?.[key] === value)) : [];
	return found.length === 1 ? { sha256: sha256(JSON.stringify(found[0])) } : { sha256: null, entries: found.length };
}

// ---------------------------------------------------------------------------------------

async function main() {
	const write = process.argv.includes('--write');
	sources = readJson(SOURCES);
	manifest = existsSync(MANIFEST) ? readJson(MANIFEST) : null;
	account = sources.account;
	external = sources.external ?? [];
	const documented = pins();
	const listed = await apiList(`/users/${account}/repos?type=owner`);
	if (listed === null) throw new CheckError(`account ${account}: HTTP 404`);
	const byName = new Map(listed.map((r) => [r.full_name, r]));
	const byId = new Map(listed.map((r) => [r.id, r]));
	const noPage = sources.noPage ?? {};

	const differences = [];
	const notes = [];
	const differ = (kind, where, text) => differences.push(`${kind}: ${where}: ${text}`);
	const state = { repos: {}, forks: [], external: {} };

	// The account: repositories without a page, the forks.
	for (const r of listed) {
		if (r.fork) state.forks.push(r.name);
		else if (!documented.some((pin) => pin.repo === r.full_name) && !(r.name in noPage)) differ('repository without a page', r.full_name, 'not documented and not under "noPage" in upstream/sources.json');
	}
	state.forks.sort();
	for (const name of Object.keys(noPage)) {
		const r = byName.get(`${account}/${name}`);
		if (!r) differ('repository gone', `${account}/${name}`, 'listed under "noPage" in upstream/sources.json, not a public repository of the account');
		else if (r.fork) differ('repository is a fork', `${account}/${name}`, 'listed under "noPage" in upstream/sources.json; forks need no entry');
	}
	if (manifest && !sameList(manifest.forks ?? [], state.forks)) differ('forks changed', 'index', `${(manifest.forks ?? []).length} recorded (${(manifest.forks ?? []).join(', ') || 'none'}), now ${state.forks.length} (${state.forks.join(', ') || 'none'})`);

	// Each documented repository.
	await Promise.all(
		documented.map(async (pin) => {
			const where = `${pin.page} (${pin.repo})`;
			const before = manifest?.repos?.[pin.repo];
			const r = byName.get(pin.repo);
			if (!r) {
				const moved = before && byId.get(before.id);
				const other = listed.find((x) => x.full_name.toLowerCase() === pin.repo.toLowerCase());
				if (moved) differ('repository renamed', where, `now ${moved.full_name}`);
				else if (other) differ('repository renamed', where, `now ${other.full_name} (capitals changed)`);
				else differ('repository gone', where, 'not a public repository of the account: deleted, private or moved');
				return;
			}
			if (r.fork) differ('repository is a fork', where, 'the pages cover repositories that are not forks');
			const now = await repoState(pin.repo, r);
			state.repos[pin.repo] = now;
			if (before) {
				if (before.id !== now.id) differ('repository replaced', where, `another repository now has this name (id ${before.id} recorded, now ${now.id})`);
				if (before.defaultBranch !== now.defaultBranch) differ('default branch changed', where, `${before.defaultBranch} recorded, now ${now.defaultBranch}`);
				if (before.archived !== now.archived) differ('archive state changed', where, now.archived ? 'now archived' : 'no longer archived');
				if (before.licence !== now.licence) differ('licence changed', where, `GitHub detected ${before.licence ?? 'none'}, now ${now.licence ?? 'none'}`);
				if (!sameList(before.releases, now.releases)) differ('releases changed', where, `${before.releases.join(', ') || 'none'} recorded, now ${now.releases.join(', ') || 'none'}`);
				if (!sameList(before.tags, now.tags)) differ('tags changed', where, `${before.tags.join(', ') || 'none'} recorded, now ${now.tags.join(', ') || 'none'}`);
			} else if (manifest) differ('not in the manifest', where, 'read its state, then run pnpm upstream --write');
			for (const tag of pin.releases) {
				if (!now.releases.some((r) => r.startsWith(`${tag} (`))) differ('cited release gone', where, `release ${tag} is a source of the page`);
			}

			const diff = await compare(pin, now.defaultBranch);
			if (diff.missing) return differ('pinned commit gone', where, `${short(pin.sha)} is not in the repository (history rewritten, or the branch ${now.defaultBranch} is gone)`);
			if (diff.status === 'identical') return;
			const span = `${short(pin.sha)}..${short(diff.head)}, ${diff.ahead} commit${diff.ahead === 1 ? '' : 's'}${diff.date ? `, newest ${diff.date}` : ''}`;
			if (diff.status !== 'ahead') return differ('history rewritten', where, `${short(pin.sha)} is not an ancestor of ${now.defaultBranch} (${diff.status}: ${diff.ahead} ahead, ${diff.behind} behind)`);
			if (diff.cited.length) differ('cited files changed', where, `${span}: ${diff.cited.join(', ')}`);
			if (diff.watch.length) differ('watched files changed', where, `${span}: ${diff.watch.join(', ')}`);
			if (diff.cut) differ('too many files to list', where, `${span}: ${FILE_LIMIT} or more files changed, so cited and watched files may be among those not listed`);
			else if (!diff.cited.length && !diff.watch.length) notes.push(`other files changed: ${where}: ${span}, ${diff.others} file${diff.others === 1 ? '' : 's'}, none cited or watched`);
		})
	);

	// Sources outside the account.
	for (const entry of external) {
		const now = await externalState(entry);
		state.external[entry.source] = { sha256: now.sha256 };
		const before = manifest?.external?.[entry.source];
		if (now.sha256 === null) differ('entry gone from outside source', entry.page, `${entry.source}: ${now.entries} entries match ${JSON.stringify(entry.entry)}`);
		else if (before && before.sha256 !== now.sha256) differ('outside source changed', entry.page, entry.source);
		else if (manifest && !before) differ('not in the manifest', entry.page, `${entry.source}: read it, then run pnpm upstream --write`);
	}

	for (const line of differences.sort()) console.log(line);
	for (const line of notes.sort()) console.log(line);
	console.log(`${documented.length} repositories with a page, ${listed.length} public repositories in the account, ${external.length} outside source${external.length === 1 ? '' : 's'}; ${differences.length} difference${differences.length === 1 ? '' : 's'}, ${notes.length} note${notes.length === 1 ? '' : 's'}.`);

	if (write) {
		const repos = Object.fromEntries(Object.entries(state.repos).sort(([a], [b]) => a.localeCompare(b)));
		const next = { account, read: new Date().toISOString().slice(0, 10), repos, forks: state.forks, external: state.external };
		// The date is kept when nothing else changes, so that a second --write leaves the file as it is.
		if (manifest && JSON.stringify({ ...manifest, read: next.read }) === JSON.stringify(next)) next.read = manifest.read;
		writeFileSync(MANIFEST, JSON.stringify(next, null, '\t') + '\n');
		console.log('upstream/manifest.json written. Differences in commits stay until the pages pin the new commit.');
	} else if (!manifest) {
		console.log('upstream/manifest.json is missing: run pnpm upstream --write.');
		process.exitCode = 2;
	} else if (differences.length) process.exitCode = 1;
}

// Every failure leaves with 2, so that 1 always means "the sources differ".
try {
	await main();
} catch (error) {
	console.error(`check not made:\n${error instanceof CheckError ? error.message : error.stack}`);
	process.exitCode = 2;
}

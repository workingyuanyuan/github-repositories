// Builds /llms.txt and the per-language bundles from the content collection.
// Replaces starlight-llms-txt, which bundled the default language only and left
// out each page's caveat, dates and sources.

import { SITE, DESCRIPTION, LOCALES, localeOf, bareId, mdPath } from './site.mjs';
import { pageHeader, pageMarkdown } from './page-md.mjs';

/** Home page first, then by id. */
function ordered(entries) {
	const rank = (id) => (bareId(id) === 'index' ? '' : bareId(id));
	return [...entries].sort((a, b) => rank(a.id).localeCompare(rank(b.id)));
}

/** Site path of a bundle: `/llms-full.txt`, `/zh-tw/llms-small.txt`, ... */
export function bundlePath(locale, set) {
	return `${locale.dir ? '/' + locale.dir : ''}/llms-${set}.txt`;
}

/** `/llms.txt`: reading rules, one link per page in each language, and the bundles. */
export function llmsIndex(entries) {
	const sections = [
		'# workingyuanyuan',
		`> ${DESCRIPTION}`,
		[
			'## How to read this site',
			'',
			'- Every page has a Markdown twin. Take the page URL, drop the trailing slash and append `.md`. The home page is `/index.md`.',
			'- Each Markdown page starts with the answer, what it applies to, the main caveat, the date the facts were last verified, and links to the sources.',
			`- A machine-readable list of all pages is at ${SITE}/index.json.`,
			'- English pages are at `/`, Traditional Chinese (繁體中文) pages at `/zh-tw/`. Both languages carry the same facts.',
		].join('\n'),
	];
	for (const locale of LOCALES) {
		const lines = ordered(entries.filter((e) => localeOf(e.id) === locale)).map(
			(e) => `- [${e.data.title}](${SITE}${mdPath(e.id)}): ${e.data.description}`
		);
		if (lines.length) sections.push(`## Pages (${locale.label})\n\n${lines.join('\n')}`);
	}
	sections.push(
		'## Bundles\n\n' +
			LOCALES.flatMap((locale) => [
				`- [All pages in one file (${locale.label})](${SITE}${bundlePath(locale, 'full')}): every ${locale.label} page in full`,
				`- [Digest (${locale.label})](${SITE}${bundlePath(locale, 'small')}): the answer, scope, caveat, dates and sources of every ${locale.label} page, without the body`,
			]).join('\n')
	);
	return sections.join('\n\n') + '\n';
}

/** One language in one file. `full` keeps page bodies; `small` keeps the headers only. */
export function llmsBundle(entries, locale, set) {
	const allIds = new Set(entries.map((e) => e.id));
	const pages = ordered(entries.filter((e) => localeOf(e.id) === locale));
	const render = set === 'full' ? (e) => pageMarkdown(e, allIds).trim() : (e) => pageHeader(e, allIds);
	return pages.map(render).join('\n\n\n') + '\n';
}

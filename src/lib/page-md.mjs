// Builds the Markdown twin of a page from its frontmatter and raw Markdown body.
// The same frontmatter fields feed the HTML facts block and the JSON-LD.

import {
	SITE,
	LABELS,
	LOCALES,
	localeOf,
	idInLocale,
	htmlPath,
	mdPath,
	mdPathFromHtmlPath,
	llmsPath,
	isoDate,
} from './site.mjs';

/** Point internal links (`](/repos/kage/)`) at the absolute Markdown twin. */
export function rewriteInternalLinks(body) {
	return body.replace(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g, (match, path, hash = '') => {
		if (/\.[a-z0-9]+$/i.test(path)) return `](${SITE}${path}${hash})`;
		return `](${SITE}${mdPathFromHtmlPath(path)}${hash})`;
	});
}

/**
 * Title, answer and facts of a page: everything above the body.
 * @param {{ id: string, body?: string, data: Record<string, any> }} entry
 * @param {Set<string>} allIds ids of every page, to link the other language only when it exists
 */
export function pageHeader(entry, allIds) {
	const { id, data } = entry;
	const locale = localeOf(id);
	const t = LABELS[locale.lang];
	const facts = [];
	facts.push(`- ${t.appliesTo}: ${data.appliesTo}`);
	facts.push(`- ${t.caveat}: ${data.caveat}`);
	if (data.effectiveDate) facts.push(`- ${t.effectiveDate}: ${isoDate(data.effectiveDate)}`);
	facts.push(`- ${t.lastVerified}: ${isoDate(data.lastVerified)}`);
	if (data.repo) facts.push(`- ${t.repo}: <https://github.com/${data.repo}>`);
	facts.push(`- ${t.page}: <${SITE}${htmlPath(id)}>`);
	for (const other of LOCALES) {
		if (other === locale) continue;
		const otherId = idInLocale(id, other);
		if (allIds.has(otherId)) {
			facts.push(`- ${t.otherLanguage}: [${other.label}](${SITE}${mdPath(otherId)})`);
		}
	}
	facts.push(`- ${t.allPages}: <${SITE}${llmsPath(locale)}>`);
	facts.push(`- ${t.sources}:`);
	for (const s of data.sources) facts.push(`  - [${s.title}](${s.url})`);
	return [`# ${data.title}`, `> ${data.description}`, facts.join('\n')].join('\n\n');
}

/** The Markdown twin of a page: header, a rule, then the body. */
export function pageMarkdown(entry, allIds) {
	const body = rewriteInternalLinks((entry.body ?? '').trim());
	return [pageHeader(entry, allIds), '---', body].join('\n\n') + '\n';
}

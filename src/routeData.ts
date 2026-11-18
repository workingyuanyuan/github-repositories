import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { SITE, pageId, localeOf, htmlPath, mdPath, isoDate } from './lib/site.mjs';

/** Adds the Markdown alternate link and JSON-LD to every page's <head>. */
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { data } = route.entry;
	const id = pageId(route.entry.id);
	// Starlight's built-in 404 page has no contract fields and no Markdown twin.
	if (!data.lastVerified || !data.sources) return;

	route.head.push({
		tag: 'link',
		attrs: { rel: 'alternate', type: 'text/markdown', href: SITE + mdPath(id) },
		content: '',
	});

	// The status line is drawn by CSS; these variables give it this page's values.
	route.head.push({
		tag: 'style',
		attrs: {},
		content: `:root{--status-page:"${mdPath(id)}";--status-verified:"${isoDate(data.lastVerified)}"}`,
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline: data.title,
		description: data.description,
		inLanguage: localeOf(id).lang,
		url: SITE + htmlPath(id),
		dateModified: isoDate(data.lastVerified),
		...(data.effectiveDate ? { datePublished: isoDate(data.effectiveDate) } : {}),
		...(data.repo
			? { about: { '@type': 'SoftwareSourceCode', codeRepository: `https://github.com/${data.repo}` } }
			: {}),
		citation: data.sources.map((s: { url: string }) => s.url),
		encoding: { '@type': 'MediaObject', encodingFormat: 'text/markdown', contentUrl: SITE + mdPath(id) },
	};
	route.head.push({
		tag: 'script',
		attrs: { type: 'application/ld+json' },
		content: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
	});
});

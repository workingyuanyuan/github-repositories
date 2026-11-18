import type { APIRoute } from 'astro';
import { SITE } from '../lib/site.mjs';

export const prerender = true;

// Content signals state how the content may be used after access:
// search = search indexes, ai-input = grounding AI answers, ai-train = model training.
// This file is served for the whole domain, so it also covers the project sites under it.
export const GET: APIRoute = () =>
	new Response(
		[
			'User-agent: *',
			'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
			'Allow: /',
			'',
			`Sitemap: ${SITE}/sitemap-index.xml`,
			// Project sites under this domain; crawlers read only this robots.txt.
			`Sitemap: ${SITE}/nte-wiki/sitemap-index.xml`,
			'',
		].join('\n'),
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
	);

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
			'Content-Signal: search=yes, ai-input=yes, ai-train=no',
			'Allow: /',
			'',
			`Sitemap: ${SITE}/sitemap-index.xml`,
			// Project sites under this domain; crawlers read only this robots.txt.
			`Sitemap: ${SITE}/nte-wiki/sitemap-index.xml`,
			`Sitemap: ${SITE}/stitch-zh/sitemap-index.xml`,
			`Sitemap: ${SITE}/Kage/sitemap.xml`,
			`Sitemap: ${SITE}/Frontier-Model-Doh-Choo-choo/sitemap.xml`,
			`Sitemap: ${SITE}/iphone-18-pro-teardown/sitemap.xml`,
			`Sitemap: ${SITE}/Pixel-Kitten-Town-Class/sitemap.xml`,
			`Sitemap: ${SITE}/simple-gemini-public/sitemap.xml`,
			`Sitemap: ${SITE}/BiliGemi-public/sitemap.xml`,
			'',
		].join('\n'),
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
	);

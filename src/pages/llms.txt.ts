import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { llmsIndex } from '../lib/llms.mjs';

export const prerender = true;

export const GET: APIRoute = async () => {
	const docs = await getCollection('docs', (doc) => !doc.data.draft);
	return new Response(llmsIndex(docs), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};

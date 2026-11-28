// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightLinksValidator from 'starlight-links-validator';
import { sitemapOptions } from './src/lib/sitemap.mjs';
import { ORIGIN, BASE, GITHUB_USER, DESCRIPTION } from './src/lib/site.mjs';
import { satteri } from '@astrojs/markdown-satteri';
import { hastBase, hastFootnotes } from './src/lib/hast-base.mjs';

export default defineConfig({
	site: ORIGIN,
	base: BASE || undefined,
	trailingSlash: 'always',
	// Content links are written without the sub-path; this adds it in the HTML.
	markdown: { processor: satteri({ hastPlugins: [hastBase, hastFootnotes] }) },
	integrations: [
		// Added here so that it takes options; Starlight then leaves its own copy out.
		sitemap(sitemapOptions()),
		starlight({
			title: 'yuanaruru',
			description: DESCRIPTION,
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${GITHUB_USER}` }],
			sidebar: [
				{
					label: 'Repositories',
					translations: { 'zh-TW': '專案' },
					items: [{ autogenerate: { directory: 'repos' } }],
				},
			],
			customCss: ['./src/styles/tui.css'],
			components: {
				// Three overrides: the section links in the header, the answer and page notes around
				// the body, and one-click theme buttons.
				SiteTitle: './src/components/SiteTitle.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			routeMiddleware: './src/routeData.ts',
			credits: false,
			pagination: false,
			expressiveCode: {
				themes: ['vesper', 'vitesse-light'],
				// `patch` gets diff colours but keeps the literal +/- in the page text.
				// The `diff` language is not used: Expressive Code draws its +/- with CSS,
				// so an agent reading the HTML would not see which lines were added or removed.
				shiki: { langAlias: { patch: 'diff' } },
				styleOverrides: {
					borderRadius: '0',
					borderWidth: '1px',
					frames: { shadowColor: 'transparent' },
				},
			},
			plugins: [
				starlightLinksValidator({ exclude: ['/**/*.md', '/*.md', '/llms.txt', '/**/llms.txt', '/index.json'] }),
			],
		}),
	],
});

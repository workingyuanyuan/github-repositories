// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { SITE, GITHUB_USER, DESCRIPTION } from './src/lib/site.mjs';

export default defineConfig({
	site: SITE,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'workingyuanyuan',
			description: DESCRIPTION,
			// Google Search Console ownership of the domain (URL-prefix property). Keep it:
			// removing it unverifies the property. Bing imports its access from Search Console.
			head: [
				{
					tag: 'meta',
					attrs: { name: 'google-site-verification', content: 'HAmujzQWC-r7ONB0_ef91o4cFOUJXnQKzi0t5F8uxR4' },
				},
			],
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
				// Three overrides: the nav hints in the header, the answer and page notes around
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

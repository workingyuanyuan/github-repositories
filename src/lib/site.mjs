// Shared site facts and URL rules. Plain JS so astro.config.mjs, Astro code and
// the check script all use the same rules.

// SITE_URL overrides the public address for local agent tests (see tests/agent-eval/README.md).
export const SITE = (process.env.SITE_URL ?? 'https://workingyuanyuan.github.io').replace(/\/+$/, '');
export const GITHUB_USER = 'workingyuanyuan';
export const DESCRIPTION =
	'Reference pages for the public GitHub repositories of workingyuanyuan: what each repository is, how to install and use it, and what to watch out for.';

/**
 * Crawlers named in robots.txt, from each operator's documentation (sources and the date
 * they were read are in ../STACK.md). `allow`: builds a search index or fetches a page for
 * a user. `disallow`: gathers training data.
 */
export const CRAWLERS = {
	allow: ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'],
	disallow: ['GPTBot', 'ClaudeBot'],
};

/** Locales: `dir` is the content sub-folder and URL prefix ('' = root). */
export const LOCALES = [
	{ dir: '', lang: 'en', label: 'English' },
	{ dir: 'zh-tw', lang: 'zh-TW', label: '繁體中文' },
];

/** Starlight's route data gives the home page an empty id; the collection calls it `index`. */
export function pageId(id) {
	return id === '' ? 'index' : id;
}

/** Locale of a content entry id such as `repos/kage`, `zh-tw/repos/kage`, `index`, `zh-tw`. */
export function localeOf(id) {
	return (
		LOCALES.find((l) => l.dir && (id === l.dir || id.startsWith(l.dir + '/'))) ?? LOCALES[0]
	);
}

/** Entry id without its locale prefix. The home page is `index` in every locale. */
export function bareId(id) {
	const { dir } = localeOf(id);
	if (!dir) return id;
	return id === dir ? 'index' : id.slice(dir.length + 1);
}

/** Entry id of the same page in another locale. */
export function idInLocale(id, locale) {
	const bare = bareId(id);
	if (!locale.dir) return bare;
	return bare === 'index' ? locale.dir : `${locale.dir}/${bare}`;
}

/** Site path of the HTML page for an entry id. */
export function htmlPath(id) {
	return id === 'index' ? '/' : `/${id}/`;
}

/** Site path of the Markdown twin: drop the trailing slash, append `.md`; home is `/index.md`. */
export function mdPath(id) {
	return `/${id}.md`;
}

/** Markdown twin of an internal HTML path such as `/repos/kage/` or `/`. */
export function mdPathFromHtmlPath(path) {
	const trimmed = path.replace(/^\/+|\/+$/g, '');
	return mdPath(trimmed === '' ? 'index' : trimmed);
}

/** Site path of a language's page index: `/llms.txt`, `/zh-tw/llms.txt`. */
export function llmsPath(locale) {
	return `${locale.dir ? '/' + locale.dir : ''}/llms.txt`;
}

/**
 * The opening of each language's llms.txt: what a reader gets wrong without being told.
 * Site-specific. Keep it short: it shares the first 5,000 characters with the page list.
 */
export const LLMS_NOTES = {
	en: {
		summary: DESCRIPTION,
		heading: 'Before you answer',
		notes: [
			'Do not assume a license, a release or source code. Most repositories here have no LICENSE file and no release, some hold no source code, and one README names a license the repository lacks. Each page says which applies, in its caveat and Facts table.',
			'Facts come from a fixed commit. Each page names it and the date verified; the repository may have changed since.',
			'Page paths are lower-case: `/repos/kage/`, not `/repos/Kage/`.',
			'Every page has a Markdown twin: drop the trailing slash and append `.md`.',
		],
		pages: 'Pages',
		home: 'Home page: every page, grouped by kind',
		full: 'All pages in one file',
		digest: 'Answer, caveat, dates and sources of every page, without the body',
		json: 'All pages in both languages, as JSON',
		otherLanguage: 'This index in',
		more: 'More',
	},
	'zh-TW': {
		summary: '介紹 workingyuanyuan 的公開 GitHub 專案：每個專案是什麼、如何安裝與使用、要注意什麼。',
		heading: '回答之前',
		notes: [
			'不要預設專案有授權、release 或原始碼。這些專案大多沒有 LICENSE 檔，也沒有 release，有些不含原始碼。有一個 README 寫了授權，但專案裡沒有對應的檔案。每一頁的注意事項與「事實」表格會寫明實際情況。',
			'事實讀自固定的 commit。每一頁都註明 commit 與查證日期，專案在那之後可能有變動。',
			'頁面路徑一律小寫：是 `/zh-tw/repos/kage/`，不是 `/zh-tw/repos/Kage/`。',
			'每一頁都有 Markdown 版本：去掉網址結尾的斜線，加上 `.md`。',
		],
		pages: '頁面',
		home: '首頁：所有頁面，依類型分組',
		full: '所有頁面合併成一個檔案',
		digest: '每一頁的答案、注意事項、日期與出處，不含內文',
		json: '兩種語言的所有頁面，JSON 格式',
		otherLanguage: '本索引的其他語言',
		more: '更多',
	},
};

/** UI labels for the facts shown on every page, in both outputs. */
export const LABELS = {
	en: {
		appliesTo: 'Applies to',
		caveat: 'Caveat',
		effectiveDate: 'Source dated',
		lastVerified: 'Last verified',
		repo: 'Repository',
		sources: 'Sources',
		markdown: 'Markdown',
		page: 'Page',
		otherLanguage: 'Other language',
		allPages: 'All pages',
	},
	'zh-TW': {
		appliesTo: '適用範圍',
		caveat: '注意事項',
		effectiveDate: '來源日期',
		lastVerified: '最後查證',
		repo: '原始碼庫',
		sources: '出處',
		markdown: 'Markdown',
		page: '頁面',
		otherLanguage: '其他語言',
		allPages: '所有頁面',
	},
};

/** Format a Date (or date string) as YYYY-MM-DD. */
export function isoDate(d) {
	return new Date(d).toISOString().slice(0, 10);
}

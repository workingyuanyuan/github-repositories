// Site settings for scripts/prose-review.mjs (the prose ledger).
//
// - derived: locales a script writes from another; their prose is read in the source locale.
// - skip(path, lang): text the page shows as its source gives it, which is not the site's prose.
//   This site quotes nothing that way: README excerpts sit in code blocks, which are left out.

export default {
	derived: [],
	skip: () => [],
};

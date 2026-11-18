import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// The content contract. Every page must state its answer (`description`), what it
// applies to, its main caveat, when it was verified, and where the facts come from.
// The build fails when any of these is missing.
const contract = z.object({
	// One short sentence. Length limits per language are checked in scripts/check-dist.mjs.
	description: z.string().min(8),
	appliesTo: z.string().min(3),
	caveat: z.string().min(3),
	lastVerified: z.coerce.date(),
	/** Date of the commit or release the facts were read from. */
	effectiveDate: z.coerce.date().optional(),
	/** GitHub `owner/name`, for pages about one repository. */
	repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/).optional(),
	sources: z.array(z.object({ title: z.string(), url: z.string().url() })).min(1),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: contract }) }),
};

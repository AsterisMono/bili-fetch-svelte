import { BvidRegex } from '$lib/utils/Regex';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return BvidRegex.test(param);
}) satisfies ParamMatcher;

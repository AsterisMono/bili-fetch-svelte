import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
	// Send error analytics
	return {
		message:
			import.meta.env.CF_PAGES_BRANCH === 'production'
				? '喔唷，出错啦！'
				: `${import.meta.env.CF_PAGES_BRANCH}: ${(error as Error).message}`
	};
}) satisfies HandleServerError;

import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
	// Send error analytics
	return {
		message: import.meta.env.VITE_CF_PAGES_DEV ? `${JSON.stringify(error)}` : '喔唷，出错啦！'
	};
}) satisfies HandleServerError;

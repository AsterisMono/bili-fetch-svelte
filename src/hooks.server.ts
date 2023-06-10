import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
	// Send error analytics
	return {
		message: '喔唷，出错啦！'
	};
}) satisfies HandleServerError;

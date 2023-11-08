import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
	// Send error analytics
	return {
		message: import.meta.env.DEV ? '喔唷，出错啦！' : `${JSON.stringify(error)}`
	};
}) satisfies HandleServerError;

import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
	// Send error analytics
	return {
		message: import.meta.env.VITE_CF_PAGES_DEV
			? `${JSON.stringify(error)}`
			: import.meta.env.VITE_IN_MAINTENANCE
			? '这个应用正处于维护模式，稍后再来吧'
			: '喔唷，出错啦！'
	};
}) satisfies HandleServerError;

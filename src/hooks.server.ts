import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
	return response;
};

export const handleError = (async ({ error }) => {
	// Send error analytics
	return {
		message: import.meta.env.VITE_CF_PAGES_DEV
			? `${JSON.stringify(error)}`
			: import.meta.env.VITE_IN_MAINTENANCE
				? '这个应用正处于维护模式，稍后再来吧'
				: '喔唷，出错啦！'
	};
}) satisfies HandleServerError;

import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (async ({ error, event }) => {
	// Send error analytics
	return {
		message: JSON.stringify(error)
	};
}) satisfies HandleServerError;

import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
  return response;
};

export const handleError = (async ({ error }) => {
  console.error('[handleError]', JSON.stringify(error, Object.getOwnPropertyNames(error as object)));
  return {
    message: '喔唷，出错啦！'
  };
}) satisfies HandleServerError;

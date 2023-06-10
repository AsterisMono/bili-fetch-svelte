import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	throw redirect(308, `/${params.bvid}`);
}) satisfies PageServerLoad;

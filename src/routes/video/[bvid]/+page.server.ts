import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	redirect(308, `/${params.bvid}`);
}) satisfies PageServerLoad;

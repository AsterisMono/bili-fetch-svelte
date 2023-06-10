import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { B23LinkRegex, BvidRegex } from '$lib/utils/Regex';

export const load = (async ({ params }) => {
	if (params.catchall.includes('https://b23.tv/')) {
		const b23LinkList = B23LinkRegex.exec(params.catchall);
		if (!b23LinkList || b23LinkList.length != 1) throw Error('分享链接不正确');
		const b23Link = b23LinkList[0];
		fetch(b23Link).then((response) => {
			const bvidList = BvidRegex.exec(response.url);
			if (!bvidList || bvidList.length != 1) throw Error('分享链接不正确');
			throw redirect(308, `/${bvidList[0]}`);
		});
		throw redirect(308, '/BV1ms4y1e7Va');
	} else {
		throw redirect(308, '/');
	}
}) satisfies PageServerLoad;

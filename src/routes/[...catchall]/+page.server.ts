import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { B23LinkRegex, BvidRegex } from '$lib/utils/Regex';
import { panic } from '$lib/types/Error';

export const load = (async ({ params }) => {
	// Deal with b23 share links
	if (params.catchall.includes('https://b23.tv/')) {
		const b23LinkList = B23LinkRegex.exec(params.catchall);
		if (!b23LinkList || b23LinkList.length != 1) throw error(400, '分享链接不正确');
		const b23Link = b23LinkList[0];
		const response = await fetch(b23Link);
		const bvidList = BvidRegex.exec(response.url);
		if (!bvidList || bvidList.length != 1)
			throw panic('b23链接解析出的链接无法识别', 'b23Parse', response.url, bvidList);
		throw redirect(308, `/${bvidList[0]}`);
	} else if (params.catchall.includes('BV')) {
		throw error(400, 'BV号不正确');
	} else {
		throw redirect(308, '/');
	}
}) satisfies PageServerLoad;

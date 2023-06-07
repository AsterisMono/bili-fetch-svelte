import type { PageServerLoad } from './$types';
import type { BiliCidResult, BiliInfoResult, BiliVideoResult } from '../../../types/biliTypes';
import { panic } from '../../../types/Error';
import { HttpError, error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const bvid = params.bvid;
	const biliCidUrl = `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}`;
	const cid = await fetch(biliCidUrl)
		.then((r) => r.json())
		.then((r: BiliCidResult) => {
			if (r.code == -400) {
				throw error(500, {
					message: '请检查BV号是否正确'
				});
			}
			return r.data[0].cid;
		})
		.catch((e) => {
			if (Object.hasOwn(e, 'status')) throw e; // Rethrow expected error, FIXME: this is ugly
			else throw panic('Error fetching cid', 'biliApi', biliCidUrl, e);
		});

	const biliInfoUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
	const {
		pic: coverImageUrlHttp,
		title: videoTitle,
		owner: { name: videoUploader }
	} = await fetch(biliInfoUrl)
		.then((r) => r.json())
		.then((r: BiliInfoResult) => r.data)
		.catch((e) => {
			throw panic('Error fetching video info', 'biliApi', biliInfoUrl, e);
		});
	const coverImageUrlObj = new URL(coverImageUrlHttp);
	coverImageUrlObj.protocol = 'https';
	const coverImageUrl = coverImageUrlObj.toString();

	const biliVideoUrl = `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&platform=html5`;
	const videoUrl = await fetch(biliVideoUrl)
		.then((r) => r.json())
		.then((r: BiliVideoResult) => r.data.durl[0].url)
		.catch((e) => {
			throw panic('Error fetching video player', 'biliApi', biliVideoUrl, e);
		});

	return {
		bvid,
		cid,
		coverImageUrl,
		videoTitle,
		videoUploader,
		videoUrl
	};
}) satisfies PageServerLoad;

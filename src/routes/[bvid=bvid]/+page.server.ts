import type { PageServerLoad } from './$types';
import type { BiliCidResult, BiliInfoResult, BiliVideoResult } from '$lib/types/BiliTypes';
import { panic } from '$lib/types/Error';

export const load = (async ({ params, setHeaders }) => {
	setHeaders({
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Embedder-Policy': 'require-corp'
	});
	const bvid = params.bvid;
	const biliCidUrl = `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}`;
	const cid = await fetch(biliCidUrl)
		.then((r) => r.json())
		.then((r: BiliCidResult) => r.data[0].cid)
		.catch((e) => {
			throw panic('(1)Cid获取失败', 'biliApi', biliCidUrl, e);
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
			throw panic('(2)视频信息获取失败', 'biliApi', biliInfoUrl, e);
		});
	const coverImageUrlObj = new URL(coverImageUrlHttp);
	coverImageUrlObj.protocol = 'https';
	const coverImageUrl = coverImageUrlObj.toString();

	const biliVideoUrl = `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&platform=html5`;
	const videoUrl = await fetch(biliVideoUrl)
		.then((r) => r.json())
		.then((r: BiliVideoResult) => r.data.durl[0].url)
		.catch((e) => {
			throw panic('(3)视频地址获取失败', 'biliApi', biliVideoUrl, e);
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

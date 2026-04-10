<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { updateStatus, updateMessage, updateProgress, progress } from '$lib/utils/StatusStore';
	import { loadFFmpeg } from '$lib/utils/FFMpegUtils';
	import { DisplayClientError } from '$lib/utils/ClientError';
	import { fetchFile, offerFileAsDownload } from '$lib/utils/FetchFileUtil';
	import { getRandomLoadingPrompt } from '$lib/utils/loadingPrompts';
	let { data }: { data: PageData } = $props();
	let title: string = $state('Bilibili音乐下载');
	function reactiveTitle(progress: number) {
		if (!progress) title = 'Bilibili音乐下载';
		else if (progress > 0 && progress < 1)
			title = `[${Math.round(progress * 100)}%] ${data.videoTitle}`;
		else title = `✔ ${data.videoTitle}`;
	}
	progress.subscribe(reactiveTitle);
	onMount(() =>
		setTimeout(async () => {
			try {
				// 1. Load FFMpeg
				const loadingPromptTimer = setInterval(() => updateMessage(getRandomLoadingPrompt()), 1500);
				const ffmpeg = await loadFFmpeg();
				clearInterval(loadingPromptTimer);
				const { bvid, cid, coverImageUrl, videoTitle, videoUploader, videoUrl } = data;

				// stage: raw(mp4), converted(mp3), bundled(mp3)
				const getFileName = (stage: string, ext: string) => `${bvid}_${cid}_${stage}.${ext}`;

				// 2. Download video
				updateProgress(0.1);
				updateMessage(`${videoTitle} - ${videoUploader}`);
				await updateStatus('正在下载视频');

				try {
					await ffmpeg.writeFile(
						getFileName('raw', 'mp4'),
						await fetchFile(videoUrl, (ratio) => updateProgress(0.1 + ratio * 0.4))
					);
				} catch (e) {
					throw Error('视频下载失败');
				}

				// 3. convert video to audio
				updateProgress(0.5);
				await updateStatus('正在进行转换');
				const progressHandler = ({ progress: ratio }: { progress: number }) =>
					updateProgress(0.5 + ratio * 0.3);
				ffmpeg.on('progress', progressHandler);
				try {
					await ffmpeg.exec([
						'-i',
						getFileName('raw', 'mp4'),
						'-q:a',
						'0',
						'-map',
						'a',
						getFileName('converted', 'mp3')
					]);
				} catch (e) {
					throw Error('转换失败');
				}
				ffmpeg.off('progress', progressHandler);

				// 4. bundle metadata
				updateProgress(0.8);
				await updateStatus('正在给文件附魔');
				try {
					await ffmpeg.writeFile(
						getFileName('albumart', 'jpg'),
						await fetchFile(coverImageUrl, (ratio) => updateProgress(0.8 + ratio * 0.1))
					);

					await ffmpeg.exec([
						'-i',
						getFileName('converted', 'mp3'),
						'-i',
						getFileName('albumart', 'jpg'),
						'-map',
						'0:0',
						'-map',
						'1:0',
						'-c',
						'copy',
						'-id3v2_version',
						'3',
						'-metadata:s:v',
						`title="Album cover"`,
						'-metadata:s:v',
						`comment="Cover (Front)"`,
						'-metadata',
						`artist=${videoUploader}`,
						'-metadata',
						`title=${videoTitle}`,
						'-metadata',
						`album=${videoTitle}`,
						getFileName('out', 'mp3')
					]);
				} catch (e) {
					throw Error('附加信息失败');
				}

				// 5. finish up
				updateProgress(1.0);
				await updateStatus('已完成');
				offerFileAsDownload(ffmpeg, getFileName('out', 'mp3'), `${videoTitle}.mp3`);

				await new Promise((resolve, reject) => setTimeout(resolve, 700));
				updateMessage('喜欢吗？', 1000, () => {
					updateMessage('谢谢。开发者已经收到你的👍。');
				});
			} catch (e) {
				if (
					typeof e === 'object' &&
					e !== null &&
					'message' in e &&
					typeof e.message === 'string'
				) {
					DisplayClientError(e.message);
				}
			}
		}, 100)
	);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

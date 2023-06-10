<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { updateStatus, updateMessage, updateProgress } from '$lib/utils/StatusStore';
	import { loadFFmpeg } from '$lib/utils/FFMpegUtils';
	import { DisplayClientError } from '$lib/utils/ClientError';
	import { fetchFile, offerFileAsDownload } from '$lib/utils/FetchFileUtil';
	export let data: PageData;
	onMount(async () => {
		try {
			// 1. Load FFMpeg
			const ffmpeg = await loadFFmpeg();
			const { bvid, cid, coverImageUrl, videoTitle, videoUploader, videoUrl } = data;

			// stage: raw(mp4), converted(mp3), bundled(mp3)
			const getFileName = (stage: string, ext: string) => `${bvid}_${cid}_${stage}.${ext}`;

			// 2. Download video
			updateProgress(0.1);
			updateMessage(`${videoTitle} - ${videoUploader}`);
			await updateStatus('正在下载视频');

			try {
				ffmpeg.FS(
					'writeFile',
					getFileName('raw', 'mp4'),
					await fetchFile(videoUrl, (ratio) => updateProgress(0.1 + ratio * 0.4))
				);
			} catch (e) {
				throw Error('视频下载失败');
			}

			// 3. convert video to audio
			updateProgress(0.5);
			await updateStatus('正在进行转换');
			ffmpeg.setProgress(({ ratio }) => updateProgress(0.5 + ratio * 0.3));
			try {
				await ffmpeg.run(
					'-i',
					getFileName('raw', 'mp4'),
					'-q:a',
					'0',
					'-map',
					'a',
					getFileName('converted', 'mp3')
				);
			} catch (e) {
				throw Error('转换失败');
			}
			ffmpeg.setProgress(() => undefined);

			// 4. bundle metadata
			updateProgress(0.8);
			await updateStatus('正在给文件附魔');
			try {
				ffmpeg.FS(
					'writeFile',
					getFileName('albumart', 'jpg'),
					await fetchFile(coverImageUrl, (ratio) => updateProgress(0.8 + ratio * 0.1))
				);

				await ffmpeg.run(
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
				);
			} catch (e) {
				throw Error('附加信息失败');
			}

			// 5. finish up
			updateProgress(1.0);
			await updateStatus('已完成');
			offerFileAsDownload(ffmpeg, getFileName('out', 'mp3'), `${videoTitle}.mp3`);
		} catch (e) {
			if (typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string') {
				DisplayClientError(e.message);
			}
		}
	});
</script>

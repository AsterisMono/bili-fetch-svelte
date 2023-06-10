<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		updateStatus,
		updateMessage,
		progress,
		status,
		updateProgress
	} from '$lib/utils/StatusStore';
	import { loadFFmpeg } from '$lib/utils/FFMpegUtils';
	import { DisplayClientError } from '$lib/utils/ClientError';
	export let data: PageData;
	onMount(async () => {
		try {
			await loadFFmpeg();
			updateProgress(0.1);
			await updateStatus('正在获取视频信息');
		} catch (e) {
			if (typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string') {
				DisplayClientError(e.message);
			}
		}
	});
</script>

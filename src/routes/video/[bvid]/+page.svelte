<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { infoMessage, status } from '$lib/utils/StatusStore';
	import { loadFFmpeg } from '$lib/utils/FFMpegUtils';
	import { error } from '@sveltejs/kit';
	import { DisplayClientError } from '$lib/utils/ClientError';
	export let data: PageData;
	onMount(async () => {
		try {
			await loadFFmpeg();
			$status.statusMessage = '正在获取视频信息';
			$infoMessage.markdown = '已经打印';
		} catch (e) {
			if (typeof e === 'object' && e !== null && 'message' in e && typeof e.message === 'string') {
				DisplayClientError(e.message);
			}
		}
	});
</script>

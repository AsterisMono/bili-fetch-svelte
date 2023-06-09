<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { infoMessage, status } from './StatusStore';
	export let data: PageData;
	onMount(async () => {
		console.log(data);
		$status.statusMessage = '正在获取视频信息';
		$infoMessage.markdown = '已经打印';
	});
</script>

<div />

<script>
	import { status, infoMessage } from '$lib/utils/StatusStore';
	import { onMount } from 'svelte';

	// Here comes the show
	onMount(() => {
		$status.statusMessage = '(`･∀･)';
		$infoMessage = {
			markdown: '你好呀！',
			time: 2000
		};
		$infoMessage = {
			markdown: 'Bilibili音乐下载器',
			time: 2000
		};
	});
</script>

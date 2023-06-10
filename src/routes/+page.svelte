<script>
	import { status, message, nextStatus, nextMessage } from '$lib/utils/StatusStore';
	import { onMount } from 'svelte';

	// Here comes the show
	onMount(async () => {
		nextStatus('(`･∀･)');
		await nextMessage('你好呀！', 2000);
		await nextMessage('Bilibili音乐下载器', 2000);
	});
</script>

<script>
	import { status, message, updateStatus, updateMessage } from '$lib/utils/StatusStore';
	import { onMount } from 'svelte';

	// Here comes the show
	onMount(async () => {
		updateStatus('(`･∀･)');
		await updateMessage('你好呀！', 2000);
		await updateMessage('Bilibili音乐下载器', 2000);
	});
</script>

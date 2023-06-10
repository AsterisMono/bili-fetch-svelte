<script>
	import { status, message, updateStatus, updateMessage } from '$lib/utils/StatusStore';
	import { onMount } from 'svelte';

	// Here comes the show
	onMount(async () => {
		updateStatus('(`･∀･)');
		await updateMessage('你好呀！', 2000);
		await updateMessage('在网址后输入BV号来开始下载', 2000);
	});
</script>

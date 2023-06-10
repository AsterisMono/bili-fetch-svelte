<script lang="ts">
	import { updateMessage, updateProgress, updateStatus, progress } from '$lib/utils/StatusStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		updateStatus('( ´ﾟДﾟ`)');
		updateMessage($page.error?.message || '出错了');
		updateProgress(0);
	});
</script>

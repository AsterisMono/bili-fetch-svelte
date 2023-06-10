<script lang="ts">
	import { nextMessage, nextProgress, nextStatus, progress } from '$lib/utils/StatusStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		nextStatus('( ´ﾟДﾟ`)');
		nextMessage($page.error?.message || '出错了');
		nextProgress(0);
	});
</script>

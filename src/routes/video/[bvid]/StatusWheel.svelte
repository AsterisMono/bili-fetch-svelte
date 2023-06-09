<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { statusMessage } from './statusStore';

	let statusList: string[] = [];
	statusMessage.subscribe(($statusMessage) => {
		statusList = [...statusList, $statusMessage];
	});

	// Dynamic status text size with media query
	let statusTextSize = 4.5;

	const onMediaChange = (e: MediaQueryListEvent) => {
		if (e.matches) statusTextSize = 2.8;
		else statusTextSize = 4.5;
	};

	let mediaWatcher: MediaQueryList;
	onMount(() => {
		mediaWatcher = window.matchMedia('(max-width: 640px)');
		mediaWatcher.addEventListener('change', onMediaChange);
	});

	// Clear the media watcher on component unload
	onDestroy(() => {
		if (mediaWatcher) mediaWatcher.removeEventListener('change', onMediaChange); // TODO: Why this unloads first?
	});

	// Calculate status translateY
	$: translateY = -2 * statusTextSize * (statusList.length - 1);
</script>

<article
	class="status-wheel-frame font-light tracking-wide overflow-hidden"
	style="--status-text-size: {statusTextSize}rem"
>
	<div
		class="status-wheel transition-all duration-500 flex flex-col"
		style="transform: translateY({translateY}rem);"
	>
		{#each statusList as status}
			<p class="status-item">{status}</p>
		{/each}
	</div>
</article>

<style>
	.status-wheel-frame {
		height: var(--status-text-size);
	}

	.status-wheel {
		line-height: 1;
		gap: var(--status-text-size);
	}

	.status-item {
		font-size: var(--status-text-size);
		text-align: center;
	}

	@media (min-width: 1024px) {
		.status-item {
			text-align: unset;
		}
	}
</style>

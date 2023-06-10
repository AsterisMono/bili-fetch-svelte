<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { status } from '$lib/utils/StatusStore';

	let statusList: string[] = [];
	status.subscribe(($statusMessage) => {
		statusList = [...statusList, $statusMessage];
	});

	// Dynamic status text size with media query
	// UI font size will be handled by CSS to avoid layout jump in SSR
	// This text size is solely for translate value calculation
	let statusTextSize = 4.5;

	const respondToMediaChange = () => {
		statusTextSize = window.matchMedia('(max-width: 640px)').matches ? 2.8 : 4.5;
	};

	let mediaWatcher: MediaQueryList;
	onMount(() => {
		respondToMediaChange(); // Determine initial font size
		mediaWatcher = window.matchMedia('(max-width: 640px)');
		mediaWatcher.addEventListener('change', respondToMediaChange);
	});

	// Clear the media watcher on component unload
	onDestroy(() => {
		if (mediaWatcher) mediaWatcher.removeEventListener('change', respondToMediaChange); // TODO: Why this unloads first?
	});

	// Calculate status translateY
	$: translateY = -2 * statusTextSize * (statusList.length - 1);
</script>

<article class="status-wheel-frame font-light tracking-wide overflow-hidden">
	<div
		class="status-wheel transition-all duration-500 flex flex-col"
		style="transform: translateY({translateY}rem);"
	>
		{#each statusList as status}
			<p class="status-item">{status}</p>
		{/each}
	</div>
</article>

<style lang="postcss">
	:root {
		--status-text-size: 2.8rem;
	}

	@media screen(sm) {
		:root {
			--status-text-size: 4.5rem;
		}
	}
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

<script lang="ts">
	import { statusMessage } from './statusStore';

	let statusList: string[] = [];
	statusMessage.subscribe(($statusMessage) => {
		statusList = [...statusList, $statusMessage];
	});

	let statusTextSize = 4.5;
	// FIXME: Dynamic status text size with media query
</script>

<article
	class="status-wheel-frame font-light tracking-wide overflow-hidden"
	style="--status-text-size: {statusTextSize}rem"
>
	<div class="status-wheel transition-all duration-500 flex flex-col">
		{#each statusList as status}
			<p class="status-item">{status}</p>
		{/each}
	</div>
</article>

<style>
	.status-wheel-frame {
		height: var(--status-text-size);
	}

	/* @media screen(sm) {
		.status-wheel-frame {
			--status-text-size: 4.5rem;
		}
	}  */

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

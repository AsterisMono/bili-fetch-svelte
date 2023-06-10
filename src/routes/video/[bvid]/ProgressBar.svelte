<script lang="ts">
	import { progress } from '$lib/utils/StatusStore';
</script>

<div class="progress-bar absolute top-0 left-0" style="width: {Math.round($progress * 100)}%;" />

<style lang="postcss">
	.progress-bar {
		background-color: #3392ff;
		height: 5px;
		width: 0%;
		@apply transition-all;
		@apply duration-500;
	}
</style>

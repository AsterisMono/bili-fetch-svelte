<script lang="ts">
	import '../app.css';
	import StatusWheel from './video/[bvid]/StatusWheel.svelte';
	import MessageBar from './video/[bvid]/MessageBar.svelte';
</script>

<main class="page h-screen">
	<div class="relative h-full">
		<div class="progress-bar absolute top-0 left-0" />
		<main class="w-full h-full flex flex-row">
			<section class="w-full h-full flex flex-col justify-center">
				<div class="mx-auto flex flex-col gap-20 lg:ml-56">
					<StatusWheel />
					<MessageBar />
					<slot />
				</div>
			</section>
		</main>
	</div>
</main>

<style>
	.page {
		background: linear-gradient(135deg, #fed6e3 0%, #a8edea 100%) center / cover;
		background-size: 400% 400%;
		animation: animated-gradient 8s ease infinite;
		color: rgb(37, 37, 37);
	}

	@keyframes animated-gradient {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 50% 100%;
		}
		to {
			background-position: 0 0;
		}
	}
</style>

<script>
	import StatusWheel from './video/[bvid]/StatusWheel.svelte';
	import { status } from './video/[bvid]/statusStore';
</script>

<div class="page relative h-full">
	<div class="progress-bar absolute top-0 left-0" />
	<main class="w-full h-full flex flex-row">
		<section class="w-full h-full flex flex-col justify-center">
			<div class="mx-auto flex flex-col gap-20 lg:ml-56">
				<StatusWheel />
				<p
					class="px-4 lg:px-0 message-bar message-normal font-medium text-lg text-center lg:text-left tracking-wider transition-all duration-500"
				>
					请稍等片刻
				</p>
			</div>
		</section>
		<button
			on:click={() => {
				status.set({
					statusMessage: '测试',
					progress: 50
				});
			}}>Magic Button</button
		>
	</main>
</div>

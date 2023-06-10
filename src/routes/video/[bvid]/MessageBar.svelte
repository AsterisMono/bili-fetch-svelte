<script lang="ts">
	import { message } from '$lib/utils/StatusStore';

	let msg = '请稍等片刻';
	let opacity = 1;
	let ref: HTMLParagraphElement;

	const statusMessageHandler = (message: string) => {
		if (!ref || message == msg) return;
		opacity = 0;
		const onMsgHidden = () => {
			msg = message; // TODO: Parse Markdown
			opacity = 1;
			ref.removeEventListener('transitionend', onMsgHidden);
		};
		ref.addEventListener('transitionend', onMsgHidden);
	};

	message.subscribe(statusMessageHandler);
</script>

<p
	class="px-4 lg:px-0 message-bar message-normal font-medium text-lg text-center lg:text-left tracking-wider transition-all duration-500"
	style="opacity: {opacity};"
	bind:this={ref}
>
	{msg}
</p>

<style lang="postcss">
	.message-bar.message-normal {
		@apply text-gray-500;
	}
</style>

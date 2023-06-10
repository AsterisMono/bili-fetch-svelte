<script lang="ts">
	import type { Message } from '$lib/types/Message';
	import { message } from '$lib/utils/StatusStore';

	let currentMessage = '请稍等片刻';
	let messageType = 'message-normal';
	let currentClickHandler: () => void = () => {};
	let opacity = 1;
	let ref: HTMLParagraphElement;

	const statusMessageHandler = (message: Message) => {
		if (!ref || message.content == currentMessage) return;
		opacity = 0;
		const onMsgHidden = () => {
			if ('onClick' in message) {
				messageType = 'message-link';
				currentClickHandler = message.onClick;
				ref.addEventListener('click', currentClickHandler);
			} else {
				messageType = 'message-normal';
				if (currentClickHandler) ref.removeEventListener('click', currentClickHandler);
			}
			currentMessage = message.content;
			opacity = 1;
			ref.removeEventListener('transitionend', onMsgHidden);
		};
		ref.addEventListener('transitionend', onMsgHidden);
	};

	message.subscribe(statusMessageHandler);
</script>

<p
	class="px-4 lg:px-0 message-bar {messageType} font-medium text-lg text-center lg:text-left tracking-wider transition-all duration-500 w-fit"
	style="opacity: {opacity};"
	bind:this={ref}
>
	{currentMessage}
</p>

<style lang="postcss">
	.message-bar.message-normal {
		@apply text-gray-500;
	}
	.message-bar.message-link {
		@apply text-blue-500;
		@apply underline;
		@apply underline-offset-4;
		@apply cursor-pointer;
	}
</style>

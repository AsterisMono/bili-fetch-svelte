<script lang="ts">
	import type { StructuredMessage } from '../../../types/StatusType';
	import { infoMessage } from './StatusStore';

	let msg = '请稍等片刻';
	let opacity = 1;
	let ref: HTMLParagraphElement;
	let ongoingPromises: Promise<void>[] = [];

	const statusMessageHandler = async (message: StructuredMessage) => {
		await ongoingPromises.at(-1); // Form an await chain
		if (message.markdown == msg) return;
		return new Promise<void>((resolve) => {
			if (!ref) resolve();
			opacity = 0;
			const onMsgHidden = () => {
				msg = message.markdown; // TODO: Parse Markdown
				opacity = 1;
				ref.removeEventListener('transitionend', onMsgHidden);
			};
			ref.addEventListener('transitionend', onMsgHidden);
			setTimeout(resolve, message.time);
		});
	};

	infoMessage.subscribe(async (message) => {
		ongoingPromises = [...ongoingPromises, statusMessageHandler(message)];
	});
</script>

<p
	class="px-4 lg:px-0 message-bar message-normal font-medium text-lg text-center lg:text-left tracking-wider transition-all duration-500"
	style="opacity: {opacity};"
	bind:this={ref}
>
	{msg}
</p>

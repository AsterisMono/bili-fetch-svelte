<script lang="ts">
	import { BvidRegex } from '$lib/utils/Regex';
	import { status, message, updateStatus, updateMessage } from '$lib/utils/StatusStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getRandomLoadingPrompt } from '$lib/utils/loadingPrompts';

	let clipboardDetectLoopTimer: ReturnType<typeof setInterval>;

	async function requireCopyLink() {
		await updateMessage('复制一个B站链接，然后回到本页来开始下载', 2000);
	}

	async function requireManualInput() {
		await updateMessage('在地址栏后输入BV号来开始下载', 2000);
	}

	async function requireUserClick() {
		await updateMessage('点击这里识别你复制的B站链接', 2000, async () => await parseClipboard());
	}

	async function spicyFace() {
		await updateStatus('(`･д･)');
	}

	async function parseClipboard() {
		let clipboard: string | undefined = undefined;
		try {
			clipboard = await navigator.clipboard.readText();
		} catch (e) {
			const errorMessage = (e as { message: string }).message;
			if (errorMessage.includes('denied')) {
				await requireCopyLink();
				return;
			} else if (errorMessage.includes('focus')) {
				// 需要用户手动点击页面才能读取剪贴板
				await requireUserClick();
				return;
			} else {
				spicyFace();
				await updateMessage('剪贴板读取失败', 3000);
				await requireCopyLink();
				return;
			}
		}
		await updateMessage(getRandomLoadingPrompt(), 1500);
		const bvid = clipboard?.match(BvidRegex);
		if (bvid) {
			goto(`/${bvid[0]}`);
		} else {
			spicyFace();
			await updateMessage('没有在剪贴板中发现BV号', 2000);
			await requireCopyLink();
			clipboardDetectLoopTimer = setInterval(clipboardDetectLoop, 1000);
		}
	}

	async function clipboardDetectLoop() {
		try {
			if (document.hidden) return;
			const clipboard = await navigator.clipboard.readText();
			const bvid = clipboard?.match(BvidRegex);
			if (bvid) {
				clearInterval(clipboardDetectLoopTimer);
				goto(`/${bvid[0]}`);
			}
		} catch (e) {
			const errorMessage = (e as { message: string }).message;
			if (errorMessage.includes('focus')) {
				await updateMessage('点击这里继续', 1500, requireCopyLink);
				return;
			}
		}
	}

	// Here comes the show
	onMount(async () => {
		updateStatus('(`･∀･)');
		// @ts-ignore
		const { state: clipboardState } = await navigator.permissions.query({ name: 'clipboard-read' });
		if (clipboardState === 'granted') {
			parseClipboard();
		} else if (clipboardState === 'prompt') {
			await updateMessage('你好呀！', 2000);
			await requireUserClick();
		} else if (clipboardState === 'denied') {
			await requireManualInput();
		}
	});
</script>

<svelte:head>
	<title>Bilibili音乐下载</title>
</svelte:head>

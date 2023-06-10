import type { Message } from '$lib/types/Message';
import { derived, writable } from 'svelte/store';

export const status = writable<string>('加载中...');

export const progress = writable<number>(0);

export const message = writable<Message>({ content: '请稍等片刻...' });

export async function updateStatus(newStatus: string) {
	return new Promise<void>((resolve) => {
		status.set(newStatus);
		setTimeout(resolve, 500);
	});
}

export async function updateMessage(newMessage: string, time: number = 0, onClick?: () => void) {
	return new Promise<void>((resolve) => {
		if (onClick) {
			message.set({ content: newMessage, onClick } satisfies Message);
		} else message.set({ content: newMessage });
		setTimeout(resolve, time);
	});
}

export async function updateProgress(newProgress: number) {
	progress.set(newProgress);
}

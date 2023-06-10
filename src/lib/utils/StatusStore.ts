import { derived, writable } from 'svelte/store';

export const status = writable<string>('加载中...');

export const progress = writable<number>(0);

export const message = writable<string>('请稍等片刻');

export async function nextStatus(newStatus: string) {
	return new Promise<void>((resolve) => {
		status.set(newStatus);
		setTimeout(resolve, 500);
	});
}

export async function nextMessage(newMessage: string, time: number = 0) {
	return new Promise<void>((resolve) => {
		message.set(newMessage);
		setTimeout(resolve, time);
	});
}

export async function nextProgress(newProgress: number) {
	progress.set(newProgress);
}

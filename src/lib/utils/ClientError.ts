import { progress, nextStatus, nextMessage } from './StatusStore';

export function DisplayClientError(msg: string) {
	nextStatus('( ´ﾟДﾟ`)');
	nextMessage(msg);
	progress.set(0);
}

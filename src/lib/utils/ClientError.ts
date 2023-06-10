import { progress, nextStatus, nextMessage, nextProgress } from './StatusStore';

export function DisplayClientError(msg: string) {
	nextStatus('( ´ﾟДﾟ`)');
	nextMessage(msg);
	nextProgress(0);
}

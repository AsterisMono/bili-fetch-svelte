import { progress, updateStatus, updateMessage, updateProgress } from './StatusStore';

export function DisplayClientError(msg: string) {
	updateStatus('( ´ﾟДﾟ`)');
	updateMessage(msg);
	updateProgress(0);
}

import { status, infoMessage } from './StatusStore';

export function DisplayClientError(message: string) {
	status.set({
		statusMessage: '( ´ﾟДﾟ`)',
		progress: 0
	});
	infoMessage.set({
		markdown: message
	});
}

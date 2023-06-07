type Components = 'biliApi';

export type UnexpectedError = {
	message: string;
	component: Components;
	requestUrl: string;
	originalError: any;
};

export function panic(
	message: string,
	component: Components,
	requestUrl: string,
	originalError: any
): UnexpectedError {
	return {
		message,
		component,
		requestUrl,
		originalError
	};
}

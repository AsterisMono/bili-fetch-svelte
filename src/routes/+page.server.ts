export const load = async ({ params, setHeaders }) => {
	setHeaders({
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Embedder-Policy': 'require-corp'
	});
};

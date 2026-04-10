import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg;

export async function loadFFmpeg(): Promise<FFmpeg> {
  ffmpeg = new FFmpeg();
  try {
    const baseURL = 'https://unpkg.zhimg.com/@ffmpeg/core@0.12.6/dist/esm';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    });
  } catch (e) {
    if (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      e.message === 'SharedArrayBuffer is not defined'
    ) {
      throw Error('请使用最新版Chrome浏览器');
    } else {
      throw Error('加载失败，请重试');
    }
  }
  return ffmpeg;
}

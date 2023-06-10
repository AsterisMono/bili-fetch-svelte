export type Status = {
	statusMessage:
		| '加载中...'
		| '正在获取视频信息'
		| '正在下载视频'
		| '正在进行转换'
		| '正在给文件附魔'
		| '已完成'
		| '( ´ﾟДﾟ`)'
		| '(`･∀･)';
	progress: number;
};

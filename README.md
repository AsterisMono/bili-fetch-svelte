# bili-fetch-svelte
![Wakapi Stat](https://hourglass.amono.me/api/badge/AsterisMono/interval:any/project:bili-fetch-svelte)

一个从Bilibili下载音乐的App

[V2EX Release](https://v2ex.com/t/989277)

## 亮点
- 借助 [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) 的力量，在浏览器内完成全部处理流程，无需下载安装
- 简洁的用户界面

## 使用方式

> 截止目前（2024.6.10），此部署似乎无法正常获取API数据！可以尝试自行部署或本地启动服务

1. 复制一个Bilibili链接，然后访问[bili.amono.me](https://bili.amono.me)
2. 将地址里的 www.bilibili.com 直接替换为 bili.amono.me
3. 粘贴手机App的整段分享内容到 https://bili.amono.me/ 后面
4. 访问 https://bili.amono.me/BV号
（不推荐）

## 开发计划
- [x] 支持访问剪切板中的链接，快速开始
- [ ] 支持批量下载
- [ ] 处理分P内容（暂时可以使用`?p=1`的query params下载分p，Many thanks to JohnathanLin）
- [ ] 直接抓取音频流
- [ ] PWA App

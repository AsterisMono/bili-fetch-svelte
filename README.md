# bili-fetch-svelte

一个从Bilibili下载音乐的App

[V2EX Release](https://v2ex.com/t/989277)

## 亮点

- 借助 [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) 的力量，在浏览器内完成全部处理流程，无需下载安装
- 简洁的用户界面

## 使用方式

> Cloudflare Pages 上的公共实例已无法正常工作，Bilibili API 会拦截来自 Cloudflare 数据中心 IP 的请求。请自行部署或本地启动服务。

1. 将地址里的 www.bilibili.com 直接替换为你的域名
2. 粘贴手机App的整段分享内容到你的域名后面
3. 访问 https://你的域名/BV号

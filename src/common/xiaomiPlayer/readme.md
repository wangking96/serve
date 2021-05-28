# 在 Dplayer 的基础上进行了二次封装

# 增加功能

1. 水印图配置
   参数 1： logo // 要配置水印图的地址
   参数 2： logoOptions：{
   width, //宽度
   height, // 高度
   left, // 向左定位
   top // 向上定位
   }
2. mini播放器方法
   getMiniplayer() // 开启 mini 播放器
   exitMiniplayer() // 关闭 mini 播放器
3. 事件监听方法
   miniplayer_show    // on("miniplayer_show")  监听开启播放器
   miniplayer_hide    // on("miniplayer_show")  监听关闭播放器
4. 修复flv,hls 监听error事件的回调函数
5. 修改UI样式调整，默认主题色

```
 // const player = new xiaomiPlayer({
            //     container: document.getElementById('xiaomiplayer'),
            //     preload: 'none',
            //     video: {
            //         url:
            //             '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
            //         type: 'hls',
            //     },
            //     autoplay: true,
            //     live: true,
            //     lang: 'zh-cn',
            //     logo:
            //         'https://livecdn.hgisuzu.com/image/watermark/20210429/69ebfb6f8569d5769087aa8614c8a370.png',
            //     logoOptions: {
            //         width: '200px',
            //         height: '60px',
            //         top: '20px',
            //         left: '20px',
            //     },
            // });
```

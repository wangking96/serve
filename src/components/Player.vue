<template>
    <div class="l-player">
        
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
    setup() {
        onMounted(() => {
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
            // data.player = player;
        });
        return {};
    },
});
</script>

<style lang="scss" scoped>
.player {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>

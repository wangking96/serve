<template>
    <div class="my-player">
        <div
            class="player-loading"
            :style="`background-image: url('/images/platform/${platform}/player-enter.gif');`"
            v-if="playerLoading"
        >
            <img src="/images/live/loading.gif" alt="" />
        </div>
        <!-- <div v-if="!living" class="noliving">
            <img src="/images/platform/fengxin/noliverbg.gif" alt="">
        </div> -->
        <div class="player" id="xgplayer" ref="playDom"></div>
    </div>
</template>

<script>
import { defineComponent, nextTick, reactive, toRefs, watch } from 'vue';
import 'xgplayer';
import xgplayerFlv from 'xgplayer-flv.js';
import xgplayerHls from 'xgplayer-hls.js';
import { appSource } from '../common/tools';

export default defineComponent({
    props: {
        hlsUrl: String,
        flvUrl: String,
        living: Boolean,
    },
    setup(props) {
        const data = reactive({
            playDom: null,
            player: null,
            playerLoading: false,
            platform: import.meta.env.MODE,
        });
        const initPlayerFn = (hls, flv) => {
            data.playerLoading = true;
            let opt = {
                el: data.playDom,
                // el: document.querySelector('#xgplayer'),
                url: '',
                width: '100%',
                height: '100%',
                isLive: true,
                videoInit: true, //初始化显示视频首帧
                autoplay: false,
                lang: 'zh-cn',
                preloadTime: 30, //预加载时长(秒)	30
                minCachedTime: 5, //当前播放时间距离已缓存资源片段结束点剩多长时间时开始请求新片段(秒)	5
                cors: true, //请求是否跨域	true
                playsinline: true,
                fitVideoSize: 'fixWidth',
                // type: "flv",
                // rotate: {
                //     //视频旋转按钮配置项
                //     innerRotate: true, //只旋转内部video
                //     clockwise: true, // 旋转方向是否为顺时针
                // },
                // poster: this.liveObj.thumb, //封面
                // lastPlayTime: 20, //视频起播时间（单位：秒）
                // lastPlayTimeHideDelay: 5, //提示文字展示时长（单位：秒）
            };
            if (appSource() === 'ios') {
                opt.url = hls;
                data.player = new xgplayerHls(opt);
            } else {
                opt.url = flv;
                data.player = new xgplayerFlv(opt);
            }
            data.player.on('canplay', () => {
                console.log('player can play');
                data.playerLoading = false;
            });
            data.player.on('error', () => {
                console.log('create player error');
            });
        };

        watch(
            () => [props.hlsUrl, props.flvUrl],
            ([hls, flv]) => {
                if (data.player) {
                    data.player.destroy();
                    data.player = null;
                }
                nextTick(() => {
                    if (hls && flv) {
                        initPlayerFn(hls, flv);
                    }
                });
            },
            { immediate: true }
        );

        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.my-player {
    width: 100%;
    height: 100%;
    position: relative;
    .player {
        width: 100%;
        height: 100% !important;
        &-loading {
            width: 100%;
            height: 100%;
            @include bg();
            @include position(
                $position: absolute,
                $top: 0,
                $left: 0,
                $zIndex: 199
            );
            & > img {
                width: 460px;
                transform: translateX(-50%);
                @include position(
                    $position: absolute,
                    $left: 50%,
                    $bottom: 150px
                );
            }
        }
    }
    .noliving {
        width: 100%;
        height: 100%;
        padding-top: 40px;
        @include flexCenter();
        box-sizing: border-box;
        img {
            display: block;
            width: 600px;
            height: 330px;
            border-radius: 12px;
            transition: all 0.8s;
            box-shadow: 0px 1px 13px 0px rgba(255, 169, 0, 0.53);
        }
    }
}
</style>
<style lang="scss">
.my-player .xgplayer-skin-default {
    .xgplayer-loading {
        width: 100px;
        height: 100px;
        transform: scale(1);
        margin: -50px auto;
        svg {
            width: 100%;
            height: 100%;
        }
    }
    .xgplayer-enter {
        .xgplayer-enter-spinner {
            width: 100px;
            height: 100px;
        }
    }
    video {
        object-fit: cover;
    }
}
</style>

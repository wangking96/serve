import { defineComponent, onMounted, reactive, getCurrentInstance, onUnmounted, ref, Ref, onBeforeUnmount } from "vue";
import { post } from "../../../common/server";
import { Api } from "../../../common/api";
import { useRoute } from "vue-router";
import { Decrypt } from "../../../common/AES";
import { getDocumentTop } from "../../../common/scroll";
import classnames  from 'classnames';
import "xgplayer";
// import HlsJsPlayer from "xgplayer-hls.js";
import FlvJsPlayer from "xgplayer-flv.js";

import "./index.scss";

const BallVideo = defineComponent({
    setup() {
        const {ctx} = getCurrentInstance() as any;
        const route: any = useRoute();
        const data = reactive({
            hlsUrl: "",
            flvUrl: '',
            res: {
                code: null,
                msg: ''
            },
            player: {} as any,
            right: 0,
            bottom: 100,
            distX: 0,           //鼠标距离box左边的距离
			distY: 0,           //鼠标距离box上边的距离
			isMove: false,      //开始移动了吗
            isPlay: false,
            isDrag: false,
            isFirstShow: false,
            isCanPlay: false
        });
        const moveEl:Ref<Element> | any = ref(null);
        const playEl:Ref<Element> | any = ref(null);
        const getPlayerUrl = async () => {
            if(![1, 3].includes(parseInt(route.query.status))) {
                let res: any = await post(Api.createPullUrl, {
                    matchId: Number(route.query.id),
                });
                if (res.code === "0000") {
                    data.hlsUrl = Decrypt(res.result.hlsUrl);
                    data.flvUrl = Decrypt(res.result.flvUrl);
                    
                }else {
                    ctx.$message({
                        text: res.message,
                        type: 'error',
                        close: () => {
                            data.res.code = res.code;
                            data.res.msg = res.message;
                        }
                    })
                }
                if(res.result) await setPalyer();
            }
        };
        // 播放设置
        const setPalyer = () => {
            let player = new FlvJsPlayer({
                id: "play",
                playsinline: true,
                whitelist: [""],
                url: data.flvUrl, // || data.hlsUrl,
                width: "1400",
                height: "540",
                autoplay: true,
                fluid: false,
                errorTips: `<span style="color: red;font-size:20px;">加载失败！</span>`,
                miniplayerConfig: {
                    right: data.right,
                    bottom: data.bottom
                },
                isLive: true,
                lang: "zh-cn",
                type: "flv",
                hasVideo: true,
                hasAudio: true,
            });
            data.player = player
            player.on('error', function () {
                console.log('error....',);
                data.isCanPlay = false
            })
            player.on('canplay', () => {
                console.log('canplay');
                data.isCanPlay = true
            })
            window.onscroll = function () {
                if(!data.isDrag && data.isCanPlay) {
                    if (getDocumentTop() > 480) {
                        if(data.isFirstShow) return;
                        playEl.value && playEl.value.classList.add('picture');
                        if(moveEl.value) moveEl.value.style.display = 'block';
                        player.getMiniplayer && player.getMiniplayer();
                        data.isFirstShow = true;
                    } else {
                        playEl.value && playEl.value.classList.remove('picture');
                        if(moveEl.value) {
                            moveEl.value.style.top = 'auto';
                            moveEl.value.style.left = 'auto';
                            moveEl.value.style.right = 0;
                            moveEl.value.style.bottom = '100px';
                            moveEl.value.style.display = 'none';
                        }
                        player.exitMiniplayer && player.exitMiniplayer();
                        data.isFirstShow = false;
                    }
                }
            };
        };
        const playOrPauseFn = () => {
            data.isPlay = !data.isPlay;
            data.isPlay ? data.player.pause() : data.player.play();
        }
        const closeMiniPlayerFn = () => {
            data.isDrag = true;
            data.player.exitMiniplayer();
            playEl.value && playEl.value.classList.remove('picture');
        }
        const getLiveText = (status: string) => {
            switch (status) {
                case "1":
                return "比赛已经结束";
                case "3":
                return "比赛还未开始";
                default:
                return "";
            }
        };
        const moveElMouseDownFn = (e:any):void  => {
            const classNames:string[] = ['move-wrap-play', 'move-wrap-close', 'play-btn play', 'play-btn pause']
            if(classNames.includes(e.target.className)) return;
            //计算鼠标距离moveEl左上边距的距离
            data.distX = e.clientX - moveEl.value.offsetLeft;
            data.distY = e.clientY - moveEl.value.offsetTop;
            data.isMove = true;
        }
        const moveElMouseMoveFn = (e:any):void => {
            if(!data.isMove) return;
            //box的left 与 top数值
            let oL = e.clientX - data.distX;
            let oT = e.clientY - data.distY;
            let maxL = document.body.clientWidth - moveEl.value.offsetWidth;
            let maxT = document.body.clientHeight  - moveEl.value.offsetHeight;
            //拖拽不能超出屏幕边界
            if(oL < 0){
                oL = 0;
            }else if (oL > maxL){
                oL = maxL;
            }
            if(oT < 0){
                oT = 0;
            }else if(oT > maxT){
                oT = maxT;
            }
            moveEl.value.style.left =  oL + "px";
            moveEl.value.style.top =  oT + "px";
            playEl.value.style.left =  oL + "px";
            playEl.value.style.top =  oT + "px";
        }
        onMounted(() => {
            getPlayerUrl();
            if(moveEl.value) {
                //鼠标按下，激活拖拽
                moveEl.value.addEventListener("mousedown", moveElMouseDownFn);
                //拖拽开始
                moveEl.value.addEventListener("mousemove", moveElMouseMoveFn);
                //鼠标松开，拖拽结束
                moveEl.value.addEventListener("mouseup", () => {
                    data.isMove = false;
                })
            }
        });
        onBeforeUnmount(() => {
			moveEl.value && moveEl.value.removeEventListener("mousedown", moveElMouseDownFn);
			moveEl.value && moveEl.value.removeEventListener("mousedown", moveElMouseMoveFn);
        });
        onUnmounted(() => {
            if(data.player && data.player.destroy) data.player.destroy();
        })
        return () => (
            <div class="match-balllive-box">
                <div class="match-balllive-xg-live">
                    {route.query.status == 2 ? (
                        data.res.code === '1001' 
                            ? 
                            ( <div class="error-tip">{ data.res.msg }</div> ) 
                            : 
                            (<div id="play" ref={ playEl }>
                                { 
                                    !data.isDrag && <div class="move" ref={ moveEl }>
                                        <div class="move-wrap">
                                            <div class="move-wrap-close" onClick={ closeMiniPlayerFn }></div>
                                            <div class="move-wrap-title">按住视频可进行拖拽</div>
                                            <div class="move-wrap-play" onClick={ playOrPauseFn }>
                                                <div class={classnames('play-btn', data.isPlay ? 'play' : 'pause')}></div>
                                            </div>
                                        </div>
                                    </div>
                                }    
                            </div>)
                    ) : (
                        <div class="match-balllive-xg-nolive">
                            {getLiveText(route.query.status)}
                        </div>
                    )}
                </div>
                <div class="match-balllive-xg-shore">
                    <div class="match-balllive-xg-shore-left">
                        {/* <div class="btn collect">收藏</div>
                        <div class="btn phone">手机看</div> */}
                    </div>
                    <div class="match-balllive-xg-shore-right">
                        <div class="btn share"><i></i>分享</div>
                    </div>
                </div>
            </div>
        );
    },
});

export default BallVideo;

import { defineComponent, onMounted, reactive } from "vue";
import Swiper from "swiper";
import { useRouter } from "vue-router";

import "./index.scss";

const SwiperLive = defineComponent({
    props: {
        ballType: Number
    },
    setup(props) {
        let mySwiper:any = reactive({})
        onMounted(() => {
                mySwiper = new Swiper(".swiper-container", {
                loop: true, // 循环模式选项
                // autoplay: true,
                // 如果需要前进后退按钮
                // navigation: {
                //     nextEl: ".swiper-button-next",
                //     prevEl: ".swiper-button-prev",
                // },
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass : 'my-bullet',
                    bulletActiveClass: 'my-bullet-active',
                },
            });
            // console.log(mySwiper);
        });
        const slideClickFn = (type: string) => {
            type === 'prev' ? mySwiper.slidePrev() :  mySwiper.slideNext();
        }
        return () => (
            <div class="ball-swiper-box">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {
                            props.ballType === 1 
                            ? 
                                <>
                                    <div class="swiper-slide">
                                        <img src={require("@assets/images/ball/football1.png")} alt=""/>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src={require("@assets/images/ball/football2.png")} alt=""/>
                                    </div>
                                </>
                            : 
                                <>
                                    <div class="swiper-slide">
                                        <img src={require("@assets/images/ball/basketball1.png")} alt=""/>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src={require("@assets/images/ball/basketball2.png")} alt=""/>
                                    </div>
                                </>
                        }
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="prev swiper-btn" onClick={ () => slideClickFn('prev') }></div>
                <div class="next swiper-btn" onClick={ () => slideClickFn('next') }></div>
            </div>
        );
    },
});

export default SwiperLive;

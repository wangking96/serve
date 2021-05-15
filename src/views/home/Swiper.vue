<template>
    <div class="my-swiper">
        <van-swipe height="134">
            <van-swipe-item v-for="item in swipers" :key="item">
                <a
                    :href="item.url"
                    :target="item.target"
                    rel="noopener noreferrer"
                >
                    <img v-lazy="item.image" alt="轮播图" />
                </a>
            </van-swipe-item>
            <!-- <template #indicator="{ active }">
                <div class="custom-indicator">{{ active + 1 }}/4</div>
            </template> -->
        </van-swipe>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import api from '../../api/api';
import Request from '../../common/request';
export default defineComponent({
    setup() {
        const data = reactive({
            swipers: [],
        });

        onMounted(() => {
            Request({
                params: {
                    service: api.swiper,
                    method: 'post',
                },
            }).then((res) => {
                if (res.info) {
                    res.info.forEach((item) => {
                        if (parseInt(item.position) === 5) {
                            data.swipers = item.items;
                        }
                    });
                }
            });
        })
        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scoped>
.my-swiper {
    a,
    img {
        width: 100%;
        height: 100%;
        display: block;
    }
    img {
        object-fit: cover;
    }
    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
}
</style>
<style lang="scss">
.van-swipe__indicators {
    @include position($position: absolute, $left: auto, $right: 10px, $bottom: 10px);
    .van-swipe__indicator {
        width: 16px;
        height: 16px;
        opacity: .8;
        background-color: #fff;
    }
    .van-swipe__indicator--active {
        background-color: #1989fa;
    }
}
</style>

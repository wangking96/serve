<template>
    <div class="banner">
        <div class="banner-left">
            <el-carousel height="500px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="/images/banner1.png">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="banner-right">
            <router-link to=""><img src="/images/banner_oubao.png"></router-link>
            <router-link to=""><img src="/images/banner_adult.png"></router-link>
            <div class="banner-right-bototm">
                <router-link to=""><img src="/images/banner_suggest.png"></router-link>
                <router-link to=""><img src="/images/banner_wait.png"></router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
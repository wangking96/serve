<template>
    <div class="header">
        <div class="header-main main">
            <div class="header-left">
                <img src="/images/logo.png" alt="">
                <div>
                    <p>——找小姐 · 就上小姐网！</p>
                    <p>最全的小姐信息 · 给您提供安全、优质的服务</p>
                </div>
            </div>
            <div class="header-content">
                <router-link to="">首页</router-link>
                <router-link to="">发布</router-link>
                <router-link to="">关于我们</router-link>
                <div class="header-content-search">
                    <input type="text" placeholder="搜你所搜，想你所想">
                    <img src="/images/search.png" alt="">
                </div>
            </div>
            <div class="header-right">
                <router-link to=""><img src="/images/vip.png" alt=""></router-link>
                <router-link to=""><img src="/images/kefu.png" alt=""></router-link>
                <router-link to=""><img src="/images/mine.png" alt=""></router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<template>
    <div class="home">
        <Header />
        <div class="main">
            <Banner />
            <Tabs />
            <Area />
            <Picture />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Banner from './Banner'
import Tabs from './Tabs'
import Area from './Area'
import Picture from './Picture'
export default {
    name: 'Home',
    components: {
        Header,
        Banner,
        Tabs,
        Area,
        Picture
    },
    mounted(){
       
    }
}
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    background-size: 101% auto;
    background-position-x: -2px;
    background-repeat: no-repeat;
    background-image: url('/images/home-bg.png');
}
</style>

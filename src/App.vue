<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <Dialog />
    <Navbar />
    <Footer />
    <div class="light">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        Neon Button
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Dialog from './components/dialog/index.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
    name: 'App',
    components: {
        HelloWorld,
        Dialog,
        Navbar,
        Footer,
    },
});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
body {
    background-color: #000;
}
.light {
    display: block;
    margin: 50px auto;
    width: fit-content;
    padding: 25px 30px;
    color: #03e9f4;
    font-size: 24px;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    cursor: pointer;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    &:hover {
        background-color: #03e9f4;
        color: #050801;
        box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 200px #03e9f4;
    }
    div {
        width: 100%;
        height: 2px;
        position: absolute;
        &:nth-child(2),
        &:nth-child(4) {
            width: 2px;
            height: 100%;
        }
        &:nth-child(1) {
            top: 0;
            left: -100%;
            background: linear-gradient(to right, transparent, #03e9f4);
            animation: animate1 1s linear infinite;
        }
        &:nth-child(2) {
            top: -100%;
            right: 0;
            background: linear-gradient(to bottom, transparent, #03e9f4);
            animation: animate2 1s linear infinite;
            animation-delay:  .25s;
        }
        &:nth-child(3) {
            right: -100%;
            bottom: 0;
            background: linear-gradient(to left, transparent, #03e9f4);
            animation: animate3 1s linear infinite;
            animation-delay:  .5s;
        }
        &:nth-child(4) {
            bottom: -100%;
            left: 0;
            background: linear-gradient(to top, transparent, #03e9f4);
            animation: animate4 1s linear infinite;
            animation-delay:  .75s;
        }
    }
}
@keyframes animate1 {
    0%{ left: -100%; }
    50%{ left: 100%; }
    100%{ left: 100%; }
}
@keyframes animate2 {
    0%{ top: -100%; }
    50%{ top: 100%; }
    100%{ top: 100%; }
}
@keyframes animate3 {
    0%{ right: -100%; }
    50%{ right: 100%; }
    100%{ right: 100%; }
}
@keyframes animate4 {
    0%{ bottom: -100%; }
    50%{ bottom: 100%; }
    100%{ bottom: 100%; }
}
</style>

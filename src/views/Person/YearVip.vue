<template>
    <div class="vip">
        <Vip :img="img" />
    </div>
</template>

<script>
import Vip from '@/components/Vip'
export default {
    components: {
        Vip
    },
    data() {
        return {
            img: '/images/card1.png'
        }
    }
}
</script>
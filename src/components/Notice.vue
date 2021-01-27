<template>
    <van-notice-bar
        class="notice"
        color="#333333" 
        left-icon="volume"
        background="#fff"
        :text="content">
        <img slot="left-icon" src="/images/notice.png">
    </van-notice-bar>
</template>

<script>
import { mapGetters } from 'vuex'
// 替换空格，把块级元素变成行内元素
function transferString(content) {
    let string = content
    try {
        string = string.replace(/\r|\n|\r\n|<[^>]+>/g, ' ')
    } catch (e) {
        console.log(e.message)
    }
    return string
}
export default {
    computed: {
        ...mapGetters(['notice']),
        content() {
            if (this.notice.bottom_bet_area && Array.isArray(this.notice.bottom_bet_area)) {
                const arr = this.notice.bottom_bet_area.map(item => transferString(item.content))
                return arr.join(' ')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.notice {
    img {
        width: 20px;
    }
}
</style>
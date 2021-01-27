<template>
    <div class="lottery-header" :style="{height: height + 'px'}">
        <div class="lottery-header-logo" :style="{lineHeight: height + 'px'}">LOOG</div>
        <div class="lottery-header-lang">
            <div class="lottery-header-lang-left">
                <div 
                    class="lottery-header-lang-left-money" 
                    id="money"
                    v-if="token" 
                    @click="handleAccount">
                    1,000,000,000 d
                </div>
                <div class="lottery-header-lang-left-btn" v-else>
                    <div class="lottery-header-lang-left-btn-text">đăng nhập Đăng ký</div>
                </div>
            </div>
            <div 
                class="lottery-header-lang-right" 
                :style="{width: height + 'px'}" 
                id="lang"
                @click="handleLang">
            </div>
        </div>
        <Popup :isVisible="isAccountVisible" :top="height + 10">
            <div class="lottery-header-account">
                <svg-icon icon-class="pop-account"></svg-icon>
                &nbsp;
                <span>账号：</span>
                <span>akalixxx2020</span>
            </div>
            <div class="lottery-header-money">
                <svg-icon icon-class="pop-money"></svg-icon>
                &nbsp;
                <span>余额：</span>
                <span>1,000,000,000 d</span>
            </div>
        </Popup>
        <Popup :isVisible="isLangVisible" :top="height + 10" :right="10">
            <div class="lottery-header-language van-hairline--bottom vi">Tiếng Việt</div>
            <div class="lottery-header-language en">Ngôn ngữ tiếng anh</div>
        </Popup>
    </div>
</template>

<script>
import Popup from './Popup'
export default {
    components: {
        Popup
    },
    props: {
        height: {
            type: Number,
            default: 46
        }
    },
    data() {
        return {
            token: true,
            isAccountVisible: false,
            isLangVisible: false
        }
    },
    mounted() {
        document.addEventListener('click', this.hide)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hide)
    },
    methods: {
        handleAccount() {
            this.isLangVisible = false
            this.isAccountVisible = true
        },
        handleLang() {
            this.isAccountVisible = false
            this.isLangVisible = true
        },
        hide(e) {
            const money = document.getElementById('money')
            const lang = document.getElementById('lang')
            if (e.target === money || e.target === lang) return
            this.isAccountVisible = false
            this.isLangVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.lottery-header {
    width: 100%;
    display: flex;
    background-color: $white;
    position: relative;
    &-logo {
        flex: 1;
        line-height: 46px;
        padding-left: 10px;
        font-size: 18px;
        font-weight: bold;
        color: $theme-color;
    }
    &-lang {
        flex: 2;
        display: flex;
        &-left {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            &-money {
                height: 28px;
                line-height: 28px;
                color: $theme-color;
            }
            &-btn {
                height: 28px;
                padding: 1px;
                background-image: $bg-header;
                border-radius: 14px;
                &-text {
                    height: 26px;
                    line-height: 26px;
                    padding: 0 12px;
                    border-radius: 13px;
                    color: $theme-color;
                    background-color: $white;
                }
            }
        }
        &-right {
            background-image: url('/images/vi.png');
            background-size: 26px;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
    &-account, &-money {
        height: 26px;
        line-height: 26px;
        font-size: 16px;
        color: #666;
    }
    &-language {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #666;
        padding-left: 26px;
        background-size: 20px;
        background-position: 0 center;
        background-repeat: no-repeat;
        &.vi {
            background-image: url('/images/vi.png');
        }
        &.en {
            background-image: url('/images/en.png');
        }
    }
}
</style>
<template>
    <div class="lottery-features" :style="{height: height + 'px'}">
        <div class="lottery-features-item">
            <img src="/images/icon-cunkuan.png" class="lottery-features-item-icon"/>
            <div class="lottery-features-item-text">tiền gửi</div>
        </div>
        <div class="lottery-features-item">
            <img src="/images/icon-qukuan.png" class="lottery-features-item-icon"/>
            <div class="lottery-features-item-text">Rút tiền</div>
        </div>
        <div class="lottery-features-item">
            <img src="/images/icon-transfer.png" class="lottery-features-item-icon"/>
            <div class="lottery-features-item-text">chuyển</div>
        </div>
        <div class="lottery-features-item">
            <img src="/images/icon-service.png" class="lottery-features-item-icon"/>
            <div class="lottery-features-item-text">Dịch vụ</div>
        </div>
        <div class="lottery-features-item">
            <img src="/images/icon-appdownload.png" class="lottery-features-item-icon"/>
            <div class="lottery-features-item-text">APP</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 60
        }
    }
}
</script>

<style lang="scss" scoped>
.lottery-features {
    width: 100%;
    padding: 0 10px;
    display: flex;
    background-color: $white;
    &-item {
        flex: 1;
        text-align: center;
        &-icon {
            width: 38px;
        }
        &-text {
            color: $font-important;
            font-size: $font-regular;
        }
    }
}
</style>
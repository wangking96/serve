<template>
    <div class="lotterycell">
        <div class="lotterycell-title"></div>
    </div>
</template>

<script>
export default {
    props: {
        group: Object
    }
}
</script>

<style lang="scss" scoped>
.lotterycell {
    background-color: $white;
    box-shadow: $box-shadow-block;
    &-title {
        height: 30px;
        line-height: 30px;
    }
}
</style>
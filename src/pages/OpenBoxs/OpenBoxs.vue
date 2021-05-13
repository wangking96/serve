<template>
    <div>开箱</div>
    <button @click="showModal">显示modal</button>
    <button @click="showMessage('info')">显示信息Message</button>
    <button @click="showMessage('success')">显示成功Message</button>
    <button @click="showMessage('error')">显示失败Message</button>

    <Fmodal
        title="这是标题"
        title-class="aaa"
        :top="40"
        :visible="visible"
        :show-close="true"
        @closed="closeFn"
    >
        <div>这是content</div>
    </Fmodal>
</template>

<script lang="ts">
import { ref, Ref, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
    name: 'Home',

    setup() {
        const { ctx } = getCurrentInstance() as any;
        const visible: Ref<boolean> = ref(false);
        const showModal = () => {
            visible.value = !visible.value;
        };
        const closeFn = () => {
            visible.value = !visible.value;
        };
        const showMessage = (type: string) => {
            ctx.$message({
                message: 'message显示次数：' + type,
                type,
                close: () => {
                    console.log(1111111);
                },
            });
        };

        return {
            visible,
            showModal,
            closeFn,
            showMessage,
        };
    },
});
</script>
<style scoped lang="scss">
</style>

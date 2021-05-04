<template>
   <div class="mask" v-if="isMask"></div>
   <transition name="bounce">
      <div class="dialog" v-if="visiable">
         <div class="dialog-close" @click="closeDialogFn"></div>
      </div>
   </transition>
   <button @click="showDialogFn">Toggle</button>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
export default defineComponent({
   setup() {
      let isMask:Ref<boolean> = ref(false);
      let visiable:Ref<boolean> = ref(false);

      const showDialogFn = () => {
         isMask.value = !isMask.value;
         visiable.value = !visiable.value;
      };
      const closeDialogFn = () => {
         visiable.value = !visiable.value;
         setTimeout(() => {
            isMask.value = !isMask.value;
         }, 500);
      };

      return {
         isMask,
         visiable,
         showDialogFn,
         closeDialogFn,
      };
   }
})
</script>

<style lang="scss" scoped>
button {
   color: $baseColor;
}
.mask {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
   background-color: rgba(0, 0, 0, 0.6);
}
.dialog {
   width: 500px;
   height: 300px;
   background-color: rgb(248, 246, 246);
   position: fixed;
   top: 20%;
   left: 50%;
   margin-left: -250px;
   z-index: 11;
   border-radius: 6px;
}
.dialog-close {
   width: 30px;
   height: 30px;
   top: 6px;
   right: 6px;
   position: absolute;
   cursor: pointer;
   border-radius: 50%;
   background-color: rgba(0, 0, 0, 0.6);
}
.bounce-enter-active {
  animation: bounce .5s;
}
.bounce-leave-active {
  animation: bounce .5s reverse;
}
@keyframes bounce {
   0% {
      opacity: 0;
      transform: scale(0);
   }
   50% {
      /* transform: scale(1.2); */
   }
   100% {
      opacity: 10;
      transform: scale(1);
   }
}
</style>
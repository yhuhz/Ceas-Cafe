<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu q-pa-md">
    <div class="menu_mode shadow-5 q-pa-lg">
      <div class="flex justify-start items-center q-pb-sm">
        <q-img
          key="logo"
          src="../../assets/images/CeasLogo.png"
          style="height: 70px; width: 80px"
        />
        <h3 class="q-my-none q-pl-lg orders_title">My Orders</h3>
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let slide = ref(0);
    let isFullScreen = true;
    return {
      slide,
      isFullScreen,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

.menu {
  background-color: #fff;
  height: 100vh;
  overflow: hidden;

  .menu_mode {
    background-color: rgba(255, 255, 255, 0.582);
    width: 500px;
    height: 100%;

    .orders_title {
      font-family: "Lobster", cursive;
      font-size: 60px;
      font-weight: 700;
      color: #277bc0;
      text-shadow: -5px 1px 0 #ffb200, 1px 1px 0 #ffb200, 1px -1px 0 #ffb200,
        -1px -1px 0 #fdeedc;
    }
  }
}
</style>

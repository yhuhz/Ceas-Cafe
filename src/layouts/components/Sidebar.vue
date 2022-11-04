<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-drawer show-if-above :width="200" class="colorDrawer q-py-lg">
    <q-btn
      dense
      flat
      padding="13px xs"
      class="full-width"
      @click="$router.push('/')"
    >
      <q-img
        src="../../assets/images/CeasLogo.png"
        style="height: 70px; width: 80px"
      />
    </q-btn>
    <q-btn
      icon="restaurant_menu"
      label="Menu"
      padding="13px xs"
      stack
      :color="activeColor('/user/menu')"
      :flat="$route.path === '/user/menu' ? false : true"
      class="full-width"
      unelevated
      @click="$route.path === '/user/menu' ? '' : $router.push('menu')"
    ></q-btn>
    <q-btn
      icon="work"
      label="Workspace"
      padding="13px xs"
      stack
      :color="activeColor('/user/workspace')"
      :flat="$route.path === '/user/workspace' ? false : true"
      class="full-width"
      unelevated
      @click="
        $route.path === '/user/workspace' ? '' : $router.push('workspace')
      "
    ></q-btn>
    <q-btn
      icon="video_call"
      label="Conference Area"
      padding="13px xs"
      stack
      :color="activeColor('/user/conference_area')"
      :flat="$route.path === '/user/conference_area' ? false : true"
      class="full-width"
      unelevated
      @click="
        $route.path === '/user/conference_area'
          ? ''
          : $router.push('coference_area')
      "
    ></q-btn>
    <q-btn
      icon="photo_camera"
      label="Photoshoot"
      padding="13px xs"
      stack
      :color="activeColor('/user/photoshoot')"
      :flat="$route.path === '/user/photoshoot' ? false : true"
      class="full-width"
      unelevated
      @click="
        $route.path === '/user/photoshoot' ? '' : $router.push('photoshoot')
      "
    ></q-btn>
    <q-btn
      icon="location_on"
      label="About Us"
      padding="13px xs"
      stack
      :color="activeColor('/user/about')"
      :flat="$route.path === '/user/about' ? false : true"
      class="full-width"
      unelevated
      @click="$route.path === '/user/about' ? '' : $router.push('about')"
    ></q-btn>
    <q-btn
      icon="emoji_events"
      label="Powered By Lord Julius"
      padding="13px xs"
      stack
      color="grey-6"
      flat
      class="full-width fixed-bottom"
    ></q-btn>
  </q-drawer>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    let activeColor = (pathname) => {
      console.log(route.path);
      if (route.path === pathname) {
        return "blue";
      } else {
        return "grey-6";
      }
    };
    return {
      activeColor,
    };
  },
};
</script>

<style>
.colorDrawer {
  background-color: #333c50;
}
</style>

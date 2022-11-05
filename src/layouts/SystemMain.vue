<template>
  <q-layout view="lHr LpR fFf">
    <!-- Header -->
    <q-header class="text-white header">
      <q-toolbar class="flex justify-between">
        <q-btn
          dense
          flat
          round
          :icon="
            leftDrawerOpen
              ? 'keyboard_double_arrow_left'
              : 'keyboard_double_arrow_right'
          "
          @click="toggleLeftDrawer"
        />

        <!-- <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title> -->

        <q-btn dense flat round icon="dining" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer
      :width="200"
      class="colorDrawer"
      v-model="leftDrawerOpen"
      side="left"
    >
      <q-btn dense flat class="full-width q-py-lg" @click="$router.push('/')">
        <q-img
          src="../assets/images/CeasLogo.png"
          style="height: 100px; width: 110px"
        />
      </q-btn>
      <q-btn
        icon="restaurant_menu"
        label="Menu"
        stack
        :color="activeColor('/user/menu')"
        :flat="$route.path === '/user/menu' ? false : true"
        class="full-width q-py-lg"
        unelevated
        @click="$route.path === '/user/menu' ? '' : $router.push('menu')"
      ></q-btn>
      <q-btn
        icon="work"
        label="Workspace"
        stack
        :color="activeColor('/user/workspace')"
        :flat="$route.path === '/user/workspace' ? false : true"
        class="full-width q-py-lg"
        unelevated
        @click="
          $route.path === '/user/workspace' ? '' : $router.push('workspace')
        "
      ></q-btn>
      <q-btn
        icon="video_call"
        label="Conference Area"
        stack
        :color="activeColor('/user/conference_area')"
        :flat="$route.path === '/user/conference_area' ? false : true"
        class="full-width q-py-lg"
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
        stack
        :color="activeColor('/user/photoshoot')"
        :flat="$route.path === '/user/photoshoot' ? false : true"
        class="full-width q-py-lg"
        unelevated
        @click="
          $route.path === '/user/photoshoot' ? '' : $router.push('photoshoot')
        "
      ></q-btn>
      <q-btn
        icon="location_on"
        label="About Us"
        stack
        :color="activeColor('/user/about')"
        :flat="$route.path === '/user/about' ? false : true"
        class="full-width q-py-lg"
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

    <!-- Right Drawer -->
    <q-drawer class="colorDrawer" v-model="rightDrawerOpen" side="right">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/* eslint-disable */
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "system",
  setup() {
    const route = useRoute();

    //open and close left drawer
    let leftDrawerOpen = ref(true);
    let toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    //open and close right drawer
    let rightDrawerOpen = ref(true);
    let toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    //change color of bar
    let activeColor = (pathname) => {
      if (route.path === pathname) {
        return "blue";
      } else {
        return "grey-6";
      }
    };
    return {
      activeColor,

      leftDrawerOpen,
      toggleLeftDrawer,

      rightDrawerOpen,
      toggleRightDrawer,
    };
  },
};
</script>

<style>
.colorDrawer,
.header {
  background-color: #172d5e;
}
</style>

<template>
  <q-layout view="lHr LpR fFf">
    <!-- <div class="flex justify-start">
      <div>
        <q-list
          bordered
          padding
          class="rounded-borders text-primary"
          style="max-width: 200px; height: 100vh"
        >

          <q-item>
            <q-img
              src="../assets/images/CeasLogo.png"
              style="height: 70px; width: 80px"
            />
          </q-item>


          <q-item
            clickable
            v-ripple
            :active="link === 'menu'"
            @click="link = 'menu'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="home" />

              Home</q-item-section
            >
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'outbox'"
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>Outbox</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'trash'"
            @click="link = 'trash'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>

            <q-item-section>Trash</q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item
            clickable
            v-ripple
            :active="link === 'settings'"
            @click="link = 'settings'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'help'"
            @click="link = 'help'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div>
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div> -->

    <Sidebar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/* eslint-disable */
import { ref } from "vue";
import Sidebar from "../layouts/components/Sidebar.vue";

export default {
  name: "system",
  components: {
    Sidebar,
  },
  setup() {
    return {
      link: ref("inbox"),
    };
  },
};
</script>

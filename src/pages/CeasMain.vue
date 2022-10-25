<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout view="lHr LpR fFf">
    <div class="ceas">
      <div class="ceas_display q-pa-md">
        <div class="options absolute-top column">
          <transition-group appear enter-active-class="animated zoomIn">
            <q-img
              key="logo"
              src="../assets/images/CeasLogo.png"
              style="height: 250px; width: 300px"
              class="q-mb-lg"
            />
            <h5 key="sub" class="sayYes q-my-none">Say yes at Cea's!</h5>
          </transition-group>

          <div class="q-mt-xl">
            <transition
              appear
              enter-active-class="animated zoomInRight"
              leave-active-class="animated zoomOutRight"
            >
              <q-btn
                v-if="!optionsVisible"
                label="Show more"
                icon="double_arrow"
                flat
                no-caps
                class="optionsbtn q-px-lg q-mx-sm q-mt-md"
                style="border-radius: 10px; animation-delay: 0s"
                @click="optionsTimeout()"
              />
            </transition>

            <div v-if="optionsVisible" class="row">
              <div v-for="(button, index) in buttonNames" :key="index">
                <transition
                  appear
                  enter-active-class="animated zoomInRight"
                  leave-active-class="animated fadeOut"
                >
                  <q-btn
                    v-if="optionsVisible"
                    :label="button"
                    :icon="buttonIcons[index]"
                    rounded
                    flat
                    no-caps
                    :to="pageNames[index]"
                    class="optionsbtn q-px-lg q-mx-sm q-mt-md"
                    @click="
                      menuVisible = !menuVisible;
                      counter = index + 1;
                    "
                  />
                </transition>
              </div>
            </div>
          </div>
        </div>

        <div class="optionsDisplayDetails absolute-top">
          <transition-group
            appear
            enter-active-class="animated slideInDown"
            leave-active-class="animated slideOutUp"
          >
            <div
              v-if="menuVisible"
              class="display_background relative-position"
            >
              <div class="page_container">
                <q-page-container>
                  <router-view />
                </q-page-container>
              </div>

              <div class="detailsbtn">
                <q-btn
                  class="absolute-bottom"
                  icon="keyboard_double_arrow_up"
                  :style="{ background: backgroundColors[counter] }"
                  style="height: 20px"
                  to="/"
                  @click="
                    menuVisible = !menuVisible;
                    counter = 0;
                  "
                />
              </div>
            </div>
          </transition-group>
        </div>

        <div
          class="bottomDetails fixed-bottom"
          :style="{ background: backgroundColors[counter] }"
        >
          <p
            class="text-subtitle text-semibold q-pa-none q-my-none text-center"
          >
            Powered by Lord Julius <q-icon name="sports_martial_arts" />
          </p>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const route = useRoute();
    console.log("test");

    let optionsVisible = ref(false);
    const optionsTimeout = () => {
      optionsVisible.value = true;
      setTimeout(() => (optionsVisible.value = false), 60000);
    };

    let menuVisible = ref(false);
    window.onpopstate = function () {
      location.reload();
    };
    route.path === "/"
      ? (menuVisible.value = false)
      : (menuVisible.value = true);

    let showSlide = ref(false);
    let buttonNames = [
      "Menu",
      "Workspace",
      "Conference Area",
      "Photoshoot",
      "About Us",
    ];
    let buttonIcons = [
      "restaurant_menu",
      "wifi",
      "maps_home_work",
      "photo_camera",
      "location_on",
    ];
    let pageNames = [
      "menu",
      "workspace",
      "conference-area",
      "photoshoot",
      "aboiut-us",
    ];

    let backgroundColors = ["#2185d5", "#E38B29", "#850E35"];

    let counter = ref(0);
    route.path === "/"
      ? (counter.value = 0)
      : (counter.value =
          pageNames.findIndex((e) => e === route.path.replace("/", "")) + 1);

    return {
      optionsVisible,
      optionsTimeout,
      menuVisible,
      showSlide,
      buttonNames,
      buttonIcons,
      pageNames,
      backgroundColors,
      counter,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

.ceas {
  background: url("src/assets/images/BackgroundImages/BackgroundBread.png")
    no-repeat center;
  background-size: cover;
  height: 100vh;

  .ceas_display {
    background-color: rgba(134, 132, 132, 0.5);
    height: 100vh;
    width: 100%;

    .options {
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 15%;

      .sayYes {
        font-family: "Lobster", cursive;
        font-size: 100px;
        font-weight: 700;
        color: #2185d5;
        text-shadow: -5px 1px 0 #3a4750, 1px 1px 0 #3a4750, 1px -1px 0 #3a4750,
          -1px -1px 0 #3a4750;
        animation-duration: 0.9s;
      }

      .optionsbtn {
        background-color: #2185d5;
        font-size: 20px;
        color: #f3f3f3;
        border: 1px solid #2185d5;
        animation-delay: 0.2s;
        animation-duration: 0.5s;
      }

      .optionsbtn:hover {
        color: #3a4750;
        border: 2px solid #f3f3f3;
        background-color: #f3f3f3;
      }
    }

    .optionsDisplayDetails {
      display: flex;
      align-items: center;
      justify-content: center;

      .display_background {
        background-color: rgb(255, 255, 255);
        overflow: hidden;
        width: 100vw;
        height: 98vh;
        animation-duration: 0.9s;

        .page_container {
          height: 100%;
          overflow: hidden;
        }

        .detailsbtn {
          font-weight: 800;
          font-size: 20px;
          background-color: #2185d5;
          color: #f3f3f3;
          border-radius: 0;
          height: 20px;
        }
      }
    }

    .bottomDetails {
      background-color: #2185d5;
      color: #f3f3f3;
      font-weight: 500;
    }
  }
}
</style>

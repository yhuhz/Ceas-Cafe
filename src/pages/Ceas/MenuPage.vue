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

    <div class="menu_list q-ml-lg q-px-md">
      <h3 class="q-my-none text-center">What would you like to have today?</h3>

      <div class="food_menu q-mt-md">
        <q-table
          grid
          title="Rice Meals"
          :rows="rows"
          :columns="columns"
          row-key="id"
          :filter="filter"
          hide-header
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <img src="../../assets/images/Menu/MenuOne.jpg" />
            </q-td>
          </template>
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </div>

    <div
      class="bottomDetails fixed-bottom"
      :style="{ background: backgroundColors[counter] }"
    >
      <p class="text-subtitle text-semibold q-pa-none q-my-none text-center">
        Powered by Lord Julius <q-icon name="sports_martial_arts" />
      </p>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { SetMenu, MenuList } from "../../composables/Ceas";
import _ from "lodash";

export default {
  setup() {
    const route = useRoute();
    SetMenu().then((response) => {});

    let slide = ref(1);
    let isFullScreen = true;

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

    const columns = [
      {
        name: "name",
        required: true,
        align: "center",
        field: "name",
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        field: "price",
        sortable: true,
      },
    ];

    let rows = ref();

    watch(
      () => _.cloneDeep(MenuList.value),
      () => {
        rows.value = MenuList.value;
      }
    );

    return {
      MenuList,
      slide,
      isFullScreen,
      counter,
      backgroundColors,

      filter: ref(""),
      columns,
      rows,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

.menu {
  background-color: #fafafa;
  height: 100vh;
  overflow: hidden;
  display: flex;

  .menu_mode {
    background-color: rgba(255, 255, 255, 0.582);
    width: 25vw;
    height: 98%;
    border-radius: 5px;

    .orders_title {
      font-family: "Lobster", cursive;
      font-size: 60px;
      font-weight: 700;
      color: #277bc0;
      text-shadow: -5px 1px 0 #ffb200, 1px 1px 0 #ffb200, 1px -1px 0 #ffb200,
        -1px -1px 0 #fdeedc;
    }
  }

  .menu_list {
    font-family: "Lobster", cursive;
    color: black;
    // border: 1px solid black;
    width: 75vw;
  }
}
</style>

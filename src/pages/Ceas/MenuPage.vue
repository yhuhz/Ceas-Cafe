<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu q-pa-md flex justify-start items-center">
    <h3>test</h3>
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
</style>

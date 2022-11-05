<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu q-pa-md" style="overflow: hidden">
    <div class="flex justify-between items-center">
      <h5 class="q-my-none">What would you like to have today?</h5>
      <q-input
        v-model="search"
        type="search"
        label="Search Category"
        style="width: 350px"
        rounded
        dense
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="q-mt-lg">
      <q-toggle
        :label="
          showAllCategories ? 'Show Grouped Categories' : 'Show All Categories'
        "
        v-model="showAllCategories"
        @click="toggleCategories"
      />
    </div>

    <div class="categories flex">
      <!-- <div
        class="q-mx-md"
        style="border: 1px solid black; border-radius: 5px"
        v-for="cat in Category"
        :key="cat.id"
      >
        <q-img
          src="../../assets/images/Sisig.png"
          style="width: 150px; height: 100px"
        />
        <h5 class="q-my-none q-pa-md text-center">{{ cat.food_category }}</h5>
      </div> -->

      <q-virtual-scroll
        :items="Category"
        virtual-scroll-horizontal
        v-slot="{ item }"
      >
        <div
          class="category_card q-mx-md q-mb-md"
          style="border: 1px solid black; border-radius: 5px; overflow: hidden"
          :key="item.id"
        >
          <q-img
            src="../../assets/images/Sisig.png"
            style="width: 100%; height: 100px"
          />
          <h6 class="q-my-none text-center" style="font-size: 15px">
            {{ showAllCategories ? item.category : item.food_category }}
          </h6>
        </div>
      </q-virtual-scroll>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import {
  SetMenu,
  MenuList,
  SetCategories,
  Category,
} from "../../composables/Ceas";
import _ from "lodash";

export default {
  setup() {
    const route = useRoute();

    SetCategories("food_category").then((response) => {});
    // SetMenu().then((response) => {});

    let showAllCategories = ref(false);

    const toggleCategories = () => {
      if (showAllCategories.value === true) {
        SetCategories("category").then((response) => {});
      } else {
        SetCategories("food_category").then((response) => {});
      }
    };

    let search;

    let slide = ref(1);
    let isFullScreen = true;

    let pageNames = [
      "menu",
      "workspace",
      "conference-area",
      "photoshoot",
      "about-us",
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
      search,
      Category,
      showAllCategories,
      toggleCategories,

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
  .categories {
    .category_card {
      width: 150px;
      max-height: 150px;
    }
  }
}
</style>

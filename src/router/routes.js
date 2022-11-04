const routes = [
  // {
  //   path: "/",
  //   name: "first-page",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "landing-page1",
  //       component: () => import("pages/Ecommerce/Ecommerce.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/main",
  //   component: () => import("layouts/EcommerceMainPage.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "landing-page2",
  //       component: () => import("pages/Ecommerce/Ecommerce.vue"),
  //     },
  //   ],
  // },

  {
    path: "/",
    name: "main",
    component: () => import("layouts/CeasMainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/CeasMain.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "menu",
    component: () => import("layouts/SystemMain.vue"),
    children: [
      {
        path: "menu",
        name: "menu",
        component: () => import("pages/Ceas/MenuPage.vue"),
      },
      {
        path: "workspace",
        name: "workspace",
        component: () => import("pages/Ceas/WorkspacePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

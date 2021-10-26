import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProfileList from "../views/ProfileList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ProfileList",
    component: ProfileList,
  },
  {
    path: "/profile/:profileId",
    name: "ProfilePage",
    props: true,
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfilePage.vue")
  },
  {
    path: "/create",
    name: "ProfileCreate",
    props: false,
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/ProfileCreate.vue")
  },
  {
    path: "/edit/:profileId",
    name: "ProfileEdit",
    props: true,
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/ProfileEdit.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

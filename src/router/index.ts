import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import ProfileList from "../views/ProfileList.vue";
import store from "@/store";

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
      import(/* webpackChunkName: "profile" */ "../views/ProfilePage.vue"),
  },
  {
    path: "/baby",
    name: "BabyPage",
    props: true,
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/BabyPage.vue"),
  },
  {
    path: "/create",
    name: "ProfileCreate",
    props: false,
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/ProfileEdit.vue"),
  },
  {
    path: "/edit/:profileId",
    name: "ProfileEdit",
    props: true,
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/ProfileEdit.vue"),
  },
  {
    path: "/signUp",
    name: "SignUpPage",
    props: true,
    meta: { requiresUnauth: true },
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/auth/SignUpPage.vue"),
  },
  {
    path: "/signIn",
    name: "SignInPage",
    props: true,
    meta: { requiresUnauth: true },
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/auth/SignInPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.meta.requiresAuth && !store.getters.isSignedIn) {
      next("/signIn");
    } else if (to.meta.requiresUnauth && store.getters.isSignedIn) {
      next("/");
    } else {
      next();
    }
  }
);

export default router;

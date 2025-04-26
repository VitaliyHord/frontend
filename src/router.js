import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "./components/MainPage.vue";
import NotFound from "./components/NotFound.vue";

import CategoriesComp from "./components/CategoriesComp.vue";
import AllPartsComp from "./components/AllPartsComp.vue";
import PartDetail from "./components/PartDetail.vue";

import Login from "./components/auth/LoginComp.vue";
import Register from "./components/auth/RegisterComp.vue";
import UserDashboard from "./components/profile/UserDashboard.vue";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: MainPage,
      name: "MainPage",
      meta: { title: "Головна - AgroParts" },
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
      meta: { title: "Сторінки не знайдено | AgroParts" },
    },
    {
      path: "/categories",
      component: CategoriesComp,
      name: "CategoriesComp",
      meta: { title: "Категорії - AgroParts" },
    },
    {
      path: "/parts",
      component: AllPartsComp,
      name: "AllPartsComp",
      meta: { title: "Всі товари - AgroParts" },
    },
    {
      path: "/part/:id",
      component: PartDetail,
    },

    {
      path: "/register",
      component: Register,
      name: "Register",
      meta: { title: "Реєстрація - AgroParts" },
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next("/user_dashboard");
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
      meta: { title: "Вхід - AgroParts" },
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next("/user_dashboard");
        } else {
          next();
        }
      },
    },
    {
      path: "/user_dashboard",
      component: UserDashboard,
      name: "UserDashboard",
      meta: { title: "Панель користувача - AgroParts" },
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next("/login");
        } else {
          next();
        }
      },
    },
  ],
});

router.afterEach((to) => {
  const defaultTitle = "AgroParts";
  document.title = to.meta.title || defaultTitle;
  window.scrollTo(0, 0);
});

export default router;

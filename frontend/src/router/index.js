// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/dashboard",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },

  {
    path: "/forgotten-password",
    name: "Forgotten Password",
    component: () => import("@/views/ForgottenPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true }, // Add meta field for routes that require auth
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

// Add the auth guard
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");

  if (to.matched.some((record) => record.meta.requiresAuth) && !accessToken) {
    // Redirect to login if route requires auth and user is not authenticated
    next({ name: "Login" });
  } else if (
    accessToken &&
    (to.path === "/login" ||
      to.path === "/register" ||
      to.path === "/forgotten-password")
  ) {
    // Redirect to dashboard if user is already authenticated and tries to access auth pages
    next({ name: "Dashboard" });
  } else {
    // Proceed as normal
    next();
  }
});

export default router;

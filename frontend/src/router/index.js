// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("@/views/TasksManagementView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/proposal-generator",
    name: "Proposal Generator",
    component: () => import("@/views/ProposalGeneratorView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile-optimizaton",
    name: "Profile Optimization",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/password-manager",
    name: "Password Manager",
    component: () => import("@/views/PasswordManagerView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/project-management",
    name: "Project Management",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/client-management",
    name: "Client Management",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    name: "Reports",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");

  if (to.matched.some((record) => record.meta.requiresAuth) && !accessToken) {
    next({ name: "Login" });
  } else if (
    accessToken &&
    (to.path === "/login" ||
      to.path === "/register" ||
      to.path === "/forgotten-password")
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;

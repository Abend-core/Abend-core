import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: () => import("../views/HomeContainer.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/Login.vue"),
    meta: { hideFooter: true },
  },
  {
    path: "/registration",
    name: "InscriptionPage",
    component: () => import("../views/Registration.vue"),
    meta: { hideFooter: true },
  },
  {
    path: "/forgetPassword",
    name: "ForgetPasswordPage",
    component: () => import("../views/ForgetPassword.vue"),
    meta: { hideFooter: true },
  },
  {
    path: "/profile",
    name: "ProfilPage",
    component: () => import("../views/Profil.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/Policy.vue"),
  },
  {
    path: "/terms",
    name: "TermsOfUse",
    component: () => import("../views/TermsOfUse.vue"),
  },
  {
    path: "/contact",
    name: "ContactPage",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/user/:username",
    name: "UserModules",
    component: () => import("../views/UserModules.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/modules/tag/:tag",
    name: "TagModules",
    component: () => import("../views/TagModules.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/favorites",
    name: "LikedModules",
    component: () => import("../views/LikedModules.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/verification/:token",
    name: "VerificationPage",
    component: () => import("../views/VerificationEmail.vue"),
    meta: { hideFooter: true },
  },
  {
    path: "/verificationPassword/:token",
    name: "VerificationPasswordPage",
    component: () => import("../views/VerificationPassword.vue"),
    meta: { hideFooter: true },
  },
  {
    path: "/module",
    name: "ModulePage",
    component: () => import("../views/ModuleProfil.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/BoardAdmin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorPage",
    component: () => import("../views/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  authStore.initializeAuth();

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Accueil" });
  } else if (requiresAdmin && !authStore.isAdmin) {
    next({ name: "Accueil" });
  } else {
    next();
  }
});

export default router;

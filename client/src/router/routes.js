import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Profil from "../views/Profil.vue";
import BoardAdmin from "../views/BoardAdmin.vue";
import Error from "../views/Error.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import ModuleProfil from "../views/ModuleProfil.vue";
import LikedModules from "../views/LikedModules.vue";
import HomeDisconnected from "../views/HomeDisconnected.vue";
import UserModules from "../views/UserModules.vue";
import VerificationEmail from "../views/VerificationEmail.vue";
import VerificationPassword from "../views/VerificationPassword.vue";
import TagModules from "../views/TagModules.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Accueil", component: Home },
  { path: "/home", name: "HomeDisconnected", component: HomeDisconnected },
  { path: "/login", name: "LoginPage", component: Login },
  { path: "/registration", name: "InscriptionPage", component: Registration },
  {
    path: "/forgetPassword",
    name: "ForgetPasswordPage",
    component: ForgetPassword,
  },
  {
    path: "/profile",
    name: "ProfilPage",
    component: Profil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contact",
    name: "ContactPage",
    component: Contact,
  },
  {
    path: "/user/:username",
    name: "UserModules",
    component: UserModules,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/modules/tag/:tag",
    name: "TagModules",
    component: TagModules,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/favorites",
    name: "LikedModules",
    component: LikedModules,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/verification/:token",
    name: "VerificationPage",
    component: VerificationEmail,
  },
  {
    path: "/verificationPassword/:token",
    name: "VerificationPasswordPage",
    component: VerificationPassword,
  },
  {
    path: "/module",
    name: "ModulePage",
    component: ModuleProfil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "AdminDashboard",
    component: BoardAdmin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  { path: "/:pathMatch(.*)*", name: "ErrorPage", component: Error },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("authToken");
  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin")) || false;

  const isAuthenticated = !!token;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth && !isAuthenticated) {
    next({ name: "Accueil" });
  } else if (requiresAdmin && !isAdmin) {
    next({ name: "Accueil" });
  } else {
    next();
  }
});

export default router;

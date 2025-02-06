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
import HomeV2 from "../views/HomeV2.vue";
import ProfilModules from "../views/ProfilModules.vue";

const routes = [
  { path: "/", name: "Accueil", component: Home },
  { path: "/homev2", name: "HomeV2", component: HomeV2 },
  { path: "/connexion", name: "LoginPage", component: Login },
  { path: "/inscription", name: "InscriptionPage", component: Registration },
  {
    path: "/forgetPassword",
    name: "ForgetPasswordPage",
    component: ForgetPassword,
  },
  {
    path: "/profil",
    name: "ProfilPage",
    component: Profil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profil/:username",
    name: "ProfilModule",
    component: ProfilModules,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/favoris",
    name: "LikedModules",
    component: LikedModules,
    meta: {
      requiresAuth: true,
    },
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

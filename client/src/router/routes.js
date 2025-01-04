import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Profil from "../views/Profil.vue";
import BoardAdmin from "../views/BoardAdmin.vue";
import Error from "../views/Error.vue";
import ForgetPassword from "../views/ForgetPassword.vue";

const routes = [
  { path: "/", name: "Accueil", component: Home },
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
      requiresAuth: false,
      hideFooter: true,
    },
  },
  {
    path: "/dashboard",
    name: "AdminDashboard",
    component: BoardAdmin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      hideFooter: true,
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

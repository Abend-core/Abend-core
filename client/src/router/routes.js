import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/connexion", component: Login },
  { path: "/inscription", component: Registration },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

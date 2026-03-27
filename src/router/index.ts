import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Privacy from "@/views/Privacy.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/privacy",
      name: "privacy",
      component: Privacy,
    },
    { path: "/:pathMatch(.*)*", component: NotFound }, // must be the last
  ],
});

export default router;

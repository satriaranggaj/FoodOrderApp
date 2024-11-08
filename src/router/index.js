import { createRouter, createWebHistory } from 'vue-router'
import OpeningView from '../views/OpeningView.vue'
import HomeView from '../views/HomeView.vue'
import RestaurantView from '../views/RestaurantView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', component: OpeningView },
  { path: '/home', component: HomeView },
  { path: '/restaurants', component: RestaurantView },

  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

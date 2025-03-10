// src/router/index.js
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home }
]

// Use memory history for SSR (server-side) and web history for client-side.
const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes
})

export default router

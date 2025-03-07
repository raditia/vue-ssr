import { createSSRApp } from 'vue';
import App from './App.vue';
// (Optionally, import and configure vue-router, vuex, etc.)

export function createApp() {
  const app = createSSRApp(App);
  return { app };
}

// src/entry-server.js
import { createApp } from './main';
import { renderToString } from 'vue/server-renderer';

export async function render(url, manifest) {
  const { app } = createApp();
  // (You can add router navigation here if you use vue-router)
  const appContent = await renderToString(app);
  return { appContent };
}

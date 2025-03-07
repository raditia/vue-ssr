import { createApp } from './main';

const { app } = createApp();
// Hydrate the SSR-rendered HTML
app.mount('#app');

<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>SSR and CSR Demo</h1>
    <!-- This component is rendered on the server -->
    <ServerOnlyComponent />

    <!-- Client-only rendering: show the component only after mounting -->
    <div v-if="isClient">
      <ClientOnlyComponent />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ServerOnlyComponent from './components/ServerOnlyComponent.vue';
import ClientOnlyComponent from './components/ClientOnlyComponent.vue';

export default {
  components: { ServerOnlyComponent, ClientOnlyComponent },
  setup() {
    const isClient = ref(false);
    onMounted(() => {
      // This code only runs in the browser
      console.log('isClient', isClient.value);
      isClient.value = true;
    });
    return { isClient };
  },
};
</script>

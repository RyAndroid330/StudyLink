export default defineNuxtConfig({
  modules: ['nuxt-quasar-ui'],
  quasar: {
    config: {
      plugins: ['Dialog', 'Notify'], // Example plugins
    },
  },
});

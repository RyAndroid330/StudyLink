// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-quasar-ui'],
  ssr: true,
  quasar: {
    plugins: ['Dialog', 'Notify'],
    cssAddon: true,
    config: {
      brand: {
        primary: '#3498db',
        primaryLight: '#aed6f1',
        secondary: '#1abc9c',
        warning: '#f5b041',
        warningLight: '#fdebd0'
      }
    }
  },
  css: [
    '@vue-flow/core/dist/style.css',
    '@vue-flow/core/dist/theme-default.css'
    // '@glideapps/tables/dist/glide-tables.css'
  ],
  plugins: [{ src: '~/plugins/db.js', mode: 'server' }],
  nitro: {
    devProxy: {
      '/api': 'http://localhost:3000'
    }
  },
  compatibilityDate: '2024-09-09'
});

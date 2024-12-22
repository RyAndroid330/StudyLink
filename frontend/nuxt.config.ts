import type { NuxtConfig } from 'nuxt';

interface CustomNuxtConfig extends NuxtConfig {
  quasar: {
    extras: string[];
    framework: {
      components: string[];
      plugins: string[];
    };
  };
}

export default defineNuxtConfig<CustomNuxtConfig>({
  // ...
  modules: ['nuxt-quasar-ui', '@nuxt/devtools'],
  devtools: {
    enabled: true,
  },

  quasar: {
    extras: ['roboto-font', 'material-icons'],
    framework: {
      components: [
        'QLayout',
        'QHeader',
        'QToolbar',
        'QPageContainer',
        'QBtn',
        'QImg',
        'QList',
      ],
      plugins: [],
    },
  },

  compatibilityDate: '2024-12-21',
});

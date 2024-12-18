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
  modules: ['nuxt-quasar-ui'],
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
      ],
      plugins: [],
    },
  },
});

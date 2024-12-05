<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar
        :class="[
          'navContainer',
          toolbarClass,
          'flex',
          'justify-content-between'
        ]"
      >
        <q-img
          src='StudyLink.png'
          style="max-height: 100px; max-width: 100px; z-index: 500; margin: 5px; border-radius: 15px;box-shadow: 2px 2px;"
        />

        <q-btn flat to='/' @click="setSection('home')"> Join A Study </q-btn>
        <q-btn flat @click="() => setSection('assets')" to='/assets'> Studies </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from
'vue';
import { colors } from 'quasar';
import { useAppStore } from '~/stores/app';

// State
const showAssets = ref(false);
const showServerActivity = ref(false);
const drawerOpen = ref(true);
const appStore = useAppStore();
const { currentSection } = storeToRefs(appStore);

// Methods
const setSection = (section) => {
  appStore.setCurrentSection(section);
  showAssets.value = section === 'assets';
  showServerActivity.value = section === 'serverActivity';
};


// dynamic toolbar color
const toolbarClass = computed(() => {
  switch (currentSection.value) {
    case 'assets':
      return 'bg-primary';
    default:
      return 'bg-secondary';
  }
});

const toolbarClassLight = computed(() => {
  switch (currentSection.value) {
    case 'assets':
      return colors.changeAlpha(colors.getPaletteColor('primary'), 0.1);
    default:
      return colors.changeAlpha(colors.getPaletteColor('secondary'), 0.1);
  }
});

watch(currentSection, (newSection) => {
  setSection(newSection || 'home'); // Set 'home' if newSection is undefined
}, { immediate: true }); // immediate: true ensures the watcher is triggered on initial load

</script>

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
        <q-btn flat @click="() => setSection('assets')" to='/assets'> Create A Study </q-btn>
        <q-btn flat @click="() => setSection('Bible')" to='/Bible'> Bible </q-btn>
        <q-btn flat @click="() => setSection('Worship')" to='/Worship'> Worship </q-btn>
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
const showassets = ref(false);
const showServerActivity = ref(false);
const drawerOpen = ref(true);
const appStore = useAppStore();
const { currentSection } = storeToRefs(appStore);

// Methods
const setSection = (section) => {
  appStore.setCurrentSection(section);
  showassets.value = section === 'assets';
  showServerActivity.value = section === 'serverActivity';
};


// dynamic toolbar color
const toolbarClass = computed(() => {
  switch (currentSection.value) {
    case 'assets':
      return 'bg-cyan-12';
      case 'home':
      return 'bg-teal-13';
      case 'Bible':
      return 'bg-light-blue-5';
      case 'Worship':
      return 'bg-blue-8';
    default:
      return 'bg-teal-13';
  }
});

const toolbarClassLight = computed(() => {
  switch (currentSection.value) {
    case 'assets':
      return colors.changeAlpha(colors.getPaletteColor('cyan-12'), 0.1);
    case 'home':
      return colors.changeAlpha(colors.getPaletteColor('teal-13'), 0.1);
    case 'Bible':
      return colors.changeAlpha(colors.getPaletteColor('light-blue-5'), 0.1);
    case 'Worship':
      return colors.changeAlpha(colors.getPaletteColor('blue-8'), 0.1);
    default:
      return colors.changeAlpha(colors.getPaletteColor('teal-13'), 0.1);
  }
});

watch(currentSection, (newSection) => {
  setSection(newSection || 'home'); // Set 'home' if newSection is undefined
}, { immediate: true }); // immediate: true ensures the watcher is triggered on initial load

</script>

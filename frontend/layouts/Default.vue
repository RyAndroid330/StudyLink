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

        <q-btn flat to='/'> Join A Study </q-btn>
        <q-btn flat to='/assets'> Create A Study </q-btn>
        <q-btn flat to='/Bible'> Bible </q-btn>
        <q-btn flat to='/Worship'> Worship </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const toolbarClass = computed(() => {
  switch (route.path) {
    case '/':
      return 'bg-teal-13';
    case '/assets':
      return 'bg-cyan-12';
    case '/Bible':
      return 'bg-light-blue-5';
    case '/Worship':
      return 'bg-blue-8';
    default:
      return 'bg-teal-13';
  }
});
</script>

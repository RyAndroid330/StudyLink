<template>
  <NuxtLayout :name="layout">
    <div class="row justify-around q-ma-lg">
      <StudiesList/>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';



const layout = 'dashboard-layout';
</script>

<template>
  <NuxtLayout :name="layout">
    <div class="row justify-around q-ma-lg">
      <Bible/>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';



const layout = 'dashboard-layout';
</script>

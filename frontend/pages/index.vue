<template>
  <NuxtLayout :name="layout">
    <div class="row justify-around q-ma-lg">
      <Details>
        <template #title>
          Study Link
        </template>
        <template #info>
          <div>
          <h5>
            Welcome to Study Link! Here you can create lesson plans for a study with others. You can add scripture and worship songs and follow along with a group.
          </h5>
          <q-btn label="Find A Study" color="primary"
          @click="studiesDialog = true"></q-btn>
          </div>
        </template>
      </Details>
    </div>
    <q-dialog v-model="studiesDialog" >
      <StudiesList/>
    </q-dialog>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const layout = 'dashboard-layout';
const studiesDialog = ref(false);
</script>

<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

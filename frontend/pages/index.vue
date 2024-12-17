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
            <!-- <Worship/> -->
          </div>
        </template>
      </Details>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

const layout = 'dashboard-layout';
</script>

<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

<template>
  <q-card class="custom-card q-pa-sm row items-center justify-around" style="width:70vw; height: 50px;">

      <q-btn
        id="previous-button"
        @click="adjustSlide(-1)"
        round
        label="<"
        color="secondary"
        size="xs"
        class="q-mx-xs"
      />
      <span class="q-mx-xs" id="slide-number">{{ currentSlide }}</span>
      <q-btn
        id="next-button"
        @click="adjustSlide(1)"
        round
        label=">"
        color="secondary"
        size="xs"
        class="q-mx-xs"
      />

  </q-card>
</template>

<script setup lang="ts">
import useSlideState from '../composeables/useSlideState';

const { currentSlide, adjustSlide } = useSlideState();
</script>

<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

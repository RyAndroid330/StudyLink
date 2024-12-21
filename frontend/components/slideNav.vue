<template>
  <q-card class="custom-card q-ma-md">
    <div class="col flex-grow q-pa-md">
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
    </div>
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

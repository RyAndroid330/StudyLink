<template>
  <q-card class="custom-card q-ma-md">
    <div class="col flex-grow q-pa-md" style="min-width: 400px; max-width: 50dvw;">
      <div class="row text-h3">
        <slot name="title" />
      </div>
      <div class="row">
        <slot name="info" />
      </div>
    </div>

    <div class="q-gutter-md" style="display: flex; justify-content: center; align-items: center;">
      <div class="q-gutter-xs">
        <q-btn
          class="transparent-background"
          color="primary"
          flat
          @mouseover="hover = true"
          @mouseleave="hover = false"
          @click="navigateToItem"
        >
          <span style="margin-right: 8px;">New Study</span>
        </q-btn>
      </div>
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const hover = ref(false);
</script>

<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

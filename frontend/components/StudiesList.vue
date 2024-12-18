<template>
  <q-card class="custom-card q-ma-md">
    <div class="col flex-grow q-pa-md" style="min-width: 400px; max-width: 50vw;">
      <div class="row text-h3">
        Studies
      </div>
      <div class="row">
        <ul>
          <li v-for="study in studies" :key="study.id">
            {{ study.title }}
          </li>
        </ul>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'StudiesList',
  setup() {
    const studies = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('/studies');
        studies.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return { studies };
  },
};
</script>

<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

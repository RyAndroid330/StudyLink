<template>
  <q-page padding>
    <q-card class="custom-card q-ma-md">
<div class="flex" style="align-items: baseline;justify-content: space-between;">
  <q-input
  v-model="query"
  placeholder="Search for a song"
  dense
  outlined
  clearable
  @keyup.enter="searchSong"
  />
  <q-btn
  label="Search"
  color="primary"
  @click="searchSong"
  class="q-ma-md"
  />
</div>

    <div v-if="loading" class="q-mt-lg">
      <q-spinner size="30px" color="primary" />
      <span class="q-ml-sm">Loading...</span>
    </div>

    <q-card v-if="error" class="q-mt-lg">
      <q-card-section>
        <q-icon name="warning" color="negative" />
        <span>{{ error }}</span>
      </q-card-section>
    </q-card>

    <q-card v-if="lyrics" class="q-mt-none">
      <q-card-section>
        <h4 class="q-ma-none">{{ songTitle }}</h4>
        <pre>{{ lyrics }}</pre>
      </q-card-section>
    </q-card>
      </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const query = ref('');
const songTitle = ref('');
const lyrics = ref('');
const error = ref('');
const loading = ref(false);

async function searchSong() {
  try {
    loading.value = true;
    const response = await axios.get(`http://localhost:5000/api/songs/search/${query.value}`);
    const data = response.data;
    songTitle.value = data[0].title;
    lyrics.value = data[0].lyrics;
  } catch (err) {
    console.error('Error fetching song data:', err);
  } finally {
    loading.value = false;
  }
}
</script>


<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.q-page {
  padding: 20px;
}

.custom-card {
  min-height: 200px;
  /* max-width: 95dvw; */
 height: auto;
  overflow-y: auto;
 padding: 15px;
}

</style>

<template>
  <q-page padding>
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
      class="q-mt-md"
    />

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

    <q-card v-if="lyrics" class="q-mt-lg">
      <q-card-section>
        <h4>{{ songTitle }}</h4>
        <pre>{{ lyrics }}</pre>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const query = ref('');
const songTitle = ref('');
const lyrics = ref('');
const error = ref('');
const loading = ref(false);

async function searchSong() {
  error.value = '';
  lyrics.value = '';
  songTitle.value = '';
  loading.value = true;

  try {
    const response = await fetch(`https://api.openlyrics.org/v1/songs?title=${encodeURIComponent(query.value)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch lyrics.');
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');

    const titleNode = xmlDoc.querySelector('title');
    const verseNode = xmlDoc.querySelector('verse > lines');

    if (titleNode && verseNode) {
      songTitle.value = titleNode.textContent || '';
      lyrics.value = verseNode.textContent || '';
    } else {
      error.value = 'Lyrics not found.';
    }
  } catch (err) {
    error.value = (err as Error).message || 'An error occurred.';
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
</style>

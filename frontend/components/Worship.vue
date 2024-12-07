<!-- <template>
  <div>
    <h1>Songs List</h1>
    <ul v-if="songs.length > 0">
      <li v-for="song in songs" :key="song.key">
        <h2>{{ song.title }}</h2>
        <p><strong>Author:</strong> {{ song.authors }}</p>
        <p><strong>Category:</strong> {{ song.category }}</p>
        <p><strong>Tempo:</strong> {{ song.tempo }}</p>
        <p><strong>Intensity:</strong> {{ song.intensity }}</p>
        <a :href="song.youtube" target="_blank">YouTube</a>
      </li>
    </ul>
    <p v-else>No songs found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as glide from "@glideapps/tables";

const songsTable = glide.table({
  token: "6f05e843-7c43-4732-a4d4-f02bef5b999c",
  app: "1gyXOzTnc4NRn66JpwIG",
  table: "Songs",
  columns: {
    title: { type: "string", name: "Title" },
    authors: { type: "string", name: "Author" },
    category: { type: "string", name: "Category" },
    youtube: { type: "uri", name: "aa3d1b20090697af0c1b6d6160904685" },
    intensity: { type: "string", name: "Intensivity" },
    tempo: { type: "number", name: "Tempo" },
    key: { type: "string", name: "290612199861c31d1036b185b4e69b75" }
  }
});

const songs = ref<Array<Record<string, any>>>([]);

onMounted(async () => {
  try {
    const fetchedSongs = await songsTable.get();
    console.log("Fetched songs:", fetchedSongs);
    songs.value = fetchedSongs;
  } catch (error) {
    console.error("Error fetching songs:", error.message);
    console.log("Error details:", error);
  }
});
</script>

<style scoped>
h1 {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 1em 0;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style> -->


<template>
  <q-page padding>
    <!-- Search Input -->
    <q-input
      filled
      v-model="query"
      debounce="300"
      label="Search for Worship Songs"
      @input="searchSongs"
      class="q-mb-md"
    />

    <!-- Loading Indicator -->
    <q-spinner-dots v-if="loading" size="lg" color="primary" class="q-my-md" />

    <!-- Song List -->
    <q-list v-if="songs.length">
      <q-item
        v-for="song in songs"
        :key="song.id"
        clickable
        @click="fetchLyrics(song.id, song.name)"
      >
        <q-item-section>
          <q-item-label>{{ song.name }}</q-item-label>
          <q-item-label caption>Duration: {{ song.duration }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- No Results -->
    <q-banner v-if="!songs.length && query && !loading" color="negative">
      No songs found for "{{ query }}".
    </q-banner>

    <!-- Lyrics Dialog -->
    <q-dialog v-model="dialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selectedSong?.name }}</div>
        </q-card-section>
        <q-card-section>
          <pre>{{ lyrics || "Lyrics not available." }}</pre>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="dialogOpen = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

interface Song {
  id: string;
  name: string;
  duration: string;
}

const API_KEY = "U_WS5Sxxbf9hCueQUKI3a";
const BASE_URL = `https://osdb-api.confidence.sh/rest/${API_KEY}`;

// Reactive properties
const query = ref("");
const songs = ref<Song[]>([]);
const selectedSong = ref<Song | null>(null);
const lyrics = ref("");
const dialogOpen = ref(false);
const loading = ref(false);

// Fetch songs from the OSDB API
const searchSongs = async () => {
  if (!query.value.trim()) {
    songs.value = [];
    return;
  }

  loading.value = true;
  try {
    const response = await axios.get(`${BASE_URL}/search/song`, {
      params: { query: query.value },
    });
    songs.value = response.data.data.map((song: any) => ({
      id: song.id,
      name: song.name,
      duration: song.duration || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching songs:", error);
    songs.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch lyrics for a specific song
const fetchLyrics = async (id: string, name: string) => {
  selectedSong.value = { id, name, duration: "" };
  lyrics.value = "";
  dialogOpen.value = true;

  try {
    const response = await axios.get(`${BASE_URL}/songs/${id}`);
    lyrics.value = response.data.lyrics || "Lyrics not available.";
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    lyrics.value = "Lyrics not available.";
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

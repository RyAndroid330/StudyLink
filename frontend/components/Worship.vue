<template>
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
</style>

<template>
  <q-page>
    <q-card class="custom-card q-ma-md">
      <div class="col flex-grow q-pa-md" style="min-width: 400px; max-width: 50dvw;">
        <!-- Select Book -->
        <q-select
          v-model="selectedBook"
          :options="books"
          label="Select Book"
          emit-value
          map-options
          color="secondary"
          dense
          class="q-mb-md"
        />

        <!-- Select Chapter -->
        <q-select
          v-model="selectedChapter"
          :options="chapters"
          label="Select Chapter"
          emit-value
          map-options
          color="secondary"
          dense
          class="q-mb-md"
        />
      </div>

      <!-- Font size controls -->
      <div class="justify-center">
  <q-btn
    @click="adjustFontSize(0.5)"
    round
    icon="add_circle"
    color="secondary"
    size="xs"
    class="q-mx-xs"
  />
  <span class="q-mx-xs">Aa</span>
  <q-btn
    @click="adjustFontSize(-0.5)"
    round
    icon="remove_circle"
    color="secondary"
    size="xs"
    class="q-mx-xs"
  />
</div>

      <!-- Chapter Text -->
      <div v-html="chapterText" class="q-pa-md" :style="{ fontSize: fontSize + 'rem' }"></div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const API_KEY = '146e7ef9157f0e1e5a8092016ca6b7e1';
const BASE_URL = 'https://api.scripture.api.bible/v1/bibles';

const fontSize = ref(0.5);
const books = ref<{ label: string; value: string }[]>([]);
const chapters = ref<{ label: string; value: string }[]>([]);
const selectedBook = ref<string | null>(null);
const selectedChapter = ref<string | null>(null);
const chapterText = ref('Select a chapter to see the text');
const loading = ref(false);

// Fetch Books
const fetchBooks = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${BASE_URL}/9879dbb7cfe39e4d-04/books`, {
      headers: {
        'api-key': API_KEY,
      },
    });
    const data = await response.json();
    books.value = data.data.map((book: any) => ({
      label: book.name,
      value: book.id,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch Chapters based on selected book
const fetchChapters = async () => {
  if (selectedBook.value) {
    loading.value = true;
    try {
      const response = await fetch(
        `${BASE_URL}/9879dbb7cfe39e4d-04/books/${selectedBook.value}/chapters`,
        {
          headers: {
            'api-key': API_KEY,
          },
        }
      );
      const data = await response.json();
      chapters.value = data.data.map((chapter: any) => ({
        label: String(chapter.number),
        value: chapter.id,
      }));
    } catch (error) {
      console.error('Error fetching chapters:', error);
    } finally {
      loading.value = false;
    }
  } else {
    chapters.value = [];
    selectedChapter.value = null;
  }
};

// Fetch Chapter Text
const fetchChapterText = async () => {
  if (selectedChapter.value && selectedBook.value) {
    loading.value = true;
    try {
      const url = `${BASE_URL}/9879dbb7cfe39e4d-04/passages/${selectedChapter.value}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`;

      const response = await fetch(url, {
        headers: {
          'api-key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.data && data.data.content) {
        chapterText.value = data.data.content;
      } else {
        chapterText.value = 'No text available';
      }
    } catch (error) {
      chapterText.value = 'Error fetching chapter text';
      console.error('Error fetching chapter text:', error);
    } finally {
      loading.value = false;
    }
  } else {
    chapterText.value = 'Select a chapter to see the text';
  }
};

// Adjust Font Size
const adjustFontSize = (n: number) => {
  fontSize.value = Math.max(fontSize.value + n, 0.5);
};

// Watchers
watch(selectedBook, () => {
  selectedChapter.value = null; // Reset the selected chapter
  fetchChapters(); // Fetch the chapters when book is changed
});
watch(selectedChapter, fetchChapterText);

// On Mount
onMounted(fetchBooks);
</script>

<style scoped>
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

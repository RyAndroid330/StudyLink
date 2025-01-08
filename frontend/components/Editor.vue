<template>
  <q-page padding>
    <q-card class="custom-card q-ma-md">
      <div class="q-pa-md">
        <q-label>Slide Type</q-label>
        <div class="q-gutter-sm">
          <q-radio v-model="slideType" val="Txt" label="Text" />
          <q-radio v-model="slideType" val="BVer" label="Bible Verse" />
          <q-radio v-model="slideType" val="song" label="Song" />
        </div>

        <q-card class="custom-card q-ma-md">
          <h5 class="q-ma-sm" v-if="slideType === 'Txt'">Title</h5>
          <div class="flex flex-grow justify-center">
            <q-editor v-if="slideType === 'Txt'" v-model="editor" class="full-size-editor" />
            <Worship v-if="slideType === 'song'" />
            <Bible v-if="slideType === 'BVer'" />
            <SlideNav />
          </div>
        </q-card>
      </div>
      <q-btn
        id="save-button"
        @click="save"
        label="Save"
        color="secondary"
        size="xs"
        class="q-ma-xs"
      />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const slideType = ref('Txt');
const editor = ref('');

function save() {
  // Implement your save logic here
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
  /* min-height: 200px; */
  max-width: 95dvw;
  height: auto;
  /* overflow-y: auto; */
  padding: 15px;
}

.full-size-editor {
  width: 100%;
  height: 100%;
}
</style>

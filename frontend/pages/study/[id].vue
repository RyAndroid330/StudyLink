<template>
  <NuxtLayout :name="layout">
    <div class="flex justify-around q-ma-lg">
      <Details>
        <template #title >
          <h6 id="study-title">{{ studyTitle }}</h6>

        </template>
        <template #info id="study-content">
          <div  id="study-content">
            {{ studyContent }}
          </div>
          <slideNav></slideNav>
        </template>
      </Details>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const layout = 'dashboard-layout';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import useSlideState from '../../composeables/useSlideState';

const { currentSlide } = useSlideState();
const route = useRoute();
const studyTitle = ref('');
const studyContent = ref('');
const fetchStudyTitle = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/studies/${id}`);
    studyTitle.value = response.data[0].title;
    console.log('Study title:', studyTitle.value);
    console.log('http://localhost:5000/api/studies/' + {id})
  } catch (error) {
    console.error('Error fetching study title:', error);
  }
};

const fetchStudyContent = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/study/${id}/slide/${currentSlide.value}`);
    studyContent.value = response.data.content;
    console.log('Study Content:', studyContent.value);
  } catch (error) {
    console.error('Error fetching study content:', error);
  }
};

watch(currentSlide, async () => {
  const studyId = Number(route.params.id);
  await fetchStudyContent(studyId);
});

onMounted(() => {
  const studyId = Number(route.params.id);
  fetchStudyTitle(studyId);
  fetchStudyContent(studyId);
});
</script>

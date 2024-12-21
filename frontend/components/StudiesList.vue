<template>
  <q-card class="custom-card q-ma-md">
    <div class="col flex-grow q-pa-md" style="min-width: 400px; max-width: 50vw;">
      <div class="row text-h3">
        Studies
      </div>
      <div class="row">
        <q-list>
          <template v-for="(study, index) in studies" :key="study.id">
            <q-item clickable v-ripple>
              <q-item-section avatar @click="openStudy(study)">
                {{ study.title }}
              </q-item-section>
              <q-item-section side>
                <q-btn-group spread>
                  <q-btn
                  label="Edit"
                  color="primary"
                  @click="editStudy"
                  />
                </q-btn-group>
              </q-item-section>
            </q-item>
            <q-separator v-if="index < studies.length - 1" />
          </template>
        </q-list>
      </div>
    </div>
  </q-card>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import the useRouter hook

interface Study {
  id: number;
  title: string;
}

export default {
  name: 'StudiesList',
  setup() {
    const studies = ref<Study[]>([]);
    const router = useRouter(); // Get an instance of the router

    onMounted(async () => {
      try {
        const response = await axios.get<Study[]>('http://localhost:5000/api/studies');
        studies.value = response.data;
      } catch (error) {
        console.error('Error fetching studies:', error);
      }
    });

    return { studies, router };
  },
  methods: {
    editStudy() {
      console.log('Edit button pressed');
    },
    openStudy(study: Study) {
      this.router.push(`/study/${study.id}`);
      console.log('study button pressed');
    },
  },
};

</script>
<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

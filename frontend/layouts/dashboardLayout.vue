<template >
  <q-page-container
    class="q-pa-none"
    style="position: relative; height: 100vh; width: 100vw; padding-top: 10px !important; padding-left: 10px !important;"
  >
    <div class="polka" style="min-width: 100dvw;min-height: 100dvh; height:fit-content; width:fit-content;">
      <div class="q-pa-none " style="height: 100%; display: flex; flex-direction: column;">
        <div class="" style=" font-size: 1.5rem;">
          <slot name="title" />
        </div>
        <div >
          <slot />
        </div>
      </div>
    </div>
  </q-page-container>
</template>


<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style scoped>
.polka {
  background-image: radial-gradient(rgb(226, 226, 226) 5%, transparent 5%);
  background-position: 4px 4px;
  background-size: 19px 19px;
  background-color: rgb(35, 35, 35);
  height: 110vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}

.transparent-background {
  background-color: rgba(221, 240, 248, 0.781) !important;
  box-shadow: none !important;
  border-radius: 20px !important;
}
</style>

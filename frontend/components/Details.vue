<template>
  <q-card class="custom-card q-ma-md">
    <div class="col flex-grow q-pa-md" style="width:75dvw;">
      <div class="row text-h5 q-ma-sm">
        <slot name="title" />
      </div>
      <div class="row">
        <slot class="col flex-grow" name="info" />
      </div>
    </div>
  </q-card>
</template>

<style>
.custom-card {
  border-radius: 20px !important;
}
</style>

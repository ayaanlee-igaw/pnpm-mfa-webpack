<template>
  <div class="home">
    <p>host home view logo</p>
    <img alt="Vue logo" src="../assets/logo.png">

    <div v-if="isLoadingComponent">Loading HelloWorld.vue</div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';

const isLoadingComponent = ref(true);

const HelloWorld = defineAsyncComponent(() => import('service/HelloWorld.vue')
  .finally(() => {
    isLoadingComponent.value = false;
  }));
</script>

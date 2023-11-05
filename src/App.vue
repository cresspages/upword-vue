<script setup lang="ts">
import { ref } from 'vue';
import lbxx from '@/assets/lbxx.png'

const show = ref(false)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>

    <button @click="show = true">展示overlay</button>
    <!-- <up-picture-zoom :src="lbxx"></up-picture-zoom> -->
    <up-show-picture v-model:show="show" :src="lbxx" />

    <!-- <up-overlay v-model:show="show">
      <div class="show-pic"></div>
    </up-overlay> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

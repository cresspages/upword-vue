<script setup lang="ts">
import { ref } from 'vue';
import lbxx from '@/assets/lbxx.png'

const show = ref(false)

const value = ref('')
const valueInput = (v) => {
  console.log(v);
}
const container = ref(null)
</script>

<template>
  <div class="container" ref="container">
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

    <input type="text" v-model="value" v-debounce="valueInput" />

    <div class="draggable-area">
      <div class="area-click" v-draggable="container"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container{
  width: 100%;
  height: 70vh;
  .draggable-area{
    width: 100%;
    height: 100%;
  }
}
.area-click{
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}
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

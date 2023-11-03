<template>
  <div class="up-overlay" v-show="show"></div>
  <div class="up-popup">
    <div class="up-popup-content" v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface popupIF {
  show: boolean // 是否显示
}

const popupProps = withDefaults(defineProps<popupIF>(), {})

function show() {
  popupProps.show = true
}

function hide() {
  popupProps.show = false
}
</script>

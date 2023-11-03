<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['update:show'])
const showPictrue = computed(() => props.show)
</script>

<template>
  <div class=""></div>
</template>

<style lang="less" scoped></style>

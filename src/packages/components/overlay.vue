<script setup lang="ts">
import { useScrollLock, useToggle } from '@vueuse/core'
import { toRefs, watch } from 'vue';

interface overlayIF {
  show: boolean // 是否显示
  zIndex?: number | string // 层级
  duration?: number | string // 动画时长，单位秒，设置为 0 可以禁用动画
  lockScroll?: boolean // 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动
}

const overlayProps = withDefaults(defineProps<overlayIF>(), {
  show: false,
  zIndex: 1,
  duration: 0.3,
  lockScroll: true
})

const emits = defineEmits(['update:show'])

const { show, lockScroll } = toRefs(overlayProps)

// 禁止页面滚动
const isLocked = useScrollLock(document.body)
const toggleLock = useToggle(isLocked)

watch(show, newVal => {
  if(lockScroll.value && isLocked.value !== newVal){
    toggleLock()
  }
})

const close = () => {
  emits('update:show', false)
}
</script>

<template>
  <div class="up-overlay" v-show="show" @click="close">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.up-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);
}
</style>

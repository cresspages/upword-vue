<script setup lang="ts">
import hammerjs from 'hammerjs'
import { ref, watch } from 'vue'

defineOptions({
  name: 'UpPictureZoom'
})

withDefaults(defineProps<{ src: any }>(), {
  src: null,
})

const emits = defineEmits(['isClose'])

const pictrue = ref<HTMLElement>()
const hammer = ref<any>(null)
const scaleIndex = ref(1)
const scaleCount = ref()
watch(pictrue, () => {
  bindHammer()
})

const isTap = ref(false); // 判断是否是单击事件
const bindHammer = () => {
  if(hammer.value){ return }

  hammer.value = new hammerjs(pictrue.value as HTMLElement)

  // 启用pinch手势
  hammer.value.get('pinch').set({ enable: true })
  let x = 0
  let y = 0

  // 监听pinch手势的不同事件，用于实现缩放功能
  hammer.value.on("pinchmove pinchstart pinchin pinchout", e => {
    if (e.type == "pinchstart") {
      scaleIndex.value = scaleCount.value || 1 // 记录当前的缩放比例
    }
    scaleCount.value = scaleIndex.value * e.scale // 计算新的缩放比例
    pictrue.value.style.transform = "scale(" + (scaleIndex.value * e.scale) + ")" // 应用缩放效果
  })

  // 监听单击事件，判断是否关闭 
  hammer.value.on('tap', () => {
    isTap.value = true
    setTimeout(() => {
      if(isTap.value){
        emits('isClose')
      }
    }, 300); // doubletap 最大间隔时间默认300
    
  })

  // 监听doubletap手势，用于双击重置缩放和位置
  hammer.value.on('doubletap', () => {
    isTap.value = false

    x = 0
    y = 0
    if(!scaleCount.value || scaleCount.value == 1){
      scaleCount.value = 2 // 重置缩放比例为1.5
    } else if(scaleCount.value < 1 || scaleCount.value > 1){
      scaleCount.value = 1 // 重置缩放比例为1
    }
    pictrue.value.style.transition = 'all .4s'
    pictrue.value.style.transform = `translateX(0px) translateY(0px) scale(${scaleCount.value})` // 重置位置和缩放效果
    setTimeout(() => {
      pictrue.value.style.transition = 'none'
    }, 400)
  })

  // 监听pan手势，用于实现拖动功能
  hammer.value.on('panright panleft panup pandown', (e) => {
    pictrue.value.style.transform = "translateX(" + (e.deltaX + x) + "px)" + "translateY(" + (e.deltaY + y) + "px)" + "scale(" + (scaleCount.value * e.scale) + ")" // 应用拖动和缩放效果
  })

  // 监听panend手势，用于记录拖动的偏移量，以便在下一次拖动时保持连续性
  hammer.value.on('panend', (e) => {
    x = e.deltaX + x // 记录水平方向上的偏移量
    y = e.deltaY + y // 记录垂直方向上的偏移量
  })
}

const resetScale = () => {
  pictrue.value.style.transform = "scale(1)" // 应用缩放效果
}

defineExpose({
  resetScale
})
</script>

<template>
  <div class="up-pictrue-zoom" ref="pictrue">
    <img :src="src" />
  </div>
</template>

<style lang="less" scoped>
.up-pictrue-zoom{
  position: relative;
  transition: all .05s;
  >img{
    width: 100%;
  }
}
</style>

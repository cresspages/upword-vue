<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import overlay from './overlay.vue'
import pictureZoom from './picture-zoom.vue'

defineOptions({
  name: 'UpShowPicture'
})

interface propsIF {
  show: boolean,
  src: string
}
const props = withDefaults(defineProps<propsIF>(), {
  show: false,
  src: ''
})

const { show } = toRefs(props)

const showModel = ref(props.show)
watch(show, newVal => {
  showModel.value = newVal
})

const PZ = ref()
watch(showModel, newVal => {
  if(!newVal){
    close()
    PZ.value.resetScale()
  }
})

const emits = defineEmits(['update:show'])

const close = () => {
  emits('update:show', false)
}
</script>

<template>
  <Transition name="fade">
    <overlay v-model:show="showModel">
      <div class="up-show-picture" v-show="show" @click.stop>
        <picture-zoom :src="src" @isClose="close" ref="PZ" />
      </div>
    </overlay>
  </Transition>
</template>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-show-picture{
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

import Overlay from './components/overlay.vue'
import PictureZoom from './components/picture-zoom.vue'
import ShowPicture from './components/show-picture.vue'

const components = [
  Overlay,
  PictureZoom,
  ShowPicture
]

export default function(app){
  components.forEach(com => {
    app.component(com.name, com)
  })
}

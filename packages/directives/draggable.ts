/*
  拖拽指令
	v-draggable: v-draggable="HTMLElement"
    可传入一个value 值为dom节点(HTMLElement): 作为控制边界的父元素,设置之后拖动的元素不会超出此元素.
    不传入: 则向所有父级元素找是否设置了position为relative/absolute/fixed,有一级设置了则以此为父元素,若没有则以body为父元素
*/

// 问题待处理   传入的dom对象的获取的边界位置似乎不对
import type { Directive } from 'vue'
import { getStyleValue } from '../utils'
interface ElType extends HTMLElement {
  parentNode: any
}
type dragDir = {
  parentNode: HTMLElement
}
const draggable: Directive & dragDir = {
  parentNode: document.body,
  mounted(el: ElType) {
    el.style.cursor = 'move'
    el.style.position = 'absolute'
    el.onmousedown = function (e) {
      const disX = e.pageX - el.offsetLeft
      const disY = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        let x = e.pageX - disX
        let y = e.pageY - disY

        // 控制边界
        const parentNode = draggable.parentNode || getPositionParentNode(el.parentNode)
        
        const maxX = parentNode.offsetWidth - el.offsetWidth
        const maxY = parentNode.offsetHeight - el.offsetHeight
        if (x < 0)
          x = 0
				 else if (x > maxX)
          x = maxX

        if (y < 0)
          y = 0
				 else if (y > maxY)
          y = maxY

        el.style.left = `${x}px`
        el.style.top = `${y}px`
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
  updated(el, binding){
    const { value } = binding
    
    draggable.parentNode = value
  }
}
// 获取所有父级元素中设置了position的父元素
function getPositionParentNode(node: HTMLElement){
  if(node.nodeName == 'BODY'){
    return node;
  }
  
  const position = getStyleValue(node, 'position')
  
  if(position == 'relative' || position == 'absolute' || position == 'fixed'){
    return node
  } else {
    return getPositionParentNode(node.parentNode as HTMLElement)
  }
}

export default draggable;

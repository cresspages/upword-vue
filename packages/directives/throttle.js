/**
 * 节流指令
 * v-throttle
 *  例: v-throttle:input="{fn: callback, delay: 600}"
 * 接受的value值, 为一个对象, 当只有函数的时候可以直接传入
 * 接受的参数arg, 用于表明监听的是哪个事件. 默认input
 */

import { dataType } from '../utils'

export default {
  mounted(el, binding){
    const { value, arg } = binding
    const EVENT_TYPE = arg || 'input'
    const TIME = 600
    let TIMER = null

    let cb, delay = TIME;
    if(dataType(value) == 'object'){
      cb = value.fn
      delay = value.delay
    } else if(dataType(value) == 'function'){
      cb = value
    }

    el.addEventListener(EVENT_TYPE, (e) => {
      if(!TIMER){
        cb(e)
        TIMER = setTimeout(() => {
          clearTimeout(TIMER)
          TIMER = null
        }, delay)
      }
    })
  }
}
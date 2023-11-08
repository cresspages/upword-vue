// 重新评估对于工具类的copy有什么优势
const directive = {
  mounted(el, binding, vnode, prevVnode) {
    console.log(el, binding);
    
  },
}
export default directive
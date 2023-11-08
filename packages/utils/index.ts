export const dataType = data => {
  const dataTypeText = Object.prototype.toString.call(data)
  switch (dataTypeText) {
    case '[object Object]':
      return 'object'
    case '[object Function]':
      return 'function'
    case '[object Undefined]':
      return 'undefined'
    case '[object Null]':
      return 'null'
    case '[object String]':
      return 'string'
    case '[object Number]':
      return 'number'
    case '[object Array]':
      return 'array'
    case '[object RegExp]':
      return 'regexp'
    case '[object Symbol]':
      return 'symbol'
    case '[object Date]':
      return 'date'
    case '[object BigInt]':
      return 'bigint'
  }
}

export const getStyleValue = (elem: HTMLElement, styleName: string) => {
  return window.getComputedStyle(elem).getPropertyValue(styleName)
}
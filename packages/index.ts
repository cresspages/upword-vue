import components from './components'
import directives from './directives'

export default function(app){
  components.forEach(com => {
    app.component(com.name, com)
  })

  for (const key in directives) {
    app.directive(key, directives[key])
  }
}

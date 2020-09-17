import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App'

Vue.use(VueCompositionApi)

const app = new Vue({
  render(h) {
    return h(App)
  },
})

export default app

app.$mount('#app')

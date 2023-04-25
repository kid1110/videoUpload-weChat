import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './utils/http.js'

Vue.config.productionTip = false
App.mpType = 'app'
const eventBus = new Vue()
Vue.prototype.$bus = eventBus
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp} from 'vue'
import mitt from 'mitt'
import './utils/http.js'
const emitter = mitt();

const app = createSSRApp(App);
app.config.globalProperties.emitter = emitter;

export function createApp() {
  return { app };
}
// #endif
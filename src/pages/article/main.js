import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      wemark: '/static/wemark/wemark'
    },
    'navigationBarTitleText': '文章详情'
  }
}

import Vue from 'vue'
import App from './App'
import {fetch} from '@/utils/index'
import store from './store'
import {axios} from '@/utils/fetch'

Vue.prototype.$fetch = fetch
Vue.prototype.$store = store
Vue.prototype.$axios = axios
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#1296db',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/icon/home.png',
        selectedIconPath: '/static/icon/home_active.png'
      }, {
        pagePath: 'pages/mystudy/main',
        text: '我的阅读',
        iconPath: '/static/icon/read.png',
        selectedIconPath: '/static/icon/read_active.png'
      }, {
        pagePath: 'pages/person/main',
        text: '个人中心',
        iconPath: '/static/icon/person.png',
        selectedIconPath: '/static/icon/person_active.png'
      }]
    }
  }
}

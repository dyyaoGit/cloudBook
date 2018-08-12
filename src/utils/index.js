// let app = getApp()
import store from '@/store'
let baseUrl = 'https://m.yaojunrong.com'

export const fetch = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      store.commit('SET_STATE_ISlOADING', true)
      wx.request({
        url: baseUrl + url,
        data,
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQWxleCIsImRhdGEiOiJuZXdNc2ciLCJpYXQiOjE1MzQxMDM1MTAsImV4cCI6MTUzNjY5NTUxMH0.0NNOFlS9jsNCTuU3WIegjLwJJ-yAzfe3u5XP2avIT_8',
          myToken: '3123213'
        },
        success: function (res) {
          console.log(res)
          store.commit('SET_STATE_ISlOADING', false)
          wx.hideLoading()
          resolve(res.data)
        },
        error (err) {
          store.commit('SET_STATE_ISlOADING', false)
          wx.hideLoading()
          reject(err)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          resolve(res.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }
}

export const loading = {
  show (title = 'loading') {
    wx.showLoading({
      title
    })
  },
  hide () {
    wx.hideLoading()
  }
}

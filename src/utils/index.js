// let app = getApp()
import store from '@/store'
let baseUrl = 'https://m.yaojunrong.com'
// let baseUrl = 'http://localhost:3000'

export const fetch = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      store.commit('SET_STATE_ISlOADING', true)
      wx.request({
        url: baseUrl + url,
        data,
        method: 'GET',
        header: header,
        success: function (res) {
          if (res.header['Token']) {
            wx.setStorageSync('token', res.header['Token'])
          }
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
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      store.commit('SET_STATE_ISlOADING', true)
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST',
        header: header,
        success: function (res) {
          if (res.header['Token']) {
            wx.setStorageSync('token', res.header['Token'])
          }
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

console.log(fetch.get)
export const login = () => {
  return new Promise(resolve => {
    wx.login({
      success (res) {
        fetch.post('/login', {code: res.code}).then(user => {
          resolve(user)
        })
      }
    })
  })
}

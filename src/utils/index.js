// let app = getApp()
import store from '@/store'
// let baseUrl = 'https://m.yaojunrong.com'
let baseUrl = 'http://localhost:3000'

export const fetch = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      let cookie = wx.getStorageSync('cookie')
      let header = {
        'content-type': 'application/json'
      }
      console.log(cookie)
      if (cookie) {
        header.Cookie = 'SESSIONID=' + cookie.SESSIONID + '; SESSIONID.sig=' + cookie['SESSIONID.sig']
      }
      store.commit('SET_STATE_ISlOADING', true)
      wx.request({
        url: baseUrl + url,
        data,
        method: 'GET',
        header: header,
        success: function (res) {
          console.log(res.header['Set-Cookie'])
          if (res.header['Set-Cookie']) {
            let obj = {}
            let session = res.header['Set-Cookie'].split(';')
            obj.SESSIONID = session[0].substring(10)
            obj['SESSIONID.sig'] = session[2].split('SESSIONID.sig=')[1]
            console.log(obj)
            wx.setStorageSync('cookie', obj)
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
      let cookie = wx.getStorageSync('cookie')
      let header = {
        'content-type': 'application/json'
      }
      console.log(cookie)
      if (cookie) {
        header.Cookie = 'SESSIONID=' + cookie.SESSIONID + '; SESSIONID.sig=' + cookie['SESSIONID.sig']
      }
      store.commit('SET_STATE_ISlOADING', true)
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST',
        header: header,
        success: function (res) {
          console.log(res.header['Set-Cookie'])
          if (res.header['Set-Cookie']) {
            let obj = {}
            let session = res.header['Set-Cookie'].split(';')
            obj.SESSIONID = session[0].substring(10)
            obj['SESSIONID.sig'] = session[2].split('SESSIONID.sig=')[1]
            console.log(obj)
            wx.setStorageSync('cookie', obj)
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

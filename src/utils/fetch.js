const baseURl = 'https://m.yaojunrong.com'

export const axios = {
  get (url, data, cb) {
    let token = wx.getStorageSync('token')
    let header = {
      'Content-Type': 'application/json'
    }
    if (token) {
      header.token = token
    }
    wx.request({
      url: baseURl + url,
      data,
      method: 'GET',
      header,
      success (res) {
        if (res.header.Token) { // 判断如果存在登陆状态的请求头，存起来
          wx.setStorageSync('token', res.header.Token)
        }
        cb(res.data)
      }
    })
  },
  post (url, data, cb) {
    let token = wx.getStorageSync('token')
    let header = {
      'Content-Type': 'application/json'
    }
    if (token) {
      header.token = token
    }
    wx.request({
      url: baseURl + url,
      data,
      method: 'POST',
      header,
      success (res) {
        if (res.header.Token) { // 判断如果存在登陆状态的请求头，存起来
          wx.setStorageSync('token', res.header.Token)
        }
        cb(res.data)
      }
    })
  }
}

export const login = function () {
  return new Promise(resolve => {
    wx.login({
      success (res) {
        axios.post('/login', {code: res.code}, function (data) {
          resolve(data)
        })
      }
    })
  })
}

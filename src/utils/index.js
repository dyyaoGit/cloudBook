const baseUrl = 'http://localhost:3000'

export const fetch = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: 'GET',
        data,
        header: {'content-type': 'application/json'},
        success (res) {
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: 'POST',
        data,
        header: {'content-type': 'application/json'},
        success (res) {
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}

let baseUrl = 'https://m.yaojunrong.com'

export const fetch = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method: 'GET',
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

// const baseUrl = 'https://m.yaojunrong.com'
// const baseUrl = 'http://localhost:3000'

// export const fetch = {
//   get (url, data) {
//     return new Promise((resolve, reject) => {
//       wx.request({
//         url: baseUrl + url,
//         method: 'GET',
//         data,
//         header: {'content-type': 'application/json'},
//         success (res) {
//           resolve(res.data)
//         },
//         fail (err) {
//           reject(err)
//         }
//       })
//     })
//   },
//   post (url, data) {
//     return new Promise((resolve, reject) => {
//       wx.request({
//         url: baseUrl + url,
//         method: 'POST',
//         data,
//         header: {'content-type': 'application/json'},
//         success (res) {
//           resolve(res.data)
//         },
//         fail (err) {
//           reject(err)
//         }
//       })
//     })
//   }
// }

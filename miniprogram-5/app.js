// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env:'env-9ggsm1gd1a641bc0'//云开发的环境id
    })
  },
  globalData: {
    userInfo: null
  }
})

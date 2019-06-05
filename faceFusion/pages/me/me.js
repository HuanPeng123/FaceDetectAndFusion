// pages/me/me.js
const app = getApp();
//const INFOR_REQUEST = getApp().globalData.INFOR_REQUEST
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    tempFilePaths: ''
  },
  onShow() {
    // 查看是否授权
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              that.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  facefusionImage(){
    this.setData({
      tempFilePaths: "../images/result2.png"
    });
  }

})
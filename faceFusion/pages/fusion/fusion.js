//page for face fusion
var app = getApp()
Page({
  data: {
    tempFilePaths: ''
  },
  onLoad: function () {
  },
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        that.setData({
          tempFilePaths: res.tempFilePaths[0]
        });
        wx.setStorageSync('tempFilePaths', res.tempFilePaths[0]);
        wx.navigateTo({
          url: '../upload1/upload1?id=1'
        });
      }
    })
    
  },

  takePhoto() {
    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setData({
          tempFilePaths: res.tempImagePath
        });
        wx.setStorageSync('tempFilePaths', res.tempImagePath);
        wx.navigateTo({
          url: '../upload1/upload1'
        });
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
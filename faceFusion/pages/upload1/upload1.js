
Page({
  data: {
    tempFilePaths :'',
    buttonName1: '确认上传',
    buttonName2: '取消'
  },
  onLoad: function (){
    var that = this;
    this.setData({
      tempFilePaths: wx.getStorageSync('tempFilePaths')
    }); 

  },

  uploadImageForFusion: function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
      that.setData({
        tempFilePaths: "../images/ph_detect.jpg",
        buttonName1: '收藏',
        buttonName2: '再来一次'
      });
    }, 5000)
  
  },

  navigateToTakePhoto: function() {
    wx.navigateBack({
    })
  }

})
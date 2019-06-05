//center.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    moviesDetect: [
      { url: '../images/detect1.jpg' },
      { url: '../images/detect1.jpg' }
    ],
    moviesSimilarity: [
      { url: '../images/result3.png' },
      { url: '../images/result3.png' },
      { url: '../images/result3.png' }
    ],
    moviesFusion: [
      { url: '../images/result2.png' },
      { url: '../images/result2.png' }
    ]
  },
  onLoad: function () {
  },

  navigateToDetect: function(){
    wx.navigateTo({
      url: '../fusion/fusion',
    })
  }
})  

//home.js
//获取应用实例
const app = getApp()
const CHECK_USER = getApp().globalData.CHECK_USER
const GET_OPENID = getApp().globalData.GET_OPENID
const CHECK_NOTE = getApp().globalData.CHECK_NOTE
const NOTE_UPDATE = getApp().globalData.NOTE_UPDATE
const APP_ID = 'wxd25d60dd44b61f3b';//输入小程序appid  
const APP_SECRET = 'd7059cad8ecb465b094a0f9ddc10e4e2';//输入小程序app_secret  
var openId;
Page({
  data: {
    openId,
    movies: [
      { url: '../images/result2.png' },
      { url: '../images/result2.png' }
    ]
  },
  onShow: function () {

    //授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
     //   openId:openId
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }    

    //获取openid并检查用户是否注册

    wx.login({
      //  if(canIUse){
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) { //  第一步： 获取code
          //发起网络请求
          //console.log(code)
          var CODE = res.code
          console.log("code: "+CODE)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
             appid: APP_ID,
              secret: APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              openId = res.data.openid;
              wx.request({
                url: 'http://localhost:9420/rest/checkUser',
                method: 'POST',
                dataType: 'json',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data: JSON.stringify({
                  "openId": openId
                }),
                success: (re) => {
                  //返回
                  console.log("CHECK USER SUCCESS!!" + re.data.status);
                }
              })

            }

          })
          

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
      //    },
    }) 



  },
  //事件处理函数
  takePhoto: function() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navigateToFusion: function(){
    wx.navigateTo({
      url: '../fusion/fusion',
    }) 
  }
})
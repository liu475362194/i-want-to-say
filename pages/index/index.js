//index.js
//获取应用实例
const app = getApp()
var name = '子时'
var me = '奔放的公牛'
var text = '请同意授权我获取你的用户名等公开信息。否则该程序无法正常运行！'
Page({
  
  data: {
    color: 'black',
    text: text,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // text = '请让我同意获取你的信息，让我知道你是谁。因为这里面的话，我只想让某人看到。'
    if (app.globalData.userInfo) {

      var userName = app.globalData.userInfo.nickName
      console.log(userName)
      this.updateText(userName, text)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        var userName = res.userInfo.nickName
        console.log(userName)
        this.updateText(userName, text)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          var userName = res.userInfo.nickName
          console.log(userName)
          this.updateText(userName, text)
        },
        fail: res => {
          console.log("取消授权")
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.errMsg != 'getUserInfo:ok'){ 
      return
    }
    app.globalData.userInfo = e.detail.userInfo
    var userName = e.detail.userInfo.nickName
    console.log(userName)
    this.updateText(userName,text)
  },

  updateText: function(userName,text){
    console.log("name: " + name)
    switch (userName) {
      
      case '奔放的公牛':
      case '子时':
        wx.navigateTo({
          url: '../thank/thank',
        })
        break;
      default:
        wx.redirectTo({
          url: '../weather/weather',
        })
        break;
    }
  }


})

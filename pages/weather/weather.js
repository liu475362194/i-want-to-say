// pages/weather/weather.js
var weather = null
// var name = '子时'
// var me = '奔放的公牛'
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weathersuccess: false,
    // manimation: animation,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // if (app.globalData.userInfo) {
    //   var userName = app.globalData.userInfo.nickName
    //   console.log('userName1' + userName)
    //   this.updateText(userName)
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     var userName = res.userInfo.nickName
    //     console.log('userName2' + userName)
    //     this.updateText(userName)
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       var userName = res.userInfo.nickName
    //       console.log('userName3' + userName)
    //       this.updateText(userName)
    //     },
    //     fail: res => {
    //       console.log('fail')
    //       wx.redirectTo({
    //         url: '../index/index',
    //       })
    //     }
    //   })

      // wx.getSetting({
      //   success: res => {
      //     if (!res.authSetting['scope.userInfo']) {
      //       console.log('userName5' + userName)
      //       wx.showModal({
      //         title: '提示',
      //         content: '有些话我想对你说，请同意让我知道你是谁。点击确定重新获取授权，请在弹出的界面里选中用户信息',
      //         confirmText: '重新授权',
      //         success: function (res) {
      //           if (res.confirm) {
      //             console.log('用户点击确定')
      //             wx.openSetting({
      //               success: (res) => {
      //                 console.log("授权结果..")
      //                 console.log(res)
      //                 if (res.authSetting["scope.userInfo"]) {
      //                   that.updateText(userName)
      //                 }
      //               }
      //             })
      //           } else if (res.cancel) {
      //             console.log('用户点击取消')
      //           }
      //         }
      //       })
      //     }
      //   }
      // })


    // }

    var that = this
    var animation = wx.createAnimation({
      duration: 1000,
      transformOrigin: "ease"
    })
    this.animation = animation

    wx.showToast({
      title: '正在更新...',
      icon: 'loading'
    })
    this.dingweiweather(this)
  },

  getUserInfo: function (e) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        var userName = res.userInfo.nickName
        console.log('userName' + userName)
        this.updateText(userName)
      }
    })
  },

  updateText: function (userName) {
    console.log("name: " + name + 'me: ' + me)
    // if (name != userName || me != userName) {
    //   // this.getUserInfo()
    //   return
    // } else {
    //   wx.navigateTo({
    //     url: '../thank/thank',
    //   })
    // }
    switch (userName) {
      
      case '奔放的公牛':
      case '子时':
        wx.navigateTo({
          url: '../thank/thank',
        });
        break;
      default:
        return;
    }
  },

  init: function (that) {
    if (weather.data.HeWeather5[0].alarms != null) {
      for (var i = 0; i < (weather.data.HeWeather5[0].alarms).length; i++) {
        wx.showModal({
          title: weather.data.HeWeather5[0].alarms[i].title,
          content: weather.data.HeWeather5[0].alarms[i].txt,
          showCancel: false,
          confirmColor: '确定'
        })
      }
    }
    console.log("weather", weather)
    wx.setNavigationBarTitle({
      title: weather.data.HeWeather5[0].basic.city,
    })
    var a = (weather.data.HeWeather5[0].aqi.city.pm25 / 500) * 100 + "%"
    console.log(a)
    that.animation.left(a).step()
    that.setData({
      weathersuccess: true,
      weatherxml: weather,
      // baifenbi: a,
      jiantouanim: that.animation.export()
    })
  },

  onDraw: function (res, that) {
    var sysres = wx.getSystemInfoSync()
    console.log(sysres.windowWidth)
    console.log(sysres.windowHeight)
    var width = sysres.windowWidth / 6
    const ctx = wx.createCanvasContext('mcanvas')

    var marray = new Array()
    var a = 0;
    for (var i = 0; i < 3; i++) {
      marray[a] = res.data.HeWeather5[0].daily_forecast[i].tmp.max
      a++
      marray[a] = res.data.HeWeather5[0].daily_forecast[i].tmp.min
      a++
    }
    console.log(marray)
    var max = Math.max.apply(null, marray)
    var min = Math.min.apply(null, marray)
    var bili = max - min
    var meifen = 140 / bili
    console.log(max + "," + min)
    that.drawcicle(ctx, width, (max - marray[0]) * meifen + 25)
    that.drawcicle(ctx, width, (max - marray[1]) * meifen)

    that.drawcicle(ctx, width * 3, (max - marray[2]) * meifen + 25)
    that.drawcicle(ctx, width * 3, (max - marray[3]) * meifen)

    that.drawcicle(ctx, width * 5, (max - marray[4]) * meifen + 25)
    that.drawcicle(ctx, width * 5, (max - marray[5]) * meifen)

    that.drawline(ctx, width, (max - marray[0]) * meifen + 25, width * 3, (max - marray[2]) * meifen + 25)
    that.drawline(ctx, width * 3, (max - marray[2]) * meifen + 25, width * 5, (max - marray[4]) * meifen + 25)

    that.drawline(ctx, width, (max - marray[1]) * meifen, width * 3, (max - marray[3]) * meifen)
    that.drawline(ctx, width * 3, (max - marray[3]) * meifen, width * 5, (max - marray[5]) * meifen)

    that.drawtext(ctx, marray[0] + "°", width, (max - marray[0]) * meifen + 15)
    that.drawtext(ctx, marray[1] + "°", width, (max - marray[1]) * meifen + 20)

    that.drawtext(ctx, marray[2] + "°", width * 3, (max - marray[2]) * meifen + 15)
    that.drawtext(ctx, marray[3] + "°", width * 3, (max - marray[3]) * meifen + 20)

    that.drawtext(ctx, marray[4] + "°", width * 5, (max - marray[4]) * meifen + 15)
    that.drawtext(ctx, marray[5] + "°", width * 5, (max - marray[5]) * meifen + 20)
    ctx.draw()
  },

  //画小圆点方法
  drawcicle: function (ctx, width, height) {
    console.log(width + "," + height)
    ctx.setFillStyle('white')
    ctx.beginPath();//开始一个新的路径
    ctx.arc(width, height, 5, 0, 2 * Math.PI, true);//设置一个原点(100,50)，半径为为50的圆的路径到当前路径
    ctx.fill();//对当前路径进行填充
    ctx.closePath();//关闭当前路径

  },

  //画连接线方法
  drawline: function (ctx, fx, fy, nx, ny) {
    ctx.setStrokeStyle('white')
    ctx.beginPath()
    ctx.setLineCap('butt')
    ctx.setLineWidth(2)
    ctx.moveTo(fx, fy)
    ctx.lineTo(nx, ny)
    ctx.stroke()
  },

  //标注温度文字
  drawtext: function (ctx, text, x, y) {
    ctx.setTextAlign('center')
    ctx.setFontSize(15)
    ctx.fillText(text, x, y)
  },

  //获取未来三天日期
  getdate: function (that) {
    var now = new Date();
    var two = new Date();
    var three = new Date();
    two.setDate(now.getDate() + 1)
    three.setDate(now.getDate() + 2)
    var date = new Array()
    date[0] = now.getMonth() + 1
    date[1] = now.getDate()
    date[2] = two.getMonth() + 1
    date[3] = two.getDate()
    date[4] = three.getMonth() + 1
    date[5] = three.getDate()
    that.setData({
      date: date
    })
  },

  //添加动画
  addanim: function (that) {

    that.animation.opacity(1).step({ duration: 2000 })
    that.setData({
      manimation: that.animation.export()
    })
    console.log("动画结束")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在更新...',
      icon: 'loading'
    })
    this.dingweiweather(this)
  },

  dingweiweather: function (that) {
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        console.log(res.latitude + "," + res.longitude)
        wx.request({
          url: 'https://free-api.heweather.com/v5/weather',
          data: {
            city: res.longitude + "," + res.latitude,
            // city: 'beijing',
            // lng: res.longitude,//经度
            // lat: res.latitude,//纬度
            key: 'cd83db70d0ba468a8486a906fee14faf',
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            // success
            wx.hideLoading()
            weather = res
            console.log(res)
            that.init(that)
            that.onDraw(res, that)
            that.getdate(that)
            that.addanim(that)
            wx.stopPullDownRefresh()
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})
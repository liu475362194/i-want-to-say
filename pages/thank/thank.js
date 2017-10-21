// pages/thank/thank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  into: function(){
    wx.navigateTo({
      url: '../main/main',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "50% 50% 0",
    })

    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        text1: animation.export()
      })
    }.bind(that), 1000)

    setTimeout(function(){
      animation.opacity(1).step()
      that.setData({
        text2: animation.export()
      })
    }.bind(that),3000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text2: animation.export()
      })
    }.bind(that), 3000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text3: animation.export()
      })
    }.bind(that), 5000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text4: animation.export()
      })
    }.bind(that), 7000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text5: animation.export()
      })
    }.bind(that), 9000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text6: animation.export()
      })
    }.bind(that), 11000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text7: animation.export()
      })
    }.bind(that), 13000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text8: animation.export()
      })
    }.bind(that), 15000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text9: animation.export()
      })
    }.bind(that), 17000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text10: animation.export()
      })
    }.bind(that), 19000)

    setTimeout(function () {
      animation.opacity(1).step()
      that.setData({
        text11: animation.export()
      })
    }.bind(that), 21000)

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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
  
  }
})
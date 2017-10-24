// pages/main/main.js
var myres = null;
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
    var that = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/59dc8f48bee7e42ca1d66605/xcq/xiaochengxu',
      success: res => {
        myres = res.data
        console.log(res.data)
        console.log(res.data.mydata[0].alltexts)
        that.init()
        that.setData({
          res: res.data,
          alltexts:res.data.mydata[0].alltexts
        })
      }
    })
  },

  init: function (that) {
    console.log(myres.mydata[0].main.names[0])
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var res = wx.getSystemInfoSync()
    this.setData({
      height: res.windowHeight
    })
    
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
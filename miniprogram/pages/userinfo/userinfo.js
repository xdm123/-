// miniprogram/pages/userinfo/userinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArr:['男','女'],
    sex:'',
    age:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编辑资料'
    })
    this.setData({
      sex: app.globalData.userinfo.sex,
      age: app.globalData.userinfo.age
    })
    console.log(app.globalData.userinfo)
  },
  bindPickerSex: function (e) {
    this.setData({
      sex: e.detail.value == 0 ? "男" : "女"
    })
  },
  sliderchange:function(e){
    console.log(e.detail.value)
    this.setData({
      age: e.detail.value
    })
  },
  saveInfo:function(){
    wx.showLoading({
      title: '正在保存',
    })
    var _this = this
    var setSex = this.data.sex 
    
    var db = wx.cloud.database()
    db.collection('userInfo').doc(app.globalData.openid).update({
      data: {
        info: {
          age: _this.data.age,
          sex: setSex
        }
      },
      success: function () {
        console.log('数据库更新成功');
        wx.hideLoading();
        wx.switchTab({
          url: '../mine/mine',
        })
      },
      fail: function () {

      }
    })
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
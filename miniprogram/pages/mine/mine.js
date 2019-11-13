// miniprogram/pages/mine/mine.js
var app = getApp();
// wx.cloud.init();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    userinfo:'',
    data:[],
    birthday:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.getUserData()
    
  },

  //获取用户信息
  getUserData:function(){
    var _this = this
    var db = wx.cloud.database()
    var userInfo = db.collection('userInfo')
    db.collection('userInfo').where({
      _openid: app.globalData.openid // 填入当前用户 openid
    }).get({
      success: (res) => {
        _this.setData({
          list: res.data[0].info,
          data: res.data[0]
        })
        app.globalData.userinfo = res.data[0].info
        console.log(app.globalData)
        _this.setTime()
      }
    })
  },
  setTime:function(){
    var _this = this
    var time = new Date();
    var y = time.getFullYear(_this.data.data.due)
    var m = parseInt(time.getMonth(_this.data.data.due)) + 1
    var d = time.getDate(_this.data.data.due)
    this.setData({
      birthday:y+'年'+m+'月'+d+'日'
    })
    
  },
  bindGetUserInfo:function(e){
    var _this = this
    console.log(e.detail.userInfo);
    var userinfo = e.detail.userInfo;
    this.setData({
      userinfo: e.detail.userInfo
    })
    var db = wx.cloud.database()
    db.collection('userInfo').doc(app.globalData.openid).update({
      data: {
        info:{
          name: userinfo.nickName,
          headimg: userinfo.avatarUrl
        }
      },
      success:function(){
        console.log('数据库更新成功');
        _this.getUserData()
      },
      fail:function(){

      }
    })
    
  },

  

  //设置用户资料
  exitUserInfo:function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
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
    this.getUserData()
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
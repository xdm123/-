// miniprogram/pages/setgoal/setgoal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    start:'',
    end:'',
    goalname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    wx.setNavigationBarTitle({
      title: '编辑目标'
    })
    // var date = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000)
    // var y = date.getFullYear()
    // var m = parseInt(date.getMonth()) + 1
    // var d = date.getDay()
    // var nowdate = y+'-'+m+'-'+d
    var date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    var torrom = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    this.setData({
      openid:app.globalData.openid,
      start: torrom
    })
  },
  bindDateChangeStart:function(e){
    this.setData({
      start: e.detail.value
    })
  },
  bindDateChangeEnd:function(e){
    this.setData({
      end: e.detail.value
    })
  },

  goalNameFn:function(e){
    console.log(e.detail.value)
    this.setData({
      goalname: e.detail.value
    })
  },

  saveGoalFn:function(){
    var _this = this
    console.log('保存目标');
    console.log(this.data.goalname)
    console.log(this.data.end)
    if (this.data.goalname == ''){
      wx.showModal({
        title: '给目标定个名字吧',
        content: 'v587的',
      })
    }else{
      
      const db = wx.cloud.database();
      var goalList = db.collection('goalList')
      var timestamp = new Date().getTime() 
      var secdata = app.globalData.userinfo.sex || '男'
      goalList.add({
        data: {
          userid: app.globalData.openid,
          goal_id: timestamp,
          goal:{
            goalname: _this.data.goalname,
            start:_this.data.start,
            sign:0,
            signLastTime: _this.data.start,
            username:app.globalData.userinfo.name,
            headimg: app.globalData.userinfo.headimg,
            sex: secdata
          }
        },
        success: function (res) {
          console.log('保存目标成功');
          wx.switchTab({
            url: '../goal/goal',
          })
        },
        fail: console.error
      })
      
    }
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
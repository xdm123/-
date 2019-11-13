// miniprogram/pages/square/square.js
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getListData:function(){
    wx.showLoading({
      
    })
    var _this = this
    
    var list = db.collection('goalList').get({
      success: function (data) {
        console.log(data)
        _this.setData({
          list:data.data
        })
        wx.hideLoading()
        console.log(_this.data.list)
      }
    })
  },
  //比较时间大小
  compareTime: function (t1, t2) {
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    oDate1 = t1.split(strSeparator);
    oDate2 = t2.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    if (t1 < t2) {
      return 1
    } else if (t1 == t2) {
      return 2
    } else if (t1 > t2) {
      return 3
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
    this.getListData()
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
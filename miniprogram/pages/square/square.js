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
    this.getListData()
  },

  getListData:function(){
    wx.showLoading({

    })
    var _this = this
    var list = db.collection('user_dongtai').get({
      success: function (data) {
        // console.log(data)
        _this.setData({
          list:data.data.reverse()
        })
        wx.setStorageSync('refresh', false)
        wx.hideLoading()
        wx.stopPullDownRefresh()
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

  //预览图片
  previewPic:function(e){
    // var imgs = e.currentTarget.dataset.imgs
    var imgs = e.currentTarget.dataset.imgarr
    var current = e.currentTarget.dataset.src
    console.log(imgs)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  //点赞
  likeFn:function(){
    wx.showToast({
      title: '暂不可用',
      icon: 'none',
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
    var isrefresh = wx.getStorageSync('refresh')
    if (isrefresh){
      this.getListData()
    }
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
    this.getListData()
    
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
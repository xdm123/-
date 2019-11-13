// miniprogram/pages/goal/goal.js
var app  =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    nowtime:'',
    status:[], //打卡状态 1 可以签 2 今天签过 3 任务还没开始
  },

  setGoalFn:function(){
    console.log('定制目标')
    if (this.data.username == ''){
      wx.switchTab({
        url: '../mine/mine',
      })
    }else{
      wx.navigateTo({
        url: '../setgoal/setgoal',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '定目标'
    })
    console.log(app.globalData)
    
  },
  getUserData: function () {
    var _this = this
    var db = wx.cloud.database()
    var userInfo = db.collection('userInfo')
    db.collection('userInfo').where({
      _openid: app.globalData.openid // 填入当前用户 openid
    }).get({
      success: (res) => {
        _this.setData({
          username: res.data[0].info.name
        })
        app.globalData.userinfo = res.data[0].info
        console.log(_this.data.username)
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
    this.getUserData()
    this.getdata()
    //获取当前时间
    // var date = new Date()
    // var y = date.getFullYear()
    // var m = parseInt(date.getMonth()) + 1
    // var d = date.getDate()
    // var nowdate = y + '-' + m + '-' + d
    // console.log(y, m, d)
    // this.setData({
    //   nowtime: nowdate
    // })
    // var statusarr = []
    // //获取列表数据
    // var _this = this
    // var db = wx.cloud.database();
    // var goallist = db.collection('goalList').where({
    //   userid:app.globalData.openid
    // }).get({
    //   success:function(data){
    //     // console.log(data.data)
    //     var listdata = data.data;
    //     listdata.map(function(item){
    //       var status = _this.compareTime(item.goal.signLastTime, nowdate)
    //       statusarr.push(status)
    //     })
    //     _this.setData({
    //       list:data.data,
    //       status: statusarr
    //     })
    //     console.log(_this.data.list)
    //     console.log(_this.data.status)
    //   }
    // })
  },

  getdata:function(){
    //获取当前时间
    var date = new Date()
    var y = date.getFullYear()
    var m = parseInt(date.getMonth()) + 1
    var d = date.getDate()
    var nowdate = y + '-' + m + '-' + d
    // console.log(y, m, d)
    this.setData({
      nowtime: nowdate
    })
    var statusarr = []
    //获取列表数据
    var _this = this
    var db = wx.cloud.database();
    var goallist = db.collection('goalList').where({
      userid: app.globalData.openid
    }).get({
      success: function (data) {
        // console.log(data.data)
        var listdata = data.data;
        listdata.map(function (item) {
          var status = _this.compareTime(item.goal.signLastTime, nowdate)
          statusarr.push(status)
        })
        _this.setData({
          list: data.data,
          status: statusarr
        })
      }
    })
  },

  

  getDays:function (strDateStart, strDateEnd){
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1= strDateStart.split(strSeparator);
    oDate2= strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)
    return iDays ;
  },

  //比较时间大小
  compareTime:function(t1,t2){
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    oDate1 = t1.split(strSeparator);
    oDate2 = t2.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    if(t1<t2){
      return 1
    }else if(t1 == t2){
      return 2
    }else if(t1 > t2){
      return 3
    }
  },

  signFn:function(e){
    var _this = this
    var lasttime = e.currentTarget.dataset.time
    var goalid = e.currentTarget.dataset.goalid
    var signNum = e.currentTarget.dataset.num
    console.log(_this.data.nowtime)
    var db = wx.cloud.database();
    var goallist = db.collection('goalList')
    goallist.doc(goalid).update({
      data:{
        goal:{
          signLastTime: _this.data.nowtime,
          sign: parseInt(signNum) + 1
        }
      },
      success:function(res){
        wx.showToast({
          title: '打卡成功',
        })
        console.log('打卡成功',res)
        _this.getdata()
      },
      fail:function(){
        console.log('打卡失败')
      }
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
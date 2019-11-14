// miniprogram/pages/sign/sign.js
var app = getApp();
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    id:'',
    num:'',
    lasttime:'',
    name:'',
    sentence:'',
    filepath:[],
    cloudpath:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.goalid,
      num: options.signnum,
      lasttime: options.lasttime,
      name:options.name
    })
    wx.setNavigationBarTitle({
      title: '发布打卡'
    })
    console.log(app.globalData)
  },
  getSentence:function(e){
    console.log(e.detail.value)
    this.setData({
      sentence: e.detail.value
    })
  },

  //保存动态
  saveSign:function(){
    var _this = this
    var signtime = new Date();
    var y = signtime.getFullYear()
    var m = parseInt(signtime.getMonth()) + 1
    var d = signtime.getDate()
    var h = signtime.getHours()
    var min = signtime.getMinutes()
    var time = y+'-'+m+'-'+d+' '+h+':'+min
    var data = {
      id:this.data.id,
      username:app.globalData.userinfo.name,
      headimg: app.globalData.userinfo.headimg,
      sex: app.globalData.userinfo.sex,
      signTime: time,
      sentence:this.data.sentence,
      imgs: this.data.cloudpath,
      signnum: parseInt(this.data.num) + 1,
      goalname:this.data.name
    }
    console.log(data)
    wx.hideLoading();

    //新建打卡
    db.collection('user_dongtai').add({
      data: data,
      success:function(res){
        console.log('发布成功')
        //更新目标打卡数


        //获取当前时间
        var date = new Date()
        var y = date.getFullYear()
        var m = parseInt(date.getMonth()) + 1
        var d = date.getDate()
        var nowdate = y + '-' + m + '-' + d
        var goallist = db.collection('goalList')
        goallist.doc(_this.data.id).update({
          data:{
            goal:{
              signLastTime: nowdate,
              sign: parseInt(_this.data.num) + 1
            }
          },
          success:function(res){
            console.log('目标数据更新成功')
            wx.setStorageSync('refresh', true)
            wx.switchTab({
              url: '../square/square',
            })
          },
          fail:function(){
            console.log('打卡失败')
          }
        })
      }
    })
  },

  //点击打卡

  signClick:function(){
    
    wx.showLoading({
      title: '叮',
    })
    console.log('打卡')
    
    this.uploadPic(this.data.filepath,0)
  },

  //选择图片

  addPicFn:function(){
    var _this = this
    var count = 3 - this.data.filepath.length
    wx.chooseImage({
      count: count,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var filepathArr = _this.data.filepath.concat(tempFilePaths)
        _this.setData({
          filepath: filepathArr
        })
        
      }
    })
  },

  //上传图片

  uploadPic:function(imgs,index){
    var cloudarr = this.data.cloudpath
    if(index == imgs.length){
      console.log('传完了')
      console.log(cloudarr)
      this.saveSign()
      return
    }
    var _this = this
    console.log(imgs)
    var name = Math.random() * 10000000 + imgs[index].match(/\.[^.]+?$/)[0];
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: imgs[index], // 文件路径
      success: res => {
        console.log('成功了')
        cloudarr.push(res.fileID)
        _this.setData({
          cloudpath: cloudarr
        })
        index ++
        _this.uploadPic(imgs,index)
      },
      fail: err => {
        console.log(err)
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
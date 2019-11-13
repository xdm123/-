//app.js
App({
  onLaunch: function () {
    var _this = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    _this.globalData = {
      user:[]
    }
    
    //云端获取openid用于识别用户
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      _this.globalData.openid = res.result.OPENID
    })
    //获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  }
})
// "tabBar": {
//   "backgroundColor": "#f4f4f4",
//   "borderStyle": "white",
//   "list": [
//     {
//       "pagePath": "pages/square/square",
//       "text": "广场",
//       "iconPath": "./images/square_s.png",
//       "selectedIconPath": "./images/square.png"
//     },
//     {
//       "pagePath": "pages/follow/follow",
//       "text": "关注",
//       "iconPath": "./images/follow_s.png",
//       "selectedIconPath": "./images/follow.png"
//     },
//     {
//       "pagePath": "pages/goal/goal",
//       "text": "定目标",
//       "iconPath": "./images/goal_s.png",
//       "selectedIconPath": "./images/goal.png"
//     },
//     {
//       "pagePath": "pages/tid/tid",
//       "text": "消息",
//       "iconPath": "./images/tid_s.png",
//       "selectedIconPath": "./images/tid.png"
//     },
//     {
//       "pagePath": "pages/mine/mine",
//       "text": "个人中心",
//       "iconPath": "./images/mine_s.png",
//       "selectedIconPath": "./images/mine.png"
//     }
//   ]
// }
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'card-1v4iz',
  // env: 'card-test-heh8b'
})
exports.main = (event, context) => {
  // 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
  let getId = cloud.getWXContext();
  const db = cloud.database();
  var userInfo = db.collection('userInfo')
  var getdate = new Date()
  console.log(getdate)
  userInfo.add({
    // data 字段表示需新增的 JSON 数据
    data: {
      _openid: getId.OPENID,
      _id: getId.OPENID, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      info:{
        name:'',
        sex:'',
        age:'',
        sign:'',
        headimg:''
      },
      description: "用户基本信息",
      due: getdate,
      // 为待办事项添加一个地理位置（113°E，23°N）
      location: new db.Geo.Point(113, 23),
      done: false
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },
    fail: console.error
  })
  return getId
}
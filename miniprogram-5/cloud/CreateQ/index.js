// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.get({
      // 扫码进入的小程序页面路径
      "path":event.pageurl,
      width:400,
    })
    return result;
  } catch (err) {
    return err
  }
}

const db=wx.cloud.database()

var timestamp = Date.parse(new Date());
var date = new Date(timestamp);

export function getNowPage() {
  let page=getCurrentPages()
  let a="/"+page[page.length-1].route
  return a
}
export function addhistory(index,t,i,page) {
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
let timedate=Y+"-"+M+"-"+D
  console.log(index);
  db.collection('history')
  .where({index:index,page:page})
  .get()
  .then(res=>{
    if(res.data.length==0){
      db.collection('history').add({
        data:{
          name:'历史记录',
          page:page,
          index:index,
          time:t,
          timedate:timedate,
          i:i
        }
      }).then(res=>{
        console.log("历史记录添加成功");
      }).catch(err=>{
        console.log("历史记录添加失败");
      })
    }else{
      console.log("有数据");
    }
  })
}
export function GetToken() {
  const refreshtoken=wx.getStorageSync('refresh_token')
  wx.request({
    url: 'https://zenitech.net/identity/connect/token',
    data:{
      client_id:'device',
      grant_type:'refresh_token',
      refresh_token:refreshtoken
    },
    method:"POST",
    header:{'Content-Type':'application/x-www-form-urlencoded'},
    success(res){
      console.log(res);
      wx.setStorageSync('access_token', res.data.access_token)
    }
  })
}
module.exports={
  getNowPage:getNowPage,
  addhistory:addhistory,
  GetToken:GetToken
}

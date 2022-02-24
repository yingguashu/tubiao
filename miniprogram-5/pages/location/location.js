// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Equipment:"",//设备编号
    content:"",//查询出来的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  name(e){
    var Equipment=e.detail.value
    this.setData({Equipment})
  },
  onTest(){
    wx.request({
      url: 'https://zenitech.net/yewu/api/shebei/weizhi/107210500023',
      success:(res)=>{
        var content=res.data
        this.setData({content})
        console.log(content);
      }
    })
    
  },
})
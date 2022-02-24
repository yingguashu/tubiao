// pages/survey/survey.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:"",//测点id
    Result:"",//接口返回的数据
    Monitoring:[{id:'az209',value:"测斜"},{id:'az209a',value:"电子水平尺"},{id:'az209b',value:"单点变形测量"},{id:'az219',value:"频率计类设备监测单元"},{id:'az2091',value:"静力水准"},{id:'az301',value:"激光二维计"},{id:'az5523qx',value:"倾斜监测"},{id:'az5523lf',value:"裂缝监测"},{id:'az5523cj',value:"冲击/敲击/振动监测"},{id:'az207',value:"实时振动监测"},{id:'az107',value:"磁环式分层沉降"},{id:'qianxun',value:"千寻设备"},{id:'wendu',value:"温度"},{id:'tanta',value:"塌陷/坍塌"},{id:'shuiwei',value:"水位"},{id:'lxyl',value:"实时应力监测"}],//监测类型
    value:"",//测点的监测类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cid=options.cid
    var that=this
    const Authorization=wx.getStorageSync('access_token')
    wx.request({
      url: 'https://zenitech.net/yewu/api/guanli/cedianxinxi/'+cid,
      method:"GET",
      header:{'Authorization':'Bearer '+Authorization},
      success(res){
        console.log("/*/*/**/*/*/***/*/*/*/*/");
        console.log(res);
        const {Result}=res.data
        const Monitoring=that.data.Monitoring
        const ut=Result.mu[0].ut
        Monitoring.forEach(v => {
          if(v.id==ut){
            console.log("等于");
            console.log(v.value);
            that.setData({value:v.value})
          }
        });
        that.setData({Result})
      }
    })
    that.setData({cid})
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
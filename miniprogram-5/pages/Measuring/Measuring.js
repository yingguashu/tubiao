// pages/Measuring/Measuring.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:"",//获取信息的gid
    Result:"",//获取出来的数据
    name:"",
    en:false,//判断是否显示未完成的测点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {gid}=options
    var {name}=options
    var that=this
    const Authorization=wx.getStorageSync('access_token')
    wx.request({
      url: 'https://zenitech.net/yewu/api/guanli/cedianliebiao?groupId='+gid,
      method:"GET",
      header:{'Authorization':'Bearer '+Authorization},
      success(res){
        console.log(res);
        const {Result}=res.data
        that.setData({Result})
      }
    })
    this.setData({gid,name})
    // console.log(options);
  },
  // 跳转测点的详情信息页面
  onGetSurvey(e){
    const {iid}=e.target.dataset
    wx.navigateTo({
      url: '../survey/survey?cid='+iid,
    })
  },
  // swicth组件
  onSwitch(e){
    var en=e.detail.value
    // console.log(flag);
    // var en=""
    // if(flag){
    //   en=2
    //   console.log("开启了");
    // }else{
    //   en=4
    //   console.log("关闭了");
    // }
    this.setData({en})
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
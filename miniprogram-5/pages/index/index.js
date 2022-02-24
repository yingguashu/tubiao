var util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 获取用户组织信息
  onGetgroup(){
    const Authorization=wx.getStorageSync('access_token')
    wx.request({
      url: 'https://zenitech.net/identity/api/groups/groups',
      header:{'Authorization':'Bearer '+Authorization},
      method:"Get",
      success(res){
        if(res.statusCode==200){
          console.log(res);
          wx.setStorageSync('group', res.data.result)
        }else{
          util.GetToken()
        }
      },fail(err){
        console.log(err);
      }
    })
  },
  onCS(){
    var string="通锡高速公路海门至通州段TZ-TZ1施工标段"
    console.log(string.lastIndexOf("门"));
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
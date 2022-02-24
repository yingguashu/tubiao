// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({name:'history'})
    // .then(res=>{
    //   console.log("成功");
    //   console.log(res);
    // })
    // .catch(err=>{
    //   console.log("失败");
    // })
    const date=new Date()
    console.log(date);
    const db=wx.cloud.database()
    db.collection('history').get()
    .then(res=>{
      console.log(res);
      this.setData({
        history:res.data.reverse()
      })
      // console.log(res.data.reverse());
    })
    .catch(err=>{
      console.log("获取失败,请重新获取");
    })
  },

  // 清空历史浏览记录
  onDelete(){
    const db=wx.cloud.database()
    db.collection('history').where({
        name:'历史记录'
    }).remove().then(res=>{
      console.log("成功");
      wx.showToast({
        title: '清除成功',
        icon:'none'
      })
      this.onLoad()
    }).catch(err=>{
      console.log("失败");
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
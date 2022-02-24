// pages/Group/Group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group:"",//用户权限下的分组管理信息
    input:"",//搜索框的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const group=wx.getStorageSync('group')
    this.setData({group})
  },
  // 进入组下的工程组
  onGetChild(e){
    // console.log(e.target.dataset);
    const {gid}=e.target.dataset
    wx.navigateTo({
      url: '/pages/GroupEng/GroupEng?gid='+gid,
    })
  },
  // 搜索
  onTest(){
    const input=this.data.input
    const group=wx.getStorageSync('group')
    var groupsse=[]
    group.forEach(v => {
      if((v.name).indexOf(input)){
        // console.log("存在");
        // console.log(v);
      }else{
        console.log("不存在");
        groupsse.push(v)
      }
    });
    // console.log(groupsse);
    this.setData({group:groupsse})
    // console.log("点击了搜索");
  },
  // 搜索框失去焦点赋值
  name(e){
    var input=e.detail.value
    this.setData({input})
    // console.log(e.detail.value);
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
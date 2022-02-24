// pages/GroupEng/GroupEng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:"",//传来的gid
    children:"",//工程信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    const group=wx.getStorageSync('group')
    const {gid}=options
    const children=[]
    group.forEach(v => {
      if(!(v.groupId).indexOf(gid)){
        // console.log(v);
        v.children.forEach(z => {
          children.push(z)
          console.log(z.groupId);
        });
      }
    });
    this.setData({gid,children})
  },
  // 跳转到对应的测点详细信息
  onGetMe(e){
    const {gid}=e.target.dataset
    const {name}=e.target.dataset
    // console.log(e);
    wx.navigateTo({
      url: '../Measuring/Measuring?gid='+gid+'&name='+name,
    })
  },
  async onGetSum(){

  }
})
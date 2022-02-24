// pages/enquire/enquire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Equipment:"",//设备编号
    content:"",//查询出来的数据
    locations:"",//查询位置信息
    v:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取输入的设备编号
  name(e){
    const Equipment=e.detail.value
    this.setData({Equipment})
    console.log(e.detail.value);
  },
  // 开始请求获取数据
  onTest(e){
    var v=this.data.v
    if(v.length==0){
      var Equipment=this.data.Equipment
    }else{
      var Equipment=v
    }
    var rex=/^[0-9]{12}$/;
    if((rex.test(Equipment))){
      wx.request({
        url: 'https://zenitech.net/yewu/api/shebei/shuju/'+Equipment,
        success:(res)=>{
          console.log(res);
          const content=res.data
          this.setData({content})
        }
      })
      wx.request({
        url: 'https://zenitech.net/yewu/api/shebei/weizhi/'+Equipment,
        success:(res)=>{
          var locations=res.data
          this.setData({locations})
          console.log(locations);
        }
      })
    }else{
      wx.showToast({
        title: '请输入正确设备编号',
        icon:'none',
        duration:1800
      })
    }

  },
  search(e){
    var v=e.detail.value;
    this.setData({v})
    this.onTest()
  },
  onToTest(e){
    const content=this.data.content
    let {id}=e.currentTarget.dataset
    let Equipment=this.data.Equipment
    let t=content[id].t
    let v=content[id].v
    console.log(content[id]);
    wx.setStorageSync('data', content[id].d)
    wx.navigateTo({
      url: '../test/test?id='+id+'&Equipment='+Equipment+'&t='+t+'&v='+v,
    })
  }
})
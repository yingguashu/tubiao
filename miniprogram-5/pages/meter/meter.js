// pages/meter/meter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"",
    id:{},//定义一个数组
    meter:{},
    time:[],//时间
    flag:'199',
    f:[],//钢筋计力度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handGetmester()
  },
  handGetmester(){
    wx.request({
      url: 'https://zenitech.net/testdata/gangjinji.json',
      success:(res)=>{
        // console.log(res.data.Data);
        const meter=res.data.Data;
        wx.setStorageSync('meter', meter)
      }
    })
    const meter=wx.getStorageSync('meter')
    this.setData({
      meter
    })
    let ff;
    for (var i in meter) {
      ff=0;
      this.data.time.push(meter[i].t.substr(11,8))
      for(var j in meter[i].d){
        ff+=(meter[i].d)[j].f
      }
      this.data.f.push(ff.toFixed(2))
    }
    // console.log(this.data.f);
    wx.setStorageSync('f', this.data.f)
    wx.setStorageSync('time', this.data.time)
  },
  handSetsbfc(){
    wx.navigateTo({
      url: '../turn/turn',
    })
  },
  // 把当前点击的时间作为参数传到today
  handSetToday(e){
    // console.log(e.target.dataset);
    // 把wxml页面传来的时间赋值过去
    const {hour}=e.target.dataset
    const {i}=e.target.dataset
    console.log(e);
    wx.navigateTo({
      url: '../todays/today?hour='+hour+"&"+"i="+i,
    })
  },
  handDown(e){
    console.log(e.currentTarget.dataset);
    const {id}=e.currentTarget.dataset
    const flagid=this.data.flag
    const flag=id
    if(flagid===flag){
      this.setData({
        index:e.currentTarget.dataset,
        flag:1999
      })
    }else{
      this.setData({
        index:e.currentTarget.dataset,
        flag
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})
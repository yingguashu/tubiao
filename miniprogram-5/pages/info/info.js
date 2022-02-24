// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    userinfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  longtap(){
    console.log("长按了");
    wx.getImageInfo({
      src: 'https://i0.hdslb.com/bfs/article/c37cc9e2164468879a1fc1001ce61a4608f9ee1d.jpg',
      success:(res)=>{
        console.log(res.path);
        this.setData({src:res.path})
      }
    })
    wx.saveImageToPhotosAlbum({
      filePath:this.data.src,
      success(res) { 
        wx.showModal({
          title: '提示',
          content: '已保存到相册',
          showCancel: false,
        })
      },
    })
  },
  //查看头像大图
  picture(e){
    if(this.data.userinfo){
      let big=e.currentTarget.dataset.big
      wx.previewMedia({
        sources: [{
          url: big,
        }],
      })
    }
  },
  bindt(){
    wx.previewImage({
      urls: [this.data.src],
    })
  },
  // 退出设置
  sezi(){
    const userinfo=this.data.userinfo
    if(userinfo){
      console.log("确定要退出吗");
      wx.showModal({
        title:'确定要注销吗',
        content:'注销提示',
        cancelColor: '#E38eff',
        success:(res)=>{
          console.log(res);
          if(!(res.cancel)){
            this.setData({
              userinfo:''
            })
          }
        }
      })
    }else{
      // console.log("请登录");
      wx.showToast({
        title: '还没有登录,请登录',
        icon:'none',
        duration:2000,
      })
    }
  },
  bindGetUser(){
    wx.getUserProfile({
      desc: '测试',
      success:(res)=>{
        console.log(res);
        this.setData({
          userinfo:res.userInfo
        })
      }
    })
  },
  // 跳转工程列表
  onToen(){
    wx.navigateTo({
      url: '/pages/enquire/enquire',
    })
  },
  // 跳转设备管理
  onToLocation(){
    wx.navigateTo({
      url: '../location/location',
    })
  },
  // 跳转分组管理
  onGetGroup(){
    wx.navigateTo({
      url: '/pages/Group/Group',
    })
  },
})
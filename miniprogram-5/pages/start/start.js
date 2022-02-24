//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    sty:"3",//input边框颜色
    pho:"",//手机号
    mobile:false,//手机号是否正确
    currentData:"0",//密码和短信登录切换
    SMS:"",//短信验证码
    SMScode:"",//短信标识码
    PassValue:"",//输入的密码
    UserName:"",//用户账号
  },
  onLoad: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  onShow: function() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  // 登陆判断
  goToIndex: function() {
    console.log("开始登陆");
    let currentData=this.data.currentData
   if(currentData==0){
     this.Passlogin()
   }else{
     this.SMSlogin()
   }
    // wx.switchTab({
    //   url: '/pages/index/index',
    // });
  },
  // 短信登录
  SMSlogin(){
    console.log("短信登录");
      // 手机号
      const mobile=this.data.pho
      // 短信验证码
      const SMS=this.data.SMS
      console.log(SMS);
      // 短信标识码
      const SMScode=this.data.SMScode
      if(SMS){
        wx.request({
          url: 'https://zenitech.net/identity/connect/token',
          data:{
            grant_type:'password',
            client_id:'device',
            scope:'offline_access',
            username:mobile,
            password:SMS,
            smstoken:SMScode
          },
          method:"POST",
          header:{'Content-Type':'application/x-www-form-urlencoded'},
          success(res){
            console.log(res);
            const {access_token}=res.data
            const {refresh_token}=res.data
            wx.setStorageSync('refresh_token', refresh_token)
            wx.setStorageSync('access_token', access_token)
            wx.switchTab({
              url: '/pages/index/index',
            })
          },
          fail(err){
            console.log(err);
          }
        })
      }else{
        if(mobile){
          wx.showToast({
            title: '验证码错误',
            icon:'none',
            duration:1800
          })
        }else{
          wx.showToast({
            title: '请先获取验证码',
            icon:'none',
            duration:1800
          })
        }
      }
  },
  // 密码登录
  Passlogin(){
    const PassValue=this.data.PassValue
    const pho=this.data.UserName
    if(PassValue && pho){
      wx.request({
        url: 'https://zenitech.net/identity/connect/token',
        data:{
          grant_type:'password',
          client_id:'device',
          scope:'offline_access',
          username:pho,
          password:PassValue
        },
        header:{'Content-Type':'application/x-www-form-urlencoded'},
        method:"POST",
        success(res){
          console.log(res);
          const {access_token}=res.data
          const {refresh_token}=res.data
          wx.setStorageSync('refresh_token', refresh_token)
          wx.setStorageSync('access_token', access_token)
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
        fail(err){
          console.log(err);
        }
      })
    }else{
      wx.showToast({
        title: '请输入正确的账号密码',
        icon:'none',
        duration:1800
      })
    }
  },
  // 跳转到注册界面
  goRgei(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  // 获取焦点
  phone(e){
    const phone=e.detail.value
    console.log(phone);
    var reg_phone=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if(reg_phone.test(phone)){
      console.log("这是一个手机号");
      this.setData({pho:phone})
    }else if(phone==''){
    }else{
      this.setData({
        mobile:true
      })
    }
  },
  GetName(e){
    this.setData({UserName:e.detail.value})
    // console.log();
  },
  // 验证码失去焦点获取输入值
  SMSpass(e){
    const SMS=e.detail.value
    var res=/^[0-9]{4,8}$/;
    if(res.test(SMS)){
      console.log("是正确验证码");
      this.setData({SMS})
      console.log(SMS);
    }else if(SMS==''){
    }else{
      wx.showToast({
        title: '请输入正确验证码',
        icon:'none',
        duration:1800
      })
    }
  },
  // 密码框失去焦点获取输入值
  pass(e){
    let PassValue=e.detail.value
    this.setData({PassValue})
  },
  // 失去焦点
  losephone(){
    this.setData({
      sty:2
    })
  },
  losepass(){
    console.log("这是验证码");
    this.setData({
      sty:4
    })
  },
  //点击切换，滑块index赋值
  checkCurrent(e){
    const that = this;
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 获取验证码
  GetYZM(){
    var that=this
    var reg_phone=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    // 判断手机号是否正确
    const mobile=this.data.pho
    console.log(mobile);
    if(reg_phone.test(mobile)){
      wx.request({
        url: 'https://zenitech.net/identity/accountapi/smscode',
        data:{
          phoneNumber:mobile
        },
        method:"Post",
        header: { 'content-Type': 'application/json' },
        success(res){
          console.log(res);
          const SMScode=res.data.result
          that.setData({SMScode})
        }
      })
      wx.showToast({
        title: '已发送',
        icon:"success",
        duration:1800
      })
    }else{
      wx.showToast({
        title: '手机号错误',
        icon:"error",
        duration:1800
      })
    }
  },
});
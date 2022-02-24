// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Equipment:"",//设备编号
    titleArr:[{name:"0",value:true},{name:"1",value:true},{name:"2",value:true},{name:"3",value:true},{name:"4",value:true},{name:"5",value:false},{name:"6",value:false},{name:"7",value:false},{name:"8",value:false}],//标题集合
    nameArr:[],//内容集合
    t:"",//设备时间
    v:"123",//子协议
    Selected:"",//选中复选框值的长度
    pageurl:"",//页面路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const testdata=wx.getStorageSync('data')
    let Equipment=options.Equipment
    if(testdata.length==0){
      console.log("为空");
      this.setData({Equipment})
      this.onTest(options.id)
    }else{
      console.log("不为空");
      this.setData({nameArr:testdata})
    }
    var pages = getCurrentPages(); // 获取页面指针数组
    var currentPage = pages[pages.length - 1]; // 获取当前页
    console.log(currentPage.route); // 当前页的路径
    var pageurl=currentPage.route
    let i=0
    // 循环输出页面的值进行添加
    for (const v in options) {
      console.log(v);
      let url=v+"="+options[v]
      if(i==0){
        pageurl=pageurl+"?"+url
        i++
      }else{
        pageurl=pageurl+"&"+url
        i++
      }
    }
    console.log(pageurl);
    this.setData({
      Equipment,
      pageurl,
      t:options.t,
      v:options.v
    })
  },
  // 开始请求获取数据
  onTest(id){
    const Equipment=this.data.Equipment
    console.log(Equipment);
      wx.request({
        url: 'https://zenitech.net/yewu/api/shebei/shuju/'+Equipment,
        success:(res)=>{
          // console.log(res);
          const dat=res.data[id]
          const nameArr=res.data[id].d
          console.log(dat);
          this.setData({nameArr,v:dat.v,time:dat.t})
        }
      })
  },
  // 复选框选择的值
  handleItemchnage(e){
    // 把选择要显示的值输出赋值
    const arr=e.detail.value
    var titleArr=this.data.titleArr
    let Selected=arr.length>5?(arr.length*20)+"%":100%
    console.log();
    this.setData({Selected})
    // var titleArr={}
    // 遍历选中的值
    for (let v in titleArr) {
      try{
        for (let key in arr) {
          if(titleArr[v].name==arr[key]){
            titleArr[v].value=true
            throw '跳出循环'//在这里抛出异常
          }else{
            titleArr[v].value=false
          }
        }
    } catch (e) {
        // console.log(e)
    }
    }
    this.setData({titleArr})
  },
})
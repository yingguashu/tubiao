import * as echarts from '../../ec-canvas/echarts';
var Chart=null
const util=require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:[],//想要查询时间的数组
    timer:'',//动态刷新echatr表
    name:"",
    date:[],//日期
    hour:[],//小时
    one:[],//1
    tow:[],//2
    three:[],//3
    four:[],//4
    pageurl:"",
    ec: {
      // onInit: initChart,
      lazyLoad: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({pageurl})
    if(this.data.name==0){
      var hour=''
      if(options.hour==null){
        console.log("为空");
        hour=(options.index).substr(0,10)
      }else{
        console.log("不为空");
        hour=(options.hour).substr(0,10)
      }
      // const hour=(options.hour).substr(0,10)
      this.setData({
        name:hour
      })
    // 历史记录保存
    let page=util.getNowPage()
    const gethistro=util.addhistory(hour,options.hour,options.i,page)
    }
    this.echartsComponnet = this.selectComponent('#mychart-dom-graph');
    this.pta()
  },
  Receiving(e){
    console.log("父组件开始接收参数");
    const name=e.detail
    this.setData({
      name,
    })
    this.onLoad()
    console.log(name);
  },
  pta(){
        const meter=wx.getStorageSync('meter')
        // 获取data里的name用来做判断当前要暂时哪个天数的信息
        const name=this.data.name
        this.data.hour=[]
        this.data.one=[]
        this.data.tow=[]
        this.data.three=[]
        this.data.four=[]
        // 遍历循环判断来获取想要的数据
        meter.forEach(v => {
          // 截取想要的数据
          let time=(v.t).substr(0,10)
          // 把截取的数据进行判断
          if(time===name){
            // this.data.date.push(time)//给日期赋值
            this.data.hour.push((v.t).substr(11,5))//给时间赋值
            this.data.one.push((v.d)[1].f)
            this.data.tow.push((v.d)[2].f)
            this.data.three.push((v.d)[3].f)
            this.data.four.push((v.d)[4].f)
          }
        });
        console.log("清空之后重新赋值");
        console.log(this.data.date);
        console.log(this.data.hour);
        console.log(this.data.one);
        console.log(this.data.tow);
        console.log(this.data.three);
        console.log(this.data.four);
        console.log("Chart的值为"+Chart);
        if (!Chart){
          this.init_echarts(); //初始化图表
        }else{
          this.init_echarts(); //初始化图表
          this.setOption(Chart); //更新数据
        }    
  },
  init_echarts: function(){
    this.echartsComponnet.init((canvas, width, height) => {
    // 初始化图表
    Chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    // Chart.setOption(this.getOption());
    this.setOption(Chart);
    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    return Chart;
  });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption:function() {
    const one=this.data.one;
    const tow=this.data.tow;
    const three=this.data.three;
    const four=this.data.four;
    const name=this.data.name;//当前天数
    const hour=this.data.hour;//小时数据
   
   var option = {
    title: {
      text: name,
      textStyle: {       
        fontSize: 18,       
        fontFamily: "sans-serif"
      },
      textAlign:'left',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'//两边都显示当前数据
      }
    },
    legend: {
      icon: "roundRect",
      data: ['1', '2', '3', '4'],
      left:"40%"
    },
    grid: {
      // left: '3%',
      right: "7%"
      // bottom: '3%',
      // containLabel: true
    },
    toolbox: {
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: hour,
      inverse:true
    },
    yAxis: {
      type: 'value',
      splitNumber:7
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 74,
        handleSize: 10 ,
        dataBackground: {
        lineStyle: {
          color: "rgba(204, 47, 225, 0.72)"
        }},
      },
      {
        type: 'inside',
        start: 14,
        end: 100,
        minSpan: 20
      },
    ],
    series: [
      {
        name: '1',
        type: 'line',
        stack: 'Total',
        data: one,
        markPoint:{
          data:[{
            type:"max"
          }],
          symbol:"pin"
        }
      },
      {
        name: '2',
        type: 'line',
        stack: 'Total',
        data: tow,
        markPoint:{
          data:[{
            type:"max"
          }],
          symbol:"pin"
        }
      },
      {
        name: '3',
        type: 'line',
        stack: 'Total',
        data: three,
        markPoint:{
          data:[{
            type:"max"
          }],
          symbol:"pin"
        }
      },
      {
        name: '4',
        type: 'line',
        stack: 'Total',
        data: four,
        markPoint:{
          data:[{
            type:"max"
          }],
          symbol:"pin"
        }
      }
    ]
    };
  return option;
  }
})


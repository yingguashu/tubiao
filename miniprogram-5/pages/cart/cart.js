import * as echarts from '../../ec-canvas/echarts';
const util=require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"",
    d:{},
    dt:{},
    index:['0-10','1-11','2-12','3-13','4-14','5-15','6-16','7-17',],
    // 深度地址
    depth:[],
    X:[],
    Y:[],
    // 传感器地址
    sensor:[],
    // 传感器温度
    tes:[],
    ec: {
      onInit: initChart
    },
    ecl:{
      onInit: initBarChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("cart页面的值");
    console.log(options);
    var that=this;
    const Inclination=wx.getStorageSync('Inclination')
    const dd=Inclination[options.index].d;
    that.setData({
      index:options.index,
      d:dd
    })
     // 历史记录保存
    let page=util.getNowPage()
    const gethistro=util.addhistory(options.index,options.t,options.i,page)
    // console.log(dd);
    this.survey();
  },
  survey(){
    const dd=this.data.d;
    const vv=[]
    console.log(dd);
    for (var v in dd) {
      // console.log(v);
      vv.push(v)
      if(dd[v].t==null){
        this.data.tes.push(0);
      }else{
        this.data.X.push((dd[v].v).toFixed(2))
        this.data.Y.push((dd[v].v2).toFixed(2))
        this.data.tes.push((dd[v].t));
        this.data.depth.push((dd[v].k)/1000)
        this.data.sensor.push((dd[v].s))
      }
    }
    // console.log(vv);
    let i=0
    const arr={}
    for (var index = 9; index > -1; index--) {
      console.log("开始循环");
      // console.log(dd[vv[index]]);
      arr[i]=(dd[vv[index]])
      i++
    }
    console.log(this.data.dt);
    this.setData({
      dt:arr
    })
    // console.log(this.data.X);
    // console.log(this.data.Y);
    // console.log(this.data.tes);
    // console.log(this.data.depth);
    // console.log(this.data.sensor);
    // console.log(this.data.idnex);
  }
})
// 温度图
function initBarChart(canvas, width, height,e) {
  let pages = getCurrentPages();
let currentPagePage = pages[pages.length - 1];  // 当前页面
let data = currentPagePage.__data__;  //页面的数据

var tes=data.tes;

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
 
 var option = {
   title:{
     text:"传感器温度",
     textStyle: {
      fontSize: 15
    },
   },
   tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    // position:"top",
    // position: "top",
    type: 'category',
    data: [0,'10','11','12','13','14','15','16','17','18'],
    axisTick: {
      show: true,
      alignWithLabel: true
    },
    minorTick: {
      show: true
    },
    minorSplitLine: {
      show: true
    }
  },
  yAxis: {
    position:'bottom',
    // inverse:true,
    type: 'value',
    min: 0,
    max: 20,
    minorTick: {
      show: true
    },
    minorSplitLine: {
      show: true
    }
  },
  dataZoom: [
    {
      show: true,
      type: 'inside',
      filterMode: 'none',
      xAxisIndex: [0],
      startValue: -20,
      endValue: 20
    },
    {
      show: true,
      type: 'inside',
      filterMode: 'none',
      yAxisIndex: [0],
      startValue: -20,
      endValue: 20
    }
  ],
  series: [
    {
      // data: [0,17.6,18,15.9,17.8,16.5,17.2,16.2,19.4,],
      name:'温度',
      type: 'line',
      // stack:'Total',
      smooth: true,
      data: tes,
    }
  ]
};
 
  chart.setOption(option);
  return chart;
}
// 数据图
function initChart(canvas, width, height) {
  let pages = getCurrentPages();
  let currentPagePage = pages[pages.length - 1];  // 当前页面
  let data = currentPagePage.__data__;  //页面的数据
  var X=data.X;//X方向数据
  var Y=data.Y;//Y方向数据
  var depth=data.depth;//深度
  var sensor=data.sensor;//传感器地址
  
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
 
 var option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    type: "category",
    inverse:true,
    data: X
  },
  yAxis: {
    
  },
  series: [{
    data: Y,
    name:"Y值",
    type: "line",
    clip:false
  }]
}
 
  chart.setOption(option);
  return chart;
}
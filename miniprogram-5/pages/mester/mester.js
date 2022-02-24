import * as echarts from '../../ec-canvas/echarts';
const util=require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    d:{},
    get:{},
    el:{
      onInit:initChart
    },
    ec:{
      onInit:initLine
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const {index}=options
    // 上个页面传来的设备编号
    const {i}=options
    // 上个页面传来的时间
    const {t}=options
    const meter=wx.getStorageSync('meter');
    // console.log(meter[index]);
    let dd=meter[index].d
    // console.log(dd);
    //将hdList用Array.from（）方法转换为数组，并用list变量接收
    this.setData({
      d:dd
    })
    // 历史记录保存
    let page=util.getNowPage()
    const gethistro=util.addhistory(index,t,i,page)
    // console.log(gethistro);
  },
 
})
function initChart(canvas, width, height) {
  let pages = getCurrentPages();
let currentPagePage = pages[pages.length - 1];  // 当前页面
let data = currentPagePage.__data__;  //页面的数据
var d=data.d;
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
 
  var option = {
    legend: {
      orient: "vertical",
      left: "left",
      data: ["1", "2", "3", "4"]
    },
    series: [{
      type: "pie",
      data: [{
        value: d[1].f,
        name:1
      }, {
        value: d[2].f,
        name: 2
      }, {
        value: d[3].f,
        name: 3
      }, {
        value: d[4].f,
        name: 4
      }],
      label:{
        color:"rgba(90, 42, 171, 1)"
      },
      minAngle: 40,
    left:"20%",
    top:"0%",
    width: "100%",
    height: "41%"
    }],
  }
  chart.setOption(option);
  return chart;
}
function initLine(canvas, width, height) {
  let pages = getCurrentPages();
  let currentPagePage = pages[pages.length - 1];  // 当前页面
  let data = currentPagePage.__data__;  //页面的数据
  var d=data.d;
  var option = {
    title:{
      text:'钢筋力大小'
    },
    tooltip:{
      trigger:'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: "category",
      axisTick: {       
        alignWithLabel: true
      },
      axisPointer:{
        type:"line"
      },
      data: [1,2,3,4]
    },
    yAxis: {},
    series: [
      {
        name: 'U',
        type: 'line',
        data: [d[1].f, d[2].f, d[3].f, d[4].f],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'red' // 0% 处的颜色
            }, {
              offset: 0.5, color: '#ffffff' // 100% 处的颜色
            },],
            global: false // 缺省为 false
          }
        },
        stack: 'confidence-band',
        symbol: 'none'
      },
    ]
  }
  
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
    chart.setOption(option);
    return chart;
}
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"",
    turn_top:true,
    top:0,
    toIndex:'',
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
  },
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
    this.survey();
    // this.onGundong(options);
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

  },
  onShuju: function () {
    console.log("单击了6");
    var that=this;
    wx.showToast({
      title: '详细数据',
      icon:'none',
      duration:1500
    })
    that.setData({
      toIndex: 'E'
    })
    console.log(this.data.toIndex);
  },
  one(){
    console.log("1");
  },
  down(){
    if(this.data.turn_top){
      console.log("真");
      this.setData({
        turn_top:false
      })
    }else{
      console.log("假");
      this.setData({
        turn_top:true
      })
    }
  }

})
function initChart(canvas, width, height,e) {
  let pages = getCurrentPages();
let currentPagePage = pages[pages.length - 1];  // 当前页面
let data = currentPagePage.__data__;  //页面的数据
var yester=data.yester;
var text=data.text;


  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
 
 var option = {
  color: ["#3398DB"],
  title: {
    text: text
  },
  toolbox:{
    show:true,
    itemSize:15,
    itemGap:15,
    left:'8%',
    feature:{
      magicType: { type: ['line', 'bar'] },
    },
  },
  grid:{
    show:true
  },
  tooltip: {
    trigger: "axis",
    axisPointer:{
      type:"cross",
      crossStyle:{
        type:"dotted"
      }
    }
  },
  legend: {     
    show: true,
    bottom:'5%'
  },
  xAxis: {
    name:'位移变化量(mm)',
    nameLocation: "middle",
    nameGap:22,
    splitNumber:4,
    max:4,
    position:"top",
    data:[0.1,0.2,0.1,0.2,0.3,0.1,0.2,0.2,0.1,0.3,0.3,0.1,0.2,0.1,0.3,0.1,0.2,0,0.1],
    axisTick: {
      show: true,
      alignWithLabel: true
    },
    minorTick: {
      show: true
    },
    minorSplitLine: {
      show: true
    },
    splitLine: {
      show: true,    // 是否显示分隔线。默认数值轴显示，类目轴不显示
      interval: '0',    // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
      color: ['#ccc'],    // 分隔线颜色，可以设置成单个颜色，也可以设置成颜色数组，分隔线会按数组中颜色的顺序依次循环设置颜色
      width: 3,    // 分隔线线宽
      type: 'solid',     // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
  },
  },
    yAxis:{
      name:"深度(mm)",
      nameLocation: "middle",
      nameGap:22,
      splitNumber:22,
      axisTick: {
        alignWithLabel: true
      },
      type:'category',
      // data:[0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22],
      inverse:true,
      splitLine: {
        show: true,
        lineStyle:{
          type:"dashed"
        }
      },
      splitArea: {},
      axisPointer: {
        type: "line"
      },
      minorSplitLine: {
        show: true
      },
      
    },
  // dataZoom: [
  //   {
  //     type: 'slider',
  //     show: true,
  //     yAxisIndex: [0],
  //     left: '93%',
  //     start: 0,
  //     end: 12
  //   },
  //   {
  //     type: 'inside',
  //     xAxisIndex: [0],
  //     start: 100,
  //     end: 35
  //   },
  //   {
  //     type: 'inside',
  //     yAxisIndex: [0],
  //     start: 0,
  //     end: 36
  //   },
  //   {
  //     type: 'slider',
  //     show: true,
  //     start: 10,
  //     end: 100,
  //     handleSize: 8,
  //     dataBackground: {
  //       lineStyle: {
  //         color: "rgba(0, 195, 255, 0.69)",
  //         type: "dotted",
  //         cap: "round",
  //         shadowColor: "rgba(237, 27, 156, 0.76)"
  //       },
  //       areaStyle: {
  //         width:0.5,
  //         color: "rgba(235,29,170,0.82)"
  //       },
  //     },
  //     selectedDataBackground: {
  //       lineStyle: {
  //         color: "rgba(0, 47, 255, 0.56)",
  //         width: 1
  //       }
  //     }
    
  //   }],
  grid: {
    show: true
  },
  series: [
  //   {
  //   name: "Beijing AQI",
  //   type: 'line',
  //   smooth:true,
  //   clip:false,
  //   data: [0,0.1,0.3],
  //   label:{
  //     show:true,
  //     fontWeight:"bold"
  //   }
  // },
  {
    name: "AQI",
    type: 'line',
    smooth:true,
    clip:false,
    data:[0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22],
    label:{
      show:true,
      fontWeight:"bold"
    }
  }
]
}
 
  chart.setOption(option);

  return chart;
}
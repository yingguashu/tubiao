import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    f:[],
    time:[],
    ec: {
      onInit: initChart
    },
  },
  onLoad:function(options){
    const f=wx.getStorageSync('f')
    const time=wx.getStorageSync('time')
    this.setData({
      f,
      time
    })
    console.log(this.data.f);
    console.log(this.data.time);
  }

})
function initChart(canvas, width, height,) {
  let pages = getCurrentPages();
  let currentPagePage = pages[pages.length - 1];  // 当前页面
  let data = currentPagePage.__data__;  //页面的数据
  var f=data.f;
  var time=data.time;

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
 
 var option = {
  color: ["#3398DB"],
  title: {
    text: "钢筋力图表"
  },
  toolbox:{
    show:true,
    itemSize:15,
    feature:{
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {
        type: "jpg",
        name:"钢筋力图",
        show:true,
      }
    },
    orient: "horizontal",
  },
  grid:{},
  tooltip: {
    trigger: "axis",
    axisPointer:{
      type:"cross",
      crossStyle:{
        type:"dotted"
      }
    }
  },
  xAxis: {
    name:"时间",
    // position:"top",
    nameLocation:"start",
    data:time,
    inverse: true,
    axisLine: {
      // symbol: ['none','arrow'],
      symbol: "arrow"
    },
    axisTick: {
      show: true,
      alignWithLabel: true
    }
  },
    yAxis:{
      name:"位置",
      type: "value",
      // inverse:true,
      splitLine: {
        show: true
      },
      splitArea: {},
      axisPointer: {
        type: "line"
      },
      minorSplitLine: {
        show: true
      }
      
    },
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 90,
      end: 100
    },
  {
    type: 'slider',
    show: true,
    start: 94,
    end: 100,
    handleSize: 8,
    dataBackground: {
      lineStyle: {
        color: "rgba(0, 195, 255, 0.69)",
        type: "dotted",
        cap: "round",
        shadowColor: "rgba(237, 27, 156, 0.76)"
      },
      areaStyle: {
        width:0.5,
        color: "rgba(235,29,170,0.82)"
      },
    },
    selectedDataBackground: {
      lineStyle: {
        color: "rgba(0, 47, 255, 0.56)",
        width: 1
      }
    }
   
  }],
  grid: {
    show: true
  },
  series: [{
    name: "钢筋力",
    type: 'line',
    smooth:true,
    data: f,
    label:{
      show:true,
      fontWeight:"bold"
    }
  }]
}
 
  chart.setOption(option);
  
  return chart;
}
function Export(){
  var img = new Image();
  img.src = myChart2.getDataURL({
      type:"png",
      pixelRatio: 1, //放大2倍
      backgroundColor: '#fff'
  });

  img.onload=function(){
      var canvas=document.createElement("canvas");
      canvas.width=img.width;
      canvas.height=img.height;
      var ctx=canvas.getContext('2d');
      ctx.drawImage(img,0,0);
      var  dataURL=canvas.toDataURL('image/png');

      var a = document.createElement('a');
      // 创建一个单击事件
      var event = new MouseEvent('click');
      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      a.download = '图片.png' || '下载图片名称';
      // 将生成的URL设置为a.href属性
      a.href = dataURL;
      // 触发a的单击事件
      a.dispatchEvent(event);
  };
}
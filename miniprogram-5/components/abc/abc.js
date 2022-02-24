// Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    days:[],//月
    doube:[0,1,3,5,7,8,10,12],//双月31天
    single:[0,4,6,9,11],//单月30天
    column:[0,1,2,3,4],
    hourtime:[[],[],[5,6],],
    flag:false,
    value:[],//单击多列选择器之后获取的值
  },
  options: {
    addGlobalClass: true
  },
  created() {
    // this.abctap()
  },
  attached(){
      var time=new Date();
      const year=time.getFullYear()//年
      // 年循环赋值
      const hourtime=this.data.hourtime
      let h=[]
      for (let index = year; index > year-15; index--) {
          h.push(index)
      }
      // 月赋值
      let montth=[1,2,3,4,5,6,7,8,9,10,11,12]
      // 日赋值
      let days=[]
      for (let index = 1; index < 32; index++) {
        days.push(index)
    }
    this.setData({days})
      // 小时和分钟赋值
      let hourss=[]//小时
      let minutess=[]//分钟
      for (let index = 0; index < 60; index++) {
        if(index<10){
          let id="0"+index
          hourss.push(id)
          minutess.push(id)
        }else if(index>23){
          minutess.push(index)
        }else{
          minutess.push(index)
          hourss.push(index)
        }
    }
      console.log(h);
      hourtime[0]=h
      hourtime[1]=montth
      hourtime[2]=days
      hourtime[3]=hourss
      hourtime[4]=minutess
      this.setData({
        hourtime
      })
      console.log(this.data.hourtime);
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    abctap(){
      this.bindt()
    },
    //点击事件
  // 多列选择器
  onbindSelect(e){
    console.log("++++++++++++****");
    console.log(e.detail);
    const {value}=e.detail
    this.setData({value,flag:true})
    const hourtime=this.data.hourtime
    const month=hourtime[1][value[1]]<10?'0'+hourtime[1][value[1]]:hourtime[1][value[1]]
    const day=hourtime[2][value[2]]<10?'0'+hourtime[2][value[2]]:hourtime[2][value[2]]
    const abctext=hourtime[0][value[0]]+"-"+month+"-"+day
    this.triggerEvent("itemChange",abctext)
    // console.log(abctext);
  },
  // 多列选择器的列发生改变时
  onbindPickChoke(e){
    console.log("滑动了，开始计算...");
    var time=new Date();
    const year=time.getFullYear()//年
    const {column}=e.detail
    const {value}=e.detail
    const hourtime=this.data.hourtime
    const doube=this.data.doube
    let i=doube.indexOf(value-1)
    var days=[].concat(this.data.days)
    // console.log(days)
    // 滑到了月份开始判断
    if(column==1){
    //判断当前滑到的是不是2月
      if(value==1){
        // 滑到了2月
        if(year/4==0){
          console.log("这是闰年");
          days=days.splice(0,28)
        }else{
          // console.log("+++++++++");
          days=days.splice(0,29)
          // console.log(days);
        }
      }else if(i>0){
        console.log("进入了双月判断");
        console.log("双月31天");
      }else{
        console.log("进入了单月判断");
        days=days.splice(0,30)
        console.log("这是单月30天");
      }
    }else{
      // console.log("没有选择月份");
    }
    if(column==1){
      // console.log(days);
      hourtime[2]=days
      this.setData({hourtime})
    }
    // switch ()
    // console.log(this.data.days);
    console.log(column,value);
  },
 
  }
})

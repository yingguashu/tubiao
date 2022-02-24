Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: ''
    }
  },
// 组件生命周期
  lifetimes: {
    attached: function() {
      this.but()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  created(){
    // console.log("组件调用成功");
  },

  /**
   * 组件的方法列表
   */
  methods: {
      but(e){
    const meter=wx.getStorageSync('meter');
    const index=this.data.index
    // console.log(e);
    let dd=meter[index].d
    // console.log(this.data.index);
    //将hdList用Array.from（）方法转换为数组，并用list变量接收
    this.setData({
      d:dd
    })
  }
  }
})

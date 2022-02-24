  // components/test-component/test-component.js
  Component({
    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行
     */
    properties:{
      pageurl:""
    },
    methods:{
      created() {
        // 注意此时不能调用 setData
      },
      getQrCode(flag){
        wx.showLoading({
          title: '生成中...',
        })
        var that=this
        const pageurl=that.data.pageurl
        wx.cloud.callFunction({
          name:'CreateQ',
          data:{
            pageurl:pageurl
          },
          success(res){
          console.log(res)
          let fileManager = wx.getFileSystemManager();
          let filePath = wx.env.USER_DATA_PATH+'/index.jpg';
          console.log(filePath)
          fileManager.writeFile({
            filePath:filePath,
            encoding:"binary",
            data:res.result.buffer,
            success:(res)=>{
            var codeImg = filePath
            that.setData({
              filePath
            })
            wx.hideLoading({
            })
            wx.showToast({
              title: '已生成小程序码',
              icon:"success",
              duration:1800
            })
            if(flag==1){
              that.saven()
            }
          }
          })
      },
    
        })
    
      },
      // 下载图片
      saven(){
        if(this.data.filePath){
          wx.saveImageToPhotosAlbum({
            filePath: this.data.filePath,
            success(res){}
          })
        }else{
          wx.showToast({
            title: '没有图片,请先生成',
            icon:'none',
            duration:1800
          })
          console.log("没有图片");
        }
    
      },
      xcx(options){
        var flag=1
        this.getQrCode(flag)
        // this.saven()
      },
    },
  });
  
  
  
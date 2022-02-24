
  // components/test-component/test-component.js
  Component({
    /**
     * 组件生命周期函数-在组件实例刚刚被创建时执行
     */
    properties:{
      fileID:"",
      content:""
    },
    methods:{
      created() {
        // 注意此时不能调用 setData
      },
        // 下载表格
      download(){
        wx.showLoading({
          title: '加载中...',
        })
        const content=this.data.content
        // console.log("*******");
        // console.log(history);
        wx.cloud.callFunction({
          name:"excel",
          data:{
            content:content
          },
          success(res){
            let fileID=res.result.fileID
            // this.setData({fileID})
            wx.cloud.getTempFileURL({
              fileList:[{
                fileID:fileID
              }]
            }).then(res=>{
              console.log(res.fileList[0].tempFileURL);
              const tempFileURL=res.fileList[0].tempFileURL
              wx.downloadFile({
                url: tempFileURL,
                filePath:wx.env.USER_DATA_PATH+'/text.xlsx',
                success(res){
                  wx.hideLoading({
                  })
                  wx.showToast({
                    title: '下载成功',
                    icon:"success",
                    duration:1800
                  })
                  console.log(res);
                  const filePath=res.filePath
                  wx.openDocument({
                    filePath: filePath,
                    showMenu: true
                  })
                },
                fail(err){
                  wx.hideLoading({
                  })
                  wx.showToast({
                    title: '下载失败',
                    icon:"error",
                    duration:1800
                  })
                }
              })
            })
          },
          fail(err){
            wx.hideLoading({
            })
            wx.showToast({
              title: '下载失败',
              icon:"error",
              duration:1500
            })
          }
        })
      },
    },
  });
  
  
  
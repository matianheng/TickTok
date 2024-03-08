App({
  data: {
   
    mineUrl:"",
    minePath:"",
    windowWidth: 0,
    windowHeight:0,
    windowHeights:0,
    img1height: 0,
    img2height: 0,
    img3height: 0,
    img4height: 0,
    img5height: 0,
    img6height: 0,
    img7height: 0,
    img8height: 0,
    img9height: 0,
  },
  onLaunch: function (options) {
    let _this = this
 
    tt.getSystemInfo({
      success(res) {
       
    
        _this.data.windowHeights= res.windowHeight,
        _this.data.windowWidth=res.windowWidth
 
        console.log("getSystemInfo 调用成功", _this.data.windowHeights);
      },
      fail(res) {
        console.log("getSystemInfo 调用失败", res);
      },
    });

    /**3*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_3.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
       
        _this.data.img3height= _this.data.windowWidth * imgc;
         
      },
    });
    /**4*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_4.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img4height= _this.data.windowWidth * imgc;
      },
    });
    /**5*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_5.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img5height= _this.data.windowWidth * imgc;
      },
    });
    /**6*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_6.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img6height= _this.data.windowWidth * imgc;
      },
    });
    /**7*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_7.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img7height= _this.data.windowWidth * imgc;
      },
    });
    /**8*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_8.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img8height= _this.data.windowWidth * imgc;
      },
    });
    /**9*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_9.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img9height= _this.data.windowWidth * imgc;
      },
    });
    /**10*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_10.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img10height= _this.data.windowWidth * imgc;
      },
    });
        /**1 */
        tt.getImageInfo({
          src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_1.jpg", // 也可以为本地路径，相对路径或临时文件路径
          success: (res) => {
    
            let { width, height } = res;
            let imgc = height / width;
            _this.data.img1height= _this.data.windowWidth * imgc;
          },
        });
    /**2*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_2.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.data.img2height= _this.data.windowWidth * imgc;
      },
    });
  
    // tt.switchTab({
    //   url: '/pages/test/test',
    //   success(res) {
    //     console.log("switchTab调用成功 ", res);
    //   },
    //   fail(res) {
    //     console.log("switchTab调用失败 ", res);
    //   },
    // });
  },
 
  onShow: function (options) {
    let that = this;
    let url  = "";
    tt.getStorage({
      key: "mineUrl",
      success(res) {
        console.log(333333333, res);
         
        url= res.data
        
      },
      fail(res) {
        console.log("getStorage调用失败");
      },
    });
    if(url==""){
      tt.setStorage({
        key: "mineUrl",
        data: 'pages/index/index',
      })
    }
      // tt.switchTab({
      //   url: '/pages/index/index',
      //   success(res) {
      //     console.log("switchTab调用成功 ", res);
      //   },
      //   fail(res) {
      //     console.log("switchTab调用失败 ", res);
      //   },
      // });
  
 
  
  },
 
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  }
})

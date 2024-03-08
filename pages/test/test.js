var axios = require("../../utils/request.js")
const app = getApp()
Page({
  data: {
    showflag:false,
    mineUrl: 'pages/test/test',
    minePath:"",
    smallboxivible: true,
    windowHeights: 0,
    windowWidth: app.data.windowWidth,
    phone: "",
    tabs6Flag: false,
    oneButtonflag: true,
    testDriveFlag: false,
    name: "",
    cityId: "",
    cityArrName: [],
    canLocation: false,
    allCities: [],
    inputClass: "rgb(153 153 153 / 23%);",
    isPhoneivible: false,
    isCitiyivible: false,
    inpuCitlyClass: "rgb(153 153 153 / 23%);",
    scrolly: false,
    localCode: "",
    isSelectivible: false,
    isSubmitivible: true,
    interval: true,
    tabs8Flag:false,
    img1height: 0,
    img2height:0,
    img3height: 0,
    img4height:0,
    img5height: 0,
    img6height: 0,
    img7height: 0,
    img8height: 0,
    img9height: 0,

  },
  makePhoneCall() {
    tt.makePhoneCall({
      phoneNumber: "4008201902",
      success(res) {
        // 调用成功 makePhoneCall:ok
        console.log("调用成功", res.errMsg);
      },
      fail(res) {
        // 调用失败 makePhoneCall:fail
        console.log("调用失败", res.errMsg);
      },
    });
    /**探索锐歌上方_咨询专线 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '13' }, function (res) {
      console.log("成功调用验证share：", res);
    }, function () {
      console.log("失败调用验证share");
    })

  },
  bindTabs1() {
    var that = this;
    console.log(this.data.phone);

    if (this.data.phone == "") {
      tt.getStorage({
        key: "phone",
        success(res) {
          console.log(333333333, res);
          that.setData({
            phone: res.data,

          })
        },
        fail(res) {
          console.log("getStorage调用失败");
        },
      });
    }

    tt.getStorage({
      key: "oneButtonflag",
      success(res) {
        console.log(333333333, res);
        that.setData({
          oneButtonflag: res.data,

        })
      },
      fail(res) {
        console.log("getStorage调用失败");
      },
    });
    tt.getStorage({
      key: "cityId",
      success(res) {
        console.log(333333333, res);
        that.setData({
          cityId: res.data,

        })
      },
      fail(res) {
        console.log("getStorage调用失败");
      },
    });
    tt.getStorage({
      key: "cityArrName",
      success(res) {
        console.log(333333333, res);
        that.setData({
          cityArrName: res.data,

        })
      },
      fail(res) {
        console.log("getStorage调用失败");
      },
    });
    tt.getStorage({
      key: "allCities",
      success(res) {
        console.log(333333333, res);
        that.setData({
          allCities: res.data,

        })
      },
      fail(res) {
        console.log("getStorage调用失败");
      },
    });

    if (!this.data.phone && this.data.oneButtonflag) {
      this.setData({
        tabs2Flag: true,
        tabs6Flag: true,

      });
    } else {
      this.setData({
        tabs2Flag: true,
        tabs1Flag: false,
        testDriveFlag: true,
        tabs6Flag: false,


      });
    }
      /**探索锐歌一键试驾 埋点 */
      axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '14' }, function (res) {
        console.log("成功调用验证share：", res);
      }, function () {
        console.log("失败调用验证share");
      })

  },
  noGetPhoneNumberHandler: function () {
    this.setData({
      tabs2Flag: true,
      tabs1Flag: false,
      testDriveFlag: true,
      tabs6Flag: false,
      scrolly: false,

    })
    //this.onLoad({options:""});
  },
  closePop() {

    this.setData({
      popShow: false,
      isSelectivible: false
    })
    /**探索锐歌留资_选择城市_关闭 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", 
    { shareChannel: this.data.minePath, type: '22' }, function (res) {
      console.log("成功调用验证share：", res);
    }, function () {
      console.log("失败调用验证share");
    })
  },
  privacyChoose: function (e) {
    this.setData({
      isPrivacyiible: !this.data.isPrivacyiible
    })
    console.log("打印隐私协议：", this.data.isPrivacyiible);
  },
  openPop: function (e) {
    this.setData({
      popShow: true
    })
  /**探索锐歌留资_隐私政策 埋点 */
  axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", 
  { shareChannel: this.data.minePath, type: '23' }, function (res) {
    console.log("成功调用验证share：", res);
  }, function () {
    console.log("失败调用验证share");
  })
  },
  onReady() {

  },
  onLoad: function (options) {
      var that = this;
      let _this = this
      this.setData({
        img1height: app.data.img1height,
        img2height: app.data.img2height,
        img3height: app.data.img3height,
        img4height: app.data.img4height,
        img5height: app.data.img5height,
        img6height: app.data.img6height,
        img7height: app.data.img7height,
        img8height: app.data.img8height,
        img9height: app.data.img9height,
      })
     if(this.data.img1height==0){
        setTimeout(function(){
         /**1 */
         tt.getImageInfo({
          src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_1.jpg", // 也可以为本地路径，相对路径或临时文件路径
          success: (res) => {
            let { width, height } = res;
            let imgc = height / width;
            _this.setData({
              img1height: _this.data.windowWidth * imgc
          })
          },
        });
    /**2*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_2.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img2height: _this.data.windowWidth * imgc
      })
      },
    });
    /**3*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_3.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
            img3height: _this.data.windowWidth * imgc
        })
      },
    });
    /**4*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_4.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img4height: _this.data.windowWidth * imgc
      })
      },
    });
    /**5*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_5.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img5height: _this.data.windowWidth * imgc
      })
      },
    });
    /**6*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_6.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img6height: _this.data.windowWidth * imgc
      })
      },
    });
    /**7*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_7.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img7height: _this.data.windowWidth * imgc
      })
      },
    });
    /**8*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_8.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img8height: _this.data.windowWidth * imgc
      })
      },
    });
    /**9*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_9.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img9height: _this.data.windowWidth * imgc
      })
      },
    });
    /**10*/
    tt.getImageInfo({
      src: "https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/rights_10.jpg", // 也可以为本地路径，相对路径或临时文件路径
      success: (res) => {

        let { width, height } = res;
        let imgc = height / width;
        _this.setData({
          img10height: _this.data.windowWidth * imgc
      })
      },
    });
},200)

}
  
  console.log(this.data.showflag)
  
  
    tt.login({
      force: false,
      success: ({ anonymousCode, code, isLogin }) => {

        this.setData({
          localCode: code,
          localAnonyCode: anonymousCode,
        
        })
      },

      fail: (res) => {
        console.log("shbai1", res);
      },
    });
  
    console.log("打印参数：", this.data.minePath);
    // 调用监听器，监听数据变化
    app.watch(this, {
      cityId: function (newVal) {
        tt.setStorage({
          key: "cityId",
          data: newVal,
        })
        if (newVal != "") {
          this.setData({
            isCitiyivible: false,
            inpuCitlyClass: "rgb(153 153 153 / 23%);"
          })
        }
      },
    })
    if(this.data.minePath==""){
      tt.getStorage({
        key: "mineUrl",
        success(res) {
          console.log(333333333, res);
            that.setData({
              minePath:  res.data
            })
        },
        fail(res) {
          that.setData({
            minePath: "pages/index/index"
          })
         // console.log("getStorage调用失败");
          console.log("getStorage调用失败",that.data.minePath);
      
        },
      });
    }
    
  
      /**探索限时权益tab页面 埋点 */
      setTimeout(() => {
        axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", 
        { shareChannel: _this.data.minePath, type: '29' }, function (res) {
          _this.setData({
            showflag:true
         
        })
          console.log("成功调用验证share：", res);
        }, function () {
          console.log("失败调用验证share");
        })
      }, 100);
   

  },
 
  onShareAppMessage: function (e) {
    return {
      path: this.data.minePath,
      success() {
        console.log('onshare转发发布器已调起，并不意味着用户转发成功');

      },
      fail() {
        console.log('onshare转发发布器调起失败');
      }
    }
  },
  //一键试驾
  getPhoneNumberHandler: function (e) {
    let that = this;
    that.setData({
      testDriveFlag: true,
      name: "",
      phone: "",
      cityId: "",
      cityArrName: [],
      canLocation: false,
      allCities: [],
      inputClass: "#999999",
      isPhoneivible: false,
      scrolly: false,
      tabs6Flag:false


    })
    that.onLoad({ options: "" });
    console.log("打印获取手机号信息：", e.detail);
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      console.log("打印phone前参数,encryptedData:", e.detail.encryptedData);
      console.log(";iv:", e.detail.iv);
      console.log(";code:", that.data.localCode);
      console.log(";annoyCode:", that.data.localAnonyCode);
      axios.postData2({ encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: that.data.localCode, anonymousCode: that.data.localAnonyCode }, function (res) {
        console.log('调用数据：', res);
        if (res.resultCode == "1070") {
          that.setData({
            subText: "请勿频繁授权"
          })
          tt.showToast({
            title: that.data.subText,
            icon: 'none'
          });
        } else {
          that.data.phone = res.data.purePhoneNumber
          that.setData({
            phone: that.data.phone,
            testDriveFlag: true,
            tabs2Flag: true,
            oneButtonflag: false,
            scrolly: false,
            tabs6Flag: false


          })
          that.getlocations();
          console.log("phone：", that.data.phone);
        }


      }, function (res) {
        console.log("校验用户信息失败：", res);
      })
    } else if (e.detail.errMsg == "fail bad parameter") {
      this.setData({
        subText: "获取用户信息超时，请重新点击按钮"
      })
      tt.showToast({
        title: this.data.subText,
        icon: 'none'
      });
      tt.login({
        force: false,
        success: ({ anonymousCode, code, isLogin }) => {
          this.setData({
            localCode: code,
            localAnonyCode: anonymousCode
          })
        },
        fail: (res) => {

        },
      })
    } else if (e.detail.errMsg == "no phone number") {
      this.setData({
        subText: "您未绑定手机号"
      })
      tt.showToast({
        title: this.data.subText,
        icon: 'none'
      });
    } else if (e.detail.errNo == "10200") {
      this.setData({
        tabs2Flag: false,
        testDriveFlag: true,
        name: "",
        phone: "",
        cityId: "",
        cityArrName: [],
        canLocation: false,
        allCities: [],
        scrolly: false,

      })
      this.onLoad({ options: "" });
    }
      /**探索锐歌授权获取手机号 埋点 */
      axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '20' }, function (res) {
        console.log("成功调用验证share：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  getlocations() {

    var that = this;
    tt.getLocation({
      success(res) {
        console.log("微信信息", res);

        tt.checkSession({
          success() {
            console.log(`session 未过期`);
            tt.getLocation({ complete: that.completeCity1 })

          },
          fail() {
            console.log(`session 已过期，需要重新登录`);
            tt.login({
              success: (res) => {
                console.log("登录成功", res);
                tt.getLocation({ complete: that.completeCity1 })
              },
              fail: (err) => {
                console.log("登录失败", err);
              },
            });
          },
        })
      },
      fail(res) {
        console.log("getLocation调用失败", res);
      },
    });

  },
  completeCity1: function (e) {
    console.log("打印授权结果:", e);
    if (e.errMsg == "getLocation:ok" && this.data.cityArrName.length == 0) {
      var mineCity = []
      mineCity.push(e.city)
      console.log("城市-1", this.data.cityArrName)
      console.log("城市-2", mineCity)
      this.data.cityArrName.push(mineCity);
      this.setData({
        cityArrName: this.data.cityArrName
      })
    } else if (e.errMsg == "getLocation:ok" && this.data.canLocation) {
      var mineCity = []
      var mineCity2 = []
      mineCity2.push(e.city)
      mineCity.push(mineCity2)
      this.setData({
        cityArrName: mineCity,
        canLocation: false
      })
    }
    console.log("打印cityArrName：", this.data.cityArrName);
    axios.postData("/cadinea/api/app/public/allCity/info", { type: '2' }, this.success, this.fail)

  },
  success: function (res) {
    this.setData({
      allCities: res.data
    });
    if (this.data.cityArrName.length == 1) {
      var nowCityName = this.data.cityArrName[0][0]
      for (let i of this.data.allCities) {
        if (i.cityName.substring(0, 2) == nowCityName || i.cityName == nowCityName || i.cityName.substring(0, 3) == nowCityName) {
          this.setData({
            cityId: i.id
          })
          return
        }
      }
      if (!this.data.cityId) {
        for (let j of this.data.allCities) {
          for (let k of j.cities) {
            if (k.cityName == nowCityName.substring(0, 2) || i.cityName == nowCityName) {
              this.setData({
                cityId: k.id
              })
              return;
            }
          }
        }
      }
    }
    console.log("打印成功cities：", this.data.allCities, ";打印res：", res);
  },
  tab2Close() {
    this.setData({
      tabs2Flag: false,
      testDriveFlag: false,
      tabs1Flag: false,
      tabs6Flag: false,
      isPrivacyiible: false,
      scrolly: true,

    });

  },
  tab6Close() {
    this.setData({
      tabs2Flag: true,
      testDriveFlag: true,
      tabs1Flag: false,
      tabs6Flag: false,
      isPrivacyiible: false,
      tabs3Flag: false,
      scrolly: false,

    });
    this.getlocations();
      /**探索锐歌授权获取手机号_关闭 埋点 */
      axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '19' }, function (res) {
        console.log("成功调用验证share：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  showText: function (e) {

    var that = this;
    this.setData({
      toastShow: false
    })
    var endTime
    clearTimeout(endTime);
    endTime = setTimeout(function () {
      that.setData({
        toastShow: true
      })
    }, 1500)
  },
  formSubmit: function (e) {
    let _this =  this;
    if (this.data.isSubmitivible) {
      this.setData({
        isSubmitivible: false
      })
      if (!this.data.cityId) {
        this.setData({
          subText: "请选择城市"
        })
        this.showText();
      }
      console.log("提交打印:", this.data.isPrivacyiible);

      if (this.data.isPrivacyiible) {
        // if(this.data.phone.length>11 || this.data.phone.length<=9){
        if (this.data.phone.length > 11 || this.data.phone.length < 11) {
          this.setData({
            isPhoneivible: true,
            inputClass: "#d80000"
          })
        } else {
          this.setData({
            isPhoneivible: false
          })
        }

        if (!this.data.isPhoneivible && this.data.cityId) {

          if (this.data.cityId == '110000' || this.data.cityId == '310000' || this.data.cityId == '500000' || this.data.cityId == '120000') {
            console.log("op-1")
            var prams = {
              realname: "抖音小程序留资用户",
              mobile: this.data.phone,
              gender: this.data.sexivible,
              provinceid: this.data.cityId,
              type: 'dy',
              utmsource: this.data.minePath
            }
          } else {
            console.log("op-2")
            var prams = {
              realname: "抖音小程序留资用户",
              mobile: this.data.phone,
              gender: this.data.sexivible,
              cityid: this.data.cityId,
              type: 'dy',
              utmsource: this.data.minePath
            }
          }
          console.log("提交前的参数--1：", prams);
          this.setData({
            isSubmitivible: true
          })

          console.log("interval", this.data.interval)
          if (this.data.interval) {
            this.setData({
              interval: false
            })
            setTimeout(() => {
              this.setData({ interval: true })
            }, 1000 * 60)
            axios.postData("/cadinea/api/v1/public/leads/cadillac/fromweb", prams, this.sucForm, this.fail)

            // axios.postData3("/cadinea/api/v1/public/leads/cadillac/fromweb",prams,this.sucForm,this.fail)
          } else {
            
            this.setData({
             tabs8Flag: true,
            
           });
           setTimeout(function(){
             _this.setData({
               tabs8Flag: false,
              
             });
           },3000)
          }
        }
        if (this.data.cityId == "") {
          this.setData({
            isCitiyivible: true,
            inpuCitlyClass: "#d80000"
          })
        }
      } else if (!this.data.isPrivacyiible) {
        console.log("没勾选,值为：", this.data.isPrivacyiible);
        this.setData({
          subText: "请勾选《用户隐私协议》"
        })
        tt.showToast({
          title: this.data.subText,
          icon: 'none'
        });
      }
      this.setData({
        isSubmitivible: true
      })
    }
  },
  sucForm: function (res) {
    let _this = this;
    console.log("打印提交消息-111：", res);
    if (res.statusCode == '200') {
      this.setData({
        subText: "预约成功,专属顾问将尽快联系您",
        name: "",
        phone: "",
        cityArrName: [],
        interval: false
      })
      tt.showToast({
        title: this.data.subText,
        icon: 'none'
      });
      setTimeout(function () {
        _this.setData({
          tabs2Flag: false,
          tabs1Flag: false,
          testDriveFlag: false,
          tabs6Flag: false,
          scrolly: true,

        });
      }, 1000)

      axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '25' }, function (res) {
        console.log("成功调用验证share：", res);
      }, function () {
        console.log("失败调用验证share");
      })
    } else if (res.statusCode == '500') {
      this.setData({
        subText: "当前网络异常，请稍后重试"
      })

      tt.showToast({
        title: this.data.subText,
        icon: 'none'
      });
    }

    tt.setStorage({
      key: "phone",
      data: "",
    })

    tt.setStorage({
      key: "cityId",
      data: "",
    }),
      tt.setStorage({
        key: "cityArrName",
        data: "",
      })

  },
  handleCityFocus: function (e) {
    console.log("城市：", e)

    this.setData({
      canLocation: e.detail.canLocation
    })
    var that = this;
    tt.checkSession({
      success() {
        console.log(`session 未过期`);
        tt.getLocation({ complete: that.completeCity })
      },
      fail() {
        console.log(`session 已过期，需要重新登录`);
        tt.login({
          success: (res) => {
            // console.log("登录成功", res);
            tt.getLocation({ complete: that.completeCity })
          },
          fail: (err) => {
            console.log("登录失败", err);
          },
        });
      },
    })
    /**探索锐歌tab页面 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", 
    { shareChannel: this.data.minePath, type: '21' }, function (res) {
      console.log("成功调用验证share：", res);
    }, function () {
      console.log("失败调用验证share");
    })


  },
  completeCity: function (e) {

    console.log("打印授权结果:", e);
    if (e.errMsg == "getLocation:ok" && this.data.cityArrName.length == 0) {
      var mineCity = []
      mineCity.push(e.city)
      console.log("城市-1", this.data.cityArrName)
      console.log("城市-2", mineCity)
      this.data.cityArrName.push(mineCity);
      this.setData({
        cityArrName: this.data.cityArrName
      })
    } else if (e.errMsg == "getLocation:ok" && this.data.canLocation) {
      var mineCity = []
      var mineCity2 = []
      mineCity2.push(e.city)
      mineCity.push(mineCity2)
      this.setData({
        cityArrName: mineCity,
        canLocation: false
      })
    }
    console.log("打印cityArrName：", this.data.cityArrName);
    axios.postData("/cadinea/api/app/public/allCity/info", { type: '2' }, this.success, this.fail)
    this.setData({
      isSelectivible: true
    })
  },
  onCitySelect: function (e) {

    console.log('城市选择11', e);

    this.setData({
      cityArr: e.detail.city,
      cityArrName: e.detail.cityCont
    })
    console.log("打印拿到的信息：", this.data.cityArrName);
    this.setData({
      cityId: e.detail.id
    })
    this.closePop()
  },
  bindblurPhone(e){
    this.data.phone = e.detail.value
    if(this.data.phone.length > 11 || this.data.phone.length < 11){
      if(this.data.phone.length>9){
        this.setData({
          isPhoneivible: true,
           inputClass:"#d80000"
         })
      }
    }else{
      this.setData({
        isPhoneivible: false,
        inputClass:"rgb(153 153 153 / 23%);"
      })
    }
    this.setData({
      phone: this.data.phone
    })  
   
    if(this.data.phone.length > 11 || this.data.phone.length < 11){
      if(this.data.phone.length>9){
        this.setData({
          isPhoneivible: true,
           inputClass:"#d80000"
         })
      }
   
    }else{
      this.setData({
        isPhoneivible: false,
        inputClass:"rgb(153 153 153 / 23%);"
      })
    }
    this.setData({
      phone: this.data.phone
    })
    if(e.detail.value==""){
     this.setData({
       isPhoneivible: false,
       inputClass:"rgb(153 153 153 / 23%);"
     })
   }
   
   },
   bindfocus(e){
 
    this.setData({
    isPhoneivible: false,
    inputClass:"#2C28E8"
 })


},
})
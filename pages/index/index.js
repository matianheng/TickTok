var axios = require("../../utils/request.js")
const order = ["demo1", "demo2", "demo3", "demo4", "demo5", "demo6", "demo7"];
const app = getApp()
console.log(app);

Page({

  data: {
    items: [
      {
        value: "dome1",
        witle: "witle2",
      },
      {
        value: "dome2",
        witle: "witle1",

      },
      {
        value: "dome3",
        witle: "witle1",
      },
      {
        value: "dome4",
        witle: "witle1",
      },
      {
        value: "dome5",
        witle: "witle1",
      },
      {
        value: "dome6",
        witle: "witle1",
      },
      {
        value: "dome7",
        witle: "witle1",
      },
    ],
    minePath: '',
    mineUrl: 'pages/index/index',
    smallboxivible: true,
    timer: null,
    scrollTop: 0,
    toView: "demo1",
    toView2: "demo3",
    windowHeights: 0,
    windowWidth: 0,
    videoheight: 0,
    popShow: false,
    isPrivacyiible: false,
    name: "",
    phone: "",
    cityId: "",
    localAnonyCode: '',
    localCode: "",
    tabs2Flag: true,
    tabs1Flag: false,
    onekeyFlag: true,
    testDriveFlag: false,
    isSubmitivible: true,
    cityArrName: [],
    canLocation: false,
    allCities: [],
    isSelectivible: false,
    toastShow: true,
    interval: true,
    timeouts: null,
    inputClass: "rgb(153 153 153 / 23%);",
    inpuCitlyClass: "rgb(153 153 153 / 23%);",
    timeoutThroFlag: null,
    tabs5Flag: false,
    timeoutThroFlag3: null,
    autoplayflag: false,
    oneButtonflag: true,
    tabs6Flag: false,
    scrolly: true,
    scrollTop2: 0,
    tabs8Flag: false,
  },
  tabs3bindtap() {
    this.setData({
      tabs6Flag: true,
      tabs2Flag: true,
    });
    /**探索锐歌一键试驾 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '16' }, function (res) {
      console.log("成功调用验证share歌一键试驾：", res);
    }, function () {
      console.log("失败调用验证share");
    })
  },
  bindtap5(e) {
    let _this = this;
    _this.setData({
      scrollTop: this.data.scrollTop2,
    });
    console.log(this.data.scrollTop, e);
    setTimeout(function () {
      _this.setData({
        scrollTop: 4850,
      });
    }, 100)
    /**探索锐歌下载App 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '15' }, function (res) {
      console.log("成功调用验证share下载App：", res);
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
    tt.setStorage({
      key: "cityArrName",
      data: this.data.cityArrName,
    })
    axios.postData("/cadinea/api/app/public/allCity/info", { type: '2' }, this.success, this.fail)

  },
  closePop() {
    this.setData({
      popShow: false,
      isSelectivible: false
    })
    /**探索锐歌留资_选择城市_关闭 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '22' }, function (res) {
        console.log("成功调用验证share留资_选择城市_关闭：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  closePop2() {

    this.setData({
      popShow: false,
      isSelectivible: false
    })
    /**探索锐歌留资_隐私政策_关闭 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '24' }, function (res) {
        console.log("成功调用验证share留资_隐私政策_关闭：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  //   handleInputPhone: function (e) {
  //     this.setData({
  //       isPhoneivible: false,
  //        inputClass:"#2C28E8"
  //  })
  //   },
  bindfocus(e) {

    this.setData({
      isPhoneivible: false,
      inputClass: "#2C28E8"
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
    tt.setStorage({
      key: "cityArrName",
      data: this.data.cityArrName,
    })
    axios.postData("/cadinea/api/app/public/allCity/info", { type: '2' }, this.success, this.fail)
    this.setData({
      isSelectivible: true
    })
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
    /**探索锐歌选择城市 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '21' }, function (res) {
        console.log("成功调用验证share锐歌tab页面：", res);
      }, function () {
        console.log("失败调用验证share");
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
    tt.setStorage({
      key: "cityArrName",
      data: this.data.cityArrName,
    })
    this.closePop()
  },
  openAwemeUserProfile() {
    tt.openAwemeUserProfile({
      success: (res) => {
        console.log("跳转首页", res);
      },
      fail: (res) => {
        console.log("失败", res);
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    console.log("query---111", options)
    if (this.data.minePath == "") {
      tt.getStorage({
        key: "mineUrl",
        success(res) {
          console.log(333333333, res);
          that.setData({
            minePath: res.data
          })
        },
        fail(res) {
          console.log("getStorage调用失败");
        },
      });
    }
    console.log("query---2222", this.data.minePath)
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
    tt.setStorage({
      key: "oneButtonflag",
      data: true,
    })
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

    tt.getSystemInfo({
      success(res) {
        that.setData({
          windowHeights: res.windowHeight,
          windowWidth: res.windowWidth
        });
        if (that.data.windowWidth) {
          that.setData({
            videoheight: res.windowWidth / 1.7,

          });
        }
        console.log("getSystemInfo 调用成功", that.data.windowWidth);
        console.log("getSystemInfo 调用成功", that.data.videoheight);

      },
      fail(res) {
        console.log("getSystemInfo 调用失败", res);
      },
    });
    //that.setTabBarStyle();
    console.log(that);
    // 调用监听器，监听数据变化
    app.watch(this, {
      oneButtonflag: function (newVal) {
        tt.setStorage({
          key: "oneButtonflag",
          data: newVal,
        })
      },
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
      allCities: function (newVal) {
        tt.setStorage({
          key: "allCities",
          data: newVal,
        })

      }
    })
    /**探索锐歌tab页面 埋点 */
    setTimeout(function () {
      axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
        { shareChannel: that.data.minePath, type: '11' }, function (res) {
          console.log("成功调用验证sharetab页面：", res);

        }, function () {
          console.log("失败调用验证share");
        })
    }, 100)


  },
 
  privacyChoose: function (e) {
    this.setData({
      isPrivacyiible: !this.data.isPrivacyiible
    })
    console.log("打印隐私协议：", this.data.isPrivacyiible);
  },
  upper(e) {
    this.setData({
      scrollTop: 0
    });
  },
  lower(e) {
    // tt.showToast({
    //   title: '到最底部了',
    //   icon: 'none'
    // });
  },
  tap(e) {

    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i < order.length - 1 ? i + 1 : 0],
        });
        break;
      }
    }
  },
  compleDate2(e) {
    let _this = this;

    clearTimeout(this.data.timeoutThroFlag3);
    this.data.timeoutThroFlag3 = setTimeout(function () {
      _this.setData({
        scrollTop2: e.detail.scrollTop
      })
      console.log(_this.data.scrollTop2);
    }, 100)


  },
  compleDate3(e) {
    let _this = this;
    let timeout = this.data.timeoutThroFlag;

    if (!timeout) {
      timeout = setTimeout(() => {
        this.compleDate(e);

        this.setData({ timeoutThroFlag: null });
      }, 300)
    }
  },
  async scroll(e) {
    let _this = this;
    await this.compleDate3(e);
    await this.compleDate2(e);
 
    if (!this.data.testDriveFlag) {
      _this.debounces(e);
    }
  },
  onReady: function () {

  },
  //节流 
  compleDate(e) {
    let _this = this;
    let dome = "dome1";
    let heightc = 600;
    let tabs5Flag = _this.data.tabs5Flag;
    if (e.detail.scrollTop == 0) {
      dome = "dome1"
      tabs5Flag = false;
    }
    else if (e.detail.scrollTop <= 550 * 2 && e.detail.scrollTop >= 550) {
      dome = "dome2"
      tabs5Flag = true;
    } else if (e.detail.scrollTop <= 500 + 700 + 800 && e.detail.scrollTop >= 500 + 700) {
      dome = "dome3"
      tabs5Flag = true;
    }
    else if (e.detail.scrollTop <= 500 + 700 + 800 + 800 && e.detail.scrollTop >= 500 + 700 + 800) {
      dome = "dome4"
      tabs5Flag = true;
    }
    else if (e.detail.scrollTop <= 500 + 700 + 800 + 800 + 800 && e.detail.scrollTop >= 500 + 700 + 800 + 800) {
      dome = "dome5"
      tabs5Flag = true;
    }
    else if (e.detail.scrollTop <= 500 + 700 + 800 + 800 + 800 + 800 - 100 && e.detail.scrollTop >= 500 + 700 + 800 + 800 + 800) {
      dome = "dome6"
      tabs5Flag = true;
      if (!_this.data.autoplayflag) {
        _this.setData({
          autoplayflag: true

        });
      }
    }
    else if (e.detail.scrollTop >= 500 + 700 + 800 + 800 + 800 + 800) {
      dome = "dome7"
      tabs5Flag = true;
      if (!_this.data.autoplayflag) {
        _this.setData({
          autoplayflag: true
        });
      }
    }
    const items = this.data.items;
    for (let i = 0; i < items.length; i++) {
      items[i].witle = "witle1";
      if (items[i].value == dome) {
        items[i].witle = "witle2";
      }
      // }
    }
    this.setData({
      items,
      tabs5Flag,
    });
  },
  tab2Close() {
    this.setData({
      tabs2Flag: true,
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
      console.log("成功调用验证share授权获取手机号_关闭：", res);
    }, function () {
      console.log("失败调用验证share");
    })
  },
  checkboxChange(e) {
    const items = this.data.items,
      values = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].witle = "witle1";
      if (items[i].value == values) {
        items[i].witle = "witle2";
        break;
      }
      // }
    }
    this.setData({
      items,
    });
  },
  debounces(e) {
    let _this = this;
    clearTimeout(_this.data.timeouts);
    _this.data.timeouts = setTimeout(function () {
      // // console.log(e);
      // if (e.detail.scrollTop > 0) {
      //   if (_this.data.testDriveFlag) {
      //     setTimeout(function () {
      //       // _this.setData({
      //       //   tabs2Flag: false,
      //       //   testDriveFlag: false,
      //       //   tabs1Flag: true,
      //       // });
      //     }, 10)

      //   }
      //   else if (_this.data.tabs2Flag && !_this.data.testDriveFlag) {
      //     // setTimeout(function () {
      //     //   _this.setData({
      //     //     tabs2Flag: false,
      //     //     testDriveFlag: false,
      //     //     tabs1Flag: true,
      //     //   });
      //     // }, 10)

      //   }
      // }

    }, 10)
  },
  tabs3Close() {

    this.setData({
      tabs2Flag: false,
      tabs1Flag: true,
      testDriveFlag: false,
      isPrivacyiible: false,
      scrolly: true,

    });
    /**探索锐歌下方_一键试驾_关闭 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '17' }, function (res) {
      console.log("成功调用验证share一键试驾_关闭：", res);
    }, function () {
      console.log("失败调用验证share");
    })
  },

  bindTabs1() {

    if (!this.data.phone && this.data.oneButtonflag) {
      this.setData({
        tabs2Flag: true,
        tabs1Flag: false,
        // testDriveFlag: true,
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
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '14' }, function (res) {
        console.log("成功调用验证share上方_一键试驾：", res);
      }, function () {
        console.log("失败调用验证share");
      })

  },
  makePhoneCall() {
    this.setData({
      tabs2Flag: false,
      tabs1Flag: true,
    });
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
      console.log("成功调用验证share_咨询专线：", res);
    }, function () {
      console.log("失败调用验证share");
    })
  },
  scrollToTop(e) {
    this.setData({
      scrollTop: 0,
    });
  },
  onShow: function (options) {
    console.log("onShow--监听", options)
    this.setData({
      tabs2Flag: true,
      tabs1Flag: false,
      testDriveFlag: false,
      tabs6Flag: false,
      scrolly: true,

    });
    this.data.timer = setInterval(() => {
      // tt.navigateTo({
      //   url: `../loginPage/loginPage?channel=`+this.data.mineUrl
      // })
      //this.tap();
    }, 3000)
    console.log("打印参数-first：", this.data.minePath);
  },
  onHide: function (options) {
    console.log("onHide", "关闭")
    clearTimeout(this.data.timer)
  },
  // gotoLogin: function () {
  //   // tt.navigateTo({
  //   //   url: `../loginPage/loginPage?channel=` + this.data.mineUrl
  //   // })
  //   console.log("打印参数：", this.data.minePath);
  //   axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.minePath, type: '2' }, function (res) {
  //     console.log("成功调用验证share：", res);
  //   }, function () {
  //     console.log("失败调用验证share");
  //   })
  //   clearTimeout(this.data.timer)
  // },

  //测试渠道方法
  gotoNextPage: function () {
    let url = "";
    tt.getStorage({
      key: "mineUrl",
      success(res) {
        url = res.data
        console.log(url);
        if (url == "pages/index/index") {//2
          tt.redirectTo({
            url: '/pages/indexMny/indexMny'
          });
        }
        else if (url == "pages/indexMny/indexMny") {//2
          tt.redirectTo({
            url: '/pages/indexQssy/indexQssy'
          });
        } else if (url == "pages/indexQssy/indexQssy") {//3
          tt.redirectTo({
            url: '/pages/indexWzm/indexWzm'
          });
        } else if (url == "pages/indexWzm/indexWzm") {//4
          tt.redirectTo({
            url: '/pages/indexMdmd/indexMdmd'
          });
        } else if (url == "pages/indexMdmd/indexMdmd") {//5
          tt.redirectTo({
            url: '/pages/indexMrLr/indexMrLr'
          });
        } else if (url == "pages/indexMrLr/indexMrLr") {//6
          tt.redirectTo({
            url: '/pages/indexFllw/indexFllw'
          });
        } else if (url == "pages/indexFllw/indexFllw") {//7
          tt.redirectTo({
            url: '/pages/indexDbsc/indexDbsc'
          });
        } else if (url == "pages/indexDbsc/indexDbsc") {//8
          tt.redirectTo({
            url: '/pages/indexDwjgyqx/indexDwjgyqx'
          });
        } else if (url == "pages/indexDwjgyqx/indexDwjgyqx") {//9
          tt.redirectTo({
            url: '/pages/indexBqymb/indexBqymb'
          });
        } else if (url == "pages/indexBqymb/indexBqymb") {//10
          tt.redirectTo({
            url: '/pages/indexXwsc/indexXwsc'
          });
        } else if (url == "pages/indexXwsc/indexXwsc") {//11
          tt.redirectTo({
            url: '/pages/indexWgff/indexWgff'
          });
        } else if (url == "pages/indexWgff/indexWgff") {//12
          tt.redirectTo({
            url: '/pages/indexLkdy/indexLkdy'
          });
        } else if (url == "pages/indexLkdy/indexLkdy") {//13
          tt.redirectTo({
            url: '/pages/indexJhsc/indexJhsc'
          });
        } else if (url == "pages/indexJhsc/indexJhsc") {//14
          tt.redirectTo({
            url: '/pages/indexCtxh/indexCtxh'
          });
        } else if (url == "pages/indexCtxh/indexCtxh") {//15
          tt.redirectTo({
            url: '/pages/indexXcdb/indexXcdb'
          });
        } else if (url == "pages/indexXcdb/indexXcdb") {//16
          tt.redirectTo({
            url: '/pages/indexCgsc/indexCgsc'
          });
        } else if (url == "pages/indexCgsc/indexCgsc") {//17
          tt.redirectTo({
            url: '/pages/indexZncj/indexZncj'
          });
        } else if (url == "pages/indexZncj/indexZncj") {//18
          tt.redirectTo({
            url: '/pages/indexZxh/indexZxh'
          });
        } else if (url == "pages/indexZxh/indexZxh") {//19
          tt.redirectTo({
            url: '/pages/indexBkA/indexBkA'
          });
        } else if (url == "pages/indexBkA/indexBkA") {//20
          tt.redirectTo({
            url: '/pages/indexBkB/indexBkB'
          });

        } else if (url == "pages/indexBkB/indexBkB") {//21
          tt.redirectTo({
            url: '/pages/indexBkC/indexBkC'
          });

        } else if (url == "pages/indexBkC/indexBkC") {//22
          tt.redirectTo({
            url: '/pages/indexBkD/indexBkD'
          });

        } else if (url == "pages/indexBkC/indexBkC") {//23
          tt.redirectTo({
            url: '/pages/indexBkD/indexBkD'
          });

        } else if (url == "pages/indexBkD/indexBkD") {//24
          tt.redirectTo({
            url: '/pages/indexBkE/indexBkE'
          });

        } else if (url == "pages/indexBkE/indexBkE") {//25
          tt.redirectTo({
            url: '/pages/indexBkF/indexBkF'
          });

        } else if (url == "pages/indexBkF/indexBkF") {//26
          tt.redirectTo({
            url: '/pages/indexBkG/indexBkG'
          });

        } else if (url == "pages/indexBkG/indexBkG") {//27
          tt.redirectTo({
            url: '/pages/indexBkH/indexBkH'
          });

        } else if (url == "pages/indexBkH/indexBkH") {//28
          tt.redirectTo({
            url: '/pages/indexBkI/indexBkI'
          });

        } else if (url == "pages/indexBkI/indexBkI") {//29
          tt.redirectTo({
            url: '/pages/indexBkJ/indexBkJ'
          });

        } else if (url == "pages/indexBkJ/indexBkJ") {//30
          tt.redirectTo({
            url: '/pages/indexBkK/indexBkK'
          });

        } else if (url == "pages/indexBkK/indexBkK") {//31
          tt.redirectTo({
            url: '/pages/indexBkL/indexBkL'
          });

        } else {
          tt.redirectTo({
            url: '/pages/indexBkL/indexBkL'
          });
        }

        // if(url=="pages/indexMars/indexMars"){//2
        //   tt.redirectTo({
        //     url: '/pages/indexDygfzh/indexDygfzh'
        //   });
        // }else if(url=="pages/indexDygfzh/indexDygfzh"){//3
        //   tt.redirectTo({
        //     url: '/pages/indexHgsc/indexHgsc'
        //   });
        // }else if(url=="pages/indexHgsc/indexHgsc"){//4
        //   tt.redirectTo({
        //     url: '/pages/indexHyxD/indexHyxD'
        //   });
        // }else if(url=="pages/indexHyxD/indexHyxD"){//5
        //   tt.redirectTo({
        //     url: '/pages/indexYttd/indexYttd'
        //   });
        // }else if(url=="pages/indexYttd/indexYttd"){//6
        //   tt.redirectTo({
        //     url: '/pages/indexTtxay/indexTtxay'
        //   });
        // }else if(url=="pages/indexTtxay/indexTtxay"){//7
        //   tt.redirectTo({
        //     url: '/pages/indexScdaf/indexScdaf'
        //   });
        // }else if(url=="pages/indexScdaf/indexScdaf"){//8
        //   tt.redirectTo({
        //     url: '/pages/indexTzw/indexTzw'
        //   });
        // }else if(url=="pages/indexTzw/indexTzw"){//9
        //   tt.redirectTo({
        //     url: '/pages/indexDn/indexDn'
        //   });
        // }else if(url=="pages/indexDn/indexDn"){//10
        //   tt.redirectTo({
        //     url: '/pages/indexFy/indexFy'
        //   });
        // }else if(url=="pages/indexFy/indexFy"){//11
        //   tt.redirectTo({
        //     url: '/pages/indexMnds/indexMnds'
        //   });
        // }else if(url=="pages/indexMnds/indexMnds"){//12
        //   tt.redirectTo({
        //     url: '/pages/indexXmzyymj/indexXmzyymj'
        //   });
        // }else if(url=="pages/indexXmzyymj/indexXmzyymj"){//13
        //   tt.redirectTo({
        //     url: '/pages/indexNxy/indexNxy'
        //   });
        // }else if(url=="pages/indexNxy/indexNxy"){//14
        //   tt.redirectTo({
        //     url: '/pages/indexBjsc/indexBjsc'
        //   });
        // }else if(url=="pages/indexBjsc/indexBjsc"){//15
        //   tt.redirectTo({
        //     url: '/pages/indexHdt/indexHdt'
        //   });
        // }else if(url=="pages/indexHdt/indexHdt"){//16
        //   tt.redirectTo({
        //     url: '/pages/indexMsmt/indexMsmt'
        //   });
        // }else if(url=="pages/indexMsmt/indexMsmt"){//17
        //   tt.redirectTo({
        //     url: '/pages/indexWgff/indexWgff'
        //   });
        // }else if(url=="pages/indexWgff/indexWgff"){//18
        //   tt.redirectTo({
        //     url: '/pages/indexXy/indexXy'
        //   });
        // }else if(url=="pages/indexXy/indexXy"){//19
        //   tt.redirectTo({
        //     url: '/pages/indexYjt/indexYjt'
        //   });
        // }else if(url=="pages/indexYjt/indexYjt"){//19

        // }else{
        //   tt.redirectTo({
        //     url: '/pages/indexMars/indexMars'
        //   });
        // }
      },
      fail(res) {
        console.log("getStorage调用失败");
      },
    });



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

  switchTab(e) {
    console.log(e);
    let { index } = e.currentTarget.dataset;
    this.switchCard(index);
  },
  //视频播放
  bindplay(e) {
    console.log('视频开始播放了', e);
    /**探索锐歌_视频_播放 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '27' }, function (res) {
        console.log("成功调用验证share探索锐歌_视频_播放：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  bindended(e) {
    console.log("视频播放结束", e);
  },
  bindpause(e) {
    console.log('视频暂停了', e);
    /**探索锐歌探索锐歌_视频_暂停 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '26' }, function (res) {
        console.log("成功调用验证share探索锐歌探索锐歌_视频_暂停：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  bindfullscreenchange() {
    /**探索锐歌_视频_全屏 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '28' }, function (res) {
        console.log("成功调用验证share探索锐歌_视频_全屏：", res);
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
  openPop: function (e) {
    this.setData({
      popShow: true
    })
    /**探索锐歌留资_隐私政策 埋点 */
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '23' }, function (res) {
        console.log("成功调用验证share探索锐歌留资_隐私政策：", res);
      }, function () {
        console.log("失败调用验证share");
      })
  },
  noGetPhoneNumberHandler: function () {

    this.setData({
      tabs2Flag: true,
      testDriveFlag: true,
      name: "",
      // phone: "",
      // cityId: "",
      // cityArrName: [],
      // canLocation: false,
      // allCities: [],
      scrolly: false,

    })
    //this.onLoad({options:""});
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
      inputClass: "rgb(153 153 153 / 23%);",
      isPhoneivible: false,
      scrolly: false,
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
          })
          that.getlocations();
          tt.setStorage({
            key: "phone",
            data: that.data.phone,
          })
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
      });
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
      console.log("成功调用验证share探索锐歌授权获取手机号：", res);
    }, function () {
      console.log("失败调用验证share");
    })
  },
  //一键试驾
  getPhoneNumberHandler2: function (e) {
    let that = this;
    that.setData({
      testDriveFlag: true,
      name: "",
      phone: "",
      cityId: "",
      cityArrName: [],
      canLocation: false,
      allCities: [],
      inputClass: "rgb(153 153 153 / 23%);",
      isPhoneivible: false,
      scrolly: false,
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

          })
          that.getlocations();
          tt.setStorage({
            key: "phone",
            data: that.data.phone,
          })
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
      });
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
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",
      { shareChannel: this.data.minePath, type: '18' }, function (res) {
        console.log("成功调用验证share探索锐歌授权获取手机号：", res);
      }, function () {
        console.log("失败调用验证share");
      })

  },
  formSubmit: function (e) {
    let _this = this;
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
         //手机号码校验
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
        let url = "";
        if (!this.data.isPhoneivible && this.data.cityId) {
          tt.getStorage({
            key: "mineUrl",
            success(res) {
              console.log(333333333, res);
              url = res.data
            },
            fail(res) {
              console.log("getStorage调用失败");
            },
          });
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
            setTimeout(function () {
              _this.setData({
                tabs8Flag: false,

              });
            }, 3000)
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
        console.log("成功调用验证share探索锐歌留资_提交留资埋点：", res);
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
  },
  bindblurPhone(e) {

    this.data.phone = e.detail.value
    if (this.data.phone.length > 11 || this.data.phone.length < 11) {
      if (this.data.phone.length > 9) {
        this.setData({
          isPhoneivible: true,
          inputClass: "#d80000"
        })
      }

    } else {
      this.setData({
        isPhoneivible: false,
        inputClass: "rgb(153 153 153 / 23%);"
      })
    }
    this.setData({
      phone: this.data.phone
    })
    this.data.phone = e.detail.value
    if (this.data.phone.length > 11 || this.data.phone.length < 11) {
      if (this.data.phone.length > 9) {
        this.setData({
          isPhoneivible: true,
          inputClass: "#d80000"
        })
      }

    } else {
      this.setData({
        isPhoneivible: false,
        inputClass: "rgb(153 153 153 / 23%);"
      })
    }
    this.setData({
      phone: this.data.phone
    })
    if (e.detail.value == "") {
      this.setData({
        isPhoneivible: false,
        inputClass: "rgb(153 153 153 / 23%);"
      })
    }
  }



})

var axios = require("../../utils/request.js")
Component({
     // externalClasses: ['letter-class', 'item-class'],
     /**
      * 组件的属性列表
      */
     properties: {
          onekeyFlag: {
               type: Boolean,
               value: true,
               observer(newVal, oldVal) {
                    console.log("newVal", newVal);
                    console.log("oldVal", oldVal);
               }
          },
          isPrivacyiible: {
               type: Boolean,
               value: true,
               observer(newVal, oldVal) {
                    console.log("newVal", newVal);
                    console.log("oldVal", oldVal);
               }
          },
          cityArrName: {
               type: Array,
               value: [],
               observer(newVal, oldVal) {
                    console.log("newVal", newVal);
                    console.log("oldVal", oldVal);
               }
          },
          cityArr: {
               type: Array,
               value: [],
               observer(newVal, oldVal) {
                    console.log("newVal", newVal);
                    console.log("oldVal", oldVal);
               }
          },
          cityId: {
               type: String,
               value: '',
               observer(newVal, oldVal) {
                    console.log("newVal", newVal);
                    console.log("oldVal", oldVal);
               }
          }
     },

     /**
      * 组件的初始数据
      */
     data: {
          minePath: '',
          mineUrl: 'component/userOrderCard/userOrderCard',
          smallboxivible: true,
          timer: null,
          scrollTop: 0,
          toView: "demo1",
          windowHeights: 0,
          popShow: false,
          // isPrivacyiible: false,
          name: "",
          phone: "",
          cityId: "",
          localAnonyCode: '',
          localCode: "",
          tabs2Flag: true,
          tabs1Flag: false,
          // onekeyFlag: false,
          testDriveFlag: false,
          isSubmitivible: true,
          cityArrName: [],
          canLocation: false,
          allCities: [],
          isSelectivible: false,
          toastShow: true,
          interval: true,
     },
     attached: function () {
          this.onLoad();
     },

     /**
      * 组件的方法列表
      */
     methods: {
          openPop: function (e) {
               var detail = {
                    popShow: false
               }
               this.triggerEvent('openPop', detail);
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
                                   isPhoneivible: true
                              })
                         } else {
                              this.setData({
                                   isPhoneivible: false
                              })
                         }
                         // if(!this.data.name){
                         //   this.setData({
                         //     isNameivible: true
                         //   })
                         // }else {
                         //   this.setData({
                         //     isNameivible: false
                         //   })
                         // }
                         if (!this.data.isPhoneivible && this.data.cityId) {

                              if (this.data.cityId == '110000' || this.data.cityId == '310000' || this.data.cityId == '500000' || this.data.cityId == '120000') {
                                   console.log("op-1")
                                   var prams = {
                                        realname: this.data.name,
                                        mobile: this.data.phone,
                                        gender: this.data.sexivible,
                                        provinceid: this.data.cityId,
                                        type: 'dy',
                                        utmsource: this.data.channelQuery
                                   }
                              } else {
                                   console.log("op-2")
                                   var prams = {
                                        realname: this.data.name,
                                        mobile: this.data.phone,
                                        gender: this.data.sexivible,
                                        cityid: this.data.cityId,
                                        type: 'dy',
                                        utmsource: this.data.channelQuery
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
               console.log("打印提交消息-111：", res);
               if (res.statusCode == '200') {
                    this.setData({
                         subText: "提交成功",
                         name: "",
                         phone: "",
                         cityArrName: [],
                         interval: false
                    })
                    tt.showToast({
                         title: this.data.subText,
                         icon: 'none'
                    });
                    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.mineUrl, type: '1' }, function (res) {
                         console.log("成功调用验证share：", res);
                    }, function () {
                         console.log("失败调用验证share");
                    })
               } else if (res.statusCode == '500') {
                    this.setData({
                         subText: "系统异常"
                    })

                    tt.showToast({
                         title: this.data.subText,
                         icon: 'none'
                    });
               }

          },
          getlocations() {
               tt.getLocation({
                    success(res) {
                         console.log("微信信息", res);
                    },
                    fail(res) {
                         console.log("getLocation调用失败", res);
                    },
               });
          },

          handleCityFocus: function (e) {

               console.log("城市：", e)
               this.setData({
                    canLocation: e.detail.canLocation
               })
               this.triggerEvent('handleCityFocus', e);
          },

          getPhoneNumberHandler: function (e) {
               console.log("打印获取手机号信息：", e.detail);
               if (e.detail.errMsg == "getPhoneNumber:ok") {
                    let that = this;
                    console.log("打印phone前参数,encryptedData:", e.detail.encryptedData);
                    console.log(";iv:", e.detail.iv);
                    console.log(";code:", that.data.localCode);
                    console.log(";annoyCode:", that.data.localAnonyCode);
                    axios.postData2({ encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: that.data.localCode, anonymousCode: that.data.localAnonyCode }, function (res) {
                         console.log('调用数据：', res);
                         that.data.phone = res.data.purePhoneNumber
                         that.setData({
                              phone: that.data.phone
                         })
                         that.getlocations();
                         console.log("phone：", that.data.phone);

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
                         onekeyFlag: false,
                         testDriveFlag: true,
                    })
               }
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
               tt.login({
                    force: false,
                    success: ({ anonymousCode, code, isLogin }) => {

                         this.setData({
                              localCode: code,
                              localAnonyCode: anonymousCode,
                              //  minePath: options.channel
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
                         });
                         console.log("getSystemInfo 调用成功", that.data.windowHeights);
                    },
                    fail(res) {
                         console.log("getSystemInfo 调用失败", res);
                    },
               });
               that.setTabBarStyle();
               console.log(that);
          },
          setTabBarStyle() {
               // tt.hideTabBar({
               //   animation: true,
               // })

          },
          privacyChoose: function (e) {
               this.setData({
                    isPrivacyiible: !this.data.isPrivacyiible
               })
               console.log("打印隐私协议：", this.data.isPrivacyiible);
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
          },

          onShow: function (options) {
               console.log("onShow--监听", options)

               this.data.timer = setInterval(() => {
               }, 3000)
               console.log("打印参数-first：", this.data.mineUrl);
          },
          onHide: function (options) {
               console.log("onHide", "关闭")
               clearTimeout(this.data.timer)
          },
          gotoLogin: function () {
               tt.navigateTo({
                    url: `../loginPage/loginPage?channel=` + this.data.mineUrl
               })
               console.log("打印参数：", this.data.mineUrl);
               axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser", { shareChannel: this.data.mineUrl, type: '2' }, function (res) {
                    console.log("成功调用验证share：", res);
               }, function () {
                    console.log("失败调用验证share");
               })
               clearTimeout(this.data.timer)
          },

     },



})

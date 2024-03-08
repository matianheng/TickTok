const app = getApp()
var axios = require("../../utils/request.js")

Page({
  data: {
    minePath: '',
    background: [
      'https://cms-oss.sgmlink.com/5faa48b794f5f/617b9c2fecacded5dfcc70e4/3-1.png',
      'https://cms-oss.sgmlink.com/5faa48b794f5f/617b9c2fecacded5dfcc70e4/3-2.png',
      'https://cms-oss.sgmlink.com/5faa48b794f5f/617b9c2fecacded5dfcc70e4/3-3.png',
      'https://cms-oss.sgmlink.com/5faa48b794f5f/617b9c2fecacded5dfcc70e4/3-4.png',
      'https://cms-oss.sgmlink.com/5faa48b794f5f/617b9c2fecacded5dfcc70e4/3-5.png'],
    background2: [
      'https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/dy_store_pic2.png',
      'https://cms-oss.sgmlink.com/6142b893a990ded5af008249/6216fb037f82ded55e4216c9/dy_store_pic1.png'
    ],
    popShow: false,
    isScroll: true,
    name: "",
    phone: "",
    cityId: "",
    isSexivible: false,
    isNameivible: false,
    sexivible: 1,
    isPrivacyiible: false,
    isSelectivible: false,
    allCities: [],
    cityArr: "",
    cityArrName: [],
    toastShow: true,
    isSubmitivible: true,
    subText: "提交成功",
    localCode: '',
    localAnonyCode: '',
    canLocation: false,
    channelQuery: "",
    interval: true,
  },
  onLoad: function (query) {
    console.log("query---111",query)
    this.data.channelQuery = query.channel
    this.setData({
      minePath: query.channel
    })
    console.log("打印参数：",this.data.minePath);
    axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",{shareChannel: this.data.minePath,type: '0'},function(res){
      console.log("成功调用验证share：",res);
    },function () {
      console.log("失败调用验证share");
    })
    tt.login({
      force: false,
      success: ({ anonymousCode, code, isLogin }) => {
        this.setData({
          localCode: code,
          localAnonyCode: anonymousCode
        })
      },

      fail: (res) => {
        console.log("shbai1",res);
      },
    });
  },
  onShareAppMessage: function (e) {
    return {
      path: this.data.minePath,
      success () {
        console.log('onshare转发发布器已调起，并不意味着用户转发成功');
        
      },
      fail () {
        console.log('onshare转发发布器调起失败');
      }
    }
    
  },
  onCitySelect: function (e) {
      console.log('城市选择11', e);
      // var pages = getCurrentPages();
      // if (pages.length >= 2) {
      //     var prePage = pages[pages.length - 2];
      //     prePage.setData({
      //           location: e.detail.city
      //     });
      // };
      this.setData({
        cityArr: e.detail.city,
        cityArrName: e.detail.cityCont
      })
      console.log("打印拿到的信息：",this.data.cityArrName);
      this.setData({
        cityId: e.detail.id
      })
      this.closePop()
      // tt.navigateBack();
  },
  handleCityFocus: function (e){
    console.log("城市：",e)
    this.setData({
      canLocation: e.detail.canLocation
    })
    var that = this;
    tt.checkSession({
      success() {
        console.log(`session 未过期`);
        tt.getLocation({complete:that.completeCity})
      },
      fail() {
        console.log(`session 已过期，需要重新登录`);
        tt.login({
          success: (res) => {
            // console.log("登录成功", res);
            tt.getLocation({complete:that.completeCity})
          },
          fail: (err) => {
            console.log("登录失败", err);
          },
        });
      },
    })
  },
  success: function (res) {
    this.setData({
      allCities: res.data
    });
    if(this.data.cityArrName.length==1){
      var nowCityName = this.data.cityArrName[0][0]
      for(let i of this.data.allCities){
        if(i.cityName.substring(0,2)==nowCityName || i.cityName==nowCityName || i.cityName.substring(0,3)==nowCityName){
          this.setData({
            cityId: i.id
          })
          return
        }
      }
      if(!this.data.cityId){
        for(let j of this.data.allCities){
          for(let k of j.cities){
            if(k.cityName==nowCityName.substring(0,2) || i.cityName==nowCityName){
              this.setData({
                cityId: k.id
              })
              return;
            }
          }
        }
      }
    }
    console.log("打印成功cities：",this.data.allCities,";打印res：",res);
  },
  fail: function (res) {
    console.log("调用问题：",res);
    this.setData({
      subText: "网络超时"
    })
    this.closePop()
    this.showText()
    // if(res.errMsg=="request:fail ETIMEDOUT"){
    //   this.setData({
    //     subText: "网络超时"
    //   })
    //   this.closePop()
    //   this.showText()
    // }
  },
  changeSex: function (e) {
    this.setData({
      sexivible : e.currentTarget.dataset.sexivible
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
  },
  privacyChoose: function (e) {
    this.setData({
      isPrivacyiible : !this.data.isPrivacyiible
    })
    console.log("打印隐私协议：",this.data.isPrivacyiible);
  },
  handleInputName: function (e) {
    // this.data.name = e.detail.value
    this.setData({
      name: e.detail.value
    })
    console.log("姓名",this.data.name)
  },
  handleInputPhone: function (e) {
    this.data.phone = e.detail.value
    this.setData({
      phone: this.data.phone
    })
  },
  formSubmit: function (e) {
    let _this =  this;
    if(this.data.isSubmitivible){
      this.setData({
        isSubmitivible: false
      })
      if(!this.data.cityId){
        this.setData({
          subText: "请选择城市"
        })
        this.showText();
      }
      console.log("提交打印:",this.data.isPrivacyiible);
      if(this.data.isPrivacyiible){
        if(this.data.phone.length>11 || this.data.phone.length<=9){
          this.setData({
            isPhoneivible: true
          })
        }else {
          this.setData({
            isPhoneivible: false
          })
        }
        if(!this.data.name){
          this.setData({
            isNameivible: true
          })
        }else {
          this.setData({
            isNameivible: false
          })
        }
        if(!this.data.isPhoneivible && !this.data.isNameivible && this.data.cityId){
          if(this.data.cityId=='110000' || this.data.cityId=='310000' || this.data.cityId=='500000' || this.data.cityId=='120000'){
            console.log("op-1")
            var prams = {
              realname: this.data.name,
              mobile: this.data.phone,
              gender: this.data.sexivible,
              provinceid: this.data.cityId,
              type: 'dy',
              utmsource: this.data.channelQuery
            }
          }else {
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
          console.log("提交前的参数--1：",prams);
          this.setData({
            isSubmitivible: true
          })

          console.log("interval",this.data.interval)
          if(this.data.interval) {
            this.setData({
              interval: false
            })
            setTimeout(() => {
              this.setData({interval: true})
            },1000*60)
            axios.postData("/cadinea/api/v1/public/leads/cadillac/fromweb",prams,this.sucForm,this.fail)
            
            // axios.postData3("/cadinea/api/v1/public/leads/cadillac/fromweb",prams,this.sucForm,this.fail)
          }else {
            // this.setData({
            //   subText:   "请勿频繁提交，也可点击"+'"'+'咨询专线'+'"'+"获取专属服务"
            // })
            // this.showText();
           
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
      }else if(!this.data.isPrivacyiible){
        console.log("没勾选,值为：",this.data.isPrivacyiible);
        this.setData({
          subText: "请勾选《用户隐私协议》"
        })
        this.showText();
      }
      this.setData({
        isSubmitivible: true
      })
    }
  },
  sucForm: function (res) {
      console.log("打印提交消息-111：",res);
      if(res.statusCode=='200'){
        this.setData({
          subText: "提交成功",
          name: "",
          phone: "",
          cityArrName: [],
          interval: false
        })
        this.showText()
        axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",{shareChannel: this.data.minePath,type: '1'},function(res){
          console.log("成功调用验证share：",res);
        },function () {
          console.log("失败调用验证share");
        })
      }else if(res.statusCode=='500'){
        this.setData({
          subText: "系统异常"
        })
        this.showText()
      }
     
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
    },1500)
  },
  openPop: function (e) {
    this.setData({
      popShow: true
    })
  },
  closePop: function (e) {
    this.setData({
     popShow: false
    })
    this.setData({
      isSelectivible: false
     })
  },
  // 这个函数内容为空 用于阻止屏幕滚动
  preventTouchMove: function (e) {
  },
  completeCity: function (e){
    console.log("打印授权结果:",e);
    if(e.errMsg=="getLocation:ok" && this.data.cityArrName.length==0){
      var mineCity = []
      mineCity.push(e.city)
      console.log("城市-1",this.data.cityArrName)
      console.log("城市-2",mineCity)
      this.data.cityArrName.push(mineCity);
      this.setData({
        cityArrName: this.data.cityArrName
      })
    }else if(e.errMsg=="getLocation:ok" && this.data.canLocation){
      var mineCity = []
      var mineCity2 = []
      mineCity2.push(e.city)
      mineCity.push(mineCity2)
      this.setData({
        cityArrName: mineCity,
        canLocation: false
      })
    }
    console.log("打印cityArrName：",this.data.cityArrName);
    axios.postData("/cadinea/api/app/public/allCity/info",{type:'2'},this.success,this.fail)
    this.setData({
      isSelectivible: true
    })
  },
  getPhoneNumberHandler: function (e) {
    console.log("打印获取手机号信息：",e.detail);
    if(e.detail.errMsg=="getPhoneNumber:ok"){
      let that = this;
      console.log("打印phone前参数,encryptedData:",e.detail.encryptedData);
      console.log(";iv:",e.detail.iv);
      console.log(";code:",that.data.localCode);
      console.log(";annoyCode:",that.data.localAnonyCode);
      axios.postData2({encryptedData: e.detail.encryptedData,iv: e.detail.iv,code:that.data.localCode,anonymousCode:that.data.localAnonyCode},function(res){
        console.log('调用数据：',res);
        that.data.phone = res.data.purePhoneNumber
        that.setData({
          phone: that.data.phone
        })
        console.log("phone：",that.data.phone);
        
      },function(res){
        console.log("校验用户信息失败：",res);
      })
    }else if(e.detail.errMsg=="fail bad parameter"){
      this.setData({
        subText: "获取用户信息超时，请重新点击按钮"
      })
      this.showText()
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
    }else if(e.detail.errMsg=="no phone number"){
      this.setData({
        subText: "您未绑定手机号"
      })
      this.showText()
    }
  }
})
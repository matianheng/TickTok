var axios = require("../../utils/request.js")

Page({
data: {
  mineUrl: 'pages/index/index',
  smallboxivible: true,
  timer: null
},
onLoad: function (options) {
  var that = this;
  setTimeout(function () {
    that.setData({
      smallboxivible: false
    })
  },60000)
},
onShow:function (options) {
  console.log("onShow--监听",options)
  this.data.timer = setTimeout(()=> {
    tt.navigateTo({
      url: `../loginPage/loginPage?channel=`+this.data.mineUrl
    })
  },3000)
  console.log("打印参数-first：",this.data.mineUrl);
},
onHide:function (options) {
  console.log("onHide","关闭")
  clearTimeout(this.data.timer)
},
gotoLogin: function() {
  tt.navigateTo({
    url: `../loginPage/loginPage?channel=`+this.data.mineUrl
  })
  console.log("打印参数：",this.data.mineUrl);
  axios.postData3("/cfc-web/cfc-portal/rest/api/cadi/saveUser",{shareChannel: this.data.mineUrl,type: '2'},function(res){
    console.log("成功调用验证share：",res);
  },function () {
    console.log("失败调用验证share");
  })
  clearTimeout(this.data.timer)
},
gotoNextPage: function () {
  // tt.redirectTo({
  //   url: '../indexGao/indexGao'
  // });
  tt.redirectTo({
    url: '../indexChannelThree/indexChannelThree'
  });
},
onShareAppMessage: function (e) {
  return {
    path: this.data.mineUrl,
    success () {
      console.log('onshare转发发布器已调起，并不意味着用户转发成功');
      
    },
    fail () {
      console.log('onshare转发发布器调起失败');
    }
  }
}
})
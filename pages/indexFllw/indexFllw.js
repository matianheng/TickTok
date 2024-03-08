var axios = require("../../utils/request.js")

Page({
data: {
  mineUrl: 'pages/indexFllw/indexFllw',
  smallboxivible: true
},
onLoad: function (options) {
  var that = this;
  setTimeout(function () {
    that.setData({
      smallboxivible: false
    })
  },60000)
  tt.setStorage({
    key: "mineUrl",
    data: this.data.mineUrl,
  })
  console.log("打印参数：",this.data.mineUrl);
  this.gotoLogin();
},
gotoLogin: function() {
  tt.switchTab({
    url: '/pages/index/index',
    success(res) {
      console.log("switchTab调用成功 ", res);
    },
    fail(res) {
      console.log("switchTab调用失败 ", res);
    },
  });

},
gotoNextPage: function () {
  tt.redirectTo({
    url: '../indexDbsc/indexDbsc'
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
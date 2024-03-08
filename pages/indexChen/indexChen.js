var axios = require("../../utils/request.js")

Page({
data: {
  mineUrl: 'pages/indexChen/indexChen',
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
},
gotoNextPage: function () {
  tt.redirectTo({
    url: '../indexMeng/indexMeng'
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
  
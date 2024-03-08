 var app = getApp();
  //项目URL相同部分，减轻代码量，同时方便项目迁移
  //host是备案的域名信息
  // 测试
  // var host = 'https://apigatewayqa.sgmlink.com:3302';
  // 生产
    var host = 'https://app.sgmlink.com/cadinea'
  // // 测试接口地址
    var host2 = 'https://app.sgmlink.com/cadinea';


 // var host = 'https://app.sgmlink.com/cadinea'
  // 测试接口地址
  // var host2 = 'https://apigatewayqa.sgmlink.com';

  /**
   * POST请求，
   * URL：接口
   * postData：参数，json类型
  * doSuccess：成功的回调函数
  * doFail：失败的回调函数
  */
 function postData(url, postData, doSuccess, doFail) {
   console.log("接口请求地址111111111",host + url);
   console.log("接口请求参数1111111111",postData);
   tt.request({
     //项目的真正接口，通过字符串拼接方式实现
     url: host2 + url,
     header: {
       "content-type": "application/json;charset=UTF-8"
     },
     data: postData,
     method: 'POST',
     success: function (res) {
       //参数值为res.data,直接将返回的数据传入
       doSuccess(res.data);
     },
     fail: function (res) {
       doFail(res);
     },
   })
 }

  /**
   * POST请求:专门调用一键授权手机号的，
   * URL：接口
   * postData：参数，json类型
  * doSuccess：成功的回调函数
  * doFail：失败的回调函数
  */
 function postData2(postData, doSuccess, doFail) {
  tt.request({
    //项目的真正接口，通过字符串拼接方式实现
     url: "https://app.sgmlink.com/cadinea/cfc-web/cfc-portal/rest/api/cadi/login/getUserInfo",
    //url: "https://apigatewayqa.sgmlink.com/cfc-web/cfc-portal/rest/api/cadi/login/getUserInfo",
    header: {
   
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function (res) {
      doFail(res);
    },
  })
}

function postData3(url,postData, doSuccess, doFail) {
  tt.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host2+url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function (res) {
      doFail(res);
    },
  })
}

 
 //GET请求，不需传参，直接URL调用，
 function getData(url, doSuccess, doFail) {
   tt.request({
     url: host + url,
     header: {
       "content-type": "application/json;charset=UTF-8"
     },
     method: 'GET',
     success: function (res) {
       doSuccess(res.data);
     },
     fail: function () {
       doFail();
     },
   })
 }

 /**
  * module.exports用来导出代码
  * js文件中通过var call = require("../util/request.js")  加载
  * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
  * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
  */
 module.exports.postData = postData;
 module.exports.getData = getData;
 module.exports.postData2 = postData2;
 module.exports.postData3 = postData3;
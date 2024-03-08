

Component({
     externalClasses: ['letter-class', 'item-class'],
     /**
      * 组件的属性列表
      */
     properties: {
          allCities: {
               type: Array,
               value: [],
               // observer: citiesObserver
          },
          cityArrName: {
               type: Array,
               value: [],
          }
     },

     /**
      * 组件的初始数据
      */
     data: {
          allCities: [],
          currentIndex: 'id0',
          letterText: [],
          isLetterHidden: true,
          letterTop: 0,
          letterLeft: 0,
          letterArr: [],
          arrKey: -1,
          syncInfo: ''
     },

     /**
      * 组件的方法列表
      */
     methods: {
          closePop: function (e) {
               this.setData({
                    arrKey: -1
               })
               this.triggerEvent('closePop');
          },
          citySelectEvent: function (e) {
               console.log("打印点击的e：",e);
               var letterarr = []
               letterarr.push([this.data.allCities[e.currentTarget.dataset.index].cityName])
               if(this.data.letterArr.length==2){
                    this.data.letterArr.pop()
               }
               this.data.letterArr.push([this.data.allCities[e.currentTarget.dataset.index].cityName])
               this.setData({
                    letterArr: this.data.letterArr,
                    letterText: letterarr
               })
               console.log("打印letterArr：",this.data.letterArr);
               let topCityName = this.data.allCities[e.currentTarget.dataset.index].cityName
               if(topCityName == "北京市" || topCityName == "天津市" || topCityName == "上海市" || topCityName == "重庆市"){
                    var detail = {
                         id: this.data.allCities[e.currentTarget.dataset.index].id,
                         city: letterarr,
                         cityCont: this.data.letterArr
                    };
                    this.setData({
                         arrKey: e.currentTarget.dataset.index
                    })
                    console.log("打印arrKey:",this.data.arrKey);
                    this.triggerEvent('citySelect', detail);
               }else {
                    if(this.data.allCities[e.currentTarget.dataset.index].cities){
                         this.setData({
                              allCities: this.data.allCities[e.currentTarget.dataset.index].cities
                         })
                    }else {
                         var detail = {
                              id: this.data.allCities[e.currentTarget.dataset.index].id,
                              city: letterarr,
                              cityCont: this.data.letterArr
                         };
                         this.setData({
                              arrKey: e.currentTarget.dataset.index
                         })
                         console.log("打印arrKey:",this.data.arrKey);
                         this.triggerEvent('citySelect', detail);
                    }
               }
          },
          subPreLocation: function (e) {
               this.triggerEvent('subPreLocation',{canLocation: true});
          },
          closeCity: function (e) {
               this.setData({
                    arrKey: -1
               })
               this.triggerEvent('closeCity');
          },
          citiesObserver: function (newVal, oldVal) {
               var detail = {
                    newVal: newVal,
                    oldVal: oldVal
               }
               this.triggerEvent('citiesObserver', detail);
          },
     },

     attached: function () {
          let infoRes = tt.getSystemInfoSync(); 
          this.setData({
               syncInfo: infoRes.platform
          })       
          var that = this;
          // var cityArray = [];
          // for (var key in cities.cities) {
          //      var cityObject = new Object();
          //      cityObject.letter = key;
          //      cityObject.cityList = cities.cities[key];

          //      cityArray.push(cityObject);
          // }

          // this.setData({
          //      allCities: cityArray
          // });
          tt.getSystemInfo({
               success: function (res) {
                    // letterLineHeight = (res.windowHeight - 80) / that.data.allCities.length;
                    that.setData({
                         letterTop: res.windowHeight / 2 - 30,
                         letterLeft: res.windowWidth / 2 - 30
                    });
               }
          })
     }
})

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var staticData_Api = require("./staticData/Api.js");
if (!Math) {
  "./pages/data/data.js";
  "./pages/index/index.js";
  "./pages/my/my.js";
}
const _sfc_main = {
  onLaunch: function() {
    let token = common_vendor.index.getStorageSync("token");
    console.log(token);
    if (token !== "") {
      console.log(common_vendor.index.getStorageSync("token"));
      return;
    }
    common_vendor.index.showToast({
      title: "\u767B\u5F55\u4E2D",
      icon: "loading"
    });
    console.log("App Launch");
    common_vendor.index.login({
      success: async (res) => {
        console.log(res);
        if (res.errMsg === "login:ok") {
          let ret = this.loginAuth();
          console.log(ret);
        }
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
        common_vendor.index.hideLoading();
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    loginAuth(data) {
      common_vendor.index.request({
        url: staticData_Api.APIS.login,
        method: "POST",
        header: {
          "Authorization": ""
        },
        data,
        success: (res) => {
          console.log("res222", res);
          console.log(res.statusCode);
          if (res.statusCode === 404) {
            common_vendor.index.showModal({
              title: "\u767B\u5F55\u63D0\u9192",
              content: "\u7F51\u7EDC\u6545\u969C\uFF0C\u8BF7\u9EBB\u70E6\u91CD\u65B0\u767B\u5F55",
              success: (res2) => {
                if (res2.confirm) {
                  console.log("hhhhh");
                  this.loginAuth();
                } else if (res2.cancel) {
                  console.log("hhhhh");
                }
              }
            });
          }
        },
        fail: (res) => {
        }
      });
    }
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wechat app/finalDesign/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

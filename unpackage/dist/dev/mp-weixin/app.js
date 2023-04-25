"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var staticData_Api = require("./staticData/Api.js");
var utils_api = require("./utils/api.js");
require("./utils/http.js");
require("./utils/base.js");
require("./utils/request.js");
if (!Math) {
  "./pages/data/data.js";
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/info/info.js";
  "./pages/show/show.js";
}
const _sfc_main = {
  data() {
    return {
      code: ""
    };
  },
  onLaunch: function() {
    this.getAuth();
    common_vendor.index.setStorageSync("show", false);
  },
  onShow: function() {
    this.loginAuth();
    this.getMyInfo();
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    getAuth() {
      common_vendor.index.authorize({
        scope: "filesystem",
        success() {
          console.log("\u6388\u6743\u6210\u529F");
        },
        fail() {
          console.log("\u6388\u6743\u5931\u8D25");
        }
      });
    },
    getMyInfo() {
      utils_api.getMyInfoApi().then((res) => {
        if (res.code === 1) {
          common_vendor.index.setStorageSync("info", true);
        } else if (res.code === -513) {
          common_vendor.index.setStorageSync("info", false);
        }
      });
    },
    loginAuth() {
      let signCode;
      common_vendor.index.showToast({
        title: "\u767B\u5F55\u4E2D",
        icon: "loading"
      });
      console.log("App Launch");
      common_vendor.index.login({
        success: async (res) => {
          console.log(res);
          if (res.errMsg === "login:ok") {
            console.log("signCode", signCode);
            signCode = res.code;
            common_vendor.index.request({
              url: staticData_Api.APIS.login,
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                code: signCode
              },
              success: (res2) => {
                console.log("res222", res2);
                console.log(res2.statusCode);
                if (res2.data.code === 1) {
                  common_vendor.index.setStorageSync("token", res2.data.data);
                } else {
                  common_vendor.index.showModal({
                    title: "\u767B\u5F55\u63D0\u9192",
                    content: res2.data.msg,
                    success: (res3) => {
                      if (res3.confirm) {
                        this.loginAuth();
                      } else if (res3.cancel) {
                        return;
                      }
                    }
                  });
                }
              },
              fail: (res2) => {
                this.loginAuth();
              }
            });
          }
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wechat app/finalDesign/App.vue"]]);
const emitter = common_vendor.mitt();
const app = common_vendor.createSSRApp(App);
app.config.globalProperties.emitter = emitter;
function createApp() {
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;

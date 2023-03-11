"use strict";
var common_vendor = require("../../common/vendor.js");
var staticData_Api = require("../../staticData/Api.js");
var utils_api = require("../../utils/api.js");
require("../../utils/base.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      token: "",
      nickname: "",
      login: true,
      jwt: ""
    };
  },
  onShow() {
    this.jwt = common_vendor.index.getStorageSync("token");
    console.log(this.jwt);
    if (this.jwt !== "") {
      this.login = false;
      this.nickname = common_vendor.o$1(this.jwt).username;
    } else {
      this.login = true;
    }
  },
  methods: {
    getNickName(e) {
      this.nickname = e.detail.value;
    },
    onChooseAvatar(e) {
      console.log("e", e);
      this.avatarUrl = e.detail.avatarUrl;
    },
    loginAuth() {
      common_vendor.index.login({
        provider: "weixin",
        success: (res) => {
          if (res.errMsg === "login:ok") {
            let signCode = res.code;
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
                if (res2.data.code === 1) {
                  common_vendor.index.setStorageSync("token", res2.data.data);
                  this.jwt = res2.data.data;
                  this.nickname = common_vendor.o$1(this.jwt).username;
                  this.login = false;
                  common_vendor.index.showToast({
                    title: "\u767B\u5F55\u6210\u529F",
                    duration: 500
                  });
                } else {
                  common_vendor.index.showToast({
                    title: res2.data.msg,
                    duration: 500
                  });
                  this.login = true;
                  common_vendor.index.hideToast();
                }
              },
              fail: (res2) => {
                common_vendor.index.showToast({
                  title: "\u767B\u5F55\u5931\u8D25",
                  duration: 500
                });
                this.login = true;
                common_vendor.index.hideToast();
              }
            });
          }
        }
      });
    },
    updateUserName() {
      console.log(this.nickname);
      utils_api.updateUserNameApi(this.nickname).then((res) => {
        console.log(res);
        if (res.code === 1) {
          common_vendor.index.showToast({
            title: "\u7528\u6237\u540D\u4FEE\u6539\u6210\u529F",
            duration: 500,
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: res.msg,
            duration: 500,
            icon: "error"
          });
          this.login = true;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.avatarUrl,
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: common_vendor.o((...args) => $options.updateUserName && $options.updateUserName(...args)),
    d: common_vendor.o((...args) => $options.getNickName && $options.getNickName(...args)),
    e: $data.nickname,
    f: $data.login
  }, $data.login ? {
    g: common_vendor.o((...args) => $options.loginAuth && $options.loginAuth(...args))
  } : {}, {
    h: !$data.login
  }, !$data.login ? {
    i: common_vendor.p({
      showArrow: true,
      title: "\u4E2A\u4EBA\u4FE1\u606F",
      link: true,
      to: "/pages/info/info"
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);

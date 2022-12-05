"use strict";
var common_vendor = require("../../common/vendor.js");
var staticData_Api = require("../../staticData/Api.js");
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
      console.log(e);
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
      common_vendor.index.request({
        url: staticData_Api.APIS.updateName,
        method: "PUT",
        data: {
          username: this.nickname
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": this.jwt
        },
        success: (res) => {
          console.log(res);
          if (res.data.code === 1) {
            common_vendor.index.showToast({
              title: "\u7528\u6237\u540D\u4FEE\u6539\u6210\u529F",
              duration: 500
            });
            common_vendor.index.setStorageSync("token", res.data.data);
            this.nickname = common_vendor.o$1(res.data.data).username;
          } else {
            common_vendor.index.showToast({
              title: res.data.msg + "\u8BF7\u5148\u767B\u5F55",
              duration: 500,
              icon: "error"
            });
            this.login = true;
          }
        }
      });
    }
  }
};
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
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);

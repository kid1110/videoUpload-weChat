"use strict";
var common_vendor = require("../common/vendor.js");
common_vendor.index.addInterceptor("request", {
  invoke(e) {
    console.log("hello");
    let jwt = common_vendor.index.getStorageSync("token");
    console.log("jwt", jwt);
    if (jwt === "") {
      common_vendor.index.showToast({
        title: "\u8BF7\u91CD\u65B0\u767B\u5F55",
        duration: 500
      });
      return;
    } else {
      console.log(e);
      e.header = {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": jwt
      };
      if (e.url.includes("updateInfo")) {
        e.header = {
          "content-type": "application/json",
          "Authorization": jwt
        };
      }
    }
  },
  fail(e) {
    common_vendor.index.showToast({
      title: "\u7F51\u7EDC\u8BF7\u6C42\u9519\u8BEF",
      duration: 500
    });
  }
});

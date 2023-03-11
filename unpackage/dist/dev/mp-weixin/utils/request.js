"use strict";
var common_vendor = require("../common/vendor.js");
class Request {
  http(param) {
    let url = param.url, method = param.method, data = param.data || {}, header = param.header || {}, hideLoading = param.hideLoading || true;
    let requestUrl = url;
    if (method) {
      method = method.toUpperCase();
    }
    if (!hideLoading) {
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D..."
      });
    }
    console.log("heladeer", header);
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: requestUrl,
        data,
        method,
        header,
        success: (res) => {
          if (res.statusCode && res.statusCode != 200) {
            common_vendor.index.showToast({
              title: "\u8BF7\u6C42\u9519\u8BEF" + res.errMsg,
              icon: "none"
            });
            return;
          }
          console.log(res);
          resolve(res.data);
        },
        fail: (e) => {
          resolve(e.data);
        },
        complete() {
          if (!hideLoading) {
            common_vendor.index.hideLoading();
          }
          resolve();
          return;
        }
      });
    });
  }
}
exports.Request = Request;

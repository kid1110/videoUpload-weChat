"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../common/vendor.js");
var staticData_Api = require("../staticData/Api.js");
const postConsloe = (options) => {
  let header = __spreadValues({}, options.header);
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: staticData_Api.APIS.console,
      method: options.method || "POST",
      data: options.data || {},
      dataType: "json",
      header,
      success: (res) => {
        if (res.data) {
          if (res.data.code === "1") {
            resolve(res.data.data);
          } else {
            reject(res.data.msg);
          }
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
class BigUpload {
  constructor(Setting) {
    this.Setting = Setting;
  }
  startUpload() {
    this.chunkSize = this.Setting.size;
    if (!this.Setting.filePath) {
      return;
    }
    this.uploadTask = this.Setting.uploadTask;
    this.percent = this.Setting.percent;
    this.pt_md5 = "";
    this.chunks = Math.ceil(this.Setting.byteLength / this.size);
    this.currentChunk = 0;
    this.gowith = true;
    this.fileSlice(0, this.Setting.byteLength, (file) => {
      this.handshake((flag) => {
        if (flag) {
          this.loadNext();
        } else {
          this.Setting.callback(false);
        }
      }, file);
    });
  }
  handshake(cbk, e) {
    let formData = {};
    let md5 = this.getDataMd5(e);
    this.pt_md5 = md5;
    formData.pt_md5 = this.pt_md5;
    formData.chunks = this.chunks;
    formData.size = this.Setting.byteLength;
    formData.type = "handshake";
    formData.md5 = md5;
    formData.fileName = this.Setting.fileName;
    formData.contentType = this.Setting.type;
    postConsloe({
      url: this.Setting.url,
      data: formData,
      header: this.Setting.jwt
    }).then((res) => {
      if (res.code === "1") {
        cbk(true);
      } else {
        this.currentChunk = res;
        if (this.currentChunk < this.chunks) {
          this.loadNext();
        } else {
          this.currentChunk--;
          this.loadNext();
        }
      }
    }).catch((err) => {
      console.error(err);
      cbk(false);
    });
  }
  loadNext() {
    const p2 = this.currentChunk * 100 / this.chunks;
    this.drowSpeed(parseInt(p2));
    let start = this.currentChunk * this.chunkSize;
    let length = start + this.chunkSize >= this.Setting.byteLength ? this.Setting.byteLength - start : this.chunkSize;
    if (this.gowith) {
      this.fileSlice(start, length, (file) => {
        this.uploadFileBinary(file);
      });
    }
  }
  drowSpeed() {
    if (this.Setting.drowSpeed != null && typeof this.Setting === "function") {
      this.Setting.drowSpeed(p);
    }
  }
  fileSlice(start, length, cbk) {
    common_vendor.index.getFileSystemManager().readFile({
      filePath: this.Setting.filePath,
      encoding: "binary",
      position: start,
      length,
      success: (res) => {
        let md5 = this.getDataMd5(res.data);
        console.log(md5);
        cbk(res.data);
      },
      fail: (err) => {
        console.error(err);
        this.callback(false);
      }
    });
  }
  uploadFileBinary(data) {
    const fs = common_vendor.index.getFileSystemManager();
    const md5 = this.getDataMd5(data);
    const tempPath = `${wx.env.USER_DATA_PATH}/up_temp/${md5}.temp`;
    fs.access({
      path: `${wx.env.USER_DATA_PATH}/up_temp`,
      fail(res) {
        fs.mkdirSync(`${wx.env.USER_DATA_PATH}/up_temp`, false);
      }
    });
    fs.writeFile({
      filePath: tempPath,
      encoding: "binary",
      data,
      success: (res) => {
        FormData.currentChunk = this.currentChunk + 1;
        FormData.pt_md5 = this.pt_md5;
        form.type = "file";
        FormData.md5 = md5;
        common_vendor.index.uploadFile({
          url: this.Setting.url,
          filePath: tempPath,
          name: "file",
          formData: FormData,
          success: (res2) => {
            fs.unlinkSync(tempPath);
            if (res2.statusCode === 200) {
              const data2 = JSON.parse(res2.data);
              if (data2.code === "1") {
                this.currentChunk++;
                if (this.currentChunk < this.chunks) {
                  this.loadNext();
                } else {
                  this.callback(data2.data);
                }
                return true;
              }
            }
            this.callback(false);
          },
          fail: (err) => {
            console.log(err);
            this.callback(false);
          }
        });
      },
      fail: (err) => {
        console.log(err);
        this.callback(false);
      }
    });
  }
  getDataMd5(data) {
    if (data) {
      let trunkSpark = new common_vendor.SparkMD5();
      trunkSpark.appendBinary(data);
      let md5 = trunkSpark.end();
      return md5;
    }
  }
  callback(res) {
    if (typeof this.Setting.callback === "function") {
      this.Setting.callback(res);
    }
  }
}
exports.BigUpload = BigUpload;

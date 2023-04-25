"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_upload = require("../../utils/upload.js");
var staticData_Api = require("../../staticData/Api.js");
var sourceType = [
  ["camera"],
  ["album"],
  ["camera", "album"]
];
const _sfc_main = {
  data() {
    return {
      value: 1,
      login: false,
      buttonDisable: false,
      abortTask: -1,
      clearIcon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDE2YTQgNCAwIDAgMSA0IDR2MTZINGE0IDQgMCAwIDEtNC00VjB6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9Ii45OCIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfYikiLz48cGF0aCBkPSJNMTAuOTQgOS45OTlsMi44NjMtMi44NTdhLjY2OS42NjkgMCAxIDAtLjk0Ni0uOTQ2TDEwIDkuMDYgNy4xNDMgNi4xOTZhLjY2OS42NjkgMCAwIDAtLjk0Ni45NDZsMi44NjQgMi44NTctMi44NjQgMi44NTdhLjY2Ni42NjYgMCAwIDAgLjIxNyAxLjA5Mi42NjQuNjY0IDAgMCAwIC43MjktLjE0NkwxMCAxMC45MzhsMi44NTcgMi44NjRhLjY2Ny42NjcgMCAwIDAgMS4wOTItLjIxNy42NjYuNjY2IDAgMCAwLS4xNDYtLjcyOUwxMC45MzkgMTB6IiBmaWxsPSIjZmZmIi8+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9iIiB4PSItNCIgeT0iLTQiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2UiIHN0ZERldmlhdGlvbj0iMiIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iZWZmZWN0MV9iYWNrZ3JvdW5kQmx1ciIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXIiIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIyMCIgeDI9IjE1LjU4NiIgeTI9IjIyLjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzBEMUUyOCIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA1MEUxMiIgc3RvcC1vcGFjaXR5PSIuNjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=",
      selectfile: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIuMjUiIHk9Ii4yNSIgd2lkdGg9IjYzLjUiIGhlaWdodD0iNjMuNSIgcng9IjMuNzUiIGZpbGw9IiNGMkYyRjIiIHN0cm9rZT0iI0YyRjJGMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxyZWN0IHg9IjE2IiB5PSIzMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjQkZCRkJGIi8+PHJlY3QgeD0iMzMiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDkwIDMzIDE2KSIgZmlsbD0iI0JGQkZCRiIvPjwvc3ZnPg==",
      VideoOfImagesShow: true,
      imageList: [],
      videoList: [],
      sourceType: ["\u62CD\u6444", "\u76F8\u518C", "\u62CD\u6444\u6216\u76F8\u518C"],
      sourceTypeIndex: 2,
      cameraList: [{
        value: "back",
        name: "\u540E\u7F6E\u6444\u50CF\u5934",
        checked: "true"
      }, {
        value: "front",
        name: "\u524D\u7F6E\u6444\u50CF\u5934"
      }],
      cameraIndex: 0,
      maxCount: 9
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "\u5206\u4EAB\u89C6\u9891\u4E0A\u4F20\u7CFB\u7EDF",
      path: "/pages/index/index"
    };
  },
  onShow() {
    let jwt = common_vendor.index.getStorageSync("token");
    console.log(this.jwt);
    if (jwt !== "") {
      this.login = true;
    } else {
      this.login = false;
      common_vendor.index.showToast({
        title: "\u6682\u672A\u767B\u5F55\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
        duration: 500
      });
    }
  },
  onUnload() {
    this.imageList = [], this.sourceTypeIndex = 2, this.sourceType = ["\u62CD\u6444", "\u76F8\u518C", "\u62CD\u6444\u6216\u76F8\u518C"];
  },
  methods: {
    chooseVideoImage() {
      common_vendor.index.showActionSheet({
        title: "\u9009\u62E9\u4E0A\u4F20\u7C7B\u578B",
        itemList: ["\u89C6\u9891"],
        success: (res) => {
          this.chooseVideo();
        }
      });
    },
    chooseVideo(index) {
      common_vendor.index.chooseVideo({
        maxDuration: 60,
        count: this.maxCount,
        camera: this.cameraList[this.cameraIndex].value,
        sourceType: sourceType[this.sourceTypeIndex],
        compressed: false,
        success: (res) => {
          let jwt = common_vendor.index.getStorageSync("token");
          let uploadFile = new utils_upload.BigUpload({
            filePath: res.tempFilePath,
            type: "video/mp4",
            byteLength: res.size,
            size: 2097152,
            fileName: "weixin_video.mp4",
            jwt,
            percent: 0
          });
          this.videoList = this.videoList.concat(uploadFile);
          if (this.videoList.length == this.maxCount) {
            this.VideoOfImagesShow = false;
          }
          console.log(this.videoList);
        }
      });
    },
    uploadVideo() {
      let judge = common_vendor.index.getStorageSync("info");
      if (!judge) {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          content: "\u8BF7\u5B8C\u5584\u4E2A\u4EBA\u4FE1\u606F",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/pages/info/info"
              });
            } else if (res.cancel) {
              console.log("\u53D6\u6D88");
            }
          }
        });
      } else if (this.videoList.length === 0) {
        common_vendor.index.showToast({
          duration: 500,
          title: "\u6682\u65E0\u9009\u62E9\u7684\u89C6\u9891",
          icon: "none"
        });
        return;
      } else {
        this.buttonDisable = true;
        for (let i = 0; i < this.videoList.length; i++) {
          let uploader = this.videoList[i];
          console.log(uploader.Setting.filePath);
          let jwt = common_vendor.index.getStorageSync("token");
          let uploadTask = common_vendor.index.uploadFile({
            url: staticData_Api.APIS.uploadVideo,
            filePath: uploader.Setting.filePath,
            name: "test",
            header: {
              "Content-Type": "multipart/form-data",
              "Authorization": jwt
            },
            success: (res) => {
              console.log(res);
              console.log(res.data);
              let re = JSON.parse(res.data);
              if (re.code === 1) {
                common_vendor.index.showToast({
                  title: "\u4E0A\u4F20\u6210\u529F",
                  duration: 1500
                });
                console.log(i);
                this.percent = 0;
                this.videoList.splice(i, 1);
              } else {
                this.videoList[i].Setting.percent = 0;
                common_vendor.index.showToast({
                  title: re.msg,
                  duration: 1500
                });
                this.buttonDisable = false;
              }
            },
            fail: (res) => {
              console.log(res);
              console.log(res.data);
              let re = {
                msg: ""
              };
              if (typeof res.data !== "undefined" && res.data !== null) {
                re = JSON.parse(res.data);
              } else {
                re.msg = "\u4E0A\u4F20\u7EC8\u6B62";
              }
              uploader.Setting.percent = 0;
              common_vendor.index.showToast({
                title: re.msg,
                duration: 1500
              });
              this.abortTask = -1;
              this.buttonDisable = false;
            },
            complete: () => {
              console.log(this.videoList.length);
              if (i === 0) {
                this.buttonDisable = false;
              }
            }
          });
          console.log("up2", uploadTask);
          uploadTask.onProgressUpdate((res) => {
            uploader.Setting.percent = res.progress;
            if (this.abortTask === i) {
              uploadTask.abort();
            }
          });
        }
      }
    },
    delectVideo(index) {
      this.buttonDisable = false;
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u8981\u5220\u9664\u6B64\u89C6\u9891",
        success: (res) => {
          if (res.confirm) {
            this.abortTask = index;
            this.videoList.splice(index, 1);
          }
          if (this.videoList.length == this.maxCount) {
            this.VideoOfImagesShow = false;
          } else {
            this.VideoOfImagesShow = true;
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.login
  }, $data.login ? common_vendor.e({
    b: common_vendor.f($data.videoList, (item1, index1, i0) => {
      return {
        a: item1.Setting.filePath,
        b: common_vendor.o(($event) => $options.delectVideo(index1)),
        c: item1.Setting.percent,
        d: index1
      };
    }),
    c: $data.clearIcon,
    d: $data.VideoOfImagesShow
  }, $data.VideoOfImagesShow ? {
    e: $data.selectfile,
    f: common_vendor.o((...args) => $options.chooseVideoImage && $options.chooseVideoImage(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.uploadVideo && $options.uploadVideo(...args)),
    h: $data.buttonDisable
  }) : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);

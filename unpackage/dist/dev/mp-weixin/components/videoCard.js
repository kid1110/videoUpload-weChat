"use strict";
var common_vendor = require("../common/vendor.js");
var utils_base = require("../utils/base.js");
var utils_api = require("../utils/api.js");
require("../utils/request.js");
const _sfc_main = {
  name: "videoCard",
  props: {
    videoSrc: {
      type: String,
      default: ""
    },
    vid: {
      type: Number,
      default: 0
    },
    modelList: {
      type: Object,
      default: []
    },
    analyVideoSrc: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      msgType: "error",
      index: 0,
      visitUrl: "",
      startAnalysis: false,
      startDelete: false,
      getOutput: false,
      getModel: false,
      startDownLoadVideo: false,
      startDownLoadFile: false,
      modelName: "\u6682\u65E0\u6A21\u578B",
      outputEntity: {
        newOutputPath: "",
        newVideoPath: ""
      },
      handledNewVideoName: "",
      handledNewOutputName: "",
      newLocalOutput: "",
      saveVideoSuffix: "",
      saveOutputSuffix: "",
      saveVideoPre: "",
      saveOutputPre: "",
      videoPercent: 0,
      filePercent: 0
    };
  },
  methods: {
    saveOutputClose() {
      this.$refs.saveOutputDialog.close();
    },
    getNewOutput() {
      this.$refs.saveOutputDialog.open();
    },
    saveVideoClose() {
      this.$refs.saveOutputDialog.close();
    },
    downloadFile(url) {
      let judge = this.getSuffix(url);
      if (judge === this.saveVideoSuffix) {
        this.saveVideoPre + "." + this.saveVideoSuffix;
      } else {
        this.saveOutputPre + "." + this.saveOutputSuffix;
      }
      url = utils_base.base.url + url;
      console.log(url);
      const downloadTask = common_vendor.index.downloadFile({
        url,
        timeout: 1e3 * 60 * 2 * 60,
        success: (res) => {
          console.log("downloadFile", res);
          if (res.statusCode === 200) {
            console.log("\u4E0B\u8F7D\u6210\u529F");
          }
          if (judge === this.saveVideoSuffix) {
            this.startDownLoadVideo = false;
            common_vendor.index.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath
            });
          } else {
            this.startDownLoadFile = false;
            let fsm = common_vendor.index.getFileSystemManager();
            fsm.saveFile({
              tempFilePath: res.tempFilePath,
              filePath: wx.env.USER_DATA_PATH + "/" + this.handledNewOutputName,
              success: (red) => {
                console.log("\u4E0B\u8F7D\u6587\u4EF6\u6210\u529F", red);
                setTimeout(() => {
                  common_vendor.index.openDocument({
                    filePath: red.savedFilePath,
                    showMenu: true,
                    success: function(res2) {
                      console.log("\u6253\u5F00\u6587\u6863\u6210\u529F");
                    },
                    fail: function(res2) {
                      console.log("\u6253\u5F00\u6587\u6863\u5931\u8D25");
                    }
                  });
                }, 3e3);
              }
            });
          }
        }
      });
      downloadTask.onProgressUpdate((res) => {
        console.log("\u4E0B\u8F7D\u8FDB\u5EA6" + res.progress);
        if (judge === this.saveVideoSuffix) {
          this.startDownLoadVideo = true;
          this.videoPercent = res.progress;
        } else {
          this.startDownLoadFile = true;
          this.filePercent = res.progress;
        }
      });
    },
    saveOutputConfirm() {
      this.downloadFile(this.outputEntity.newOutputPath);
    },
    saveVideoConfirm() {
      this.downloadFile(this.outputEntity.newVideoPath);
    },
    getNamePre(url) {
      let index = url.lastIndexOf(".");
      return url.substring(0, index);
    },
    getSuffix(url) {
      let index = url.lastIndexOf(".");
      return url.substring(index + 1);
    },
    handleName(url) {
      return url.substring(9, url.length);
    },
    getNewVideo() {
      this.$refs.saveVideoDialog.open();
    },
    analysisVideo() {
      if (this.visitUrl === "") {
        common_vendor.index.showToast({
          duration: 500,
          title: "\u6682\u672A\u9009\u62E9\u6A21\u578B",
          icon: "none"
        });
        return;
      } else {
        this.startAnalysis = true;
        utils_api.analysisVideoApi(this.analyVideoSrc, this.visitUrl).then((res) => {
          if (res == void 0) {
            this.startAnalysis = false;
            return;
          }
          console.log(res);
          if (res.code === 1) {
            this.startAnalysis = false;
            common_vendor.index.showToast({
              duration: 500,
              title: "\u5206\u6790\u6210\u529F",
              icon: "success"
            });
            this.outputEntity = res.data;
            this.getOutput = true;
            this.handledNewVideoName = this.handleName(this.outputEntity.newVideoPath);
            this.handledNewOutputName = this.handleName(this.outputEntity.newOutputPath);
            this.saveVideoSuffix = this.getSuffix(this.handledNewVideoName);
            this.saveOutputSuffix = this.getSuffix(this.handledNewOutputName);
            this.saveVideoPre = this.getNamePre(this.handledNewVideoName);
            this.saveOutputPre = this.getNamePre(this.handledNewOutputName);
            console.log("suffix", this.saveOutputSuffix);
            console.log("vsuffix", this.saveVideoSuffix);
            console.log("output", this.outputEntity);
          } else if (this.startAnalysis === true) {
            common_vendor.index.showToast({
              duration: 500,
              title: "\u5206\u6790\u5931\u8D25",
              icon: "error"
            });
            this.startAnalysis = false;
            return;
          } else {
            common_vendor.index.showToast({
              duration: 500,
              title: res.msg,
              icon: "error"
            });
            this.startAnalysis = false;
          }
        });
      }
    },
    modelCancel() {
      this.index = 0;
      this.visitUrl = "";
      this.modelName = "\u6682\u65E0\u6A21\u578B";
      this.getModel = false;
    },
    chooseModel() {
      this.$emit("refresh-models");
    },
    modelChange(e) {
      console.log("test", e.detail.value);
      this.index = e.detail.value;
      this.visitUrl = this.modelList[this.index].visitUrl;
      this.modelName = this.modelList[this.index].modelName;
      console.log("alalysis", this.visitUrl);
      this.getModel = true;
    },
    deleteClose() {
      this.$refs.alertDialog.close();
    },
    deleteConfirm() {
      this.startDelete = true;
      utils_api.deleteVideoApi(this.vid).then((res) => {
        if (res == void 0) {
          this.startDelete = false;
          return;
        }
        if (res.code === 1) {
          common_vendor.index.showToast({
            duration: 1e3,
            title: "\u5220\u9664\u6210\u529F"
          });
          this.startDelete = false;
          this.$emit("refresh-videos");
        } else {
          this.startDelete = false;
          common_vendor.index.showToast({
            duration: 500,
            title: "\u5220\u9664\u5931\u8D25",
            icon: "error"
          });
        }
      });
    },
    deleteVideo() {
      console.log(this.index);
      this.$refs.alertDialog.open();
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_card2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_card = () => "../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup_dialog = () => "../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_card + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.startAnalysis,
    b: common_vendor.o((...args) => $options.analysisVideo && $options.analysisVideo(...args)),
    c: $data.startAnalysis || $data.startDelete,
    d: common_vendor.o((...args) => $options.chooseModel && $options.chooseModel(...args)),
    e: $data.startAnalysis,
    f: common_vendor.o((...args) => $options.modelChange && $options.modelChange(...args)),
    g: $data.index,
    h: common_vendor.o((...args) => $options.modelCancel && $options.modelCancel(...args)),
    i: $props.modelList,
    j: common_vendor.o((...args) => $options.deleteVideo && $options.deleteVideo(...args)),
    k: $data.startAnalysis || $data.startDelete,
    l: $props.videoSrc,
    m: $data.getOutput || $data.getModel
  }, $data.getOutput || $data.getModel ? common_vendor.e({
    n: common_vendor.p({
      title: "\u6A21\u578B\u540D\u79F0",
      note: $data.modelName
    }),
    o: $data.getOutput
  }, $data.getOutput ? common_vendor.e({
    p: common_vendor.t($data.handledNewVideoName),
    q: $data.startDownLoadVideo
  }, $data.startDownLoadVideo ? {
    r: $data.videoPercent
  } : {}, {
    s: common_vendor.o($options.getNewVideo),
    t: common_vendor.p({
      clickable: !$data.startDownLoadVideo
    })
  }) : {}, {
    v: $data.getOutput
  }, $data.getOutput ? common_vendor.e({
    w: common_vendor.t($data.handledNewOutputName),
    x: $data.startDownLoadFile
  }, $data.startDownLoadFile ? {
    y: $data.filePercent
  } : {}, {
    z: common_vendor.o($options.getNewOutput),
    A: common_vendor.p({
      clickable: !$data.startDownLoadFile
    })
  }) : {}, {
    B: common_vendor.p({
      title: "\u5206\u6790\u4FE1\u606F"
    })
  }) : {}, {
    C: common_vendor.p({
      title: "\u6807\u9898\u6587\u5B57"
    }),
    D: common_vendor.o($options.deleteConfirm),
    E: common_vendor.o($options.deleteClose),
    F: common_vendor.p({
      type: $data.msgType,
      cancelText: "\u5173\u95ED",
      confirmText: "\u540C\u610F",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u5220\u9664\u8BE5\u89C6\u9891"
    }),
    G: common_vendor.sr("alertDialog", "99d9ceac-7"),
    H: common_vendor.p({
      type: "dialog"
    }),
    I: common_vendor.o($options.saveVideoConfirm),
    J: common_vendor.o($options.saveVideoClose),
    K: common_vendor.p({
      type: "info",
      cancelText: "\u5173\u95ED",
      confirmText: "\u540C\u610F",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u4E0B\u8F7D\u5DF2\u5206\u6790\u7684\u89C6\u9891"
    }),
    L: common_vendor.sr("saveVideoDialog", "99d9ceac-9"),
    M: common_vendor.p({
      type: "dialog"
    }),
    N: common_vendor.o($options.saveOutputConfirm),
    O: common_vendor.o($options.saveOutputClose),
    P: common_vendor.p({
      type: "info",
      cancelText: "\u5173\u95ED",
      confirmText: "\u540C\u610F",
      title: "\u901A\u77E5",
      content: "\u662F\u5426\u4E0B\u8F7D\u5206\u6790\u7ED3\u679C"
    }),
    Q: common_vendor.sr("saveOutputDialog", "99d9ceac-11"),
    R: common_vendor.p({
      type: "dialog"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/components/videoCard.vue"]]);
wx.createComponent(Component);

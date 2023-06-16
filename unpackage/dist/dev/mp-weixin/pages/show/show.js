"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_api = require("../../utils/api.js");
require("../../utils/base.js");
require("../../utils/request.js");
const uploadCard = () => "../../components/uploadCard.js";
const _sfc_main = {
  components: {
    uploadCard
  },
  data() {
    return {
      showVideoNames: [],
      videoCount: 0,
      uploadCount: 0,
      startUpload: false,
      eventBus: null
    };
  },
  onReady() {
    this.getStaticVideo();
  },
  methods: {
    enableBtn() {
      this.startUpload = false;
    },
    minCount() {
      if (this.uploadCount > 0) {
        this.uploadCount--;
      } else {
        this.uploadCount = 0;
      }
    },
    addCount() {
      this.uploadCount++;
    },
    getStaticVideo() {
      utils_api.getIeVideos().then((res) => {
        if (res.code === 1) {
          console.log("tewf", res);
          this.showVideoNames = res.data.sort((a, b) => {
            const aNum = parseInt(a.match(/\d+/)[0]);
            const bNum = parseInt(b.match(/\d+/)[0]);
            return aNum - bNum;
          });
          this.videoCount = this.showVideoNames.length;
        }
      }).catch((err) => console.log(err));
    },
    uploadVideo() {
      if (this.videoCount !== this.uploadCount) {
        common_vendor.index.showToast({
          duration: 500,
          title: "\u8BF7\u5B8C\u6210\u6240\u6709\u624B\u52BF",
          icon: "none"
        });
      } else {
        this.startUpload = true;
        this.emitter.emit("start-upload");
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uploadCard = common_vendor.resolveComponent("uploadCard");
  const _component_string = common_vendor.resolveComponent("string");
  (_easycom_uni_title2 + _easycom_uni_section2 + _component_uploadCard + _component_string)();
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "h1",
      title: "\u4E0A\u4F20\u4E0E\u5206\u6790\u6B65\u9AA4",
      color: "#FF6A6A",
      align: "center"
    }),
    b: common_vendor.p({
      title: "\u89C6\u9891\u4E0A\u4F20\u6307\u5357",
      type: "line"
    }),
    c: common_vendor.f($data.showVideoNames, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o($options.addCount, index),
        c: common_vendor.o($options.minCount, index),
        d: common_vendor.o($options.enableBtn, index),
        e: "2fe1463c-2-" + i0,
        f: common_vendor.p({
          showVideoSrc: item,
          uploadVideoIndex: index,
          uploadVideoTotal: $data.videoCount
        })
      };
    }),
    d: common_vendor.p({
      title: "\u5206\u6790\u89C6\u9891\u6307\u5357",
      type: "line"
    }),
    e: common_vendor.o((...args) => $options.uploadVideo && $options.uploadVideo(...args)),
    f: $data.startUpload
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/pages/show/show.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var utils_api = require("../../utils/api.js");
var common_vendor = require("../../common/vendor.js");
require("../../utils/base.js");
require("../../utils/request.js");
const videoCard = () => "../../components/videoCard.js";
const _sfc_main = {
  components: {
    videoCard
  },
  data() {
    return {
      videoInfoList: [],
      modelList: []
    };
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "\u5206\u4EAB\u89C6\u9891\u4E0A\u4F20\u7CFB\u7EDF",
      path: "/pages/data/data"
    };
  },
  onLoad() {
    this.getVideos();
    this.listModel();
  },
  onTabItemTap() {
    this.getVideos();
    this.listModel();
  },
  onNavigationBarButtonTap() {
    this.getVideos();
    this.listModel();
  },
  methods: {
    test() {
      utils_api.analysisVideoApi("0a881f01-5729-4a4b-86b0-0362e68ccf44.mp4", ":1234/handlerVideos").then((res) => {
        console.log(res);
      });
    },
    refreshVideos() {
      this.getVideos();
    },
    listModel() {
      utils_api.listModelApi().then((res) => {
        if (res.code === 1) {
          this.modelList = res.data;
          console.log("modelList", this.modelList);
        } else {
          this.modelList.push(res.msg);
        }
      });
    },
    getVideos() {
      utils_api.getMyVideosApi().then((res) => {
        console.log("video", res);
        if (res.code === 1) {
          this.videosList = res.data;
          this.videoInfoList = res.data;
          console.log(this.videoInfoList);
        } else {
          this.videoInfoList = [];
        }
      });
    },
    handleVideoSrc(rawVideoSrc) {
      return "https://video.kkid.fun/videos/" + rawVideoSrc;
    }
  }
};
if (!Array) {
  const _component_videoCard = common_vendor.resolveComponent("videoCard");
  _component_videoCard();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.videoInfoList, (item, k0, i0) => {
      return {
        a: item.vid,
        b: common_vendor.o(($event) => $options.refreshVideos(), item.vid),
        c: common_vendor.o(($event) => $options.listModel(), item.vid),
        d: "69551a5c-0-" + i0,
        e: common_vendor.p({
          videoSrc: $options.handleVideoSrc(item.videoUrl),
          vid: item.vid,
          modelList: $data.modelList,
          analyVideoSrc: item.videoUrl
        })
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/pages/data/data.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);

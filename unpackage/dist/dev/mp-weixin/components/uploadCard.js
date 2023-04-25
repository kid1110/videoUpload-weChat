"use strict";
var common_vendor = require("../common/vendor.js");
var staticData_Api = require("../staticData/Api.js");
var utils_upload = require("../utils/upload.js");
const _sfc_main = {
  name: "uploadCard",
  props: {
    showVideoSrc: {
      type: String,
      default: ""
    },
    uploadVideoIndex: {
      type: Number,
      default: 0
    },
    uploadVideoTotal: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.emitter.on("start-upload", this.startUpload);
  },
  beforeDestroy() {
    this.emitter.off("start-upload", this.startUpload);
  },
  data() {
    return {
      VideoShow: true,
      clearIcon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDE2YTQgNCAwIDAgMSA0IDR2MTZINGE0IDQgMCAwIDEtNC00VjB6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9Ii45OCIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfYikiLz48cGF0aCBkPSJNMTAuOTQgOS45OTlsMi44NjMtMi44NTdhLjY2OS42NjkgMCAxIDAtLjk0Ni0uOTQ2TDEwIDkuMDYgNy4xNDMgNi4xOTZhLjY2OS42NjkgMCAwIDAtLjk0Ni45NDZsMi44NjQgMi44NTctMi44NjQgMi44NTdhLjY2Ni42NjYgMCAwIDAgLjIxNyAxLjA5Mi42NjQuNjY0IDAgMCAwIC43MjktLjE0NkwxMCAxMC45MzhsMi44NTcgMi44NjRhLjY2Ny42NjcgMCAwIDAgMS4wOTItLjIxNy42NjYuNjY2IDAgMCAwLS4xNDYtLjcyOUwxMC45MzkgMTB6IiBmaWxsPSIjZmZmIi8+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9iIiB4PSItNCIgeT0iLTQiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2UiIHN0ZERldmlhdGlvbj0iMiIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iZWZmZWN0MV9iYWNrZ3JvdW5kQmx1ciIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXIiIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIyMCIgeDI9IjE1LjU4NiIgeTI9IjIyLjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzBEMUUyOCIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA1MEUxMiIgc3RvcC1vcGFjaXR5PSIuNjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=",
      selectfile: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIuMjUiIHk9Ii4yNSIgd2lkdGg9IjYzLjUiIGhlaWdodD0iNjMuNSIgcng9IjMuNzUiIGZpbGw9IiNGMkYyRjIiIHN0cm9rZT0iI0YyRjJGMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxyZWN0IHg9IjE2IiB5PSIzMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjQkZCRkJGIi8+PHJlY3QgeD0iMzMiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDkwIDMzIDE2KSIgZmlsbD0iI0JGQkZCRiIvPjwvc3ZnPg==",
      uploadVideo: null,
      cameraList: [{
        value: "back",
        name: "\u540E\u7F6E\u6444\u50CF\u5934",
        checked: "true"
      }, {
        value: "front",
        name: "\u524D\u7F6E\u6444\u50CF\u5934"
      }]
    };
  },
  onReady() {
    console.log("show data:", "@/static/video/" + this.showVideoSrc);
  },
  computed: {
    showVidSrc() {
      common_vendor.index.getFileSystemManager().readdir();
      console.log("show data:", "../../static/video/" + this.showVideoSrc);
      return "../video/" + this.showVideoSrc;
    }
  },
  methods: {
    startUpload() {
      let jwt = common_vendor.index.getStorageSync("token");
      let index = this.uploadVideoIndex;
      let total = this.uploadVideoTotal;
      console.log(this.uploadVideo);
      let uploadTask = common_vendor.index.uploadFile({
        url: staticData_Api.APIS.uploadMixVideo,
        filePath: this.uploadVideo.Setting.filePath,
        name: "mixVideo",
        header: {
          "Content-Type": "multipart/form-data",
          "Authorization": jwt
        },
        formData: {
          "index": index,
          "total": total
        },
        success: (res) => {
          console.log(res);
          if (res.data.code === 1) {
            common_vendor.index.showToast({
              title: "\u4E0A\u4F20\u6210\u529F",
              duration: 1500
            });
            this.uploadVideo.Setting.percent = 0;
            this.$emit("min-count");
            this.uploadVideo = null;
            this.VideoShow = true;
          } else {
            common_vendor.index.showToast({
              title: res.data.msg,
              duration: 1500
            });
            this.uploadVideo.Setting.percent = 0;
            this.$emit("min-count");
            this.uploadVideo = null;
            this.VideoShow = true;
          }
        },
        fail: (res) => {
          console.log(res);
          common_vendor.index.showToast({
            title: "\u4E0A\u4F20\u5931\u8D25",
            duration: 500,
            icon: "none"
          });
        },
        complete: () => {
          this.$emit("enable-btn");
        }
      });
      uploadTask.onProgressUpdate((res) => {
        this.uploadVideo.Setting.percent = res.progress;
      });
    },
    delectVideo() {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u8981\u5220\u9664\u6B64\u89C6\u9891",
        success: (res) => {
          if (res.confirm) {
            this.$emit("min-count");
            this.uploadVideo = null;
            this.VideoShow = true;
          } else {
            return;
          }
        }
      });
    },
    chooseVideoImage() {
      common_vendor.index.chooseVideo({
        maxDuration: 60,
        camera: this.cameraList[0].value,
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
          this.VideoShow = false;
          this.uploadVideo = uploadFile;
          this.$emit("plus-count");
          console.log("uploadVideo: ", this.uploadVideo);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.uploadVideo !== null
  }, $data.uploadVideo !== null ? {
    b: $data.uploadVideo.Setting.filePath,
    c: $data.clearIcon,
    d: common_vendor.o((...args) => $options.delectVideo && $options.delectVideo(...args)),
    e: $data.uploadVideo.Setting.percent
  } : {}, {
    f: $data.VideoShow
  }, $data.VideoShow ? {
    g: $data.selectfile,
    h: common_vendor.o((...args) => $options.chooseVideoImage && $options.chooseVideoImage(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/components/uploadCard.vue"]]);
wx.createComponent(Component);

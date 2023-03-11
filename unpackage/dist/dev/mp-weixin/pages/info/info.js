"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_api = require("../../utils/api.js");
require("../../utils/base.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      startSubmit: false,
      tallIndex: 0,
      eduIndex: 0,
      userInfo: {
        name: "",
        age: "",
        gender: 0,
        gym: 0,
        profession: "",
        tall: 0,
        uid: 0,
        education: 0
      },
      sexs: [{
        text: "\u4FDD\u5BC6",
        value: 0
      }, {
        text: "\u5973",
        value: 1
      }, {
        text: "\u7537",
        value: 2
      }],
      gyms: [{
        text: "\u4FDD\u5BC6",
        value: 0
      }, {
        text: "\u662F",
        value: 1
      }, {
        text: "\u5426",
        value: 2
      }],
      tallList: [],
      eduList: ["\u5C0F\u5B66\u4EE5\u4E0B", "\u5C0F\u5B66", "\u521D\u4E2D", "\u9AD8\u4E2D", "\u5927\u5B66\u4E13\u79D1", "\u5927\u5B66\u672C\u79D1", "\u7855\u58EB", "\u535A\u58EB", "\u535A\u58EB\u540E"],
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "\u5E74\u9F84\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            format: "number",
            errorMessage: "\u5E74\u9F84\u53EA\u80FD\u4E3A\u6570\u5B57"
          }]
        },
        profession: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u586B\u5199\u804C\u4E1A"
          }, {
            maxLength: 100,
            errMessage: "\u804C\u4E1A\u540D\u79F0\u4E0D\u80FD\u5927\u4E8E100\u5B57"
          }]
        }
      }
    };
  },
  computed: {},
  onShow() {
    let jwt = common_vendor.index.getStorageSync("token");
    this.userInfo.uid = Number(common_vendor.o$1(jwt).uid);
  },
  onLoad() {
  },
  onReady() {
    this.initTallList();
  },
  methods: {
    submit() {
      this.$refs["baseForm"].validate().then((res) => {
        console.log("success", res);
        console.log("entity", this.userInfo);
        this.startSubmit = true;
        utils_api.insertUserInfo(this.userInfo).then((res2) => {
          console.log(res2);
          if (res2.code === 1) {
            common_vendor.index.showToast({
              duration: 1e3,
              title: "\u4E0A\u4F20\u6210\u529F",
              icon: "success"
            });
            common_vendor.index.setStorageSync("info", true);
            this.startSubmit = false;
            setTimeout(() => {
              common_vendor.index.navigateBack(1);
            }, 1e3);
          } else {
            this.startSubmit = false;
          }
        });
      }).catch((err) => {
        console.log("err", err);
      });
    },
    tallChange(e) {
      console.log("test", e.detail.value);
      this.tallIndex = Number(e.detail.value);
      console.log(typeof this.tallIndex);
      this.userInfo.tall = this.tallIndex + 100;
    },
    eduChange(e) {
      this.eduIndex = Number(e.detail.value);
      this.userInfo.education = this.eduIndex;
    },
    initTallList() {
      for (let i = 100; i < 261; i++) {
        this.tallList.push(i + "cm");
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => _ctx.binddata("name", $event.detail.value)),
    b: common_vendor.o(($event) => $data.userInfo.name = $event),
    c: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.userInfo.name
    }),
    d: common_vendor.p({
      label: "\u59D3\u540D",
      required: true,
      name: "name"
    }),
    e: common_vendor.o(($event) => _ctx.binddata("age", $event.detail.value)),
    f: common_vendor.o(($event) => $data.userInfo.age = $event),
    g: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5E74\u9F84",
      modelValue: $data.userInfo.age
    }),
    h: common_vendor.p({
      label: "\u5E74\u9F84",
      required: true,
      name: "age"
    }),
    i: common_vendor.o(($event) => $data.userInfo.gender = $event),
    j: common_vendor.p({
      localdata: $data.sexs,
      modelValue: $data.userInfo.gender
    }),
    k: common_vendor.p({
      label: "\u6027\u522B",
      required: true
    }),
    l: common_vendor.o(($event) => $data.userInfo.gym = $event),
    m: common_vendor.p({
      localdata: $data.gyms,
      modelValue: $data.userInfo.gym
    }),
    n: common_vendor.p({
      label: "\u662F\u5426\u5EFA\u8EAB",
      required: true
    }),
    o: common_vendor.o(($event) => _ctx.binddata("profession", $event.detail.value)),
    p: common_vendor.o(($event) => $data.userInfo.profession = $event),
    q: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u804C\u4E1A",
      modelValue: $data.userInfo.profession
    }),
    r: common_vendor.p({
      label: "\u804C\u4E1A",
      required: true,
      name: "profession"
    }),
    s: common_vendor.t($data.tallList[$data.tallIndex]),
    t: $data.tallList,
    v: $data.tallIndex,
    w: common_vendor.o((...args) => $options.tallChange && $options.tallChange(...args)),
    x: common_vendor.p({
      label: "\u8EAB\u9AD8",
      required: true
    }),
    y: common_vendor.t($data.eduList[$data.eduIndex]),
    z: $data.eduList,
    A: common_vendor.o((...args) => $options.eduChange && $options.eduChange(...args)),
    B: common_vendor.p({
      label: "\u6559\u80B2\u7A0B\u5EA6",
      required: true
    }),
    C: common_vendor.sr("baseForm", "4d645cdc-0"),
    D: common_vendor.p({
      modelValue: $data.userInfo,
      labelPosition: "left",
      labelWidth: "80px",
      rules: $data.rules,
      validateTrigger: "bind"
    }),
    E: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    F: $data.startSubmit,
    G: $data.startSubmit
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/wechat app/finalDesign/pages/info/info.vue"]]);
wx.createPage(MiniProgramPage);

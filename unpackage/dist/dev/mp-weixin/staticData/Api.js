"use strict";
const baseApiUrl = "https://video.kkid.fun";
const APIS = {
  login: baseApiUrl + "/user/sign",
  updateName: baseApiUrl + "/user/updateUsername",
  uploadVideo: baseApiUrl + "/uploadVideo",
  handshake: baseApiUrl + "uploadVideo/console"
};
exports.APIS = APIS;

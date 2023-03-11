"use strict";
var utils_base = require("./base.js");
var utils_request = require("./request.js");
let request = new utils_request.Request().http;
function getMyVideosApi() {
  return request({
    url: `${utils_base.base.url}/getMyVideos`,
    method: "GET"
  });
}
function updateUserNameApi(newName) {
  return request({
    url: `${utils_base.base.url}/user/updateUsername`,
    method: "PUT",
    data: {
      username: newName
    }
  });
}
function deleteVideoApi(videoId) {
  return request({
    url: `${utils_base.base.url}/deleteVideo`,
    method: "DELETE",
    data: {
      vid: videoId
    }
  });
}
function listModelApi() {
  return request({
    url: `${utils_base.base.url}/getAllModel`,
    method: "GET"
  });
}
function analysisVideoApi(videoPath, modelPath) {
  return request({
    url: `${utils_base.base.url}/analysisVideo`,
    method: "POST",
    data: {
      videoUrl: videoPath,
      modelPath
    }
  });
}
function getMyInfoApi() {
  return request({
    url: `${utils_base.base.url}/getUserInfo`,
    method: "GET"
  });
}
function insertUserInfo(userInfo) {
  return request({
    url: `${utils_base.base.url}/updateInfo`,
    method: "POST",
    data: {
      name: userInfo.name,
      uid: userInfo.uid,
      age: userInfo.age,
      gym: userInfo.gym,
      gender: userInfo.gender,
      profession: userInfo.profession,
      education: userInfo.education,
      tall: userInfo.tall
    }
  });
}
exports.analysisVideoApi = analysisVideoApi;
exports.deleteVideoApi = deleteVideoApi;
exports.getMyInfoApi = getMyInfoApi;
exports.getMyVideosApi = getMyVideosApi;
exports.insertUserInfo = insertUserInfo;
exports.listModelApi = listModelApi;
exports.updateUserNameApi = updateUserNameApi;

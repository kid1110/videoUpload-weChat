import base from "./base.js"
import Request from '@/utils/request.js'
let request = new Request().http

export function getMyVideosApi(){
	 return request({
		 url: `${base.url}/getMyVideos`,
		 method: "GET",
	 })
}
export function updateUserNameApi(newName){
	return request({
		url: `${base.url}/user/updateUsername`,
		method: "PUT",
		data:{
			username: newName
		}
	})
}
export function deleteVideoApi(videoId){
	return request({
		url: `${base.url}/deleteVideo`,
		method: "DELETE",
		data:{
			vid:videoId
		}
	})
}
export function listModelApi(){
	return request({
		url: `${base.url}/getAllModel`,
		method: "GET"
	})
}
export function analysisVideoApi(videoPath,modelPath){
	return request({
		url: `${base.url}/analysisVideo`,
		method: "POST",
		data:{
			videoUrl: videoPath,
			modelPath: modelPath
		}
	})
}
export function getMyInfoApi(){
	return request({
		url: `${base.url}/getUserInfo`,
		method: "GET"
	})
}
export function insertUserInfo(userInfo){
	return request({
		url: `${base.url}/updateInfo`,
		method: "POST",
		data:{
			name: userInfo.name,
			uid: userInfo.uid,
			age: userInfo.age,
			gym: userInfo.gym,
			gender: userInfo.gender,
			profession: userInfo.profession,
			education: userInfo.education,
			tall: userInfo.tall
		},
	})
}

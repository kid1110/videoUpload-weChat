<template>
	<!-- 上传视频或者图片 -->
	<view v-if="login" class="uploader-container" >
		<view class="up-page">	
				<!--视频-->
				<view class="show-box" v-for="(item1, index1) in videoList" :key="index1">
					<video class="full" :src="item1.Setting.filePath"></video>
					<view  class="delect-icon" @tap="delectVideo(index1)">
						<image class="full" :src="clearIcon" mode=""></image>
					</view>
					<view class="progress-box">
						<progress class="upload-progress"  :percent="item1.Setting.percent" stroke-width="3" color="#10AEFF" active="true" active-mode="forwards" backgroundColor="#d9d9d9"></progress>
					</view>
				</view>
				<view v-if="VideoOfImagesShow" @tap="chooseVideoImage" class="box-mode">
					<!-- <view class="uni-badge-left-margin">
						<uni-badge  isDot="true" absolute="rightTop" :text="value" size="small" type="error"></uni-badge>
					</view> -->
					<image class="full" :src="selectfile" mode=""></image>
				</view>
		</view>
		<view class="up-btn">
			<button class="button" type="primary" @tap="uploadVideo" :disabled="buttonDisable">上传视频</button>
		</view>
	</view>
</template>
<script>
	import BigUpload from '@/utils/upload.js';
import uploader from '@/utils/upload.js'
import upload from 'uview-ui/libs/config/props/upload';
import { APIS } from '../../staticData/Api';
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	export default {
		data() {
			return {
				value: 1,
				login: false,
				buttonDisable: false,
				abortTask: -1,
				// 图标
				clearIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDE2YTQgNCAwIDAgMSA0IDR2MTZINGE0IDQgMCAwIDEtNC00VjB6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9Ii45OCIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfYikiLz48cGF0aCBkPSJNMTAuOTQgOS45OTlsMi44NjMtMi44NTdhLjY2OS42NjkgMCAxIDAtLjk0Ni0uOTQ2TDEwIDkuMDYgNy4xNDMgNi4xOTZhLjY2OS42NjkgMCAwIDAtLjk0Ni45NDZsMi44NjQgMi44NTctMi44NjQgMi44NTdhLjY2Ni42NjYgMCAwIDAgLjIxNyAxLjA5Mi42NjQuNjY0IDAgMCAwIC43MjktLjE0NkwxMCAxMC45MzhsMi44NTcgMi44NjRhLjY2Ny42NjcgMCAwIDAgMS4wOTItLjIxNy42NjYuNjY2IDAgMCAwLS4xNDYtLjcyOUwxMC45MzkgMTB6IiBmaWxsPSIjZmZmIi8+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9iIiB4PSItNCIgeT0iLTQiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2UiIHN0ZERldmlhdGlvbj0iMiIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iZWZmZWN0MV9iYWNrZ3JvdW5kQmx1ciIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXIiIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIyMCIgeDI9IjE1LjU4NiIgeTI9IjIyLjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzBEMUUyOCIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA1MEUxMiIgc3RvcC1vcGFjaXR5PSIuNjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=',
				selectfile: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIuMjUiIHk9Ii4yNSIgd2lkdGg9IjYzLjUiIGhlaWdodD0iNjMuNSIgcng9IjMuNzUiIGZpbGw9IiNGMkYyRjIiIHN0cm9rZT0iI0YyRjJGMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxyZWN0IHg9IjE2IiB5PSIzMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjQkZCRkJGIi8+PHJlY3QgeD0iMzMiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDkwIDMzIDE2KSIgZmlsbD0iI0JGQkZCRiIvPjwvc3ZnPg==',
				VideoOfImagesShow: true, // 页面图片或视频数量超出后，拍照按钮隐藏
				imageList: [], //存放图片的地址
				videoList: [], //视频存放的地址
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				sourceTypeIndex: 2,
				cameraList: [{
					value: 'back',
					name: '后置摄像头',
					checked: 'true'
				}, {
					value: 'front',
					name: '前置摄像头'
				}],
				cameraIndex: 0, //上传视频时的数量
				maxCount:9//图片和视频允许上传的总数
			}
		},
		onShareAppMessage(res){
			if(res.from === 'button'){
				console.log(res.target)
			}
			return {
				title: "分享视频上传系统",
				path: "/pages/index/index"
			}
		},
		onShow(){
			let jwt = uni.getStorageSync("token")
			console.log(this.jwt)
			if(jwt !== ""){
				this.login = true
			}else{
				this.login = false
				uni.showToast({
					title: "暂未登录，请重新登录",
					duration:500
				})
				//重新尝试登录		
			}
		},
		onUnload() {
			(this.imageList = []), (this.sourceTypeIndex = 2), (this.sourceType = ['拍摄', '相册', '拍摄或相册']);
		},
		methods: {
			//点击上传图片或视频
			chooseVideoImage() {
				uni.showActionSheet({
					title: '选择上传类型',
					itemList: ['视频'],
					success: res => {
						this.chooseVideo();
					}
				});
			},
			//上传视频
			chooseVideo(index) {
				uni.chooseVideo({
					maxDuration: 60, //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
					count: this.maxCount,
					camera: this.cameraList[this.cameraIndex].value, //'front'、'back'，默认'back'
					sourceType: sourceType[this.sourceTypeIndex],
					compressed: false,
					success: res => {
						let jwt = uni.getStorageSync("token")
						let uploadFile = new BigUpload({
							filePath: res.tempFilePath,
							type: 'video/mp4',
							byteLength: res.size,
							size: 2097152,
							fileName: 'weixin_video.mp4',
							jwt: jwt,
							percent: 0,
						})
						this.videoList = this.videoList.concat(uploadFile);
						if (this.videoList.length == this.maxCount) {
							this.VideoOfImagesShow = false;
						}
						console.log(this.videoList);
					}
				})
			},
			//上传视频
			uploadVideo(){
				let judge = uni.getStorageSync("info")
				if(!judge){
					uni.showModal({
						title: "提示",
						content: "请完善个人信息",
						success: function(res){
							if(res.confirm){
								//跳转
								uni.navigateTo({
									url: "/pages/info/info"
								})
							}else if(res.cancel){
								console.log("取消")
							}
						}
						
					})
				}else if(this.videoList.length === 0){
					uni.showToast({
						duration:500,
						title:"暂无选择的视频",
						icon:'none'
					})
					return;
				}else{
					this.buttonDisable = true
					for(let i = 0; i <this.videoList.length;i++){
						let uploader = this.videoList[i]
						console.log(uploader.Setting.filePath)
						let jwt = uni.getStorageSync("token")
						let uploadTask = uni.uploadFile({
							url: APIS.uploadVideo,
							filePath: uploader.Setting.filePath,
							name: "test",
							header: {
								"Content-Type": "multipart/form-data",
								"Authorization": jwt
							},
							success: (res)=>{
								console.log(res)
								console.log(res.data)
								let re =  JSON.parse(res.data)
								if(re.code === 1){
									uni.showToast({
										title:"上传成功",
										duration: 1500
									})
									console.log(i)
									
									this.percent = 0
									this.videoList.splice(i, 1);
								}else{
									this.videoList[i].Setting.percent = 0
									uni.showToast({
										title: re.msg,
										duration:1500
									})
									this.buttonDisable = false
								}
							},
							fail: (res)=>{
								console.log(res)
								console.log(res.data)
								let re ={
									msg: ""
								}
								if(typeof(res.data) !== "undefined" &&res.data !== null){
									re =  JSON.parse(res.data)
								}else{
									re.msg = "上传终止"
								}
								uploader.Setting.percent = 0
								uni.showToast({
									title: re.msg,
									duration:1500
								})
								this.abortTask = -1
								this.buttonDisable = false
							},
							complete:()=>{
								console.log(this.videoList.length)
								if(i===0){
									this.buttonDisable = false
								}
							}
							
						})
						// console.log("up",uploader.Setting.uploadTask)
						console.log("up2",uploadTask)
						// console.log("dn",uploader.Setting.uploadTask)
						uploadTask.onProgressUpdate((res)=>{
							uploader.Setting.percent = res.progress
							if(this.abortTask ===i){
								uploadTask.abort()
							}
						})
					}
				}
				
			},
			// 删除视频
			delectVideo(index) {
				this.buttonDisable = false
				uni.showModal({
					title: '提示',
					content: '是否要删除此视频',
					success: res => {
						if (res.confirm) {
							// let data = this.videoList[index]
							// let uploadTask = data.Setting.uploadTask
							// console.log(uploadTask)
							this.abortTask = index
							this.videoList.splice(index, 1);
						}
						if (this.videoList.length  == this.maxCount) {
							this.VideoOfImagesShow = false;
						} else {
							this.VideoOfImagesShow = true;
						}
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	page{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		height: 100%;
	}
	/* 统一上传后显示的盒子宽高比 */
	.uploader-container{
		display: flex;
		width: 100%;
		margin: 8rpx;
		height: inherit;
		flex-direction: column;
	}
	.box-mode {
		margin-top: 5vw;
		width: 27vw;
		height: 27vw;
		
		border-radius: 8rpx;
		overflow: visible;
		
		
	}
	.uni-badge-left-margin {
			height: 40rpx;
			width: 40rpx;
			position: absolute;
			right: 0rpx;
			top:0rpx;
			z-index: 1000;
		}
	
	.full {
		width: 100%;
		height: 100%;
		position: relative;
		
	}
 
	.up-page {
		display: flex;
		flex-wrap: wrap;
		display: flex;
		width: 100%;
		.show-box:nth-child(3n){
			margin-right: 0;
		}
		.show-box {
			position: relative;
			margin-bottom:4vw;
			margin-right: 4vw;
			@extend .box-mode;
 
			.delect-icon {
				height: 40rpx;
				width: 40rpx;
				position: absolute;
				right: 0rpx;
				top: 0rpx;
				z-index: 1000;
			}
			
			.progress-box{
				z-index: 1001;
				height: 20rpx;
				width: 100%;
				bottom: 0rpx;
				left: 0rpx;
				
				.upload-progress{
					z-index: 1002;
					height: 100%;
				}
			}
		}
	}
	.up-btn{
		display: flex;
		width: 100%;
		justify-content: center;
		margin-top: 200rpx;
		.button{
			font-size: 30rpx;
		}
	}
	
	
 
</style>

<template>
	<view class="upload-container">
		<video class="show-video" :src="showVidSrc"></video>
		<view class="up-page">
				<!--视频-->
				<view class="show-box" v-if="uploadVideo !== null">
					<video class="full" :src="uploadVideo.Setting.filePath"></video>
					<view  class="delect-icon" @tap="delectVideo">
						<image class="full" :src="clearIcon" mode=""></image>
					</view>
					<view class="progress-box">
						<progress class="upload-progress"  :percent="uploadVideo.Setting.percent" stroke-width="3" color="#10AEFF" active="true" active-mode="forwards" backgroundColor="#d9d9d9"></progress>
					</view>
				</view>
				<view v-if="VideoShow" @tap="chooseVideoImage" class="box-mode">
					<image class="full" :src="selectfile" mode=""></image>
				</view>
		</view>
	</view>
</template>

<script>
import {inject} from 'vue'
import { APIS } from '../staticData/Api'
import BigUpload from '../utils/upload'
import base from '../utils/base.js'
	export default{
		name: "uploadCard",
		props:{
			showVideoSrc: {
				type: String,
				default: ''
			},
			uploadVideoIndex:{
				type: Number,
				default: 0
			},
			uploadVideoTotal:{
				type: Number,
				default: 0
			}
		},
		created(){
			this.emitter.on('start-upload',this.startUpload)
		},
		beforeDestroy(){
			this.emitter.off('start-upload',this.startUpload)
		},
		data(){
			return{
				VideoShow: true,
				clearIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDE2YTQgNCAwIDAgMSA0IDR2MTZINGE0IDQgMCAwIDEtNC00VjB6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9Ii45OCIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfYikiLz48cGF0aCBkPSJNMTAuOTQgOS45OTlsMi44NjMtMi44NTdhLjY2OS42NjkgMCAxIDAtLjk0Ni0uOTQ2TDEwIDkuMDYgNy4xNDMgNi4xOTZhLjY2OS42NjkgMCAwIDAtLjk0Ni45NDZsMi44NjQgMi44NTctMi44NjQgMi44NTdhLjY2Ni42NjYgMCAwIDAgLjIxNyAxLjA5Mi42NjQuNjY0IDAgMCAwIC43MjktLjE0NkwxMCAxMC45MzhsMi44NTcgMi44NjRhLjY2Ny42NjcgMCAwIDAgMS4wOTItLjIxNy42NjYuNjY2IDAgMCAwLS4xNDYtLjcyOUwxMC45MzkgMTB6IiBmaWxsPSIjZmZmIi8+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9iIiB4PSItNCIgeT0iLTQiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2UiIHN0ZERldmlhdGlvbj0iMiIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iZWZmZWN0MV9iYWNrZ3JvdW5kQmx1ciIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXIiIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIyMCIgeDI9IjE1LjU4NiIgeTI9IjIyLjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzBEMUUyOCIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA1MEUxMiIgc3RvcC1vcGFjaXR5PSIuNjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=',
				selectfile: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIuMjUiIHk9Ii4yNSIgd2lkdGg9IjYzLjUiIGhlaWdodD0iNjMuNSIgcng9IjMuNzUiIGZpbGw9IiNGMkYyRjIiIHN0cm9rZT0iI0YyRjJGMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxyZWN0IHg9IjE2IiB5PSIzMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjQkZCRkJGIi8+PHJlY3QgeD0iMzMiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDkwIDMzIDE2KSIgZmlsbD0iI0JGQkZCRiIvPjwvc3ZnPg==',
				uploadVideo: null,
				cameraList:[{
					value: 'back',
					name: '后置摄像头',
					checked: 'true'
				},{
					value: 'front',
					name: '前置摄像头'
					
				}]
			}
		},
		onReady() {
			console.log("show data:",`${base.url}/ieVideos/`+this.showVideoSrc)
		},
		computed:{
			showVidSrc(){
				console.log("show data:",`${base.url}/ieVideos/`+this.showVideoSrc)
				return `${base.url}/ieVideos/`+this.showVideoSrc
			}
		},
		methods:{
			startUpload(){
				let jwt = uni.getStorageSync("token")
				let index = this.uploadVideoIndex
				let total = this.uploadVideoTotal
				console.log(this.uploadVideo)
				let uploadTask = uni.uploadFile({
					url: APIS.uploadMixVideo,
					filePath: this.uploadVideo.Setting.filePath,
					name: 'mixVideo',
					header:{
						"Content-Type": "multipart/form-data",
						"Authorization": jwt
					},
					formData:{
						'index':index,
						'total':total
					},
					success:(res)=>{
						console.log(res)
						if(res.data.code === 1){
							//上传成功
							uni.showToast({
								title:"上传成功",
								duration: 1500
							})
							this.uploadVideo.Setting.percent = 0
							this.$emit("min-count")
							this.uploadVideo = null
							this.VideoShow = true
						}else{
							uni.showToast({
								title: res.data.msg,
								duration:1500
							})
							this.uploadVideo.Setting.percent = 0
							this.$emit("min-count")
							this.uploadVideo = null
							this.VideoShow = true	
						}
					},
					fail: (res)=>{
						console.log(res)
						uni.showToast({
							title:"上传失败",
							duration: 500,
							icon:'none'
						})
					},
					complete:()=>{
						this.$emit("enable-btn")
					}
				})
				uploadTask.onProgressUpdate((res)=>{
					this.uploadVideo.Setting.percent = res.progress
				})
			},
			delectVideo(){
				uni.showModal({
					title: '提示',
					content: '是否要删除此视频',
					success: res=>{
						if(res.confirm){
							this.$emit("min-count")
							this.uploadVideo = null
							this.VideoShow = true
						}else{
							return
						}
					}
				})
			},
			chooseVideoImage(){
				uni.chooseVideo({
					maxDuration: 60,
					camera: this.cameraList[0].value,
					compressed:false,
					success: res=>{
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
						this.VideoShow = false
						this.uploadVideo = uploadFile
						this.$emit("plus-count")
						console.log("uploadVideo: ",this.uploadVideo)
					}
				})
			}
		}
		
		
	}
</script>

<style lang="less">
	page{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		height: 100%;
	}
	.upload-container{
		width: 100px;
		height: 210px;
		position: relative;
	}
	.show-video{
		width: 90px;
		height: 90px;
	}
	.up-page{
		margin-top: 5px;
		width: 90px;
		height: 90px;
		
		border-radius: 8rpx;
		overflow: visible;
	}
	.box-mode{
		margin-top: 5px;
		width: 90px;
		height: 90px;
		
		border-radius: 8rpx;
		overflow: visible;
	}
	.show-box{
		position: relative;
		margin-top: 5px;
		width: 90px;
		height: 90px;
		
		border-radius: 8rpx;
		overflow: visible;
		.delect-icon {
			height: 40rpx;
			width: 40rpx;
			position: absolute;
			right: 0rpx;
			top: 0rpx;
			z-index: 1000;
		}
	}
	.full{
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
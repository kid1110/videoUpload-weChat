<template>
	<view class="show-title">
		<uni-title type="h1" title="上传与分析步骤" color="#FF6A6A" align="center"></uni-title>
	</view>
	<view class="video-upload">
		<uni-section title="视频上传指南" type="line">
			<p>&nbsp;&nbsp;请您按照下面的视频示例顺序拍摄，每个动作重复10次，且动作迅速，然后按照顺序上传。</p>
		</uni-section>
		<view class="video-guide">
			<uploadCard v-for="(item,index) in showVideoNames" :key="index" :showVideoSrc="item" @plus-count="addCount" :uploadVideoIndex="index" :uploadVideoTotal="videoCount" @min-count="minCount" @enable-btn="enableBtn"></uploadCard>
		</view>
	</view>
	<view class="analysis-guide">
		<uni-section title="分析视频指南" type="line">
			<p>&nbsp;&nbsp;尝试视频分析的时候麻烦选择模型<string>test</string><br></p>
			<p class="analy-p">
			</p>
		</uni-section>
	</view>
	<view class="upload-btn">
		<button class="button" type="warn" @tap="uploadVideo" :disabled="startUpload" >上传视频</button>
	</view>
</template>

<script>
	import {reactive} from 'vue'
	import uploadCard from "../../components/uploadCard.vue"
	export default{
		components:{
			uploadCard
		},
		data(){
			return{
				showVideoNames: [],
				videoCount: 0,
				uploadCount: 0,
				startUpload:false,
				eventBus:null
			}
	
		},
		onReady() {
			this.getStaticVideo()
		},
		methods:{
			enableBtn(){
				this.startUpload = false
			},
			minCount(){
				if(this.uploadCount >0){
					this.uploadCount--
				}else{
					this.uploadCount = 0
				}
			},
			addCount(){
				this.uploadCount++
			},
			getStaticVideo(){
				uni.getFileSystemManager().readdir({
					dirPath: '/static/video',
					success: (res)=>{
						this.videoCount = res.files.length
						this.showVideoNames = res.files
						console.log('video Count: ',this.videoCount)
						console.log('showVideoNames : ',this.showVideoNames)
					}
				})
			},
			uploadVideo(){
				if(this.videoCount !== this.uploadCount){
					uni.showToast({
						duration:500,
						title: "请完成所有手势",
						icon:'none'
					})
				}else{
					this.startUpload = true
					this.emitter.emit('start-upload')
				}
			}
		}
	}
</script>

<style>
	.video-upload{
		margin-left: 8rpx;
		margin-right: 8rpx;
		line-height: 1.5rem;
	}
	.video-guide{
		display: flex;
		margin-top: 10rpx;
		flex-wrap: wrap;
	}
	.guide{
		margin: 5rpx;
		width: 100px;
		height: 110px;
	}
	.analy-p{
		text-align: center;
		margin-bottom: 8rpx;
	}
	.upload-btn{
		display: flex;
		width: 100%;
		justify-content: center;
		margin-top: 100rpx;
	}
	.button{
		font-size: 30rpx;
	}
</style>
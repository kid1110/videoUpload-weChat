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
			
			<view class="mark">
				<p>&nbsp;&nbsp;开发单位：</p>
				<p>&nbsp;&nbsp;广东工业大学</p>
				<p>&nbsp;&nbsp;广州医科大学附属脑科医院</p>
				<p>&nbsp;&nbsp;广州杰超科技有限公司</p>
			</view>
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
	import {getIeVideos} from "../../utils/api.js"
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
				// uni.getFileSystemManager().readdir({
				// 	dirPath: '/static/video',
				// 	success: (res)=>{
				// 		this.videoCount = res.files.length
				// 		this.showVideoNames = res.files
				// 		console.log('video Count: ',this.videoCount)
				// 		console.log('showVideoNames : ',this.showVideoNames)
				// 	}
				// })
				getIeVideos().then(res=>{
					if(res.code === 1){
						console.log("tewf",res)
						this.showVideoNames = res.data.sort((a,b)=>{
							 const aNum = parseInt(a.match(/\d+/)[0]); // 提取字符串中的数字部分并转换为数字
							  const bNum = parseInt(b.match(/\d+/)[0]); 
							  return aNum - bNum; // 按照数字大小进行排序
						})
						this.videoCount = this.showVideoNames.length
						
					}
				}).catch(err=>console.log(err))
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
	.mark{
		margin-top: 10px;
	}
</style>
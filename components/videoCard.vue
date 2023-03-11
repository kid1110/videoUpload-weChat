<template>
	<view class="video-container">
		<uni-card class="video-card" title="标题文字">
		<template v-slot:title>
			<view class="button-container">
				<button class="video-button" size="mini" :loading="startAnalysis" @click="analysisVideo" :disabled="startAnalysis || startDelete">开始分析</button>
				<picker mode="selector" class="video-picker" @change="modelChange"  :vlaue="index" @cancel="modelCancel" :range="modelList" range-key="modelName" >
					<button class="video-button" size="mini" @click="chooseModel" :disabled="startAnalysis ">模型选择</button>
				</picker>
				<button class="video-button" size="mini" @click="deleteVideo" :disabled="startAnalysis || startDelete">删除视频</button>
			</view>
		</template>
		<video :src="videoSrc" class="video-self" ></video>
		<uni-collapse class="videoInfo-collapse">
			<uni-collapse-item title="分析信息" v-if="getOutput || getModel">
				<uni-list>
					<uni-list-item title="模型名称" :note="modelName"></uni-list-item>
					<uni-list-item class="out-list"  v-if="getOutput" :clickable="!startDownLoadVideo" @click="getNewVideo">
						<!-- <template v-slot:footer>
							<progress :percent="100">test</progress>
						</template> -->
						<template v-slot:body class="new-video">
							<p>新视频名称:</p>
							<p>{{handledNewVideoName}}</p>
							<progress show-info :percent="videoPercent" v-if="startDownLoadVideo"></progress>
						</template>
					</uni-list-item>
					<uni-list-item v-if="getOutput" :clickable="!startDownLoadFile" @click="getNewOutput">
						<template v-slot:body class="new-video">
							<p>新分析结果:</p>
							<p>{{handledNewOutputName}}</p>
							<progress show-info :percent="filePercent" v-if="startDownLoadFile"></progress>
						</template>
					</uni-list-item>
				</uni-list>	
			</uni-collapse-item>
		</uni-collapse>
		</uni-card>
	</view>
	<view>	<!-- 删除提示窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" content="是否删除该视频" @confirm="deleteConfirm"
				@close="deleteClose"></uni-popup-dialog>
		</uni-popup>
	</view>
	<view>
		<uni-popup ref='saveVideoDialog' type="dialog">
			<uni-popup-dialog type="info" cancelText="关闭" confirmText="同意" title="通知" content="是否下载已分析的视频" @confirm="saveVideoConfirm"
				@close="saveVideoClose">
			</uni-popup-dialog>
		</uni-popup>
	</view>
	<view>
		<uni-popup ref='saveOutputDialog' type="dialog">
			<uni-popup-dialog type="info" cancelText="关闭" confirmText="同意" title="通知" content="是否下载分析结果" @confirm="saveOutputConfirm"
				@close="saveOutputClose">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import base from "@/utils/base.js"
import {deleteVideoApi,listModelApi,analysisVideoApi} from '@/utils/api.js'
	export default{
		name: "videoCard",
		props:{
			videoSrc: {
				type: String,
				default: ""
			},
			vid:{
				type: Number,
				default: 0
			},
			modelList:{
				type:Object,
				default: []
			},
			analyVideoSrc:{
				type: String,
				default: ""
			}
			
		},
		data(){
			return{
				msgType: "error",
				index:0,
				visitUrl:"",
				startAnalysis: false,
				startDelete: false,
				getOutput: false,
				getModel: false,
				startDownLoadVideo: false,
				startDownLoadFile: false,
				modelName: "暂无模型",
				outputEntity:{
					newOutputPath: "",
					newVideoPath: ""
				},
				handledNewVideoName: "",
				handledNewOutputName: "",
				newLocalOutput: "",
				saveVideoSuffix: "",
				saveOutputSuffix: "",
				saveVideoPre: "",
				saveOutputPre: "",
				videoPercent: 0,
				filePercent:0
			};
		},
		methods:{
			saveOutputClose(){
				this.$refs.saveOutputDialog.close()
			},
			getNewOutput(){
				this.$refs.saveOutputDialog.open()
			},
			saveVideoClose(){
				this.$refs.saveOutputDialog.close()
			},
			downloadFile(url){
				let judge = this.getSuffix(url)
				let newFileName = ""
				if(judge === this.saveVideoSuffix){
					newFileName = this.saveVideoPre+"."+this.saveVideoSuffix
				}else{
					newFileName = this.saveOutputPre+"."+this.saveOutputSuffix
				}
				url = base.url+url
				console.log(url)
				const downloadTask = uni.downloadFile({
					url: url,
					timeout:1000*60*2*60,
					success: (res)=>{
						console.log("downloadFile", res)
						if(res.statusCode ===200){
							console.log('下载成功')
						}
						let that = this
						if(judge === this.saveVideoSuffix){
							this.startDownLoadVideo = false
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath
							})
						}else{
							this.startDownLoadFile = false
							//保存文件
							let fsm = uni.getFileSystemManager()
							fsm.saveFile({
								tempFilePath: res.tempFilePath,
								filePath: wx.env.USER_DATA_PATH+'/'+this.handledNewOutputName,
								success: (red=>{
									console.log("下载文件成功",red)
									setTimeout(()=>{
										uni.openDocument({
											filePath: red.savedFilePath,
											showMenu: true,
											success: function(res){
												console.log('打开文档成功');
											},
											fail: function(res){
												console.log('打开文档失败');
											}
										})
									},3000)
								})
							})
						}
						
					},
					
					
				})
				downloadTask.onProgressUpdate((res)=>{
					console.log('下载进度' +res.progress)
					if(judge === this.saveVideoSuffix){
						this.startDownLoadVideo = true
						this.videoPercent = res.progress
					}else{
						this.startDownLoadFile = true
						this.filePercent = res.progress
					}
				})
			},
			saveOutputConfirm(){
				this.downloadFile(this.outputEntity.newOutputPath)
			},
			saveVideoConfirm(){
				this.downloadFile(this.outputEntity.newVideoPath)
	
			},
			getNamePre(url){
					let index = url.lastIndexOf(".")
					 return url.substring(0,index)
			},
			getSuffix(url){
				let index = url.lastIndexOf(".")
				return url.substring(index+1)
			},
			handleName(url){
			  return url.substring(9,url.length)
			},
			getNewVideo(){
				this.$refs.saveVideoDialog.open()
			},
			analysisVideo(){
				if(this.visitUrl === ""){
					uni.showToast({
						duration:500,
						title: "暂未选择模型",
						icon:'none'
					})
					return;
				}else{
					this.startAnalysis = true
					analysisVideoApi(this.analyVideoSrc,this.visitUrl).then(res=>{
						if(res.code === 1){
							//如果分析成功
							this.startAnalysis = false
							uni.showToast({
								duration:500,
								title: "分析成功",
								icon:'success'
							})
							this.outputEntity = res.data
							this.getOutput = true
							//设置内容
							this.handledNewVideoName = this.handleName(this.outputEntity.newVideoPath)
							this.handledNewOutputName = this.handleName(this.outputEntity.newOutputPath)
							this.saveVideoSuffix = this.getSuffix(this.handledNewVideoName)
							this.saveOutputSuffix = this.getSuffix(this.handledNewOutputName)
							this.saveVideoPre = this.getNamePre(this.handledNewVideoName)
							this.saveOutputPre = this.getNamePre(this.handledNewOutputName)
							console.log("suffix",this.saveOutputSuffix)
							console.log("vsuffix",this.saveVideoSuffix)
							console.log("output",this.outputEntity)
						}else if(this.startAnalysis === true){
							uni.showToast({
								duration: 500,
								title: "分析失败",
								icon:"error"
							})
							this.startAnalysis = false
							return;
						}else{
							uni.showToast({
								duration:500,
								title: res.msg,
								icon: 'error'
							})
							this.startAnalysis = false
						}
					})
				}	
			},
			modelCancel(){
				this.index = 0
				this.visitUrl = ""
				this.modelName = "暂无模型"
				this.getModel = false
			},
			chooseModel(){
				this.$emit("refresh-models")
			},
			modelChange(e){
				console.log("test",e.detail.value)
				this.index = e.detail.value
				this.visitUrl = this.modelList[this.index].visitUrl
				this.modelName = this.modelList[this.index].modelName
				console.log("alalysis",this.visitUrl)
				
				this.getModel =  true
			},
			deleteClose(){
				this.$refs.alertDialog.close()
			},
			deleteConfirm(){
				this.startDelete = true
				deleteVideoApi(this.vid).then(res=>{
					if(res.code === 1){
						uni.showToast({
							duration:1000,
							title: "删除成功"
						})
						this.startDelete = false
						this.$emit("refresh-videos")
					}else{
						this.startDelete = false
						uni.showToast({
							duration:500,
							title:"删除失败",
							icon:"error"
						})
					}
				})
			},
			deleteVideo(){
				console.log(this.index)
				this.$refs.alertDialog.open()
			}
		}
	}
</script>

<style>
	.video-container{
		padding: 0;
	}
	body{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.video-card{
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.video-self{
		/* width: 400rpx; */
	}
	.button-container{
		/* position: absolute; */
		/* left: 50%; */
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.video-button{
		margin: 0;
		margin-right: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 0;
		background-color: #FF6A6A;
		color: #fff;
	}
	
	.video-picker{
		padding: 0;
		margin: 0;
		margin-top: 10rpx;
		margin-right: 5rpx;
		position: relative;
	}
	.videoInfo-collapse{
		width: inherit;
	}
	.out-list{
		display: flex;
		flex-direction: column;
	}
	.new-video{
		width: 100%;
		font-size: 14px;
	}

</style>
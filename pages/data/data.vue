<template>
	<view>
		<videoCard v-for="item in videoInfoList" :key= "item.vid" :videoSrc="handleVideoSrc(item.videoUrl)" :vid="item.vid" @refresh-videos="refreshVideos()" :modelList="modelList" @refresh-models="listModel()" :analyVideoSrc="item.videoUrl"></videoCard>
	</view>
</template>

<script>
	import videoCard from "../../components/videoCard.vue"
	import {getMyVideosApi,listModelApi,analysisVideoApi} from '@/utils/api.js'
	export default{
		components:{
			videoCard
		},
		data(){
			return{
				videoInfoList: [],
				modelList:[],
			};
		},
		onShareAppMessage(res){
			if(res.from === 'button'){
				console.log(res.target)
			}
			return {
				title: "分享视频上传系统",
				path: "/pages/data/data"
			}
		},
		onLoad() {
			this.getVideos()
			this.listModel()
		},
		onTabItemTap(){
			this.getVideos()
			this.listModel()
		},
		onNavigationBarButtonTap() {
			this.getVideos()
			this.listModel()
		},
		methods:{
			test(){
				analysisVideoApi("0a881f01-5729-4a4b-86b0-0362e68ccf44.mp4",":1234/handlerVideos").then(res=>{
					console.log(res)
				})
				
			},
			refreshVideos(){
				this.getVideos()
			},
			listModel(){
				listModelApi().then(res=>{
					if(res.code === 1){
						this.modelList = res.data
						console.log("modelList",this.modelList)
				
					}else{
						this.modelList.push(res.msg) 
					}
				})
			},
			getVideos(){
				getMyVideosApi().then(res=>{
					console.log('video',res)
					if(res.code === 1){
						this.videosList = res.data
						this.videoInfoList = res.data
						console.log(this.videoInfoList)
						
					}else{
						this.videoInfoList = []
					}
				})
			},
			handleVideoSrc(rawVideoSrc){
				return "https://video.kkid.fun/videos/"+rawVideoSrc
			}
			
		}
	}
</script>


<style>
</style>
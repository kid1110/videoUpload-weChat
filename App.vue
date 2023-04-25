<script>
	import {APIS} from "./staticData/Api.js"
	import {getMyInfoApi} from "./utils/api.js"
	export default {
		data(){
			return{
				code : ""
			};
		},
		onLaunch: function() {
			this.getAuth()
			uni.setStorageSync("show",false)
			
		},
		onShow: function() {
			this.loginAuth()
			this.getMyInfo()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getAuth(){
				uni.authorize({
					scope: 'filesystem',
					 success() {
					    console.log('授权成功')
					  },
					  fail() {
					    console.log('授权失败')
					  }
				})
			},
			getMyInfo(){
				getMyInfoApi().then(res=>{
					if(res.code === 1){
						//如果信息存在则存入数据
						uni.setStorageSync("info",true)
					}else if(res.code === -513){
						uni.setStorageSync("info",false)
					}
				})
			},
			 loginAuth(){
				 let signCode
				 //onlaunch时就进行登录
				
				 uni.showToast({
				 	title:"登录中",
				 	icon:'loading'
				 })
				 console.log('App Launch')
				 uni.login({
				 	success: async(res)=>{
				 		console.log(res)
				 		if(res.errMsg === 'login:ok'){
				 				//TODO 向后台发送登录请求
								console.log("signCode",signCode)
								signCode = res.code
								uni.request({
									url: APIS.login,
									method:"POST",
									header: {
										"Content-Type": "application/x-www-form-urlencoded"
									},
									data: {
										code: signCode
									},
									success: (res) =>{
										//请求成功
										console.log("res222",res)
										console.log(res.statusCode)
										if(res.data.code === 1){
											//如果获取数据成功 存入store
											uni.setStorageSync("token",res.data.data)
										}else{
												uni.showModal({
													title:"登录提醒",
													content: res.data.msg,
													success: (res)=>{
														if(res.confirm){
															this.loginAuth()
														}else if(res.cancel){
															return;
														}	
													}
												})
										}
									},
									fail: (res)=>{
										//请求失败
										this.loginAuth()
									}
								})
				 				
				 		}
				 	},
				 	fail: (err)=>{
				 		console.log(err)
				 	},
				 	complete: ()=>{
				 		uni.hideLoading()
				 	}
				 })
				 
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	
</style>

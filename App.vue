<script>
	import {APIS} from "./staticData/Api.js"
	export default {
		onLaunch: function() {
			let token = uni.getStorageSync("token")
			console.log(token)
			if( token!== ""){
				console.log(uni.getStorageSync("token"))
				return;
			}
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
							let ret = this.loginAuth()
							console.log(ret)
					}
				},
				fail: (err)=>{
					console.log(err)
				},
				complete: ()=>{
					uni.hideLoading()
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			 loginAuth(data){
				uni.request({
					url: APIS.login,
					method:"POST",
					header: {
						'Authorization':''
					},
					data: data,
					success: (res) =>{
						//请求成功
						console.log("res222",res)
						console.log(res.statusCode)
						if(res.statusCode === 404){
							uni.showModal({
								title:"登录提醒",
								content:"网络故障，请麻烦重新登录",
								success: (res)=>{
									if(res.confirm){
										console.log("hhhhh")
										this.loginAuth()
									}else if(res.cancel){
										console.log("hhhhh")
									}	
								}
							})
							
						}
					},
					fail: (res)=>{
						//请求失败
						
					}
				})
				
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

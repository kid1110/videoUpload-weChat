uni.addInterceptor('request',{
	invoke(e){
		console.log("hello")
		let jwt = uni.getStorageSync("token")
		
		console.log("jwt",jwt)
		if(jwt === ""){
			//需要登录
			uni.showToast({
				title:"请重新登录",
				duration: 500
			})
			return
		}else{
			//没问题就设置请求头
			console.log(e)
			e.header = {
				'content-type': "application/x-www-form-urlencoded",
				'Authorization': jwt
			}
			if(e.url.includes("updateInfo")){
				e.header = {
					'content-type': "application/json",
					'Authorization': jwt
				}
			}
		}
	},
	fail(e){
		uni.showToast({
			title:"网络请求错误",
			duration:500
		})
	},
	
	
})
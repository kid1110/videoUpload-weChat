import base from "./base";

export default class Request{
	http(param){
		let url = param.url,
		method = param.method,
		data = param.data || {},
		header = param.header||{},
		hideLoading = param.hideLoading || true;
		let requestUrl = url;
		if(method){
			method = method.toUpperCase();
		}
		
		//加载圈
		if(!hideLoading){
			uni.showLoading({
				title:"加载中..."
			});
		}
		
		console.log("heladeer",header)
		return new Promise((resolve,reject)=>{
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res)=>{
					if(res.statusCode && res.statusCode != 200){
						uni.showToast({
							title: "请求错误" +res.errMsg,
							icon:"none"
						});
						return;
					}
					console.log(res)
					resolve(res.data)
				},
				//请求错误
				fail:(e)=>{
					resolve(e.data)
				},
				complete(){
					if(!hideLoading){
						uni.hideLoading();
					}
					resolve();
					return;
				}
			})
		})
	}
}
<template>
	<view class="my-container">
		<view class="userinfo">
			<button class="userinfo-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl"></image>
			</button>	
			<input @blur="updateUserName" @input="getNickName" :value="nickname" type="input" class="userinfo-name"  placeholder="请输入昵称" />
			<view v-if = "login">
				<button  class="login-button" type="primary" @click="loginAuth">登录</button>
			</view>
		</view>
		
		<view class="my-card">
			<uni-list v-if="!login">
				<uni-list-item class="my-info" showArrow title="个人信息"  link to="/pages/info/info">
					
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
import { provide } from "vue"
import {APIS} from '@/staticData/Api.js'
import jwt_decode from "jwt-decode"
import {updateUserNameApi} from '@/utils/api.js'
		export default{
			data(){
				return{
					avatarUrl:"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
					token: "",
					nickname: "",
					login: true,
					jwt: ""
				};
			},
			onShow(){
				this.jwt = uni.getStorageSync("token")
				console.log(this.jwt)
				if(this.jwt !== ""){
					this.login = false
					//获取名字
					this.nickname = jwt_decode(this.jwt).username
				}else{
					this.login = true
					//重新尝试登录		
				}
			},
			methods:{
				getNickName(e){
						this.nickname = e.detail.value
				},
				onChooseAvatar(e){
					console.log("e",e)
					
					this.avatarUrl = e.detail.avatarUrl
				},
				loginAuth(){
					uni.login({
						provider:"weixin",
						success: (res)=>{
							if(res.errMsg === 'login:ok'){
								//尝试请求登录
								let signCode = res.code
								uni.request({
									url:APIS.login,
									method:"POST",
									header: {
										"Content-Type": "application/x-www-form-urlencoded"
									},
									data: {
										code: signCode
									},
									success: (res)=>{
										//成功登录
										if(res.data.code === 1){
											uni.setStorageSync("token",res.data.data)
											this.jwt = res.data.data
											this.nickname = jwt_decode(this.jwt).username
											this.login  = false
											uni.showToast({
												title:"登录成功",
												duration:500
											})
										}else{
											uni.showToast({
												title: res.data.msg,
												duration:500
											})
											this.login = true
											uni.hideToast()
										}
										
									},
									fail: (res)=>{
										uni.showToast({
											title:"登录失败",
											duration: 500
										})
										this.login = true
										uni.hideToast()
									}
								})
							}
						}
					})
				},
				updateUserName(){
					console.log(this.nickname)
					updateUserNameApi(this.nickname).then(res=>{
						console.log(res)
						if(res.code === 1){
							uni.showToast({
								title: "用户名修改成功",
								duration: 500,
								icon:"success"
							})
						}else{
							uni.showToast({
								title:res.msg,
								duration:500,
								icon:"error"
							})
							//需要重新登录
							this.login = true
						}
					})
				}
			}
		}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #e493d8; 
		background-image:
			radial-gradient(closest-side,rgba(235,105,78,1),rgba(235,105,78,0)),
			radial-gradient(closest-side,rgba(243,11,164,1),rgba(243,11,164,0)),
			radial-gradient(closest-side,rgba(254,234,131,1),rgba(254,234,131,0)),
			radial-gradient(closest-side,rgba(170,142,245,1),rgba(170,142,245,0)),
			radial-gradient(closest-side,rgba(248,192,147,1),rgba(248,192,147,0));
		background-size: 
			130vmax 130vmax,
			80vmax 80vmax,
			90vmax 90vmax,
			110vmax 110vmax,
			90vmax 90vmax;
		background-position: 
			-80vmax -80vmax,
			60vmax -30vmax,
			10vmax 10vmax,
			-30vmax -10vmax,
			50vmax 50vmax;
		background-repeat: no-repeat;
		animation: 3s movement linear infinite;
	}
	@keyframes movement{
		0%, 100%{
			background-size:
				130vmax 130vmax,
				80vmax 80vmax,
				90vmax 90vmax,
				110vmax 110vmax,
				90vmax 90vmax;
			background-position: 
				-80vmax -80vmax,
				60vmax -30vmax,
				10vmax 10vmax,
				-30vmax -10vmax,
				50vmax 50vmax;
		}
		25%{
			background-size:
				100vmax 100vmax,
				90vmax 90vmax,
				100vmax 100vmax,
				90vmax 90vmax,
				60vmax 60vmax;
			background-position: 
				-60vmax -90vmax,
				50vmax -40vmax,
				0vmax -20vmax,
				-40vmax -20vmax,
				40vmax 60vmax;
		}
		50%{
			background-size:
				80vmax 80vmax,
				110vmax 110vmax,
				80vmax 80vmax,
				60vmax 60vmax,
				80vmax 80vmax;
			background-position: 
				-50vmax -70vmax,
				40vmax -30vmax,
				10vmax 0vmax,
				20vmax 10vmax,
				30vmax 70vmax;
		}
		75%{
			background-size:
				90vmax 90vmax,
				90vmax 90vmax,
				100vmax 100vmax,
				90vmax 90vmax,
				70vmax 70vmax;
			background-position: 
				-50vmax -40vmax,
				50vmax -30vmax,
				20vmax 0vmax,
				-10vmax 10vmax,
				40vmax 60vmax;
		}
	}
	.my-container {
		position: relative;
		width: inherit;
		height: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.userinfo{
		position: absolute;
		height: 30%;
		top: 80rpx;
		color: #fff;
	}
	.userinfo-avatar{
		overflow: hidden;
		width: 160rpx;
		padding: 0rpx;
		height: 160rpx;
		border-radius: 50%;
	}
	.avatar{
		/* transform: translate(-25rpx,-25rpx); */
		background-size: 100%;
		width: 160rpx;
		height: 160rpx;
		margin:0rpx;
		border-radius: 50%;
		border: 0px solid #fff;
	}
	.userinfo-name{
		display: flex;
		font-size: 30rpx;
		color: black;
		margin: 20rpx;
		text-align: center;
		
	}
	
	.login-button{
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 200rpx;
		text-align: center;
		border-radius: 2px;
		font-size: 30rpx;
	}
	.my-card{
		position: absolute;
		display: grid;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 10rpx;
		box-shadow: 2rpx 2rpx 2rpx black;
		opacity: .6;
		width: 80%;
		height: 60%;
		bottom: 30rpx;
	}
</style>
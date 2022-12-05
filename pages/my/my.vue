<template>
	<view class="my-container">
		<view class="userinfo">
			<button class="userinfo-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl"></image>
			</button>	
			<input @blur="updateUserName" @input="getNickName" :value="nickname" type="input" class="userinfo-name"  placeholder="请输入昵称" />
		</view>
		<view v-if = "login">
			<button  class="login-button" type="primary" @click="loginAuth">登录</button>
		</view>
	</view>
</template>

<script>
import { provide } from "vue"
import {APIS} from '@/staticData/Api.js'
import jwt_decode from "jwt-decode"
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
					console.log(e)
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
					uni.request({
						url: APIS.updateName,
						method:"PUT",
						data:{
							
							username: this.nickname
						},
						header:{
							"Content-Type": "application/x-www-form-urlencoded",
							"Authorization": this.jwt
						},
						success: (res)=>{
							console.log(res)
							if(res.data.code === 1){
								uni.showToast({
									title: "用户名修改成功",
									duration: 500
								})
								uni.setStorageSync("token",res.data.data)
								this.nickname = jwt_decode(res.data.data).username
							}else{
								uni.showToast({
									title: res.data.msg+"请先登录",
									duration: 500,
									icon:"error"
								})
								this.login = true
							}
						}
					})
				}
			}
		}
</script>

<style>
	.my-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.userinfo{
		position: relative;
		height: 100%;
		margin-top: 30%;
		margin-left: 50%;
		margin-right: 50%;
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
		margin-top: 10px;
		text-align: center;
		border-radius: 2px;
		font-size: 30rpx;
	}
</style>
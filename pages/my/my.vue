<template>
	<view class="my-container">
		<view class="userinfo">
			<button class="userinfo-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl"></image>
			</button>	
			<input @input="getNickName" type="input" class="userinfo-name"  placeholder="请输入昵称" />
		</view>
	</view>
</template>

<script>
import { provide } from "vue"
import {APIS} from '@/staticData/Api.js'
		export default{
			data(){
				return{
					avatarUrl:"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
					token: "",
					nickname: ""
				};
			},
			
			methods:{
				getNickName(e){
					console.log(e)
					this.nickname = e.detail.value
				},
				onChooseAvatar(e){
					console.log("e",e)
					
					this.avatarUrl = e.detail.avatarUrl
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
		font-size: 25rpx;
		color: black;
		margin: 10rpx;
		text-align: center;
		
	}
	
	.login-button{
		margin-top: 10px;
		text-align: center;
		border-radius: 0px;
		font-size: 30rpx;
	}
</style>
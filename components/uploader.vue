<template>
	<view class="uploader-container">
		<view class="video-info">
			<view class="video-photo">
				<image >test</image>
			</view>
			<view class="video-shortcut">
				<text class="shortcut"></text>
			</view>
		</view>
		<view class="video-tarbar">
			
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.uploader-container{
		display: flex;
		border: solid 2rpx;
		margin-left: 8rpx;
		margin-right: 8rpx;
		height: 250rpx;
		border-radius: 10rpx;
	}
	
	.video-info{
		padding: 0rpx;
		height: 160rpx;
		margin: inherit;
		border: solid 2rpx;
	}
	
</style>
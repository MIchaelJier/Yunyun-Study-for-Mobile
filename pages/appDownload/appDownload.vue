<template>
	<view class="page">
			<view class="app-item">
				<image :src="android" mode="" class="app-icon"></image>
				<view class="main-btn btn-green" data-type="android" @click="download">安卓App下载</view>
			</view>
			<view class="app-item">
				<image :src="apple" mode="" class="app-icon"></image>
				<view class="main-btn btn-green" data-type="ios" @click="download">苹果App下载</view>
				<view class="app-item-notice">
					* 注意：iOS仅支持越狱安装包
				</view>
			</view>
		</view>
</template>

<script>
	import { androidBase64,appleBase64 } from "@/static/icon/base64Icon.js"
	export default {
		data() {
			return {
				android: androidBase64,
				androidUrl: '',
				apple: appleBase64,
				appleUrl: ''
			}
		},
		methods: {
			download(e){
				 const type = e.currentTarget.dataset.type
				 // #ifdef H5
				 switch (type){
				 	case 'android':
						window.open(this.androidUrl); 
				 		break;
				 	case 'ios':
						window.open(this.appleUrl); 
				 		break;
				 }
				 // #endif
			}
		},
		onLoad() {
			this.$request({
			   url: '/last/index/getAppDownloadUrl',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status){
						this.androidUrl = res.data.data.android;
						this.appleUrl = res.data.data.ios
					}
			});
		}
	}
</script>

<style>
	.app-item {
		display: flex;
		flex-direction: column;
		width: 300rpx;
		margin-left: calc(50% - 150rpx);
		margin-top: calc(50% - 60rpx);
	}
	.app-item:last-child {
		margin-top: 100rpx;
	}
		.app-icon {
			width: 100rpx;
			height: 100rpx;
			margin: 0 100rpx 0 100rpx;
		}
		.main-btn {
			border: 1px solid #2CC17B;
			box-sizing: border-box;
			display: inline-block;
			width: 300rpx;
			height: 88rpx;
			line-height: 88rpx;
			margin-top: 40rpx;
			border-radius: 6rpx;
			text-align: center;
			font-size: 15px;
		}
		.btn-green{
			background: #2CC17B;
			color: #fff;
		}
		.app-item-notice {
			margin-top: 20rpx;
			color: #666;
			font-size: 14px;
		}
</style>

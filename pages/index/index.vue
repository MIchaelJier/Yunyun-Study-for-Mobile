<template>
	<view class="page">
		<view class="pageHead">
			
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000" class="swiperBox">
			<swiper-item v-for="sw in swiperList" :key="sw.id">
				<image :src="sw.picsrc" class="swiperImage"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { request } from "../../request/request.js"
	export default {
		data() {
			return {
				swiperList:[]
			}
		},
		onLoad() {
			let that = this;
			request({
			   url: '/getSwiperPic',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status === '200'){
						console.log(res.data)
						that.swiperList = res.data.data;
					}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
	.pageHead {
		width: 100%;
		height: 100rpx;
		background: #fff;
	}
	.swiperBox {
		height: 350rpx;
	}
	.swiperImage{
		width: 100%;
		height: 100%;
	}
</style>
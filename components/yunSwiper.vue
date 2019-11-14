<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000" class="swiperBox">
			<swiper-item v-for="sw in list" :key="sw.id">
				<image :src="sw.picsrc" class="swiperImage"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:  ['list'] 	
	}
</script>

<style>
/* 轮播图 */
	.swiperBox {
		height: 350rpx;
	}
	.swiperImage{
		width: 100%;
		height: 100%;
	}
</style>

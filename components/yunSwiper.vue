<template>
	<view>
		<swiper 
			indicator-dots 
			autoplay 
			circular 
			indicator-color="rgba(255, 255, 255, 0.6)" 
			indicator-active-color="#fff" 
			interval="3000" 
			duration="1000" 
			class="swiperBox"
		>
			<swiper-item v-for="sw in list" :key="sw.id" class="swp">
				<image :src="sw.picsrc" class="img"></image>
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

<style lang="scss">
	.swiperBox {
		height: 350rpx;
		width: 100vw;
		.swp {
			@extend .swiperBox
		};
		.img {
			@extend .swiperBox
		}	
	}
</style>

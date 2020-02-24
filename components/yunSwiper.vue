<template>
	<view>
		<swiper 
			indicator-dots 
			autoplay 
			circular 
			indicator-color="rgba(255, 255, 255, 0.6)" 
			indicator-active-color="#fff" 
			interval="5000" 
			duration="1000" 
			class="swiperBox"
			:style="{height:height,width:width}"
		>
			<swiper-item v-for="sw in list" :key="sw.id" class="swp">
				<view class="img">
					<yun-image :src="sw.picsrc" :radius="radius" mode="scaleToFill"></yun-image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import yunImage from './yunImage.vue'
	export default {
		data() {
			return {
				
			};
		},
		props:{
			list:{
				type: Array,
				default () {
					return [];
				}
			},
			height:{
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: ''
			},
			radius: {
				type: [String,Number],
				default: 0
			}
		},
		components: {
			yunImage
		},
		methods:{
		
		}
	}
</script>

<style lang="scss">
	.swiperBox {
		height: 350rpx;
		width: 100vw;
		.swp {
			height: 100%;
			width: 100%;
		};
		.img {
			height: 100%;
			width: 100%;
		}	
	}
</style>

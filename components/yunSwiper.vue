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
			:style="{height:height,width:width}"
		>
			<swiper-item v-for="sw in list" :key="sw.id" class="swp">
				<image :src="sw.picsrc" 
						class="img"
						:style="{opacity: showNum === allShowNum ? '1': '0'}"
						@load="showAdd"
				></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showNum: 0,
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
			}
		},
		computed:{
			allShowNum(){
				return this.list.length;
			},
		},
		methods:{
			showAdd(){
				this.showNum += 1;
			}
		},
		watch:{
			list(newList){
				newList.forEach(item => {
					item.show = false;
				});
			}
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
			transition: opacity .5s;
		}	
	}
</style>

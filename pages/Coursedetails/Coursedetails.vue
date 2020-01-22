<template>
	<view class="page">
		<!-- 视频 开始 -->
		<view class="player">
			<video 
				src="" 
				:poster="courseInfo.photoUrl"
				controls
				id="video"></video>
		</view>
		<!-- 视频 结束 -->
		<yun-tab :tabs="tabs" :scrollTop="scrollTop" :initTop="initTop">
			<!-- 简介 开始 -->
			<template v-slot:0>
				<introduction ref="intro"></introduction>
			</template>
			<!-- 简介 结束-->
			<!-- 目录 开始 -->			
			<template v-slot:1>
				<directory></directory>
			</template>
			<!-- 目录 结束 -->			
			<!-- 评价 开始 -->			
			<template v-slot:2>
				<comment></comment>
			</template>
			<!-- 评价 结束 -->
		</yun-tab>
		<view class="underBar xBottom" style="background: none;border-top:none"></view>
		<view class="underBar bottomFixed xBottom">
			<view class="underBar-left text-balck" @click="addCart">
				<view class="ux-icon ux-ykt-icon-new-cart"></view>
				<text>加入购物车</text>
			</view>
			<view class="underBar-right">
				<text>加入学习</text>
			</view>
		</view>
	</view>
</template>

<script>
	import introduction from './Introduction/Introduction.vue';
	import directory from './directory/directory.vue';
	import comment from './comment/comment.vue';
	export default {
		data() {
			return {
				scrollTop:0,
				initTop:0,
				
				tabs:['简介','目录','评价'],
				courseInfo:{
					ownername: "文豪金融",
					ownerId: "1821091976",
					photoUrl: "https://edu-image.nosdn.127.net/a12090ea-6978-4e7a-bb7c-f7294094ab94.png",
					productId: "0008819237",
					productName: "来自福布斯精英的25节金融思维课",
					oldPrice: "199.00",
					discountPrice: "99.00",
					deadlineTime: 0
				},
			}
		},
		computed:{
			cartNum(){
				return this.$store.getters['cart/getCartNum']
			}
		},
		components: {
			introduction,
			directory,
			comment
		},
		methods: {
			addCart(){
				let oldNum = this.cartNum;
				this.$store.commit('cart/addCartOne', this.courseInfo);
				if(this.cartNum !== oldNum) {
					uni.showToast({
					    title: '成功添加到购物车',
						icon:'none',
					    duration: 1000
					});
				}else{
					uni.showToast({
					    title: '该课程已在购物车',
						icon:'none',
					    duration: 1000
					});
				}
			}
		},
		onLoad(options) {
			console.log(options.id);
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('.player').boundingClientRect((res) => {
					if (res) {
						this.initTop = res.height
					}
				}).exec()
			})
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop
		},
	}
</script>

<style>
	.page {
		font: 12px/1.14 "Arial","Hiragino Sans GB", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
	}
	/* 视频开始 */
		.player,
		.player video{
			width: 100vw;
			height: 422rpx;
		}
	/* 视频 结束 */
	
	/* 底部固定栏 */
		.underBar {
			height: 126rpx;
			width: calc( 100% - 32rpx);
			background: #fff;
			padding: 0 16rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #f1f1f1;
		}
		.underBar-left {
			width: 160rpx;
			height: 96rpx;
			font-size: 18px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding-top: 10rpx;
		}
			.underBar-left text {
				font-size: 12px;
				padding-bottom: 10rpx;
			}
		.underBar-right {
			height: 96rpx;
			border-radius: 400rpx;
			background: #FF632A;
			font-size: 15px;
			color: #fff;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
		}
</style>

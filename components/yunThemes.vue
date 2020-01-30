<template>
		<view class="themes" :style="{paddingBottom:haveBottom ? '': 0}">
			<block v-for="th in themeList" :key="th.id">
				<view class="themes-item">
					<text class="themes-item-title" 
						 :style="{'font-weight':boldTitle ? 'bold':''}">{{th.title}}</text>
					<view class="themes-item-contents">
						<block v-for="co in th.content" :key="co.contentid">
							<!-- co.size ===  0   一行只有大封面-->
							<!-- co.size ===  1   一行两个-->
							<!-- co.size ===  2   一行一个-->
							<view class="themes-item-content">
								<!-- co.size ===  0   一行只有大封面-->
								<view class="themes-item-content-main" 
									  @click="enter(co.name)"
									  style="width:calc(100vw - 60rpx)"
									  v-if="co.size === 0">
									<image :src="co.picsrc" mode="" 
											class="themes-item-content-big" 
											lazy-load>
									</image>
								</view>
								<!-- co.size ===  1   一行两个-->
								<view class="themes-item-content-main"
									  @click="enter(co.name)"
									  :style="{marginBottom: co.name ? '50rpx':'',width:'calc(50vw - 40rpx)'}"
									  v-if="co.size === 1">
									  <image :src="co.picsrc" mode=""
									  		class="themes-item-content-small" 
									  		lazy-load>
									  </image>
									  <text class="themes-item-content-name" v-if="co.name">{{ co.name }}</text>
									  <view class="themes-item-content-num" v-if="co.star&&co.learned">
									  	<view class="num-star">{{ co.star }}星</view>
									  	<view style="color: #8B8F97">{{ co.learned }}人学过</view>
									  </view>
									  <view class="themes-item-content-price">
									  	<text class="price-red" v-if="co.nprice">￥{{ co.nprice }}</text>
									  	<text class="price-grey" v-if="co.oprice">￥{{ co.oprice }}</text>
									  </view>
								</view>
								<!-- co.size ===  2   一行一个-->
								<view class="themes-item-content-main"
									  @click="enter(co.name)"
									  v-if="co.size === 2">
									  <view class="boxPosition">
										  <yun-box :image="co.picsrc" :title="co.name">
											  <view>
												  <view class="themes-item-content-num num-space-between">
													  <text>共{{ co.chapterNum }}课时</text>
													  <text class="price-grey" v-if="co.oprice">￥{{ co.oprice }}</text>
												  </view>
												  <view class="themes-item-content-num num-space-between">
													  <view>
														  <text class="num-star">{{ co.star }}星</text>
														  <text style="color: #8B8F97">{{ co.learned }}人学过</text>
													  </view>
													  <view class="price-red">￥{{ co.nprice }}</view>
												  </view>
											  </view>
									  </yun-box>
									  </view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
</template>

<script>
	import yunBox from './yunBox';
	export default {
		data() {
			return {
				
			};
		},
		components: {
			yunBox
		},
		props:{
			themeList: { 
				type: Array,
				default () {
					return [];
				}
			},
			boldTitle: {
				type: Boolean,
				default: true
			},
			haveBottom: {
				type: Boolean,
				default: true
			}
		},
		methods:{
			enter(flag){
				// console.log(flag)
				uni.navigateTo({
					url:"/pages/Coursedetails/Coursedetails?id=" + flag
				})
			}
		}
	}
</script>

<style>
	/* 主题分类 */
	.themes {
		background: #f7f7f7;
		/* #ifdef H5 */
		padding-bottom: 50px;
		/* #endif */
	}
	.themes-item {
		padding: 30rpx 30rpx 0 30rpx;
		background: #fff;
		margin: 30rpx 0 0 0 ;
		overflow: hidden;
	}
	.themes-item-title {
		font-size: 17px;
	}
	.themes-item-contents {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.themes-item-content {
		display: inline-block;
	}
	.themes-item-content-main {
		margin: 20rpx 0 0 0;
		line-height: 22px;
		color: #3c4a55;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}
	.boxPosition {
		width: 100vw;
		margin-left: -30rpx;
	}
		.themes-item-content-big {
			width: calc(100vw - 60rpx);
			height: 300rpx;
		}
		.themes-item-content-small {
			width: calc(50vw - 40rpx);
			height: 190rpx;
		}
		.themes-item-content-name {
			font-size: 16px;
			margin-top: 10rpx;
			word-wrap:break-word;
		}
		.themes-item-content-num {
			display: flex;
			align-items: center;
			font-size: 12px;
		}
		.num-space-between {
			justify-content: space-between
		}
			.num-star {
				height: 24rpx;
				background: linear-gradient(-225deg, #34BC65 0%, #2CC17B 100%);
				line-height: 1;
				color: #fff;
				padding: 5rpx;
				border-radius: 5rpx;
				margin-right: 14rpx;
			}
		.themes-item-content-price {
			font-size: 14px;
			margin-top: 10rpx;
		}
			.price-red {
				color: red;
			}
			 .price-grey {
				color: #999;
				text-decoration: line-through;
				margin-left: 10rpx;
			}
</style>

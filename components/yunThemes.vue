<template>
		<view class="themes">
			<block v-for="th in themeList" :key="th.id">
				<view class="themes-item">
					<text class="themes-item-title">{{th.title}}</text>
					<view class="themes-item-contents">
						<block v-for="co in th.content" :key="co.contentid">
							<view class="themes-item-content">
								<view class="themes-item-content-main" @click="enter(co.name)"
									:style="{ width:co.size === 0 ? 'calc(100vw - 60rpx)' : 'calc(50vw - 40rpx)' , marginBottom: co.name ? '50rpx':'' }">
									<image :src="co.picsrc" mode="" :class="co.size === 0 ? 'themes-item-content-big' : 'themes-item-content-small' " lazy-load></image>
									<text class="themes-item-content-name" v-if="co.name">{{ co.name }}</text>
									<view class="themes-item-content-price">
										<text class="price-red" v-if="co.nprice">￥{{ co.nprice }}</text>
										<text class="price-grey" v-if="co.oprice">￥{{ co.oprice }}</text>
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
	export default {
		data() {
			return {
				
			};
		},
		props: ['themeList'] 	,
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
		margin-bottom: 60rpx;
	}
	.themes-item {
		padding: 30rpx;
		background: #fff;
		margin: 30rpx 0 0 0 ;
		overflow: hidden;
	}
	.themes-item-title {
		font-size: 17px;
		font-weight: bold;
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

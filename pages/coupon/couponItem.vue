<template>
	<view>
		<block v-for="item in couponList" :key="item.couponId" >
			<view class="coupon-item">
				<view class="item-top">
					<view class="top-price">
						<text>￥</text>
						<text style="font-size: 32px;">{{ item.amount }}</text>
					</view>
					<view class="top-msg">
						<text v-if="item.consumingThreshold !== 0">满￥{{ item.consumingThreshold }}可用</text>
						<text v-else>无金额门槛</text>
						<text>{{ item.createTime }}－ {{ item.endTime }}</text>
					</view>
				</view>
				<navigator :url="item.creatorUrl" hover-class="none">
					<view class="item-bottom">
						<view class="bottom-msg">
							<text>优惠提供：{{ item.creatorName }}</text>
							<text>适用范围：{{ item.targetName }}</text>
						</view>
						<uni-icons type="arrowright" size="15" color="#999"></uni-icons>
					</view>
				</navigator>
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
		props:{
			couponList: {
			    type: Array,
			    default () {
			    	return [];
			    }
			},
			name: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style>
	.coupon-item{
		margin: 20rpx;
		width: calc( 100% - 40rpx);
		height: 280rpx;
		background: url(../../static/couponBackground.png) no-repeat;
		background-size: 100%;
		border-radius: 10rpx;
		font-size: 12px;
		color: #666;
	}
		.item-top,
		.item-bottom {
			height: 140rpx;
			width: 100%;
			display: flex;
			align-items: center;
		}
		.item-bottom {
			height: 120rpx;
			padding: 0 30rpx;
			width: calc( 100% - 60rpx );
			justify-content: space-between;
		}
			.top-price {
				color: #FF4400;
				font-size: 20px;
				width: 200rpx;
				text-align: center;
			}
			.top-msg,
			.bottom-msg  {
				display: flex;
				flex-direction: column;
			}
</style>

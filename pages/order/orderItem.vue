<template>
	<view>
		<view v-if="orderList.length > 0">
			<block v-for="item in orderList" :key="item.orderId" >
				<view class="order-item">
					<view class="item-top">
						<text>{{ item.tradeTime }}</text>
						<text style="margin-left: 20rpx;">订单号：{{ item.orderId }}</text>
					</view>
					<view class="item-middle">
						<view class="middle-img">
							<yun-image :src="item.photoUrl"></yun-image>
						</view>
						<view class="middle-msg">
							<text class="msg-title">{{ item.courseName }}</text>
							<text class="msg-limit" v-if="item.deadlineTime === 0">永久可看</text>
							<text class="msg-limit" v-else>有效期至 {{ item.deadlineTime }}</text>
							<view><text class="msg-price">￥{{ item.nprice }}</text><text class="msg-oprice">￥{{ item.oprice }}</text></view>
						</view>
					</view>
					<view class="item-bottom">
						<text>实付: </text>
						<text class="bottom-actuallyPaid">￥{{ item.actuallyPaid }}</text>
					</view>
					<view class="item-footer">
						<text v-if="item.orderType === 0">交易成功</text>
						<text v-else-if="item.orderType === 1">交易关闭</text>
						<text v-else>待支付</text>
					</view>
				</view>
			</block>
		</view>
		<view v-else class="none">
			<image src="../../static/images/newBlank.png" alt="空结果" mode="widthFix" class="noimg"/>
			<text class="nodata">您还没有{{ name }}订单</text>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			orderList: {
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
	.order-item {
		background: #FFF;
		margin-bottom: 16rpx;
	}
	.item-top {
		display: flex;
		align-items: center;
		padding: 0 20rpx 0 20rpx;
	    line-height: 68rpx;
	    font-size: 12px;
	    color: #3c4a55;
	    background: #fff;
	}
	.item-middle {
		padding: 31rpx 20rpx;
		background: #FAFAFA;
	}
		.middle-img {
			width: 200rpx;
			height: 126rpx;
			border-radius: 6px;
			float: left;
			background: #E6EAF2;
			overflow: hidden;
		}
		.middle-msg {
			display: flex;
			flex-direction: column;
			padding-left: 20rpx;
		}
			.msg-title {
				height: 36rpx;
				line-height: 36rpx;
				font-size: 14px;
				color: #3c4a55;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-decoration: none;
			}
			.msg-limit {
				padding: 10rpx 0;
				font-size: 12px;
				color: #999;
				line-height: 24rpx;
			}
			.msg-price {
				font-size: 14px;
			}
			.msg-oprice {
				font-size: 14px;
				text-decoration: line-through;
				color: #99a4bf;
				margin-left: 5px;
				font-size: 14px;
				line-height: 12px;
			}
		.item-bottom {
			padding: 44rpx 20rpx 16rpx 20rpx;
			text-align: right;
			color: #70788c;
			border-bottom: 1px solid #f1f1f1;
			font-size: 12px;
		}
			.bottom-actuallyPaid {
				color: #ff4400;
				font-size: 15px;
			}
		.item-footer {
			padding: 14rpx 10px;
			color: #70788c;
			font-size: 12px;
			height: 56rpx;
			line-height: 56rpx;
		}
	.none {
		height: 50vh;
		width: 100%;
		display: flex;
		flex-direction:column;
		justify-content: flex-end;
		align-items: center;
	}
		.noimg {
			width: 200rpx;
			height: 136rpx;
		}
		.nodata {
			width: 80%;
			text-align: center;
			line-height: 2;
			font-size: 15px;
			color: #99a4bf;
			margin: 20rpx auto;
			margin-bottom: 0;
		}
</style>

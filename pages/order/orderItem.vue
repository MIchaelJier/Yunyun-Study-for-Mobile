<template>
	<view>
		<view v-if="orderList.length > 0">
			<block v-for="item in orderList" :key="item.orderId" >
				<view class="order-item">
					<view class="item-top">
						<text>{{ item.tradeTime }}</text>
						<text style="margin-left: 20rpx;">订单号：{{ item.orderId }}</text>
					</view>
					<block v-for="inner in item.paidList" :key="inner.productId">
						<view class="item-middle">
							<view class="middle-img">
								<yun-image :src="inner.photoUrl" radius="20rpx"></yun-image>
							</view>
							<view class="middle-msg">
								<text class="msg-title">{{ inner.courseName }}</text>
								<text class="msg-limit" v-if="inner.deadlineTime === 0">永久可看</text>
								<text class="msg-limit" v-else>有效期至 {{ inner.deadlineTime }}</text>
								<view><text class="msg-price">￥{{ inner.nprice }}</text><text class="msg-oprice">￥{{ inner.oprice }}</text></view>
							</view>
						</view>
					</block>
					<view class="item-bottom">
						<text>（{{ item.payType === 2 ? '支付宝':'微信'}}）</text>
						<block v-if="item.actuallyPaid === '未支付'">
							<text class="bottom-actuallyPaid">未支付</text>
						</block>
						<block v-else>
							<text>实付: </text>
							<text class="bottom-actuallyPaid">￥{{ item.actuallyPaid }}</text>
						</block>
					</view>
					<view class="item-footer">
						<view>
							<text v-if="item.orderType === 1">交易成功</text>
							<text v-else-if="item.orderType === 2 || item.orderType === 3">交易关闭</text>
							<text v-else-if="item.orderType === 0 ">待支付</text>
						</view>
						
						<view class="footer-btn" v-if="item.orderType !== 1 " :style="{borderColor: item.orderType === 0 ? '#ff4400' : ''}">
							<text v-if="item.orderType === 2 || item.orderType === 3">删除订单</text>
							<text v-else-if="item.orderType === 0" style="color: #ff4400;">取消订单</text>
						</view>
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
	@import url("orderItem.css");
</style>

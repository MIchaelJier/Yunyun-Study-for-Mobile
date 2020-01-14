<template>
	<view class="page">
		<yun-tab :tabs="tabs" :scrollTop="scrollTop">
			<template v-slot:0>
				<view class="order-item">
					<view class="item-top">
						<text>2019-09-20 23:34</text>
						<text style="margin-left: 20rpx;">订单号：1215855890</text>
					</view>
					<view class="item-middle">
						<image src="https://edu-image.nosdn.127.net/5bc8839b1f0b4d9cbd84cf74e7308b30.jpg" mode="scaleToFill" class="middle-img"></image>
						<view class="middle-msg">
							<text class="msg-title">微信小程序零基础到项目实战</text>
							<text class="msg-limit">永久可看</text>
							<view><text class="msg-price">￥1</text><text class="msg-oprice">￥99</text></view>
						</view>
					</view>
					<view class="item-bottom">
						<text>实付: </text><text class="bottom-actuallyPaid">￥1</text>
					</view>
					<view class="item-footer">
						<text>交易成功</text>
					</view>
				</view>
				
			</template>
			<template v-slot:1>待支付</template>
			<template v-slot:2>交易成功</template>
			<template v-slot:3>交易关闭</template>
		</yun-tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:['全部订单','待支付','交易成功','交易关闭'],
				scrollTop:0,
			}
		},
		methods: {
			
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
	}
</script>

<style>
	@import url("order.css");
</style>

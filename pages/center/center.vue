<template>
	<view class="page">
		<view class="userInfo">
			<image src="../../static/unLogin.png" mode=""></image>
			<text>登录/注册</text>
		</view>
		<uni-list>
		    <uni-list-item title="我的订单" font-icon="ux-ykt-icon-cash" ></uni-list-item>
		    <uni-list-item title="我的优惠券" font-icon="ux-ykt-icon-coupon" font-icon-size="12"></uni-list-item>
			<uni-list-item title="我的购物车" font-icon="ux-ykt-icon-cart" ></uni-list-item>
			<uni-list-item title="我的学习卡" font-icon="ux-ykt-icon-xuexiqia" font-icon-size="12"></uni-list-item>
		</uni-list>
		<view class="blackMargin"></view>
		<uni-list>
			<uni-list-item title="分享赚学费" font-icon="ux-ykt-icon-notice"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
	}
</script>

<style>
	@import url("center.css");
</style>
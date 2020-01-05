<template>
	<view class="page">
		<navigator :url="Object.keys(userInfo).length === 0 ? '/pages/chooseLogin/chooseLogin' : ''" hover-class="none">
			<view class="userInfo" v-if="Object.keys(userInfo).length === 0">
				<image src="../../static/unLogin.png" mode="" class="userInfo-img"></image>
				<text>登录/注册</text>
			</view>
			<view class="userInfo" v-else>
				<image :src="userInfo.haedImage" mode="" class="userInfo-img"></image>
				<text>{{ userInfo.nikename }}</text>
			</view>
		</navigator>
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
				userInfo:{}
			}
		},
		onShow() {
			this.userInfo = this.$store.getters.basicInfo
		},
		methods: {
			
		},
	}
</script>

<style>
	@import url("center.css");
</style>
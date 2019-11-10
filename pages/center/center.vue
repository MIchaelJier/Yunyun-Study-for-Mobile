<template>
	<view class="page">
		<view class="userInfo">
			<image src="../../static/unLogin.png" mode=""></image>
			<text>登录/注册</text>
		</view>
		<uni-list>
		    <uni-list-item title="我的订单" :show-arrow="false"></uni-list-item>
		    <uni-list-item title="我的优惠券" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
			<uni-list-item title="我的购物车" :show-arrow="false"></uni-list-item>
			<uni-list-item title="我的学习卡" :show-arrow="false"></uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item title="我的订单" :show-arrow="false"></uni-list-item>
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

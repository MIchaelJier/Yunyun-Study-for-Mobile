<template>
	<view class="page">
		<!-- 兑换框 -->
		<view class="exchange">
			<input type="text" placeholder="优惠券兑换码 / VIP会员兑换码" 
			class="exchange-input" placeholder-class="exchange-input-placeholder"/>
			<view class="exchange-btn">兑换</view>
		</view>
		<view class="content">
			<yun-tab :tabs="tabs" :scrollTop="scrollTop">
				<template v-slot:0>
					<!-- 可使用-->
					<coupon-item :couponList="uselist" :name="tabs[0]"></coupon-item>
				</template>
				<template v-slot:1>
					<!-- 已使用 -->
					<coupon-item :couponList="usedlist" :name="tabs[1]"></coupon-item>
				</template>
				<template v-slot:2>
					<!-- 已过期 -->
					<coupon-item :couponList="Expiredlist" :name="tabs[2]"></coupon-item>
				</template>
			</yun-tab>
		</view>
	</view>
</template>

<script>
	import couponItem from './couponItem.vue';
	import { TimeDiff } from "../../utils/timeFormat.js"
	export default {
		data() {
			return {
				couponList:[],
				tabs:['可使用','已使用','已过期'],
				scrollTop:0,
			}
		},
		computed:{
			 uselist(){  return this.couponList.filter(  (item) => !item.used&&TimeDiff(item.endTime)  )},
			 usedlist(){  return this.couponList.filter(  (item) => item.used )},
			 Expiredlist(){  return this.couponList.filter(  (item) => !item.used&&!TimeDiff(item.endTime) )},
		},
		components: {
			couponItem
		},
		methods: {
			
		},
		onLoad() {
			let that = this;
			that.$request({
			   url: '/getCoupon',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status === '200'){
						that.couponList = res.data.data;
					}
			});
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
	}
</script>

<style>
	@import url("coupon.css");
</style>

<template>
	<view class="page">
		<!-- 兑换框 -->
		<view class="exchange">
			<input type="text" placeholder="优惠券兑换码 / VIP会员兑换码" 
			class="exchange-input" placeholder-class="exchange-input-placeholder"/>
			<view class="exchange-btn">兑换</view>
		</view>
		<view class="content">
			<yun-tab :tabs="tabs" :scrollTop="scrollTop" ref="tabs">
				<template v-slot:0>
					<!-- 可使用-->
					<coupon-item :couponList="uselist" :name="tabs[0]"></coupon-item>
				</template>
				<template v-slot:1>
					<!-- 已使用 -->
					<coupon-item :couponList="usedlist" :name="tabs[1]" gray></coupon-item>
				</template>
				<template v-slot:2>
					<!-- 已过期 -->
					<coupon-item :couponList="Expiredlist" :name="tabs[2]" gray></coupon-item>
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
			 uselist(){ return this.$store.getters['cart/getCoupon'](0) },
			 usedlist(){  return this.$store.getters['cart/getCoupon'](1) },
			 Expiredlist(){  return this.$store.getters['cart/getCoupon'](2) },
		},
		components: {
			couponItem
		},
		methods: {
			
		},
		mounted(){
			this.$nextTick( () => {
				setTimeout(() => {
					this.$refs.tabs.swiperHeight();
				});
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
	}
</script>

<style>
	@import url("coupon.css");
</style>

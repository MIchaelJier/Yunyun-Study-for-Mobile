<template>
	<view class="page xBottom">
		<yun-tab :tabs="tabs" :scrollTop="scrollTop" ref="tabs">
			<template v-slot:0>
				<!-- 全部订单 -->
				<order-item :orderList="orderList" :name="tabs[0]"></order-item>
			</template>
			<template v-slot:1>
				<!-- 待支付 -->
				<order-item :orderList="type2list" :name="tabs[1]"></order-item>
			</template>
			<template v-slot:2>
				<!-- 交易成功 -->
				<order-item :orderList="type0list" :name="tabs[2]"></order-item>
			</template>
			<template v-slot:3>
				<!-- 交易关闭 -->
				<order-item :orderList="type1list" :name="tabs[3]"></order-item>
			</template>
		</yun-tab>
	</view>
</template>

<script>
	import orderItem from './orderItem.vue';
	export default {
		data() {
			return {
				orderList:[],
				tabs:['全部订单','待支付','交易成功','交易关闭'],
				scrollTop:0,
			}
		},
		computed:{
			 type0list(){return this.orderList.filter((item) => item.orderType === 0 )},
			 type1list(){return this.orderList.filter((item) => item.orderType === 1 )},
			 type2list(){return this.orderList.filter((item) => item.orderType === 2 )},
		},
		components: {
			orderItem
		},
		methods: {
			
		},
		onLoad() {
			let that = this;
			that.$request({
			   url: '/getOrder',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status === '200'){
						that.orderList = res.data.data;
						this.$refs.tabs.swiperHeight();
					}
			});
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
	}
</script>

<style>
	@import url("order.css");
</style>

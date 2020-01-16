<template>
	<view class="page">
		<view class="total">
			<text>共{{ total }}门课程</text>
		</view>
		<view class="content">
			<block v-for="item in cartList" :key="item.ownerDto.ownerId" >
				<cart-item :cartList="item.list" :ownerMsg="item.ownerDto"></cart-item>
			</block>
		</view>
	</view>
</template>

<script>
	import cartItem from './cartItem.vue';
	export default {
		data() {
			return {
				total:0,
				cartList:[]
			}
		},
		components: {
			cartItem
		},
		methods: {
			
		},
		onLoad() {
			let that = this;
			that.$request({
			   url: '/getCart',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status === '200'){
						that.cartList = res.data.data.list;
						that.total = res.data.data.total;
					}
			});
		}
	}
</script>

<style>
	@import url("cart.css");
</style>


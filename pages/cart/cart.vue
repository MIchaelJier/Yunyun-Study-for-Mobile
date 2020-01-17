<template>
	<view class="page">
		<view class="total">
			<text>共{{ total }}门课程</text>
		</view>
		<view class="content" v-if="total !== 0">
			<block v-for="item in cartList" :key="item.ownerDto.ownerId" >
				<cart-item :cartList="item.list" :ownerMsg="item.ownerDto" :allChecked="item.checked" 
				@itemCheck="itemCheck" @courseCheck="courseCheck"
				:ref="item.ownerDto.ownerId"></cart-item>
			</block>
		</view>
		<view v-else class="none">
			<image src="../../static/newBlank.png" alt="空结果" mode="widthFix" class="noimg"/>
			<text class="nodata">您的购物车空空如也</text>
		</view>
		<checkbox-group class="count" @change="allCheck">
			<label><checkbox value="all" :checked="allcheckedFlag" color="#ff632a" class="count-checkbox"/></label>
			<view class="count-msg">
				<view><text>合计：</text><text style="color: #FF4400;">￥{{ totalCount }}</text></view>
				<text>若有优惠, 将在订单结算页面减扣</text>
			</view>
			<view class="count-btn" :style="{background:totalCount == 0 ?'#CED1DA':'#FF632A'}">去结算</view>
		</checkbox-group>
	</view>
</template>

<script>
	import cartItem from './cartItem.vue';
	import { toDecimal } from '../../utils/myMath.js'
	export default {
		data() {
			return {
				total:0,
				cartList:[],
				allcheckedFlag:false,
			}
		},
		computed:{
			totalCount(){
				let total = 0;
				this.cartList.forEach( item => {
					item.list.forEach(course => {
						if(course.checked) total += parseFloat(course.discountPrice)
					})
				})
				return toDecimal(total)
			}
		},
		components: {
			cartItem
		},
		methods: {
			courseCheck(ids){
				this.cartList.forEach(item => {
					if(item.ownerDto.ownerId === ids.key){
						item.list.forEach(course => {
							course.checked = ids.value.includes(course.productId);
							item.checked = item.list.every(course => course.checked);
						})
					}
				});
				this.allisCheck();
			},
			itemCheck(id){
				this.cartList.forEach(item => {
					if(item.ownerDto.ownerId === id){
						item.checked = !item.checked;
						item.list.forEach(course => {
							course.checked = item.checked;
						})
					}
				});
				this.allisCheck();
			},
			allCheck(){
				this.allcheckedFlag = !this.allcheckedFlag;
				this.cartList.forEach(item => {
					item.checked = this.allcheckedFlag;
					item.list.forEach(course => {
						course.checked = this.allcheckedFlag;
					})
				})
			},
			allisCheck(){
				this.allcheckedFlag = this.cartList.every(item => item.list.every(c => c.checked))
			}
		},
		onLoad() {
			let that = this;
			that.$request({
			   url: '/getCart',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status === '200'){
						let list = res.data.data.list,
							totalNum = 0;
						list.forEach(item => {
							item.checked = false;
							item.list.forEach(course => {
								course.checked = false;
								totalNum ++;
							})
						})
						that.total = totalNum;
						that.cartList = list;
					}
			});
		},
	}
</script>

<style>
	@import url("cart.css");
</style>


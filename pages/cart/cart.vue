<template>
	<view class="page">
		<view class="total">
			<text>共{{ total }}门课程</text>
		</view>
		<view class="content" v-if="total !== 0">
			<block v-for="(item,index) in cartList" :key="item.ownerDto.ownerId" >
				<cart-item :cartList="item.list" 
				:ownerMsg="item.ownerDto" 
				:allChecked="item.checked" 
				:totalCount="itemcount(index)"
				@itemCheck="itemCheck" @courseCheck="courseCheck"
				:ref="item.ownerDto.ownerId"></cart-item>
			</block>
		</view>
		<view v-else class="none">
			<image src="../../static/images/newBlank.png" alt="空结果" mode="widthFix" class="noimg"/>
			<text class="nodata">您的购物车空空如也</text>
		</view>
		<view class="count xBottom" style="background: none;"></view>
		<checkbox-group class="count xBottom bottomFixed" @change="allCheck">
			<label><checkbox value="all" :checked="allcheckedFlag" color="#ff632a" class="count-checkbox"/></label>
			<view class="count-msg">
				<view><text>合计：</text><text style="color: #FF4400;">￥{{ totalCount }}</text></view>
				<text>若有优惠, 将在订单结算页面减扣</text>
			</view>
			<view class="count-btn" 
			:style="{background:totalCount == 0 ?'#CED1DA':'#FF632A'}"
			@click="gotoPay">去结算</view>
		</checkbox-group>
	</view>
</template>

<script>
	import cartItem from './cartItem.vue';
	import { toDecimal } from '../../utils/myMath.js'
	export default {
		data() {
			return {
				allcheckedFlag:false,
				totalCount:'0.00',
				itemsCount:[]
			}
		},
		computed:{
			itemcount(){
				return index => this.itemsCount[index] || 0
			},
			cartList(){
				return this.$store.getters['cart/getCart']
			},
			total(){
				return this.$store.getters['cart/getCartNum']
			}
		},
		components: {
			cartItem
		},
		methods: {
			//获取购物车数据
			gotoPay(){
				if(this.totalCount != 0)
				uni.navigateTo({
					url:'/pages/payConfirm/payConfirm'
				})
			},
			courseCheck(ids){
				this.cartList.forEach(item => {
					if(item.ownerDto.ownerId === ids.key){
						item.list.forEach(course => {
							course.checked = ids.value.includes(course.productId);
							item.checked = item.list.every(course => course.checked);
						})
					}
				});
				// 再点击单一课程时候，vue的深度监视好像有点毛病
				// 在这里再确认一遍，双保险
				this.changeTotal(this.cartList);
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
				this.allcheckedFlag = this.cartList.every(item => item.list.every(c => c.checked));
			},
			changeTotal(newVal){
				let total = 0,
					list = []
				newVal.forEach( item => {
						let itemTotal = 0; 
						item.list.forEach( course => {
							if(course.checked){
								let price = parseFloat(course.discountPrice);
								total += price;
								itemTotal += price;
							}
						})
						list.push(toDecimal(itemTotal))
					})
				this.totalCount = toDecimal(total)
				this.itemsCount = list
			}
		},
		watch:{
			cartList:{
				immediate:true,
				deep:true,
				handler(newVal,oldVal){
					this.changeTotal(newVal)
				}
			},
		}
	}
</script>

<style>
	@import url("cart.css");
</style>


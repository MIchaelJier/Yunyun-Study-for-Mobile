<template>
	<view>
		<view class="pay-item">
			<view class="item-top">
				<view class="top-title">机构 {{ ownerMsg.ownername }}</view>
				<block v-for="course in payList" :key="course.productId">
					<view class="top-course">
						<image :src="course.photoUrl" mode="scaleToFill" class="course-img"></image>
						<view class="course-msg">
							<text style="font-size: 14px;color: #3C4A55;">{{ course.productName }}</text>
							<view class="msg-under">
								<text style="margin: 6rpx 0;" v-if="course.deadlineTime === 0">永久有效</text>
								<text style="margin: 6rpx 0;" v-else>有效期至{{ course.deadlineTime }}</text>
								<text>￥{{ course.oldPrice }}</text>
							</view>
						</view>
					</view>
					<view class="top-discount" v-if="course.discountPrice !== course.oldPrice">
						<text>限时优惠省{{ Discount(course.discountPrice,course.oldPrice) }}元</text>
					</view>
					<view class="top-count">小计：￥{{ course.discountPrice }}</view>
				</block>
			</view>
			<view class="item-bottom">
				<view>
					<view class="couponBox" v-if="coupon.length > 0">
						<text>该机构/讲师优惠</text>
						 <picker @change="bindPickerChange" :value="nowCoupon" :range="coupon" range-key="couponName">
						        <view class="couponInput">
									<text>{{ coupon[nowCoupon].couponName }}</text>
									<uni-icons type="arrowdown" size="18"></uni-icons>
								</view>
						</picker>
					</view>
				</view>
				<text class="bottom-count">小计：￥{{ afterCouponPrice }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { toDecimal } from '../../utils/myMath.js'
	export default {
		data() {
			return {
				nowCoupon:0
			}
		},
		computed:{
			// 该机构合计
			afterCouponPrice(){
				let sum = parseFloat(this.allPrice) - parseFloat(this.coupon.length > 0 ? this.coupon[this.nowCoupon].amount : 0) ;
				return toDecimal(sum)
			},
			allPrice(){
				if(this.payList.length === 1) return toDecimal(parseFloat(this.payList[0].discountPrice))
				return this.payList.reduce((prev, cur) => 
					toDecimal(parseFloat(prev.discountPrice) + parseFloat(cur.discountPrice)));
			},
			// 优惠减少的价格
			Discount(){
				return (dis,old) => toDecimal(parseFloat(old) - parseFloat(dis))	
			},
			coupon(){
				return this.courseCoupon.concat(this.itemCoupon).map(item => {
					item.consumingThreshold === 0
						? item.couponName = `优惠${item.amount}元(无门槛)，适用${item.targetName}`
						: item.couponName = `满${item.consumingThreshold}减${item.amount}，适用${item.targetName}`
					return item;
					})
			},
			// 单一课程优惠券
			courseCoupon(){
				return this.$store.getters.getCoupon(5).filter( 
					item => this.payList.some( 
						course => item.targetId.includes(course.productId) 
				))
			},
			// 该机构优惠券
			itemCoupon(){
				return  this.$store.getters.getCoupon(4).filter( 
					item => 
							item.targetId.includes(this.ownerMsg.ownerId) 
								&&  
							item.consumingThreshold === 0 ? '' : this.allPrice >= item.consumingThreshold
				)
			}
		},
		methods:{
			 bindPickerChange(e) {
			     this.nowCoupon = e.target.value
			 },
			 sum(value){
				 this.$emit('getSum',parseFloat(value))
			 }
		},
		props: {
			payList: {
			    type: Array,
			    default () {
			    	return [];
			    }
			},
			ownerMsg: {
			    type: Object,
			    default () {
			    	return {};
			    }
			},
		},
		mounted() {
			this.sum(this.afterCouponPrice);
		},
		watch:{
			afterCouponPrice(newVal,oldVal){
				this.sum(newVal - oldVal)
			}
		}
	}
</script>

<style>
	.pay-item {
		background: #fff;
		margin-top: 16rpx;
	}
		.item-top{
			padding:0 20rpx;
			display: flex;
			flex-direction: column;
			color: #3c4a55;
			font-size: 12px;
		}
			.top-title{
				margin: 36rpx 0;
			}
			.top-course {
				display: flex;
			}
				.course-img {
					width: 240rpx;
					height: 150rpx;
					border-radius: 3px;
				}
				.course-msg {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-left: 15rpx;
					font-size: 12px;
					color: #666
				}	
					.msg-under{
						display: flex;
						flex-direction: column;
					}
			.top-discount {
				color: #D80000;
				margin: 20rpx 0;
			}
			.top-count{
				line-height: 80rpx;
				height: 80rpx;
				width: 100%;
				text-align: right;
			}
		.item-bottom {
			background: #f7f9fc;
			width: calc( 100% - 40rpx );
			padding:20rpx;
			color: #333;
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
			.bottom-count {
				line-height: 80rpx;
				width:300rpx;
				text-align: right;
				white-space:nowrap;
			}
			.couponBox {
				font-size: 12px;
				color: #999;
				flex: 1;
			}
				.couponInput {
					margin: 10rpx 0;
					width: 400rpx;
					padding: 10rpx;
					border: 1px solid #ccc;
					border-radius: 5px;
					color: #999;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
</style>

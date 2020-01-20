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
			<view class="item-bottom">小计：￥{{ allPrice }}</view>
		</view>
	</view>
</template>

<script>
	import { toDecimal } from '../../utils/myMath.js'
	export default {
		computed:{
			allPrice(){
				if(this.payList.length === 1) return toDecimal(parseFloat(this.payList[0].discountPrice))
				return this.payList.reduce((prev, cur) => 
					toDecimal(parseFloat(prev.discountPrice) + parseFloat(cur.discountPrice)));
			},
			Discount(){
				return (dis,old) => toDecimal(parseFloat(old) - parseFloat(dis))	
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
			.top-count,
			.item-bottom {
				line-height: 80rpx;
				height: 80rpx;
				width: 100%;
				text-align: right;
			}
		.item-bottom {
			background: #f7f9fc;
			width: calc( 100% - 40rpx );
			padding:0 20rpx;
			color: #333;
			font-size: 14px;
			height:120rpx;
			line-height: 120rpx;
		}
</style>

<template>
	<view>
		<view class="cart-item">
			<view class="item-title">
				<checkbox value="cb" checked="true" color="#ff632a" style="transform:scale(0.6)"/>
				<text>{{ ownerMsg.ownername }}</text>
			</view>
			<checkbox-group class="item-courses">
				<label class="course" v-for="course in cartList" :key="course.productId">
					<checkbox :value="course.discountPrice" checked="true" color="#ff632a" class="course-checkbox"/>
					<view class="course-body">
						<image :src="course.photoUrl" mode="scaleToFill" class="course-img"></image>
						<view class="course-msg">
							<text style="font-size: 14px;color: #3C4A55;">{{ course.productName }}</text>
							<text style="margin: 6rpx 0;">永久有效</text>
							<text style="color: #3C4A55;">￥{{ course.discountPrice }}</text>
						</view>
					</view>
					<text class="course-delBtn">删除</text>
				</label>			
				<view class="item-courses-bottom">
					<view class="bottom-main">
						<text>该机构小结：</text>
						<text style="color: #FF4400;font-size: 14px;">￥99.00</text>
					</view>
				</view>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			cartList: {
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
	}
</script>

<style>
	.item-title {
		width: 100%;
		height: 68rpx;
		background: #F7F9FC;
	    padding: 0 10rpx;
		font-size: 12px;
		display: flex;
		align-items: center;
	}
	.course {
		padding: 24rpx 10rpx;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-size: 12px;
		color: #99A4BF;
		position: relative;
		background: #fff;
	}
		.course-checkbox {
			transform:scale(0.6);
			position: absolute;
			height: 100%;
		}
		.course-body {
			padding: 0 54rpx;
			width: calc( 100% - 128rpx);
			display: flex;
		}
			.course-img {
				width: 200rpx;
				height: 108rpx;
			}
			.course-msg {
				width: calc( 100% - 230rpx); /* 215rpx */
				display: flex;
				flex-direction: column;
				padding-left: 15rpx;
			}
		.course-delBtn {
			position: absolute;
			right: 40rpx;
		}
	.item-courses-bottom {
		/* padding: 30rpx 20rpx; */
		background: #fff;
		padding-top: 20rpx;
		margin-bottom: 16rpx;
	}
		.bottom-main {
			margin: 0 20rpx;
			padding: 20rpx 0;
			text-align: right;
			width: calc(100% - 40rpx);
			font-size: 12px;
			color: #70788C;
			border-top: 1px solid #E6EAE5;
		}
	
</style>

<template>
	<view class="box">
		<view class="box-main">
			<image :src="image" class="boxPost" v-if="image"></image>
			<view class="boxRight" :style="{ height: image ? '137rpx':'' }">
				<text class="boxRight-title" v-if="title">{{ title }}</text>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			title: {  // 列表标题
			  type: String,
			  default: ''
			},
			image: {  // 列表配图
			  type: String,
			  default: ''
			}, 
		}
		
	}
</script>

<style>
.box {
	background: #fff;
}
.box-main {
	padding: 17px 10px 17px 0;
	margin-left: 15px;
	position: relative;
	border-bottom: 1px solid rgba(221, 221, 221, 0.4);
	display: flex;
	align-items: center;
}
.boxPost {
	height: 137rpx;
	width: 220rpx;
	border-radius: 5rpx;
	padding-right: 20rpx;
}
.boxRight {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.boxRight .boxRight-title{
	font-size: 16px;
	color: #333;
}
</style>

<template>
	<view class="box">
		<view class="box-main"  @click="enter()">
			<view  class="boxPost">
				<image :src="image"  v-if="image" mode="scaleToFill" lazy-load></image>
			</view>
			<view class="boxRight"> <!-- :style="{ height: image&&fitImage ? '137rpx':'' }" -->
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
			url: {   // 列表跳转
			  type: String,
			  default: ''
			}, 
		},
		methods: {
			enter:function() {
				console.log(this.url)
			}
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
		border-bottom: 1px solid #f1f1f1;
		display: flex;
		align-items: center;
		background: #fff;
	}
	.boxPost {
		height: 137rpx;
		width: 220rpx;
		border-radius: 5rpx;
		padding-right: 20rpx;
		flex: 0 0 220rpx;
	}
	.boxPost image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.boxRight {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 137rpx;
	}
	.boxRight .boxRight-title{
		font-size: 16px;
		color: #333;
	}
</style>

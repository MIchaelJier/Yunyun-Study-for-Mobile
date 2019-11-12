<template name="yunHeader">
	<view class="pageHead">
		<view class="header-left">
			<view class="header-logo"></view>
			<view class="header-span">
				<text>App查看</text>
			</view>
		</view>
		<navigator url="../../pages/search/search" hover-class="none">
			<view class="header-search"></view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.pageHead {
		width: 100%;
		height: 100rpx;
		background: #fff;
	}
	.pageHead ,
	.header-left,
	.header-span{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-logo {
		width: 240rpx;
		height: 60rpx;
		background-image: url(../static/headerIcon.png);
		margin-left: 20rpx;
	}
	.header-search ,
	.header-logo {
		background-repeat: no-repeat;
		background-size: cover;
	}
	.header-span {
		width: 100rpx;
		height: 33rpx;
		margin-left: 10rpx;
		justify-content: center;
		border: 1px solid #2CC17B;
		border-radius: 30rpx;
		font-size: 12px;
		color: #2CC17B;
	}
	.header-search {
		width: 30rpx;
		height: 30rpx;
		margin-right: 50rpx;
		background-image: url(../static/searchIcon.png);
	}
</style>

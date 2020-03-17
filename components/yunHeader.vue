<template name="yunHeader">
	<view class="pageHead">
		<view class="header-left">
			<view class="header-logo"></view>
			<!-- #ifdef H5 -->
			<view class="header-span">
				<text>App查看</text>
			</view>
			<!-- #endif -->
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

<style lang="scss">
	
	@mixin flexStyle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	@mixin BGStyle {
		background: {
			repeat: no-repeat;
			size: cover;
		}
	}
	
	.pageHead {
		width: 100%;
		height: 100rpx;
		background: #fff;
		@include flexStyle;
		
		.header-left{
			@include flexStyle;
			
			.header-span{
				@include flexStyle;
				width: 110rpx;
				height: 35rpx;
				margin-left: 10rpx;
				justify-content: center;
				border: 1px solid #2CC17B {
					radius: 30rpx;
				};
				font-size: 12px;
				color: #2CC17B;
			}
			
			.header-logo {
				@include BGStyle;
				width: 240rpx;
				height: 60rpx;
				background-image: url(../static/images/headerIcon.png);
				margin-left: 20rpx;
			}
		}
		.header-search {
			@include BGStyle;
			width: 30rpx;
			height: 30rpx;
			margin-right: 50rpx;
			background-image: url(../static/images/searchIcon.png);
		}
	}
</style>

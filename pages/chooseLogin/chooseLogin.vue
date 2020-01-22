<template>
	<view>
		<image src="../../static/images/loginBackground.png" mode="aspectFill" class="pageBackground"></image>
		<view class="set-wap">
			<view class="set-wap-top">
				<view class="set-wap-top-main">
					<image src="../../static/images/APPIcon.png" mode="aspectFill" class="main-image"></image>
					<navigator url="/pages/phoneLogin/phoneLogin" hover-class="none">
						<view class="main-btn btn-green" hover-class="btn-hover">手机号登录</view>
					</navigator>
					<view class="main-btn btn-white" hover-class="btn-hover">手机号快捷注册</view>
				</view>
			</view>
			<view class="set-wap-bottom">
				<view class="bottom-title">
					<view class="line"></view>
					<text class="bottom-title-text">其他方式登录</text>
					<view class="line"></view>
				</view>
				<view class="bottom-icons bottom-title">
					<!-- #ifdef H5 || APP-PLUS -->
					<view class="bottom-icon">
						<view class="bottom-icon-o" hover-class="btn-hover">
							<uni-icons type="qq" size="46" :color="iconColor"></uni-icons>
						</view>
						<text class="bottom-icon-t">QQ</text>
					</view>
					<view class="bottom-icon">
						<view class="bottom-icon-o" hover-class="btn-hover">
							<uni-icons type="weixin" size="46" :color="iconColor"></uni-icons>
						</view>
						<text class="bottom-icon-t">微信</text>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button class="bottom-icon" open-type="getUserInfo" hover-class="none" >
						<view class="bottom-icon-o" hover-class="btn-hover">
							<uni-icons type="weixin" size="46" :color="iconColor"></uni-icons>
						</view>
						<text class="bottom-icon-t">微信</text>
					</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconColor: '#3C4A55'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("chooseLogin.css");
</style>

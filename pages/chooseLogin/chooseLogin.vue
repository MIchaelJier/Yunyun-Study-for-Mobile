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
					<navigator url="/pages/register/register" hover-class="none">
						<view class="main-btn btn-white" hover-class="btn-hover">手机号快捷注册</view>
					</navigator>
				</view>
			</view>
			<view class="set-wap-bottom">
				<view class="bottom-title">
					<view class="line"></view>
					<text class="bottom-title-text">其他方式登录</text>
					<view class="line"></view>
				</view>
				<view class="bottom-icons bottom-title">
					<!-- 在 H5端 和 App端 可以通过微信、QQ登录 -->
					<!-- #ifdef H5 || APP-PLUS -->
					<view class="bottom-icon" data-logintype="qq" @click="appOAuthLogin">
						<view class="bottom-icon-o" hover-class="btn-hover">
							<uni-icons type="qq" size="46" :color="iconColor"></uni-icons>
						</view>
						<text class="bottom-icon-t">QQ</text>
					</view>
					<view class="bottom-icon" data-logintype="weixin" @click="appOAuthLogin">
						<view class="bottom-icon-o" hover-class="btn-hover">
							<uni-icons type="weixin" size="46" :color="iconColor"></uni-icons>
						</view>
						<text class="bottom-icon-t">微信</text>
					</view>
					<!-- #endif -->
					<!-- 在 微信小程序端 只能通过微信登录 -->
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
			appOAuthLogin(e){
				const provider = e.currentTarget.dataset.loginType;
				// #ifdef APP-PLUS
				uni.login({
					provider,
					success(res) {
						console.log(res)
					}
				})
				// #endif
				
				// #ifdef H5
				QC.Login.showPopup({
				     appId:"101825637",
					 redirectURI:"https:zfroot.top:8081/yun/auth"
				});
				// #endif
			}
		}
	}
</script>

<style>
	@import url("chooseLogin.css");
</style>

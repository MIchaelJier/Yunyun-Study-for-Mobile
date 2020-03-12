<template>
	<view class="page">
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
					<button class="bottom-icon" open-type="getUserInfo" @getuserinfo="wxLogin" hover-class="none" >
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
	import { formatTime } from "../../utils/timeFormat.js"
	export default {
		data() {
			return {
				iconColor: '#3C4A55'
			}
		},
		methods: {
			appOAuthLogin(e){
				const provider = e.currentTarget.dataset.loginType;
				// App 端第三方登录
				// #ifdef APP-PLUS
				uni.login({
					provider,
					success(res) {
						console.log(res)
					}
				})
				// #endif
				
				// H5 端第三方登录
				// #ifdef H5
				QC.Login.showPopup({
				     appId:"101825637",
					 redirectURI:"https:zfroot.top:8081/yun/auth"
				});
				// #endif
			},
			// 微信小程序登录
			wxLogin(e){
				const userInfo = e.detail.userInfo,
					  that = this;
				uni.login({
					provider:"weixin",
					success(res) {
						const code = res.code,
							  // 设置登录到哪个对应的微信小程序 [0:芸云学堂]
							  loginToWhichMP = 1;
						//code 给后端换取登录信息
						that.$request({
						   url: '/last/user/wxLogin',
						   method: 'POST',  //这里包含注册 
						   data:{
							   avatarUrl:userInfo.avatarUrl,
							   nikename:userInfo.nikename,
							   whichMP:loginToWhichMP 
						   }
						  }).then(res => {
								if(res.data.status === '200'){
									if(res.data.data['truepass']){
										let userInfo = res.data.data;
										console.log('登录成功');
										//获取当前时间,并写入
										userInfo['loginTime'] = formatTime(new Date());
										//存入用户缓存
										uni.setStorageSync('userInfo', userInfo);
										//vuex获取缓存
										that.$store.commit('common/getUserInfo');										
										//登录成功提示
										uni.showToast({
										    title: '登录成功,跳转至登录页面',
											icon:'none'
										});
										//获取购物车以及优惠券信息
										that.$store.dispatch('cart/request_cart').then(() => {
											setTimeout(function () {
											    uni.hideToast();
												//跳转到首页
												uni.switchTab({
													url: '/pages/index/index'
												});
											}, 1000);
										})
										
									}else{
										uni.showToast({
										    title: '登录失败',
											icon:'none'
										});
										setTimeout( () => {
										    uni.hideToast();
										}, 1000);
									}
								}
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("chooseLogin.css");
</style>

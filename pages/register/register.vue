<template>
	<view class="page">
		<view class="register-form">
			<!-- 输入框 开始 -->
			<yun-input ref="phoneInput" icon="phone" inputType="number" inputPlaceholder="请输入手机号" maxLen="11"></yun-input>
			<!-- 密码登录 -->
			<view class="inputoutside">
				<yun-input ref="passwordInput" icon="locked" inputType="password" inputPlaceholder="8-16位密码,区分大小写"></yun-input>
			</view>
			<!-- 验证码 -->
			<view class="inputoutside">
				<yun-moveVerify  ref="verifyElement"></yun-moveVerify>
			</view>
			<view class="inputoutside">
				<yun-input ref="verifycodeInput" inputType="number" inputPlaceholder="请输入短信验证码" inputWidth="61%" maxLen="6"></yun-input>
				<view class="getsmscode" :hover-class="codeExpiration === 0 ? 'getsmscode-hover':'' "
				 @click="codeExpiration === 0 ? getVCode() : ''"
				:class="{'getsmscode-disable':codeExpiration !== 0}">
					{{ codeExpiration === 0 ? '获取验证码': codeExpiration+'s后再次获取' }}
				</view>
			</view>
			<!-- 输入框 结束 -->
			<!-- 注册按钮 开始 -->
			<view class="registerBtn"
				 :style="{'margin-top': tipText !== ''?'0':'40rpx'}">注册</view>
			<!-- 注册按钮 结束 -->
			<!-- 选择框 开始 -->
			<checkbox-group class="checkagree">
			    <label>
			        <checkbox style="transform:scale(0.7);width: 100%;" color="#2CC17B">
						<text class="checkbox-first">我同意《用户使用协议》和《隐私政策》</text>
				    </checkbox>
			    </label>
			</checkbox-group>
			<!-- 选择框 结合 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tipText:'',
				codeExpiration: 0,
			}
		},
		methods: {
			getVCode(){
				console.log('获取验证码');
				}
		}
	}
</script>

<style>
	@import url("register.css");
</style>

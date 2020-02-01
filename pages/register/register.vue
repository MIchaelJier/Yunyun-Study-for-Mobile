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
				<yun-moveVerify  ref="verifyElement" @result='verifyResult'></yun-moveVerify>
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
			<!-- 提示 开始 -->
			<view v-show="tipText !== ''" class="tipBox">
				<uni-icons type="clear" size="18" color="#fa6060"></uni-icons>
				<text class="tipBox-text">{{ tipText }}</text>
			</view>
			<!-- 提示 结束 -->
			<!-- 注册按钮 开始 -->
			<view class="registerBtn"
				 :style="{'margin-top': tipText !== ''?'0':'40rpx'}"
				 @click="registerLogin()">注册</view>
			<!-- 注册按钮 结束 -->
			<!-- 选择框 开始 -->
			<checkbox-group class="checkagree" @change="changeFlag">
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
	import { registerProcess,allSituation } from './verifProcess.js'
	import { condition } from "../../utils/myMath.js"
	export default {
		data() {
			return {
				checkboxFlag: false, //协议认证选择框
				tipText:'',          //提示信息
				resultData: {},      //滑动验证返回值
				codeExpiration: 0,   //验证码时间
			}
		},
		methods: {
			//是否 同意协议
			changeFlag(e){
				this.checkboxFlag = e.detail.value.length === 1
			},
			//滑动验证 校验结果回调函数
			verifyResult(res){
			    this.resultData = res;
			},
			//点击 获取验证码
			getVCode(){
				console.log('用户点击了获取验证码');
				// this.$refs.phoneInput.emptyWarn();
				//allSituation 的前五种情况
				const all = allSituation.call(this).slice(0,4)
				//执行注册验证
				registerProcess.get(condition(all)).call(this)
			},
			// 点击注册
			registerLogin(){
				console.log('用户点击了注册按钮');
				const all = allSituation.call(this);
				//执行注册验证
				registerProcess.get(condition(all)).apply(this,[1])
			}
		}
	}
</script>

<style>
	@import url("register.css");
</style>

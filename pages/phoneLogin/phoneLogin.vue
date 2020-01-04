<template>
	<view>
		<view class="login-form">
			<!-- 切换 登录方式 开始 -->
			<view class="chooseBtn">
				<text class="right">使用短信验证登录</text>
				<view class="right chooseBtn-icon"><uni-icons type="email-filled" size="23" color="#c5ccd8"></uni-icons></view>
			</view>
			<!-- 切换 登录方式 结束 -->
			
			<!-- 输入框 开始 -->
			<yun-input ref="phoneInput" icon="phone" inputType="number" inputPlaceholder="请输入手机号" maxLen="11"></yun-input>
			<view class="inputoutside">
				<yun-input ref="passwordInput" icon="locked" inputType="password" inputPlaceholder="请输入密码"></yun-input>
			</view>
			<!-- 输入框 结束 -->
			
			<!-- 提示 开始 -->
			<view v-show="tipText !== ''" class="tipBox">
				<uni-icons type="clear" size="18" color="#fa6060"></uni-icons>
				<text class="tipBox-text">{{ tipText }}</text>
			</view>
			<!-- 提示 结束 -->
			
			<!-- 登录按钮 开始 -->
			<view class="startBtn" @click="startLogin" :style="{'margin-top': tipText !== ''?'0':'40rpx'}">登录</view>
			<!-- 登录按钮 结束 -->
			
			<!-- 选择框 开始 -->
			<checkbox-group class="unloginBtn"  @change="changeFlag">
			    <label>
			        <checkbox style="transform:scale(0.7)" checked="true">
						<text class="checkbox-first">十天内免登录</text>
						<text>忘记密码?</text>
				    </checkbox>
			    </label>
			</checkbox-group>
			<!-- 选择框 结合 -->
		</view>
	</view>
</template>

<script>
	import { monthDayDiff,formatTime } from "../../utils/timeFormat.js"
	export default {
		data() {
			return {
				tipText: '',
				checkboxFlag: true,
			}
		},
		methods: {
			changeFlag(e){
				this.checkboxFlag = e.detail.value.length === 1
			},
			startLogin(){
				let phone = this.$refs.phoneInput.text,
					password = this.$refs.passwordInput.text;
				this.$refs.phoneInput.emptyWarn();
				this.$refs.passwordInput.emptyWarn();
				
				if(phone === ''){
					//用户输入为空
					this.tipText = '请输入手机号'
				}else if(phone.length !== 11 ){
					//用户输入手机号位数不准确
					this.$refs.phoneInput.color = '#fa6060';
					this.tipText = '请输入正确的手机号'
				}else if(password === ''){
					//用户输入密码为空
					this.tipText = '请输入密码'
				}else{
					let that = this;
					//输入正确 请求登录接口 判断账号密码是否正确
					that.$request({
					   url: '/login',
					   method: 'GET',
					   data:{
						   phone,
						   password,
					   }
					  }).then(res => {
							if(res.data.status === '200'){
								console.log(res.data)
								if(res.data.data['truepass']){
									let userInfo = res.data.data;
									that.tipText = ''
									console.log('登录成功');
									//获取当前时间,并写入
									userInfo['loginTime'] = formatTime(new Date());
									if(that.checkboxFlag){
										//存入用户缓存
										uni.setStorageSync('userInfo', userInfo);
										//vuex获取缓存
										that.$store.commit('getUserInfo')
									}else{
										//一次性登录
										that.$store.commit('changeUserInfo',userInfo)
									}
								}else{
									that.tipText = '账号或密码错误'
								}
							}
					});
				}
			}
		},
	}
</script>

<style>
	@import url("phoneLogin.css");
</style>

<template>
	<view class="page">
		<view class="login-form">
			<!-- 切换 登录方式 开始 -->
			<view class="chooseBtn">
				<text class="right" @click="changeWay">{{ loginWay[nowWay].name }}</text>
				<view class="right chooseBtn-icon"><uni-icons :type="loginWay[nowWay].icon" :size="loginWay[nowWay].size" color="#c5ccd8"></uni-icons></view>
			</view>
			<!-- 切换 登录方式 结束 -->
			
			<!-- 输入框 开始 -->
			<yun-input ref="phoneInput" icon="phone" inputType="number" inputPlaceholder="请输入手机号" maxLen="11"></yun-input>
				<!-- 密码登录 -->
				<view class="inputoutside" v-if="nowWay === 0">
					<yun-input ref="passwordInput" icon="locked" inputType="password" inputPlaceholder="请输入密码"></yun-input>
				</view>
				<!-- 验证码登录 -->
				<view v-else>
					<view class="inputoutside">
						<yun-moveVerify @result='verifyResult' ref="verifyElement"></yun-moveVerify>
					</view>
					<view class="inputoutside">
						<yun-input ref="verifycodeInput" inputType="number" inputPlaceholder="请输入短信验证码" inputWidth="61%" maxLen="6"></yun-input>
						<view class="getsmscode" :hover-class="codeExpiration === 0 ? 'getsmscode-hover':'' "
						 @click="codeExpiration === 0 ? getVCode() : ''"
						:class="{'getsmscode-disable':codeExpiration !== 0}">
							{{ codeExpiration === 0 ? '获取验证码': codeExpiration+'s后再次获取' }}
						</view>
					</view>
				</view>
				
			<!-- 输入框 结束 -->
			
			<!-- 提示 开始 -->
			<view v-show="tipText !== ''" class="tipBox">
				<uni-icons type="clear" size="18" color="#fa6060"></uni-icons>
				<text class="tipBox-text">{{ tipText }}</text>
			</view>
			<!-- 提示 结束 -->
			
			<!-- 登录按钮 开始 -->
			<view class="startBtn" @click=" nowWay === 0 ? startLogin() : startLoginwithVerifycode()" 
				 :style="{'margin-top': tipText !== ''?'0':'40rpx'}">登录</view>
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
				nowWay: 0,
				loginWay: [
					{ id: 0, name: '使用短信验证登录',icon: 'email-filled',size: '23' },
					{ id: 1, name: '使用密码验证登录',icon: 'locked',size: '23' }
				],
				resultData: {},
				codeExpiration: 0,
			}
		},
		methods: {
			//改变登录方式
			changeWay() {
				this.nowWay  =  this.nowWay ? 0:1
			},
			//改变 免登录checkbox的值
			changeFlag(e){
				this.checkboxFlag = e.detail.value.length === 1
			},
			//校验结果回调函数
			verifyResult(res){
			    this.resultData = res;
			},
			// 校验插件重置 
			/* verifyReset(){
			    this.$refs.verifyElement.reset();
			    //删除当前页面的数据 
			    this.resultData = {};
			}, */
			
			//遍历数组 返回第一个值为true的index
			condition(arr){
				for(let i = 0 ; i < arr.length ; i++ ){
					if(arr[i]) return i+1;
				}
				return 0;
			},
			//获取验证码
			getVCode(){
				console.log('获取验证码');
				this.$refs.phoneInput.emptyWarn();
				let phone = this.$refs.phoneInput.text,
					all = [
						phone === '' ,
						phone.length !== 11 ,
						this.resultData === '' || !this.resultData.flag,
					];
				/**
				 * 点击发送验证码
				 * 输入状态：
				 * 1用户输入电话号码为空
				 * 2电话号码位数错误
				 * 3没有进行滑动验证
				 * 0没有问题 
				 */
				const actions = new Map([
				  [1, ()=>{this.tipText = '请输入手机号'}],
				  [2, ()=>{
					  this.$refs.phoneInput.color = '#fa6060';
					  this.tipText = '请输入正确的手机号'
				  }],
				  [3, ()=>{this.tipText = '请先拖动滑块进行安全验证'}],
				  [0, ()=>{
					  //提交手机号获取验证码
					  this.$request({
					     url: '/getVCode',
					     method: 'GET',
					     data:{
					  	   phone,
					     }
					    }).then(res => {
					  	  if(res.data.status === '200' ? res.data.data.send : false){
					  		  this.tipText = '';
					  		  this.codeExpiration = 30;
					  		  //再次能提交验证码 倒计时
					  		  let interval = setInterval(() => {
					  		    --this.codeExpiration;
					  		  }, 1000)
					  		  setTimeout(() => {
					  		     clearInterval(interval)
					  		     this.codeExpiration = 0
					  		  }, 30000)
					  	  }
					    })
				  }],
				])
				//执行
				actions.get(this.condition(all)).call(this)
			},
			//普通登录流程
			startLogin(){
				let phone = this.$refs.phoneInput.text,
					password = this.$refs.passwordInput.text;
				this.$refs.phoneInput.emptyWarn();
				this.$refs.passwordInput.emptyWarn();
				
				if(phone === ''){
					//用户手机号输入为空
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
									uni.switchTab({
										url: '/pages/index/index'
									});
								}else{
									that.tipText = '账号或密码错误'
								}
							}
					});
				}
			},
			//验证码登录
			//verifycodeInput
			startLoginwithVerifycode(){
				let phone = this.$refs.phoneInput.text,
					code = this.$refs.verifycodeInput.text;
				this.$refs.phoneInput.emptyWarn();
				this.$refs.verifycodeInput.emptyWarn();
				
				
				if(phone === ''){
					//用户手机号输入为空
					this.tipText = '请输入手机号'
				}else if(phone.length !== 11 ){
					//用户输入手机号位数不准确
					this.$refs.phoneInput.color = '#fa6060';
					this.tipText = '请输入正确的手机号'
				}else if(this.resultData === '' || !this.resultData.flag){
					this.tipText = '请先拖动滑块进行安全验证'
				}else if(code === ''){
					//用户输入密码为空
					this.tipText = '请输入验证码'
				}else if(code.length !== 6){
					this.tipText = '请输入正确的验证码'
				}else{
					let that = this;
					//输入正确 请求登录接口 判断账号密码是否正确
					that.$request({
					   url: '/login',
					   method: 'GET',
					   data:{
						   phone,
						   code,
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
									uni.switchTab({
										url: '/pages/index/index'
									});
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

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
						<!-- <yun-moveVerify @result='verifyResult' ref="verifyElement"></yun-moveVerify> -->
						<V5Button name="v5" ref="v5buttom" :host="v5host" :token="v5token" @success="verifyResult"/>
						<V5Dialog ref="v5dialog" :host="v5host" :token="v5token"/>
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
			<view class="startBtn" 
			@click=" nowWay === 0 ? startLogin() : startLoginwithVerifycode()" 
				 :style="{'margin-top': tipText !== ''?'0':'40rpx'}">登录</view>
			<!-- 登录按钮 结束 -->
			
			<!-- 选择框 开始 -->
			<checkbox-group class="unloginBtn"  @change="changeFlag">
			    <label>
			        <checkbox style="transform:scale(0.7);width: 100%;" checked="true" color="#2CC17B">
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
	import { loginProcess,allSituation } from './verifProcess.js'
	import { condition } from "../../utils/myMath.js"
	
	import V5Dialog from '../../components/verify5-ui/V5Dialog'
	import V5Button from '../../components/verify5-ui/V5Button'
	export default {
		data() {
			return {
				tipText: '',
				checkboxFlag: true,
				nowWay: 0, //和实际相反
				loginWay: [
					{ id: 0, name: '使用短信验证登录',icon: 'email-filled',size: '23' },
					{ id: 1, name: '使用密码验证登录',icon: 'locked',size: '23' }
				],
				resultData: '',
				v5host:'',
				v5token:'',
				codeExpiration: 0,
			}
		},
		components: {
			V5Dialog,
			V5Button
		},
		methods: {
			//改变登录方式
			changeWay() {
				this.nowWay  =  this.nowWay ? 0:1
			},
			//是否 勾选免登陆选择框
			changeFlag(e){
				this.checkboxFlag = e.detail.value.length === 1
			},
			// 滑动验证模块 校验结果回调函数
			verifyResult(res){
			    // this.resultData = res;
				this.$refs.v5dialog.verify( result => {
				        if(result.success){
				            this.resultData = result.verifyId;
				        }
				    });
			},
			// 滑动验证模块 重置
			verifyInit(){
				this.$refs.v5buttom.status="READY";
				this.resultData = '';
			},
			//获取验证码
			getVCode(){
				console.log('用户点击获取验证码');
				const all = allSituation.call(this).slice(0,5);
				all[2] = false;
				all[3] = false;
				/* all : [
					phone === '' ,
					!phoneReg.test(phone) ,
					false,false,
					this.resultData === '' || !this.resultData.flag ,
				] */
				//执行验证码验证
				loginProcess.get(condition(all)).apply(this,[0])
			},
			//普通登录流程
			startLogin(){
				console.log('用户使用账号密码登录');
				const all = allSituation.call(this).slice(0,4)
				/* all : [
					phone === '' ,
					!phoneReg.test(phone) ,
					pwd === '' ,
					!pwdReg.test(pwd) ,
				] */
				//执行登录验证
				loginProcess.get(condition(all)).call(this)
			},
			//验证码登录
			//verifycodeInput
			startLoginwithVerifycode(){
				console.log('用户使用验证码登录');
				const all = allSituation.call(this);
				// allSituation 关闭对密码的验证
				all[2] = false;
				all[3] = false;
				/* all : [
					phone === '' ,
					!phoneReg.test(phone) ,
					false,false,
					this.resultData === '' || !this.resultData.flag ,
					vcode === '' ,
					!vcodeReg.test(vcode)  ,
				] */
				//执行登录验证
				loginProcess.get(condition(all)).call(this)
			},
			$login(params){
				this.User.$login(params)
			}
		},
		onLoad() {
			this.$request({
			   url: '/test/custom/getV5HostAndToken',
			   method: 'GET',
			  }).then(res => {
					if(res.data.status){
						this.v5host = res.data.data.host;
						this.v5token = res.data.data.token
					}
			});
		}
	}
</script>

<style>
	@import url("phoneLogin.css");
</style>

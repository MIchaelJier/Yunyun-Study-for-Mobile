/**
* 输入状态：
* 1 电话号码为空
* 2 电话号码格式错误
* 3 密码为空
* 4 密码格式错误
* 5 没有进行滑动验证
* 6 验证码为空
* 7 验证码格式错误
* 0 没有问题  type === 0:去获取验证码 1:去登录
*/
export const allSituation = function(){
	const phone = this.$refs.phoneInput.text,
		  phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
		  pwd = this.$refs.passwordInput 
					? this.$refs.passwordInput.text 
					: '',
		  pwdReg = /^(\w){6,16}$/, //8-16位密码
		  vcode = this.$refs.verifycodeInput 
				    ? this.$refs.verifycodeInput.text
					: '',
		  vcodeReg = /^\d{6}$/ //6位验证码
	return [
			phone === '' ,
			!phoneReg.test(phone) ,
			pwd === '' ,
			!pwdReg.test(pwd) ,
			
			this.resultData === '',
			vcode === '' ,
			!vcodeReg.test(vcode)  ,
		];
}
export const loginProcess = new Map([
	[1, function(){
		this.$refs.phoneInput.color = '#fa6060';
		this.tipText = '请输入手机号'
	}],
	[2, function(){
		this.$refs.phoneInput.color = '#fa6060';
		this.tipText = '请输入正确的手机号'
	}],
	[3, function(){
		this.$refs.passwordInput.color = '#fa6060';
		this.tipText = '请输入密码'
	}],
	[4, function(){
		this.$refs.passwordInput.color = '#fa6060';
		this.tipText = '请输入正确的密码'
	}],
	[5, function(){this.tipText = '请先拖动滑块进行安全验证'}],
	[6, function(){
		this.$refs.verifycodeInput.color = '#fa6060';
		this.tipText = '验证码不能为空'
	}],
	[7, function(){
		this.$refs.verifycodeInput.color = '#fa6060';
		this.tipText = '请输入正确的验证码'
	}],
	[0, function(type = 1){ 
		let that = this,
			userName = this.$refs.phoneInput.text,
		    password = this.$refs.passwordInput ? this.$refs.passwordInput.text : '',
			code = this.$refs.verifycodeInput ? this.$refs.verifycodeInput.text : '',
			verifyId = this.resultData,
			grant_type = this.nowWay === 0 ? 'password' : 'sms';
		if(type === 1){
			//输入正确 请求登录接口 判断账号密码是否正确
			that.User.$login({
				loginData: {
					username:userName,
					password,
					code,
					verifyId,
					grant_type
				},
				isStorage: that.checkboxFlag,
				correctBack: () => {
					that.tipText = ''
					console.log('登录成功');
				},
				wrongBack: () => {
					that.tipText = this.nowWay === 0 ? '账号或密码错误': '账号或验证码错误'
				}
			})
		}else if(type === 0){
			//提交手机号获取验证码
			that.User.$getSMScode({
				op:0,
				userName,
				verifyId,
				correctBack: () => {
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
				},
				wrongBack: (msg) => {
					that.tipText = msg;
					that.verifyInit()
				}
			})
		}
	}]
])
/**
* 输入状态：
* 1 电话号码为空
* 2 电话号码格式错误
* 3 密码为空
* 4 密码格式错误
* 5 没有进行滑动验证
* 6 验证码为空
* 7 验证码格式错误
* 8 没有勾选同意协议
* 0 没有问题  type === 0:去获取验证码 1:去注册
*/
export const allSituation = function(){
	const phone = this.$refs.phoneInput.text,
		  phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
		  pwd =  this.$refs.passwordInput.text,
		  pwdReg = /^(\w){8,16}$/, //8-16位密码
		  vcode = this.$refs.verifycodeInput.text,
		  vcodeReg = /^\d{6}$/ //6位验证码
	return [
			phone === '' ,
			!phoneReg.test(phone) ,
			pwd === '' ,
			!pwdReg.test(pwd) ,
			this.resultData === '',
			!vcode === '' ,
			!vcodeReg.test(vcode)  ,
			!this.checkboxFlag
		];
}
export const registerProcess = new Map([
				  [1, function(){
					  this.$refs.phoneInput.color = '#fa6060';
					  this.tipText = '手机号不能为空'
					  }],
				  [2, function(){
					  this.$refs.phoneInput.color = '#fa6060';
					  this.tipText = '手机号格式错误'
				  }],
				  [3, function(){
					  this.$refs.passwordInput.color = '#fa6060';
					  this.tipText = '密码不能为空'
				  }],
				  [4, function(){
				  	  this.$refs.passwordInput.color = '#fa6060';
				  	  this.tipText = '密码格式错误'
				  }],
				  [5, function(){this.tipText = '请先拖动滑块进行安全验证'}],
				  [6, function(){
					  this.$refs.verifycodeInput.color = '#fa6060';
					  this.tipText = '验证码不能为空'
				  }],
				  [7, function(){
					 this.$refs.verifycodeInput.color = '#fa6060';
					 this.tipText = '验证码格式错误'
				  }],
				  [8, function(){this.tipText = '请阅读并勾选注册下方的协议'}],
				  [0, function(type = 0){
					  const userName = this.$refs.phoneInput.text,
							password = this.$refs.passwordInput.text,
							vcode =  this.$refs.verifycodeInput.text,
							verifyId = this.resultData;
					  if(type === 0) {
						  //提交手机号获取验证码
						  this.User.$getSMScode({
						  	op:1,
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
						  	wrongBack: () => {
						  		this.tipText = '手机号或滑动验证错误';
						  		this.verifyInit()
						  	}
						  })
					  }else if(type === 1){
						   //提交后台注册
						   this.$register({
							   userName,
							   password,
							   vcode,
							   correctBack: () => {
								   this.tipText = ''
							   },
							   wrongBack: () => {
								   this.tipText = res.data.data.tip
							   }
						   })
					  }
				  }],
				])
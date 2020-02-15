import { request } from './request/index.js'
/**
 * 注册
 * @param {string} phone 手机号
 * @param {string} password 密码
 * @param {string} vcode 验证码
 * @param {function} correctBack 返回正确
 * @param {function} wrongBack 返回错误
 * return Pomise
 */
export const register = params => {
	//提交后台注册
	return request({
	   url: '/register',
	   method: 'POST',
	   data:{
		   phone : params.phone,
		   password : params.password ,
		   vcode : params.vcode
	   }
	  }).then(res => {
		  if(res.data.status === '200' ? res.data.data.success: false){
			params.correctBack();
			// this.tipText = '';
			uni.showToast({
				title: '登录成功,跳转至登录页面',
				icon:'none'
			});
			setTimeout(() => {
				uni.hideToast();
				uni.navigateTo({
					url: '/pages/phoneLogin/phoneLogin'
				});
			}, 1000);
		  }else{
			params.wrongBack();
			// this.tipText = res.data.data.tip;
		}
	  })
}
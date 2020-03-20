import { requestwithStatus } from './request/requestwithStatus.js'
const request = requestwithStatus;
/**
 * 发短信
 * @param {Number} op 操作 0：登录 1：注册 2 设置密码 3常规验证
 * @param {string} phone 手机号
 * @param {string} verifyId V5id
 * @param {function} correctBack 返回正确
 * @param {function} wrongBack 返回错误
 */
export const getSMScode = params => {
	
	// 判断V5id的正确性
	let verifyisTrue = request({
	   url: '/last/user/sendSmsVerify',
	   method: 'POST',
	   header: {
	       "Content-Type": "application/x-www-form-urlencoded"
	   }, 
	   data:{
		   op: params.op,
		   userName : params.userName,
		   verifyId : params.verifyId ,
	   }
	  })
	  // 发送 给手机验证码
	  // 15657812729
	  let sendSMS = request({
	   url: '/last/user/sms',
	   method: 'GET',
	   data:{
		   op: params.op,
		   phone : params.userName,
	   }
	  },false)
	  
	  verifyisTrue
	  .then(res => {
		return sendSMS
	  })
	  .then(res => {
		 params.correctBack();
	  })
	  .catch(err => {
		  params.wrongBack(err);
	  })
}
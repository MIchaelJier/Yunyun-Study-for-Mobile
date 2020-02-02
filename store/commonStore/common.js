import { monthDayDiff,formatTime } from "../../utils/timeFormat.js"
const common = {
    namespaced:true,//命名空间的开启
    state:{
		 userInfo:{},
    },
    actions:{
      
    },
    mutations:{
      /*
      *  userInfo
      */
		//登录
		
		//注销
		
      	//从缓存中获取用户信息
      	getUserInfo(state){
      		let u = uni.getStorageSync('userInfo');
      		if(u !== '' ? u.loginTime !== '': false){
      			let gap = monthDayDiff(u.loginTime,new Date()); 
				console.log(`距上次登录相差 ${gap.days} 天 ${gap.hours} 小时 ${gap.minutes} 分钟 ${gap.seconds} 秒`);
      			//判断缓存是否过期
      			//是 存入vuex
      			//否 清除userInfo缓存
      			gap.days < 10 
      				? state.userInfo = u
      				: uni.removeStorageSync('userInfo');
      		}
      	},
      	//更改用户信息
      	changeUserInfo(state, value){
      		state.userInfo = value
      	},
      	//更改用户信息的某个属性
      	changeUserInfoAttr(state, {value,key}){
      		state.userInfo.hasOwnProperty(arguments[1].key) 
      		? state.userInfo[arguments[1].key] = arguments[1].value 
      		: ''
      	},
    },
    getters: {
	   // 获取所有登录信息
	   allInfo: state => state.userInfo,
       // 获取基本的用户信息
       basicInfo: state => {
       	let u = state.userInfo;
       	return Object.keys(u).length === 0 ? {}:{ 
       		nikename:u.nikename ,
       		haedImage:u.haedImage, 
       		loginWay:u.loginWay,
       		phone:u.phone}
       },
       // 获取登录状态
       IsLogin: state => Object.keys(state.userInfo).length !== 0,
    }
}
export default common;

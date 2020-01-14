import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import { monthDayDiff,formatTime } from "../utils/timeFormat.js"
const store = new Vuex.Store({  
    state: {  
        userInfo:{}
    },  
    mutations: {  
		//从缓存中获取用户信息
		getUserInfo(state){
			let u = uni.getStorageSync('userInfo');
			if(u !== '' ? u.loginTime !== '': false){
				let gap = monthDayDiff(u.loginTime,new Date());
				//判断缓存是否过期
				//是 存入vuex
				//否 清除userInfo缓存
				gap.year === 0 && gap.month === 0 && gap.day <= 10 
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
		//获取基本的用户信息
		basicInfo(state) {
			let u = state.userInfo;
			return Object.keys(u).length === 0 ? {}:{ nikename:u.nikename ,haedImage:u.haedImage, loginWay:u.loginWay}
		}
	}
})  
export default store;
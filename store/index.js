import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import { monthDayDiff,formatTime } from "../utils/timeFormat.js"
const store = new Vuex.Store({  
    state: {  
        userInfo:{}
    },  
    mutations: {  
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
		changeUserInfo(state, value){
			state.userInfo = value
		}
    },
	getters: {
		basicInfo(state) {
			let u = state.userInfo;
			return Object.keys(u).length === 0 ? {}:{ nikename:u.nikename ,haedImage:u.haedImage}
		}
	}
})  
export default store;
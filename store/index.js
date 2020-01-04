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
				gap.year === 0 && gap.month === 0 && gap.day <= 10 
					? state.userInfo = u
					: ''
			}
		},
		changeUserInfo(state, value){
			state.userInfo = value
		}
    }  
})  
export default store;
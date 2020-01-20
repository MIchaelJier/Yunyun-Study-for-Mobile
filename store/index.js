import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import { monthDayDiff,formatTime } from "../utils/timeFormat.js"
const store = new Vuex.Store({  
    state: {  
        userInfo:{},
		cartList:[],
		cartflag:false, //是否同步了购物车
    },  
    mutations: {  
		/*
		*  userInfo
		*/
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
		/*
		*  cartList
		*/
			//更改购物车信息
			changeCartList(state, value){
				state.cartList = value
			},
			//购物车信息是否联网拉取
			changeCartflag(state, value){
				state.cartflag = value
			},
    },
	getters: {
		//获取基本的用户信息
		basicInfo(state) {
			let u = state.userInfo;
			return Object.keys(u).length === 0 ? {}:{ 
				nikename:u.nikename ,
				haedImage:u.haedImage, 
				loginWay:u.loginWay,
				phone:u.phone}
		},
		//获取登录状态
		IsLogin(state) {
			return Object.keys(state.userInfo).length !== 0
		},
		//获取是否获取到购物车信息
		IsGetCart(state) {
			return state.cartflag;
		},
		
		//获取购物车物品数量
		getCartNum(state) {
			let list = state.cartList,
				totalNum = 0;
			list.forEach(item => {
				item.list.forEach(course => {
					totalNum ++;
				})
			});
			return totalNum;
		},
		//获取需要支付的物品
		getCartPay(state){ 
			//时间复杂度有点高
			//对象数组深拷贝
			let list = [].concat(JSON.parse(JSON.stringify(state.cartList)));
			list.forEach((item, index) => {
				//为毛fliter不能用
				let newlist = [];
				for(let c of item.list){
					if(c.checked) newlist.push(c)
				}
				item.list = newlist;
			})
			return list.filter(item => item.list.length !== 0)
		}
	}
})  
export default store;
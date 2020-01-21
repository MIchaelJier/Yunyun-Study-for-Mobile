import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import { monthDayDiff,formatTime } from "../utils/timeFormat.js"
import { TimeDiff } from "../utils/timeFormat.js"
const store = new Vuex.Store({  
    state: {  
        userInfo:{},
		cartList:[],
		couponList:[],
		cartflag:false, //是否同步了成功
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
			//获取购物车信息
			changeCartList(state, value){
				state.cartList = value
			},
			//购物车信息是否联网拉取
			changeCartflag(state, value){
				state.cartflag = value
			},
		/*
		*  couponList
		*/
		   //获取优惠券数据
		   changeCouponList(state, value){
				state.couponList = value
		   },
    },
	getters: {
		//获取基本的用户信息
		basicInfo: state => {
			let u = state.userInfo;
			return Object.keys(u).length === 0 ? {}:{ 
				nikename:u.nikename ,
				haedImage:u.haedImage, 
				loginWay:u.loginWay,
				phone:u.phone}
		},
		//获取登录状态
		IsLogin: state => Object.keys(state.userInfo).length !== 0,
		//获取是否获取到购物车信息
		IsGetCart: state => state.cartflag,
		//获取购物车物品数量
		getCartNum: state => {
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
		getCartPay: state => { 
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
		},
		//获取优惠券
		getCoupon: state => type => {
			switch (type){
				case 0: // 有效优惠券
					return state.couponList.filter(  item => !item.used && TimeDiff(item.endTime) );
					break;
				case 1: // 已使用优惠券
					return state.couponList.filter(  item => item.used );
					break;
				case 2: // 过期优惠券
					return state.couponList.filter(  item => !item.used && !TimeDiff(item.endTime) );
					break;
				case 3: // 官方 优惠券
					return state.couponList.filter(  item => !item.used && item.targetType === 0 && TimeDiff(item.endTime) );
					break;
				case 4: // 机构/讲师 优惠券
					return state.couponList.filter(  item => !item.used && item.targetType === 1 && TimeDiff(item.endTime) );
					break;
				case 5: // 单一课程 优惠券
					return state.couponList.filter(  item => !item.used && item.targetType === 2 && TimeDiff(item.endTime) );
					break;
			}
		}
	}
})  
export default store;
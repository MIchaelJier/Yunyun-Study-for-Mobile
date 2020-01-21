import { TimeDiff } from "../../utils/timeFormat.js"
const cart = {
    namespaced:true,//命名空间的开启
    state:{
		 cartList:[],
		 couponList:[],
		 cartflag:false, //是否同步了成功
    },
    actions:{
      
    },
    mutations:{
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
		//获取是否获取到购物车信息
		IsGetCart: state => state.cartflag,
		//获取购物车
		getCart : state => state.cartList,
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
}
export default cart;

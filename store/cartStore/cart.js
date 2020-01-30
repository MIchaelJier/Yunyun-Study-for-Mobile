import { TimeDiff } from "../../utils/timeFormat.js"
import { request } from "../../request/index.js"
const cart = {
    namespaced:true,//命名空间的开启
    state:{
		 cartList:[],
		 couponList:[],
    },
    actions:{
       request_cart({ commit }) {
		   let a = request({
				   url: '/getCoupon', //获取优惠券
				   method: 'GET',
		   	   }),
		       b = request({
				   url: '/getCart', //获取购物车
				   method: 'GET',
		   	  });
		   Promise.all([a, b]).then(res => {
		   	if(res[0].data.status === '200' && res[1].data.status === '200'){
		   		//获取优惠券
		   		 commit('changeCouponList',res[0].data.data);
		   		//获取购物车
		   		let list = res[1].data.data.list;
		   		list.forEach(item => {
		   			item.checked = false;
		   			item.list.forEach(course => {
		   				course.checked = false;
		   			})
		   		});
		   		 commit('changeCartList',list);
		   	}
		   })
	   }
    },
    mutations:{
		/*
		*  cartList
		*/
			//改变所有购物车信息
			changeCartList(state, value){
				state.cartList = value
			},
			//删除购物车某一物品
			// id = { ownerId , productId }
			delCartOne(state, id){
				let emptyIndex = -1;
				state.cartList.forEach( (item, index) => {
					if( item.ownerDto.ownerId === id.ownerId ){
						item.list = item.list.filter( inner => inner.productId !== id.productId );
						item.list.length === 0 ? emptyIndex = index : ''
					}
				});
				emptyIndex >= 0 ? state.cartList = state.cartList.filter((item,index) => index !== emptyIndex) : ''
			},
			//购物车 新增商品
			//  Info = { ownerId, ownername, photoUrl, productId, productName, oldPrice, discountPrice, deadlineTime }
			addCartOne(state, Info){
				let {ownerId, ownername, ...course} = Info,
					HaveOwner = state.cartList.some(item => item.ownerDto.ownerId === Info.ownerId),
					HaveCourse = state.cartList.some(item => item.list.some(c => c.productId === Info.productId));
				if(HaveOwner&&!HaveCourse){
					state.cartList.forEach(item => {
						if(item.ownerDto.ownerId === Info.ownerId){
							item.list.push(course)
						}
					})
				}else if(!HaveOwner&&!HaveCourse){
					let list = [ course ],
					    add = {
							checked: false,
							ownerDto: {
								ownername: Info.ownername,
								ownerId: Info.ownerId
							},
							list,
						};
					state.cartList.push(add)
				}
			},
		/*
		*  couponList
		*/
		   //改变所有优惠券数据
		   changeCouponList(state, value){
				state.couponList = value
		   },
		   // 增加优惠券
		   addCouponOne(state, coupon){
			  let HaveCoupon = state.couponList.some(item => item.couponId === coupon.couponId)
			  if(!HaveCoupon){
				  state.couponList.push(coupon);
			  }
		   }
	},
    getters: {
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
			let list = [].concat(JSON.parse(JSON.stringify(state.cartList))); //Object.assign({},obj)
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
		},
		//判断 该优惠券是否已领取
		isHaveCoupon: state => id => state.couponList.some(item => item.couponId === id)
		
    }
}
export default cart;

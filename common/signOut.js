import store from '../store' 
/**
 * 注销
 */
export const signout = () => {
	//退出登录
	store.commit('common/changeUserInfo',{});
	//清空购物车和优惠券信息
	store.commit('cart/delCartAll');
	store.commit('cart/delCouponAll');
	//删除缓存数据
	uni.removeStorageSync('userInfo');
	uni.switchTab({
		url: '/pages/index/index'
	});
}

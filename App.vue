<script>
	export default {
		onLaunch: function() {
			this.$store.commit('common/getUserInfo');
			if(this.$store.getters['common/IsLogin']){
				let a = this.$request({
					   url: '/getCoupon', //获取优惠券
					   method: 'GET',
					  }),
				    b = this.$request({
					   url: '/getCart', //获取购物车
					   method: 'GET',
					  });
				Promise.all([a, b]).then(res => {
					if(res[0].data.status === '200' && res[1].data.status === '200'){
						//获取优惠券
						this.$store.commit('cart/changeCouponList',res[0].data.data);
						//获取购物车
						let list = res[1].data.data.list;
						list.forEach(item => {
							item.checked = false;
							item.list.forEach(course => {
								course.checked = false;
							})
						});
						this.$store.commit('cart/changeCartList',list);
						this.$store.commit('cart/changeCartflag',true);
					}
				})
			};
		},
		// onShow: function() {
		// 	this.$store.commit('getUserInfo')
		// },
		onHide: function() {
			console.log('同步');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style/uxIcon.css");
	.page {
		width: 100%;
		height: 100%;
		background: #f7f7f7;
		position: absolute;
		font-family: "微软雅黑", Helvetica Neue,Helvetica,Arial,Sans-serif;

		/*刘海屏*/
		/* #ifdef APP-PLUS */
		padding-top:var(--status-bar-height)
		/* #endif */
	} 
	.xBottom {
		/*iphone全面屏底部适配*/
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.bottomFixed {
		position: fixed;
		bottom: 0;
	}
	
</style>
